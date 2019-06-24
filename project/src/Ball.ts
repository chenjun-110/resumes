const tips={
    a:'熟练技能球',
    b:'请点炸所有技能球',
    end:'恭喜你,游戏结束',
    SkillPoints: ['ES6','Html5','CSS3','调试','布局','Vue','Node.js','Egret','Webpack','Linux','Nginx','Git','Mysql','Fiddler','Python'],
    SkillPoints2: ['ReactNative', 'Flutter'] 
}
class Ball extends eui.Component {
    public name = 'Ball'
    private static _instance: Ball = null;
    static _parent: Main = null;
    public static getInstance(parent): Ball {
        if (this._instance === null) {
            this._instance = new Ball();
            this._parent = parent;
        }
        return Ball._instance;
    }
    public constructor() {
        super();
        console.log('map constructor', this);
        this.addEventListener(eui.UIEvent.CREATION_COMPLETE,this.init,this)
        this.skinName = "BallSkin";
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
        Matter.Runner.run(runner, engine); // 运行引擎
        EgretRender.run(render); //运行渲染
        engine.world.gravity.y = 1;
        // 图片大小要参照钢体大小
        // var shp:egret.Shape = new egret.Shape();
        // shp.graphics.beginFill( 0xff0000, 1);
        // shp.graphics.drawRect( 0, 0, 100, 200 );
        // shp.graphics.endFill();
        // const circle = Matter.Bodies.circle(200,200,50, {
        //     container:this,
        //     egretSprite:shp,
        //     restitution: .8 //弹性：0不弹，越大越弹
        // },20)
        // Matter.World.add(engine.world, circle);
        console.log('容器', Matter.Bodies, this.lefts.height)
        var group = Matter.Body.nextGroup(false);
        Matter.World.add(engine.world, [
            Matter.Bodies.rectangle(this.tops.x, this.tops.y, this.tops.width, this.tops.height, { isStatic: true, friction: .2, container:this, egretSprite:this.tops}),
            Matter.Bodies.rectangle(this.bottoms.x, this.bottoms.y, this.bottoms.width, this.bottoms.height, { 
                isStatic: true, 
                friction: 0, 
                container:this, 
                egretSprite:this.bottoms, 
                collisionFilter: {
                    category:0x0004,
                    // mask:0x0004,
                    group:1
                }
            }),
            Matter.Bodies.rectangle(this.lefts.x, this.lefts.y, this.lefts.width, this.lefts.height, { isStatic: true, friction: .2, container:this, egretSprite:this.lefts  }),
            Matter.Bodies.rectangle(this.rights.x, this.rights.y, this.rights.width, this.rights.height, { isStatic: true, friction: .2, container:this, egretSprite:this.rights}),
        ]);
            
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
            if (parentA.label === 'linebox' && parentA.isStatic) {
                // debugger;
                // Matter.Body.setStatic(parentA, false)
                // parentA.mass=1
                // parentA.inverseMass = 1
                // parentA.angle = 0
                console.log('激活')
            }
        })   
        this.tips.text = tips.a
        this.createPaoPao()
        this.addEvents();
        this.SkillPoints_count = this.SkillPoints.length
    }
    checkCrashBug (parent, pairs) { //检测碰撞bug
        if (parent.label === 'linebox' && pairs.length>10) { //碰撞多重触发bug
            Matter.Body.setStatic(parent, true)
            console.log('多个刚体触发 静态')
        } else if (parent.label === 'linebox' && !parent.isStatic) {
            if (parent.nowtime) { //统计函数2秒内调用了几次parent.mathid && 
                parent.times++
                const timedif = (Date.now() - parent.nowtime) / 1000
                if (timedif > 2 && parent.times > 5) {
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
        // window.addEventListener("devicemotion", (event) => {
        //     // 处理event.alpha、event.beta及event.gamma
        // }, true);
        window.addEventListener("deviceorientation", (event) => {
            let x =  Number((Math.log(Math.abs(event.beta))/5).toFixed(2))
            let y  = Number((Math.log(Math.abs(event.gamma))/5).toFixed(2))
            if (event.beta < 0) x *= -1
            if (event.gamma < 0) y *= -1
            this.engine.world.gravity.x = y
            this.engine.world.gravity.y = x
            this.tips.text = `bug穿透数:${this.bugNum} x:${this.engine.world.gravity.x} y:${this.engine.world.gravity.y}`
            console.log('devicemotion', event)

            // 处理event.alpha z、event.beta x及event.gamma y旋转角度
        }, true);

        egret.setInterval(()=>{
            this.$children.forEach((v) => {
                if (v['body'] && (v.x < -1 || v.x > this.width || v.y < -1 || v.y > this.height)) {
                    console.log('BUG', v);
                    this.destroyPaoPao(v)
                    this.bugNum++
                }
            })
        }, this, 1000)
        
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
        console.log(this.drawPoints)
        const lines = []
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
            const line = Matter.Bodies.rectangle(arr[0].x, arr[0].y, dis, 10, {  
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
            
        })
        if (lines.length == 0) return
        console.log('group', group)
        let linebox = Matter.Body.create({
            parts:lines,
            container:this,
            slop:0,
            restitution:0,
            label:'linebox',
            collisionFilter: {
                    // group: -2,
                    // mask:0x0004,
                    // category:0x0004,
                }
        });
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
        this.punchPaoPao(this.LastPaoPao)
        if (this.SkillPoints_index <= this.SkillPoints.length-1) this.createPaoPao()
    }
    createPaoPao () {
        const r = 30
        const container = new egret.DisplayObjectContainer()
        //生成泡泡背景
        const paopao = this.createBitmapByName(`ball_${RandomNumBoth_Int(1,6)}_png`)
        container.width = container.height = paopao.width = paopao.height = r*2
        paopao.anchorOffsetX = paopao.anchorOffsetY = r
        container.addChild(paopao)

        //生成文字
        const label:egret.TextField = new egret.TextField(); 
        label.text = this.SkillPoints[this.SkillPoints_index]; 
        label.anchorOffsetX = label.anchorOffsetY = r
        label.width = label.height = r*2
        label.textColor = 0x000000
        label.fontFamily = "Impact";
        label.textAlign = egret.HorizontalAlign.CENTER;
        label.verticalAlign = egret.VerticalAlign.MIDDLE;
        label.size = r*2/4
        container.name = this.SkillPoints[this.SkillPoints_index]; 
        container.addChild(label)
        const circle = Matter.Bodies.circle( this.cannon.x, this.cannon.y, r, {
            egretSprite: container,
            container:this,
            friction: .2,
            isSleeping: true,
            restitution: 0.4 //弹性：0不弹，越大越弹
        },20)
        Matter.World.add(this.engine.world, circle);
        container['body'] = circle
        this.LastPaoPao = container
        return container
    }
    punchPaoPao (container) {
        let circle = container['body']
        circle.isSleeping = false
        Matter.Body.applyForce(circle, circle.position, {
            x: RandomNumBoth(-0.2, 0.2), y: RandomNumBoth(0, 0.5)
        })
        RES.getRes('wind_mp3').play(0, 1)
        container.touchEnabled = true
        container.addEventListener(egret.TouchEvent.TOUCH_TAP, this.boomPaoPao,this)

    }
    boomPaoPao (e) {
        console.log('e',e.target.name)
        RES.getRes('balloon_mp3').play(0, 1)
        this.destroyPaoPao(e.target)
    }
    destroyPaoPao (target) {
        target.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.boomPaoPao,this)
        target.parent.removeChild(target)
        Matter.World.remove(this.engine.world, target.body, null);
        this.SkillPoints_count--
        if (this.SkillPoints_count === 0) {
            this.win.play()
            setTimeout(()=>RES.getRes('boom_mp3').play(0, 1),3000)
            this.tips.text = tips.end
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
function RandomNumBoth(Min,Max){
      var Range = Max - Min;
      var Rand = Math.random();
      var num = Min + Rand * Range;
      return num;
}
function RandomNumBoth_Int(Min,Max){
      var Range = Max - Min;
      var Rand = Math.random();
      var num = Min + Math.round(Rand * Range); //四舍五入
      return num;
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