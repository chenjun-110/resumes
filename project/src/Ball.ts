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
    bottoms: eui.Rect;
    lefts:eui.Rect;
    rights:eui.Rect;
    bronBtn:eui.Button;

    engine
    childrenCreated(){
        console.log('childrenCreated',this.bottoms.x)
    }
    init () {
        this.addEvents();
        console.log('init',this.bottoms.x,this.bottoms)
        var Engine = Matter.Engine,
        Render = Matter.Render,
        Runner = Matter.Runner,
        MouseConstraint = Matter.MouseConstraint,
        Mouse = Matter.Mouse,
        World = Matter.World,
        Bodies = Matter.Bodies;
        //创建engine
        let engine = this.engine = Matter.Engine.create(null, null);
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
                wireframes: true
            }
        });
        Matter.Runner.run(runner, engine);
        EgretRender.run(render);
        
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

        setTimeout(()=>{
            // 对刚体施加一个上抛力
            // Matter.Body.applyForce(circle, circle.position, {
            //     x:0,y:0.5
            // })
            // Matter.Body.scale(circle, 2, 2,1)
            console.log('abc') 
        },1000)
    }
    SkillPoints:Array<string> = ['1','2','3','4','1','2','Node.js','4','1','2','3','4','1','2','3','4'] 
    SkillPoints_index:number = 0
    addEvents(){
        this.bronBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.createPaoPao,this)
    }
    removeEvents(){
        this.bronBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.createPaoPao,this)
    }
    createPaoPao () {
        const r = 40
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
        container.touchEnabled = true
        container.addEventListener(egret.TouchEvent.TOUCH_TAP, this.boomPaoPao,this)

        const circle = Matter.Bodies.circle( this.bronBtn.x, this.bronBtn.y, r, {
            egretSprite: container,
            container:this,
            friction: .2,
            restitution: 0.5 //弹性：0不弹，越大越弹
        },20)
        Matter.World.add(this.engine.world, circle);
        container['body'] = circle
        Matter.Body.applyForce(circle, circle.position, {
            x: RandomNumBoth(-1, 1), y: RandomNumBoth(0, 0.5)
        })
        this.SkillPoints_index++
        if (this.SkillPoints_index === this.SkillPoints.length) {
            this.bronBtn.visible = false
                // this.engine.world.gravity.y = -1
                // setTimeout(()=>{this.engine.world.gravity.y=1},3000)
        }
    }
    boomPaoPao (e) {
        console.log('e',e.target.name)
        e.target.parent.removeChild(e.target)
        Matter.World.remove(this.engine.world,e.target.body,null);
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
      var num = Min + Rand * Range; //四舍五入
      return num;
}
function RandomNumBoth_Int(Min,Max){
      var Range = Max - Min;
      var Rand = Math.random();
      var num = Min + Math.round(Rand * Range); //四舍五入
      return num;
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