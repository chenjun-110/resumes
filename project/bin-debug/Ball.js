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
var tips = {
    a: '熟练技能球',
    b: '请点炸所有技能球',
    end: '恭喜你,进入下一关',
    SkillPoints: ['ES6', 'Html5', 'CSS3', '调试', '布局', 'Vue', 'Node.js', 'Egret', 'Webpack', 'Linux', 'Nginx', 'Git', 'Mysql', 'Fiddler', 'Python'],
    SkillPoints2: ['ReactNative', 'Flutter']
};
var Ball = (function (_super) {
    __extends(Ball, _super);
    function Ball() {
        var _this = _super.call(this) || this;
        _this.name = 'Ball';
        _this.SkillPoints = tips.SkillPoints;
        _this.SkillPoints_index = 0;
        _this.SkillPoints_count = 0;
        _this.bugNum = 0; //bug穿透数
        _this.intval = null;
        _this.addEventListener(eui.UIEvent.CREATION_COMPLETE, _this.init, _this);
        _this.skinName = "BallSkin";
        return _this;
    }
    Ball.getInstance = function (parent) {
        if (this._instance === null) {
            this._instance = new Ball();
            this._parent = parent;
        }
        return Ball._instance;
    };
    Ball.prototype.childrenCreated = function () {
        console.log('childrenCreated', this.bottoms.x);
        playAnimations(this.cannnonRotate, true);
    };
    Ball.prototype.init = function () {
        var data = RES.getRes("robot_json");
        var png = RES.getRes("robot_png");
        var mcFactory = new egret.MovieClipDataFactory(data, png);
        var robot = this.robot = new egret.MovieClip(mcFactory.generateMovieClipData("walk"));
        robot.frameRate = 42;
        robot.scaleX = robot.scaleY = 0.4;
        robot.width = robot.height = 100;
        robot.anchorOffsetX = robot.anchorOffsetY = 160;
        this.addChild(robot);
        robot.gotoAndStop(25);
        // setTimeout(()=>{
        //     // robot.movieClipData  = mcFactory.generateMovieClipData( "walk" );
        //     // robot.gotoAndPlay( 1 ,-1);
        //     robot.gotoAndStop(25)
        // },3000)
        console.log('init', this.bottoms.x, this.bottoms);
        var Engine = Matter.Engine, Render = Matter.Render, Runner = Matter.Runner, MouseConstraint = Matter.MouseConstraint, Mouse = Matter.Mouse, World = Matter.World, Bodies = Matter.Bodies;
        //创建engine
        var engine = this.engine = Matter.Engine.create(null, {});
        var world = engine.world;
        //创建runner
        var runner = Matter.Runner.create(null);
        //设置runner以固定帧率计算
        runner.isFixed = true;
        //创建render，使用egret的渲染方法替代matter自己的pixi渲染方法
        var render = EgretRender.create({
            element: this,
            engine: engine,
            options: {
                width: this.width,
                height: this.height,
                container: this,
                wireframes: true,
            }
        });
        world.bounds.max = {
            x: this.width,
            y: this.height
        };
        Matter.Runner.run(runner, engine); // 运行引擎
        EgretRender.run(render); //运行渲染
        engine.world.gravity.y = 0.2;
        // 图片大小要参照钢体大小
        console.log('容器', Matter.Bodies, this.lefts.height);
        var group = Matter.Body.nextGroup(false);
        var leftWall = Matter.Bodies.rectangle(this.lefts.x, this.lefts.y, this.lefts.width, this.lefts.height, { isStatic: true, friction: .2, container: this, egretSprite: this.lefts });
        var rightWall = Matter.Bodies.rectangle(this.rights.x, this.rights.y, this.rights.width, this.rights.height, { isStatic: true, friction: .2, container: this, egretSprite: this.rights });
        Matter.World.add(engine.world, [
            Matter.Bodies.rectangle(this.tops.x, this.tops.y, this.tops.width, this.tops.height, { isStatic: true, friction: .2, container: this, egretSprite: this.tops }),
            Matter.Bodies.rectangle(this.bottoms.x, this.bottoms.y, this.bottoms.width, this.bottoms.height, {
                isStatic: true,
                friction: 0,
                container: this,
                egretSprite: this.bottoms,
                collisionFilter: {
                    // category:0x0004,
                    // mask:0x0004,
                    group: 1
                }
            }),
            leftWall, rightWall
        ]);
        console.log('world', world, rightWall);
        // setTimeout(()=>{
        //     Matter.Body.setStatic(leftWall, false)
        // },3000) 
        // Render.lookAt(render, {
        //     min: { x: 0, y: 0 },
        //     max: { x: 375, y: 667 }
        // },null,null);
        // 碰撞事件
        var kk = 0;
        Matter.Events.on(engine, 'collisionStart', function (event) {
            var pairs = event.pairs;
            kk++;
            for (var i = 0; i < pairs.length; i++) {
                var pair = pairs[i];
                console.log('kk:' + kk, pair, pairs);
                //pair.bodyA pair.bodyB是碰撞双方
                if (pair.bodyB.label === 'line') {
                }
            }
        });
        this.addEvents();
        this.start();
    };
    Ball.prototype.addEvents = function () {
        var _this = this;
        this.bronBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.tapBtn, this);
        this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.moveRobot, this);
        this.reset.addEventListener(egret.TouchEvent.TOUCH_TAP, this.resets, this);
        this.next.addEventListener(egret.TouchEvent.TOUCH_TAP, this.nexts, this);
        window.addEventListener("deviceorientation", this.deviceorientation, true);
        this.intval = egret.setInterval(function () {
            _this.$children.forEach(function (v) {
                if (v['body'] && (v.x < -1 || v.x > _this.width || v.y < -1 || v.y > _this.height)) {
                    console.log('BUG', v);
                    _this.destroyPaoPao(v);
                    _this.bugNum++;
                }
            });
        }, this, 1000);
    };
    Ball.prototype.deviceorientation = function (event) {
        var x = Number((Math.log(Math.abs(event.beta)) / 5).toFixed(2));
        var y = Number((Math.log(Math.abs(event.gamma)) / 5).toFixed(2));
        if (event.beta < 0)
            x *= -1;
        if (event.gamma < 0)
            y *= -1;
        this.engine.world.gravity.x = y;
        this.engine.world.gravity.y = x;
        // this.tips.text = `bug穿透数:${this.bugNum} x:${this.engine.world.gravity.x} y:${this.engine.world.gravity.y}`
        // console.log('devicemotion', event)
        // 处理event.alpha z、event.beta x及event.gamma y旋转角度
    };
    Ball.prototype.removeEvents = function () {
        this.bronBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.tapBtn, this);
        egret.clearInterval(this.intval);
        window.removeEventListener("deviceorientation", this.deviceorientation, true);
    };
    Ball.prototype.tapBtn = function () {
        this.SkillPoints_index++;
        if (this.SkillPoints_index === this.SkillPoints.length) {
            this.bronBtn.visible = false;
            this.tips.text = tips.b;
            this.cannnonRotate.stop();
        }
        this.punchPaoPao(this.LastPaoPao);
        if (this.SkillPoints_index <= this.SkillPoints.length - 1)
            this.createPaoPao();
    };
    Ball.prototype.createPaoPao = function () {
        var r = 30;
        var container = new egret.DisplayObjectContainer();
        //生成泡泡背景
        var paopao = this.createBitmapByName("ball_" + RandomNumBoth_Int(1, 6) + "_png");
        container.width = container.height = paopao.width = paopao.height = r * 2;
        paopao.anchorOffsetX = paopao.anchorOffsetY = r;
        container.addChild(paopao);
        //生成文字
        var label = new egret.TextField();
        label.text = this.SkillPoints[this.SkillPoints_index];
        label.anchorOffsetX = label.anchorOffsetY = r;
        label.width = label.height = r * 2;
        label.textColor = 0x000000;
        label.fontFamily = "Impact";
        label.textAlign = egret.HorizontalAlign.CENTER;
        label.verticalAlign = egret.VerticalAlign.MIDDLE;
        label.size = r * 2 / 4;
        container.name = this.SkillPoints[this.SkillPoints_index];
        container.addChild(label);
        var circle = Matter.Bodies.circle(this.cannon.x, this.cannon.y, r, {
            egretSprite: container,
            container: this,
            friction: .2,
            isSleeping: true,
            restitution: 0.4 //弹性：0不弹，越大越弹
        }, 20);
        Matter.World.add(this.engine.world, circle);
        container['body'] = circle;
        this.LastPaoPao = container;
        return container;
    };
    Ball.prototype.punchPaoPao = function (container) {
        var circle = container['body'];
        circle.isSleeping = false;
        Matter.Body.applyForce(circle, circle.position, {
            x: RandomNumBoth(-0.2, 0.2), y: RandomNumBoth(0, 0.5)
        });
        RES.getRes('wind_mp3').play(0, 1);
        container.touchEnabled = true;
        container.addEventListener(egret.TouchEvent.TOUCH_TAP, this.boomPaoPao, this);
    };
    Ball.prototype.boomPaoPao = function (e) {
        console.log('e', e.target.name);
        RES.getRes('balloon_mp3').play(0, 1);
        this.destroyPaoPao(e.target);
    };
    Ball.prototype.destroyPaoPao = function (target) {
        target.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.boomPaoPao, this);
        target.parent.removeChild(target);
        Matter.World.remove(this.engine.world, target.body, null);
        this.SkillPoints_count--;
        this.wins();
    };
    Ball.prototype.moveRobot = function (e) {
        var _this = this;
        if (this.robot.isPlaying) {
            egret.Tween.removeTweens(this.robot);
        }
        else {
            this.robot.gotoAndPlay(this.robot.currentFrame, -1);
        }
        egret.Tween.get(this.robot, {
            loop: false,
            onChangeObj: this //更新函数作用域
        })
            .to({ x: e.stageX, y: e.stageY }, distance(this.robot.x, e.stageX, this.robot.y, e.stageY) * 7)
            .call(function () {
            _this.robot.stop();
        }, this, []); //设置回调函数及作用域，可用于侦听动画完成
    };
    Ball.prototype.start = function () {
        this.SkillPoints_index = 0;
        this.SkillPoints_count = this.SkillPoints.length;
        this.tips.text = tips.a;
        this.createPaoPao();
    };
    Ball.prototype.wins = function () {
        var _this = this;
        if (this.SkillPoints_count === 0) {
            this.win.play();
            setTimeout(function () {
                RES.getRes('boom_mp3').play(0, 1);
                _this.tips.text = tips.end;
                _this.reset.visible = true;
                _this.next.visible = true;
            }, 3000);
        }
    };
    Ball.prototype.resets = function () {
        //重置动画
        this.win.play(0);
        this.win.stop();
        playAnimations(this.cannnonRotate, true);
        this.start();
        this.bronBtn.visible = true;
        this.reset.visible = false;
        this.next.visible = false;
    };
    Ball.prototype.nexts = function () {
        this.removeEvents();
        Ball._parent.removeChild(this);
        Ball._parent.next();
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
}(eui.Component));
__reflect(Ball.prototype, "Ball");
function RandomNumBoth(Min, Max) {
    var Range = Max - Min;
    var Rand = Math.random();
    var num = Min + Rand * Range;
    return num;
}
function RandomNumBoth_Int(Min, Max) {
    var Range = Max - Min;
    var Rand = Math.random();
    var num = Min + Math.round(Rand * Range); //四舍五入
    return num;
}
function playAnimations(target, isLoop) {
    if (isLoop) {
        for (var key in target.items) {
            target.items[key].props = { loop: true };
        }
    }
    target.play();
}
function distance(x1, x2, y1, y2) {
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
    return Math.pow((calX * calX + calY * calY), 0.5);
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
