class Ball extends eui.UILayer {
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
        // this.skinName = "MapSkin";
        console.log('map constructor', this);
        this.init();
        this.addEvents();
    }
    init () {
        var Engine = Matter.Engine,
        Render = Matter.Render,
        Runner = Matter.Runner,
        MouseConstraint = Matter.MouseConstraint,
        Mouse = Matter.Mouse,
        World = Matter.World,
        Bodies = Matter.Bodies;
        //创建engine
        let engine = Matter.Engine.create(null, null);
        var world=engine.world
        //创建runner
        let runner = Matter.Runner.create(null);
        //设置runner以固定帧率计算
        // runner.isFixed = true; 
        //创建render，使用egret的渲染方法替代matter自己的pixi渲染方法
        let render = EgretRender.create({
            element: document.body,
            engine: engine,
            options: {
                width: 376,
                height: 668,
                container: this,
                wireframes: true
            }
        });
        Matter.Runner.run(runner, engine);
        EgretRender.run(render);
        
        engine.world.gravity.y = 0.2;
        // var ground=Bodies.rectangle(400,600,600,100,{isStatic:true});
        // 图片大小要参照钢体大小
        var circle = Matter.Bodies.circle(200,50,50, {
                    render: {
                        sprite: {
                            texture: 'paopao_png', xOffset: 50, yOffset: 50,width:100,height:100,
                        },
                        container:this
                    },
                    restitution: .8 //弹性：0不弹，越大越弹
                },20)
        Matter.World.add(engine.world, circle);
        Matter.World.add(engine.world, [
            // Matter.Bodies.rectangle(400, 0, 375, 50, { isStatic: true, friction: 0 }),
            // Matter.Bodies.rectangle(400, 600, 375, 50, { isStatic: true, friction: 0 }),
            // Matter.Bodies.rectangle(650, 300, 50, 600, { isStatic: true, friction: 0 }),
            Matter.Bodies.rectangle(0, 667, 667, 60, { isStatic: true, friction: 0 })
        ]);
        // Render.lookAt(render, {
        //     min: { x: 0, y: 0 },
        //     max: { x: 800, y: 600 }
        // },null,null);
        // var effect = this.createBitmapByName("paopao_png");
        // // effect['type'] = 0;
        // effect.width = 130
        // effect.height = 130;
        // effect.x = 50;
        // effect.y = 50;
        // effect.scaleX = 1;
        // effect.scaleY = 1;
        // effect.anchorOffsetX = effect.width/2;
        // effect.anchorOffsetY = effect.height/2;
        // this.addChild(effect);
        // 碰撞事件
        Matter.Events.on(engine, 'collisionStart', function(event) {
            var pairs = event.pairs;
            for (var i = 0; i < pairs.length; i++) {
                var pair = pairs[i];
                console.log(pair, pairs)
                //pair.bodyA pair.bodyB是碰撞双方
            }
        })   

        setTimeout(()=>{
            // 对刚体施加一个上抛力
            // Matter.Body.applyForce(circle, circle.position, {
            //     x:0,y:0.5
            // })
            console.log('abc') 
        },3000)
    }
    addEvents(){

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