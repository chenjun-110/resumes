const tips={
    a:'熟练技能球',
    b:'请点炸所有技能球',
    end:'恭喜你,进入下一关',
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
    robot:egret.MovieClip
    next:eui.Button;
    reset:eui.Button;
    childrenCreated(){
        console.log('childrenCreated',this.bottoms.x)
        playAnimations(this.cannnonRotate, true)
    }
    init () {
        var data = RES.getRes("robot_json");
        var png = RES.getRes("robot_png");
        var mcFactory:egret.MovieClipDataFactory = new egret.MovieClipDataFactory( data, png );
        var robot = this.robot = new egret.MovieClip( mcFactory.generateMovieClipData( "walk" ) );
        robot.frameRate = 42
        robot.scaleX = robot.scaleY = 0.4
        robot.width = robot.height = 100
        robot.anchorOffsetX = robot.anchorOffsetY = 160
        this.addChild( robot );
        robot.gotoAndStop(25)
        // setTimeout(()=>{
        //     // robot.movieClipData  = mcFactory.generateMovieClipData( "walk" );
        //     // robot.gotoAndPlay( 1 ,-1);
        //     robot.gotoAndStop(25)
        // },3000)

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
        
        // setTimeout(()=>{
        //     Matter.Body.setStatic(leftWall, false)
        // },3000) 
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
        })   
        this.addEvents();
        this.start();
    }
    SkillPoints:Array<string> = tips.SkillPoints
    SkillPoints_index:number = 0
    SkillPoints_count:number = 0
    LastPaoPao:egret.DisplayObjectContainer
    addEvents(){
        this.bronBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.tapBtn, this)
        this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.moveRobot, this)
        this.reset.addEventListener(egret.TouchEvent.TOUCH_TAP, this.resets, this)
        this.next.addEventListener(egret.TouchEvent.TOUCH_TAP, this.nexts, this)
        window.addEventListener("deviceorientation", this.deviceorientation, true);
        this.intval = egret.setInterval(()=>{
            this.$children.forEach((v) => {
                if (v['body'] && (v.x < -1 || v.x > this.width || v.y < -1 || v.y > this.height)) {
                    console.log('BUG', v);
                    this.destroyPaoPao(v)
                    this.bugNum++
                }
            })
        }, this, 1000)
        
    }
    deviceorientation (event) {
        let x =  Number((Math.log(Math.abs(event.beta))/5).toFixed(2))
        let y  = Number((Math.log(Math.abs(event.gamma))/5).toFixed(2))
        if (event.beta < 0) x *= -1
        if (event.gamma < 0) y *= -1
        this.engine.world.gravity.x = y
        this.engine.world.gravity.y = x
        // this.tips.text = `bug穿透数:${this.bugNum} x:${this.engine.world.gravity.x} y:${this.engine.world.gravity.y}`
        // console.log('devicemotion', event)
        // 处理event.alpha z、event.beta x及event.gamma y旋转角度
    }
    bugNum:number=0 //bug穿透数
    intval = null
    removeEvents(){
        this.bronBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.tapBtn,this)
        egret.clearInterval(this.intval)
        window.removeEventListener("deviceorientation", this.deviceorientation, true)
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
        this.wins()
    }
    moveRobot (e) {
        if (this.robot.isPlaying) {
            egret.Tween.removeTweens(this.robot)
        } else {
            this.robot.gotoAndPlay( this.robot.currentFrame ,-1);
        }
        egret.Tween.get(this.robot, {
            loop: false,//设置循环播放
            onChangeObj: this//更新函数作用域
        })
        .to({x: e.stageX, y:e.stageY}, distance(this.robot.x, e.stageX, this.robot.y, e.stageY)*7)
        .call(()=>{
            this.robot.stop()
        }, this, []);//设置回调函数及作用域，可用于侦听动画完成
    }
    start () {
        this.SkillPoints_index = 0
        this.SkillPoints_count = this.SkillPoints.length
        this.tips.text = tips.a
        this.createPaoPao()
    }
    wins () {
        if (this.SkillPoints_count === 0) {
            this.win.play()
            setTimeout(()=>{
                RES.getRes('boom_mp3').play(0, 1)
                this.tips.text = tips.end
                this.reset.visible = true
                this.next.visible = true
            },3000)
        }
    }
    resets () {
        //重置动画
        this.win.play(0)
        this.win.stop()
        playAnimations(this.cannnonRotate, true)

        this.start()
        this.bronBtn.visible = true
        this.reset.visible = false
        this.next.visible = false
    }
    nexts () {
        this.removeEvents()
        Ball._parent.removeChild(this)
        Ball._parent.next()
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
function playAnimations(target:egret.tween.TweenGroup,isLoop:boolean):void {//eui动画的循环播放
    if(isLoop){
        for(var key in target.items){
            target.items[key].props = {loop:true};
        }
    }
    target.play();
}
function distance(x1,x2,y1,y2){
        var x1 = x1;
        //获取第一点的X坐标
        var y1 = eval(y1);
        //获取第一点的Y坐标
        var x2 = eval(x2);
        //获取第二点的X坐标
        var y2 = eval(y2);
        //获取第二点的Y坐标
        var calX = x2 - x1;
        var calY = y2 - y1;
        return Math.pow((calX *calX + calY * calY), 0.5);
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