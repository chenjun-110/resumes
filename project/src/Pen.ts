// const tips:any = {
//     a:'熟练技能球',
//     b:'请点炸所有技能球',
//     end:'恭喜你,游戏结束',
//     SkillPoints: ['ES6','Html5','CSS3','调试','布局','Vue','Node.js','Egret','Webpack','Linux','Nginx','Git','Mysql','Fiddler','Python'],
//     SkillPoints2: ['ReactNative', 'Flutter'] 
// }
class Pen extends eui.Component {
    public name = 'Pen'
    private static _instance: Pen = null;
    static _parent: Main = null;
    public static getInstance(parent): Pen {
        if (this._instance === null) {
            this._instance = new Pen();
            this._parent = parent;
        }
        return Pen._instance;
    }
    public constructor() {
        super();
        console.log('map constructor', this);
        this.addEventListener(eui.UIEvent.CREATION_COMPLETE,this.init,this)
        this.skinName = "PenSkin";
    }
    tops:eui.Rect;
    bottoms: eui.Rect;
    lefts:eui.Rect;
    rights:eui.Rect;
    bronBtn:eui.Button;
    cannon:eui.Image;
    tips:eui.Label;
    cannnonRotate:egret.tween.TweenGroup;
    win:egret.tween.TweenGroup;
    engine
    childrenCreated(){
        console.log('childrenCreated',this.bottoms.x)
        playAnimation(this.cannnonRotate, true)
    }
    init () {
        console.log('init',this.bottoms.x,this.bottoms)
        var Engine = Matter.Engine,
        Render = Matter.Render,
        Runner = Matter.Runner,
        MouseConstraint = Matter.MouseConstraint,
        Mouse = Matter.Mouse,
        World = Matter.World,
        Bodies = Matter.Bodies;
        //创建engine
        let engine = this.engine = Matter.Engine.create(null, {
            // enableSleeping: true //开启睡眠模式
        });
        var world=engine.world
        //创建runner
        let runner = Matter.Runner.create(null);
        //设置runner以固定帧率计算
        runner.isFixed = true; 
        //创建render，使用egret的渲染方法替代matter自己的pixi渲染方法
        let render = EgretRender.create({
            element:this,//document.body
            engine: engine,
            options: {
                width: this.width,
                height: this.height,
                container: this,
                wireframes: true,
            }
        });
        world.bounds.max={
                x:this.width,
                y:this.height
            }
        Matter.Runner.run(runner, engine); // 运行引擎
        EgretRender.run(render); //运行渲染
        engine.world.gravity.y = 0.2;
        // 图片大小要参照钢体大小
        console.log('容器', Matter.Bodies, this.lefts.height)
        var group = Matter.Body.nextGroup(false);
        const leftWall =  Matter.Bodies.rectangle(this.lefts.x, this.lefts.y, this.lefts.width, this.lefts.height, { isStatic: true, friction: .2, container:this, egretSprite:this.lefts  })
        const rightWall = Matter.Bodies.rectangle(this.rights.x, this.rights.y, this.rights.width, this.rights.height, { isStatic: true, friction: .2, container:this, egretSprite:this.rights})

        Matter.World.add(engine.world, [
            Matter.Bodies.rectangle(this.tops.x, this.tops.y, this.tops.width, this.tops.height, { isStatic: true, friction: .2, container:this, egretSprite:this.tops}),
            Matter.Bodies.rectangle(this.bottoms.x, this.bottoms.y, this.bottoms.width, this.bottoms.height, { 
                isStatic: true, 
                friction: 0, 
                container:this, 
                egretSprite:this.bottoms, 
                collisionFilter: {
                    // category:0x0004,
                    // mask:0x0004,
                    group:1
                }
            }),
            leftWall, rightWall
        ]);
        console.log('world', world,rightWall)
        // Render.lookAt(render, {
        //     min: { x: 0, y: 0 },
        //     max: { x: 375, y: 667 }
        // },null,null);
        // 碰撞事件
        let kk= 0
        Matter.Events.on(engine, 'collisionStart', (event) => {
            var pairs = event.pairs;
            kk++
            for (var i = 0; i < pairs.length; i++) {
                var pair = pairs[i];
                console.log('kk:'+kk, pair, pairs)
                //pair.bodyA pair.bodyB是碰撞双方
                if (pair.bodyB.label === 'line') {
                }
            }
            let parentA = pairs[0].bodyA.parent
            let parentB = pairs[0].bodyB.parent
            
            this.checkCrashBug(parentB, pairs)
            this.checkCrashBug(parentA, pairs)
            if (parentA.label === 'linebox' && parentA.isStatic && pairs.length === 1) {
                // debugger;
                // Matter.Body.setStatic(parentA, false)
                // Matter.Body.applyForce(parentA, parentA.position, {
                //     x: 0, y: -1
                // })
                // Matter.Body.setVelocity(parentA, {x:0,y:1})
                // Matter.Body.setPosition(parentA, parentA.position)
                // parentA.collisionFilter = {
                //     category:0x0004,
                //     mask:0x0004,
                //     group:1
                // }
                // console.log('激活')
            }
        })   
        this.tips.text = tips.a
        this.addEvents();
    }
    checkCrashBug (parent, pairs) { //检测碰撞bug
        if (parent.label === 'linebox' && pairs.length>10) { //碰撞多重触发bug
            Matter.Body.setStatic(parent, true)
            // Matter.Sleeping.set(parent, true)
            console.log('多个刚体触发 静态')
        } else if (parent.label === 'linebox' && !parent.isStatic) {
            if (parent.nowtime) { //统计函数2秒内调用了几次parent.mathid && 
                parent.times++
                const timedif = (Date.now() - parent.nowtime) / 1000
                if ((timedif > 1 && parent.times > 5) || (timedif < 1 && parent.times > 10)) {
                    // Matter.Sleeping.set(parent, true)
                    Matter.Body.setStatic(parent, true)
                    delete parent.times
                    delete parent.nowtime
                    console.log('碰撞次数超限 静态')
                }
            } else {
                parent.nowtime = Date.now()
                parent.times = 1
            }
        }
    }
    SkillPoints:Array<string> = tips.SkillPoints
    SkillPoints_index:number = 0
    SkillPoints_count:number = 0
    LastPaoPao:egret.DisplayObjectContainer
    addEvents(){
        this.bronBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.tapBtn, this)
        this.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.drawLineStart, this)
        this.addEventListener(egret.TouchEvent.TOUCH_MOVE, this.drawLineMove, this)
        this.addEventListener(egret.TouchEvent.TOUCH_END, this.drawLineEnd, this)
    }
    /**
     * 矩形刚体需要旋转角度
     */
    startPoint; // 每次判断直线的起点，临界判断：不是直线就另生成一个新刚体
    drawLineStart (e) {
        console.log(e.stageX, e.stageY)
        this.startPoint = {
            x:e.stageX, 
            y:e.stageY
        }
        this.Points.push(this.startPoint)
        this.drawPoints = []
    }
    Points=[]
    drawLineMove (e) {
        console.log(this.Points.length)
        const P = {
            x:e.stageX, 
            y:e.stageY
        }
        if (this.Points.length >= 5) {
            const y = this.Points[Math.floor(this.Points.length/2)].y
            const x = this.Points[Math.floor(this.Points.length/2)].x
            const y1 = this.startPoint.y
            const x1 = this.startPoint.x
            const y2 = P.y
            const x2 = P.x
            if ( (y-y2)/(y1-y2) === (x-x2)/(x1-x2) ) { //直线公式
                console.log('是直线')
            } else {
                this.drawPoints.push([this.startPoint, P])
                this.Points = []
                this.startPoint = P
                this.Points.push(this.startPoint)
            }
        }
        this.Points.push(P)
    }
    drawPoints=[]
    drawLineEnd (e) {
        if (this.drawPoints.length == 0) return
        console.log(this.drawPoints)
        const lines = []
        var shp:egret.Shape = new egret.Shape();
        shp.graphics.lineStyle( 2, 0x0000 );
        shp.graphics.moveTo( this.drawPoints[0][0].x, this.drawPoints[0][0].y );
       
        var group = Matter.Body.nextGroup(true);
        this.drawPoints.forEach((arr, i, all) => {
            const dx = Math.abs(arr[0].x - arr[1].x);
            const dy = Math.abs(arr[0].y - arr[1].y);
            const dis = Math.sqrt(Math.pow(dx,2)+Math.pow(dy,2)); //两点间距离-作宽
            const next = all[i+1]
            if (!next) return
            const P1 = arr[0]
            const P2 = {
                x:arr[1].x,
                y:arr[1].y
            }
            // 仅根据起点和终点画出带方向的矩形
            const k =(P2.y-P1.y)/(P2.x-P1.x)
            const angle = Math.atan2((P2.y-P1.y), (P2.x-P1.x)) // 直线和x轴的弧度
            const line = Matter.Bodies.rectangle(arr[0].x, arr[0].y, dis, 1, {  
                // friction: .2, 
                angle: angle, 
                container:this,
                slop:0,
                restitution:0,
                collisionFilter: {
                    group: group,
                    // mask:0x0004,
                    // category:0x0004,
                },
                // isSensor:false,
                label:'line',
                friction: 0,
                frictionAir: 0,
                frictionStatic:0,
             })
            line.P = arr
            line.dis = dis
            lines.push( line )
            shp.graphics.lineTo( arr[1].x, arr[1].y );
        })
        
        console.log('group', group)
        shp.graphics.endFill();
        // this.addChild(shp)
        let linebox = Matter.Body.create({
            parts:lines,
            container:this,
            slop:0,
            restitution:0,
            label:'linebox',
            // egretSprite: shp,
            // position:{
            //     x:0, y:0
            // },
            collisionFilter: {
                category:0x0004,
                mask:0x0004,
                group:1
            },
            startPoint:{
                x:this.drawPoints[0][0].x,
                y:this.drawPoints[0][0].y
            },
            // render:{
            //     strokeStyle:0x0000
            // }
        });
        // console.log('linebox', this.)
        this.addEventListener(egret.Event.ENTER_FRAME, () => {
            // shp.y = linebox.position.y - this.drawPoints[0][0].y
            // shp.x = linebox.position.x - this.drawPoints[0][0].x
            // shp.anchorOffsetX = shp.width/2
            // shp.anchorOffsetY = shp.height/2
            // shp.rotation = (linebox.angle) * 180 / Math.PI ;
            shp.x = linebox.position.x - linebox.startPoint.x - shp.width/2;
            shp.y = linebox.position.y - linebox.startPoint.y - shp.height/2;
            shp.rotation = linebox.angle / (360 / Math.PI);
            // console.log('linebox', linebox.position.x)
        }, this)
        // Matter.Composites.chain(chains, 0.5, 0, -0.5, 0, { stiffness: 0.9 });
        // const c = Matter.Constraint.create({
        //             bodyA: lines[0], // 约束刚体 A
        //             pointA : {
        //                 x:lines[1].dis/2,y:0
        //             }, // 约束点 A
        //             bodyB: lines[1], // 约束刚体 B
        //             pointB: {
        //                 x:-lines[1].dis/2,y:0
        //             }, // 约束点 B
        //             stiffness: 0
        //         })
        //             cs.push(c)
        // let composite = {
        //     bodies:[],
        //     constraints:[]
        // }
        Matter.World.add(this.engine.world, linebox )
        console.log(lines)
    }
    bugNum:number=0 //bug穿透数
    removeEvents(){
        this.bronBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.tapBtn,this)
    }
    tapBtn () {
        this.SkillPoints_index++
        if (this.SkillPoints_index === this.SkillPoints.length) {
            this.bronBtn.visible = false
            this.tips.text = tips.b
            this.cannnonRotate.stop()
        }
    }
    update () {

    }
    private createBitmapByName(name:string):egret.Bitmap {
        var result = new egret.Bitmap();
        var texture:egret.Texture = RES.getRes(name);
        result.texture = texture;
        return result;
    }
}
function playAnimation(target:egret.tween.TweenGroup,isLoop:boolean):void {//eui动画的循环播放
    if(isLoop){
        for(var key in target.items){
            target.items[key].props = {loop:true};
        }
    }
    target.play();
}
/**
 * 
 * mousemove
 * 
 *  var d = distance( position, mouse );
 * var stepSize = textWidth( letter, fontSize );
 * if (d > stepSize) {
 * counter++
 * letter = letters[counter];
 * context.translate( position.x, position.y); 
 * context.fillText(letter,0,0);
 * }
 * 
 * 
 * 云雾转场8
 * 球表现技能点
 *  绘字表现句子
 */