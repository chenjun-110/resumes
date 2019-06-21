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
        Matter.World.add(engine.world, [
            Matter.Bodies.rectangle(this.tops.x, this.tops.y, this.tops.width, this.tops.height, { isStatic: true, friction: .2, container:this, egretSprite:this.tops}),
            Matter.Bodies.rectangle(this.bottoms.x, this.bottoms.y, this.bottoms.width, this.bottoms.height, { isStatic: true, friction: .2, container:this, egretSprite:this.bottoms}),
            Matter.Bodies.rectangle(this.lefts.x, this.lefts.y, this.lefts.width, this.lefts.height, { isStatic: true, friction: .2, container:this, egretSprite:this.lefts  }),
            Matter.Bodies.rectangle(this.rights.x, this.rights.y, this.rights.width, this.rights.height, { isStatic: true, friction: .2, container:this, egretSprite:this.rights}),
        ]);
        // Render.lookAt(render, {
        //     min: { x: 0, y: 0 },
        //     max: { x: 375, y: 667 }
        // },null,null);
        // 碰撞事件
        Matter.Events.on(engine, 'collisionStart', function(event) {
            var pairs = event.pairs;
            for (var i = 0; i < pairs.length; i++) {
                var pair = pairs[i];
                // console.log(pair, pairs)
                //pair.bodyA pair.bodyB是碰撞双方
            }
        })   
        this.tips.text = tips.a
        this.createPaoPao()
        this.addEvents();
        this.SkillPoints_count = this.SkillPoints.length
    }
    SkillPoints:Array<string> = tips.SkillPoints
    SkillPoints_index:number = 0
    SkillPoints_count:number = 0
    LastPaoPao:egret.DisplayObjectContainer
    addEvents(){
        this.bronBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.tapBtn,this)
        // window.addEventListener("devicemotion", (event) => {
        //     this.engine.world.gravity.x = event.acceleration.x;
        //     this.engine.world.gravity.y = event.acceleration.y;
        //     console.log('devicemotion', event)
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

        egret.setInterval( ()=>{
            this.$children.forEach((v) => {
                if (v.x < -1 || v.x > this.width || v.y < -1 || v.y > this.height) {
                    console.log('BUG', v);
                    this.destroyPaoPao(v)
                    this.bugNum++
                }
            })
        }, this, 1000)
        
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