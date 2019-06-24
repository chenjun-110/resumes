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
    end: '恭喜你,游戏结束',
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
        _this.Points = [];
        _this.drawPoints = [];
        _this.bugNum = 0; //bug穿透数
        console.log('map constructor', _this);
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
        playAnimation(this.cannnonRotate, true);
    };
    Ball.prototype.init = function () {
        var _this = this;
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
        console.log('容器', Matter.Bodies, this.lefts.height);
        var group = Matter.Body.nextGroup(false);
        Matter.World.add(engine.world, [
            Matter.Bodies.rectangle(this.tops.x, this.tops.y, this.tops.width, this.tops.height, { isStatic: true, friction: .2, container: this, egretSprite: this.tops }),
            Matter.Bodies.rectangle(this.bottoms.x, this.bottoms.y, this.bottoms.width, this.bottoms.height, {
                isStatic: true,
                friction: 0,
                container: this,
                egretSprite: this.bottoms,
                collisionFilter: {
                    category: 0x0004,
                    // mask:0x0004,
                    group: 1
                }
            }),
            Matter.Bodies.rectangle(this.lefts.x, this.lefts.y, this.lefts.width, this.lefts.height, { isStatic: true, friction: .2, container: this, egretSprite: this.lefts }),
            Matter.Bodies.rectangle(this.rights.x, this.rights.y, this.rights.width, this.rights.height, { isStatic: true, friction: .2, container: this, egretSprite: this.rights }),
        ]);
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
            var parentA = pairs[0].bodyA.parent;
            var parentB = pairs[0].bodyB.parent;
            _this.checkCrashBug(parentB, pairs);
            _this.checkCrashBug(parentA, pairs);
            if (parentA.label === 'linebox' && parentA.isStatic) {
                // debugger;
                // parentA.isStatic = false
                // Matter.Body.setStatic(parentA, false)
                // parentA.mass=1
                // parentA.inverseMass = 1
                // parentA.angle = 0
                console.log('激活');
            }
        });
        this.tips.text = tips.a;
        this.createPaoPao();
        this.addEvents();
        this.SkillPoints_count = this.SkillPoints.length;
    };
    Ball.prototype.checkCrashBug = function (parent, pairs) {
        if (parent.label === 'linebox' && pairs.length > 10) {
            Matter.Body.setStatic(parent, true);
            console.log('多重触发 静态');
        }
        else if (parent.label === 'linebox' && !parent.isStatic) {
            if (parent.nowtime) {
                parent.times++;
                var timedif = (Date.now() - parent.nowtime) / 1000;
                if (timedif > 2 && parent.times > 5) {
                    Matter.Body.setStatic(parent, true);
                    delete parent.times;
                    delete parent.nowtime;
                    console.log('碰撞次数超限 静态');
                }
            }
            else {
                parent.nowtime = Date.now();
                parent.times = 1;
            }
        }
    };
    Ball.prototype.addEvents = function () {
        var _this = this;
        this.bronBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.tapBtn, this);
        this.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.drawLineStart, this);
        this.addEventListener(egret.TouchEvent.TOUCH_MOVE, this.drawLineMove, this);
        this.addEventListener(egret.TouchEvent.TOUCH_END, this.drawLineEnd, this);
        // window.addEventListener("devicemotion", (event) => {
        //     // 处理event.alpha、event.beta及event.gamma
        // }, true);
        window.addEventListener("deviceorientation", function (event) {
            var x = Number((Math.log(Math.abs(event.beta)) / 5).toFixed(2));
            var y = Number((Math.log(Math.abs(event.gamma)) / 5).toFixed(2));
            if (event.beta < 0)
                x *= -1;
            if (event.gamma < 0)
                y *= -1;
            _this.engine.world.gravity.x = y;
            _this.engine.world.gravity.y = x;
            _this.tips.text = "bug\u7A7F\u900F\u6570:" + _this.bugNum + " x:" + _this.engine.world.gravity.x + " y:" + _this.engine.world.gravity.y;
            console.log('devicemotion', event);
            // 处理event.alpha z、event.beta x及event.gamma y旋转角度
        }, true);
        egret.setInterval(function () {
            _this.$children.forEach(function (v) {
                if (v['body'] && (v.x < -1 || v.x > _this.width || v.y < -1 || v.y > _this.height)) {
                    console.log('BUG', v);
                    _this.destroyPaoPao(v);
                    _this.bugNum++;
                }
            });
        }, this, 1000);
    };
    Ball.prototype.drawLineStart = function (e) {
        console.log(e.stageX, e.stageY);
        this.startPoint = {
            x: e.stageX,
            y: e.stageY
        };
        this.Points.push(this.startPoint);
        this.drawPoints = [];
    };
    Ball.prototype.drawLineMove = function (e) {
        //(y-y2)/(y1-y2) = (x-x2)/(x1-x2)
        console.log(this.Points.length);
        var P = {
            x: e.stageX,
            y: e.stageY
        };
        if (this.Points.length >= 5) {
            var y = this.Points[Math.floor(this.Points.length / 2)].y;
            var x = this.Points[Math.floor(this.Points.length / 2)].x;
            var y1 = this.startPoint.y;
            var x1 = this.startPoint.x;
            var y2 = P.y;
            var x2 = P.x;
            if ((y - y2) / (y1 - y2) === (x - x2) / (x1 - x2)) {
                console.log('是直线');
            }
            else {
                this.drawPoints.push([this.startPoint, P]);
                this.Points = [];
                this.startPoint = P;
                this.Points.push(this.startPoint);
            }
        }
        this.Points.push(P);
    };
    Ball.prototype.drawLineEnd = function (e) {
        var _this = this;
        console.log(this.drawPoints);
        var lines = [];
        var group = Matter.Body.nextGroup(true);
        this.drawPoints.forEach(function (arr, i, all) {
            var dx = Math.abs(arr[0].x - arr[1].x);
            var dy = Math.abs(arr[0].y - arr[1].y);
            var dis = Math.sqrt(Math.pow(dx, 2) + Math.pow(dy, 2)); //两点间距离-作宽
            var next = all[i + 1];
            if (!next)
                return;
            var P1 = arr[0];
            var P2 = {
                x: arr[1].x,
                y: arr[1].y
            };
            // 仅根据起点和终点画出带方向的矩形
            var k = (P2.y - P1.y) / (P2.x - P1.x);
            var angle = Math.atan2((P2.y - P1.y), (P2.x - P1.x)); // 直线和x轴的弧度
            var line = Matter.Bodies.rectangle(arr[0].x, arr[0].y, dis, 10, {
                // friction: .2, 
                angle: angle,
                container: _this,
                slop: 0,
                restitution: 0,
                collisionFilter: {
                    group: group,
                },
                // isSensor:false,
                label: 'line',
                friction: 0,
                frictionAir: 0,
                frictionStatic: 0,
            });
            line.P = arr;
            line.dis = dis;
            lines.push(line);
        });
        if (lines.length == 0)
            return;
        console.log('group', group);
        // lines[0].isStatic = false
        // lines[lines.length-1].isStatic = false
        // const cs = []
        // var chains=Matter.Composites.stack(50,50,10,1,9,0,(x, y)=>{
        //     return Matter.Bodies.rectangle(x,y,20,30,{
        //         chamfer:15,
        //         container:this
        //     })
        // });
        var b1 = Matter.Body.create({
            parts: lines,
            container: this,
            slop: 0,
            restitution: 0,
            label: 'linebox',
            // isStatic:true,
            collisionFilter: {}
        });
        // Matter.Composites.chain(chains, 0.5, 0, -0.5, 0, { stiffness: 0.9 });
        // Matter.Body.create(b1, chains.bodies, true)
        // cs.push(b1)
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
        // var group = Matter.Body.nextGroup(true);
        // var bridge = Matter.Composites.stack(50,100,6,1,0,0, (x, y) => {
        //     return Matter.Bodies.rectangle(x, y, 50, 20, {
        //             container:this
        //     });
        // });
        // let composite = {
        //     bodies:[],
        //     constraints:[]
        // }
        Matter.World.add(this.engine.world, b1);
        console.log(lines);
    };
    Ball.prototype.removeEvents = function () {
        this.bronBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.tapBtn, this);
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
        if (this.SkillPoints_count === 0) {
            this.win.play();
            setTimeout(function () { return RES.getRes('boom_mp3').play(0, 1); }, 3000);
            this.tips.text = tips.end;
        }
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
function playAnimation(target, isLoop) {
    if (isLoop) {
        for (var key in target.items) {
            target.items[key].props = { loop: true };
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
