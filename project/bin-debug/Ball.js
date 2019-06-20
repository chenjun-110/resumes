var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = this && this.__extends || function __extends(t, e) { 
 function r() { 
 this.constructor = t;
}
for (var i in e) e.hasOwnProperty(i) && (t[i] = e[i]);
r.prototype = e.prototype, t.prototype = new r();
};
var Ball = (function (_super) {
    __extends(Ball, _super);
    function Ball() {
        var _this = _super.call(this) || this;
        // this.skinName = "MapSkin";
        console.log('map constructor', _this);
        _this.init();
        _this.addEvents();
        return _this;
    }
    Ball.getInstance = function (parent) {
        if (this._instance === null) {
            this._instance = new Ball();
            this._parent = parent;
        }
        return Ball._instance;
    };
    Ball.prototype.init = function () {
        var Engine = Matter.Engine, Render = Matter.Render, Runner = Matter.Runner, MouseConstraint = Matter.MouseConstraint, Mouse = Matter.Mouse, World = Matter.World, Bodies = Matter.Bodies;
        //创建engine
        var engine = Matter.Engine.create(null, null);
        var world = engine.world;
        //创建runner
        var runner = Matter.Runner.create(null);
        //设置runner以固定帧率计算
        // runner.isFixed = true; 
        //创建render，使用egret的渲染方法替代matter自己的pixi渲染方法
        var render = EgretRender.create({
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
        var circle = Matter.Bodies.circle(200, 50, 50, {
            render: {
                sprite: {
                    texture: 'paopao_png', xOffset: 50, yOffset: 50, width: 100, height: 100,
                },
                container: this
            },
            restitution: .8 //弹性：0不弹，越大越弹
        }, 20);
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
        Matter.Events.on(engine, 'collisionStart', function (event) {
            var pairs = event.pairs;
            for (var i = 0; i < pairs.length; i++) {
                var pair = pairs[i];
                console.log(pair, pairs);
                //pair.bodyA pair.bodyB是碰撞双方
            }
        });
        setTimeout(function () {
            // 对刚体施加一个上抛力
            // Matter.Body.applyForce(circle, circle.position, {
            //     x:0,y:0.5
            // })
            console.log('abc');
        }, 3000);
    };
    Ball.prototype.addEvents = function () {
    };
    Ball.prototype.update = function () {
    };
    Ball.prototype.createBitmapByName = function (name) {
        var result = new egret.Bitmap();
        var texture = RES.getRes(name);
        result.texture = texture;
        return result;
    };
    Ball._instance = null;
    Ball._parent = null;
    return Ball;
}(eui.UILayer));
__reflect(Ball.prototype, "Ball");
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
 * 云雾转场
 * 球表现技能点
 *  绘字表现句子
 */ 
