var tip1 = `应聘岗位：前端工程师    到岗时间：一周内  
基本信息：男 27岁 统招大专  5年工作经验  籍贯湖北荆州 
手机/微信：15874137662  邮箱：357201017@qq.com  湖南工程职业学院      2011.9-2014.7 大专      工程造价 
 湖南岳阳市第四中学       2008.9-2011.7  高中      理科  深圳姝承教育公司    2018.06-2019.07 Web前端 
 工作内容：小程序和移动端网页 

 湖南健盟网络科技   2017.08-2018.06  Web前端 
 工作内容：微信公众号和小程序 

 湖南联晶网络科技  2016.01-2017.07   Web前端 
 工作内容：开发网站 

 湖南后景网络科技   2015.02-2015.12  H5游戏前端 
 工作内容：用H5白鹭框架做微信端Canvas游戏`
class Stairs extends eui.Component {
    public name = 'Stairs'
    private static _instance: Stairs = null;
    static _parent: Main = null;
    public static getInstance(parent): Stairs {
        if (this._instance === null) {
            this._instance = new Stairs();
            this._parent = parent;
        }
        return Stairs._instance;
    }
    public constructor() {
        super();
        this.addEventListener(eui.UIEvent.CREATION_COMPLETE,this.init,this)
        this.skinName = "StairsSkin";
        this.tips = tip1.split(" ").filter(v => v.length)
        this.height = (this.tips.length+1)*300
        this.map.height = this.tips.length*300
    }
    tips:Array<string>
    robot:egret.MovieClip
    robot_phy
    engine
    g1
    tops:eui.Rect;
    bottoms: eui.Rect;
    lefts:eui.Rect;
    rights:eui.Rect;
    map:eui.Image
    next:eui.Button;
    reset:eui.Button;
    statusGame:string = 'game' // game fail success
    grounds = []
    init(){
        this.addEvents()
        this.physics()
        this.loadGround()
        this.loadRobot()
        
    }
    addEvents(){
        // this.bronBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.tapBtn, this)
        this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.moveRobot, this)
        this.reset.addEventListener(egret.TouchEvent.TOUCH_TAP, this.resets, this)
        // this.next.addEventListener(egret.TouchEvent.TOUCH_TAP, this.nexts, this)
    }
    loadGround () {
        this.tips.forEach((v, i) => {
            const ground = new eui.Button()
            ground.label = v.replace(/[\r\n]/g,"")
            ground.width = v.length * 25 < 150 ? v.length * 25 : 150
            ground.height = 70
            ground.maxWidth = 300
            ground.minWidth = 100
            ground.maxHeight = 100
            ground.minHeight = 40
            ground.anchorOffsetX = ground.width/2
            ground.anchorOffsetY = ground.height/2
            ground.x = RandomNumBoth_Int(ground.width/2, this.width-ground.width/2)
            ground.y = (i+1) * 300
            const g1 = Matter.Bodies.rectangle(ground.x, ground.y, ground.width, ground.height, {
                isStatic: true, 
                friction: .2, 
                container:this,
                restitution:0.1,
                label: i > 0 ? 'ground Body' : 'ground', 
                egretSprite:ground 
            })
            this.grounds.push(g1)
            Matter.World.add(this.engine.world, [g1])
        })
        this.bottoms.y = this.lefts.height = this.rights.height = this.height
        this.lefts.anchorOffsetY = this.rights.anchorOffsetY = this.lefts.y = this.rights.y = this.height/2
        const leftWall =  Matter.Bodies.rectangle(this.lefts.x, this.lefts.y, this.lefts.width, this.lefts.height, { isStatic: true, friction: .2, container:this, egretSprite:this.lefts  })
        const rightWall = Matter.Bodies.rectangle(this.rights.x, this.rights.y, this.rights.width, this.rights.height, { isStatic: true, friction: .2, container:this, egretSprite:this.rights})
        Matter.World.add(this.engine.world, [
            Matter.Bodies.rectangle(this.tops.x, this.tops.y, this.tops.width, this.tops.height, { isStatic: true, friction: .2, container:this, egretSprite:this.tops}),
            Matter.Bodies.rectangle(this.bottoms.x, this.bottoms.y, this.bottoms.width, this.bottoms.height, { 
                isStatic: true, 
                friction: 0, 
                container:this, 
                egretSprite:this.bottoms,
                label:'bottom',
                collisionFilter: {
                    group:1
                }
            }),
            leftWall, rightWall
        ]);
    }
    loadRobot () {
        var data = RES.getRes("robot_json");
        var png = RES.getRes("robot_png");
        var mcFactory:egret.MovieClipDataFactory = new egret.MovieClipDataFactory( data, png );
        var robot = this.robot = new egret.MovieClip( mcFactory.generateMovieClipData( "walk" ) );
        robot.frameRate = 42
        robot.scaleX = robot.scaleY = 0.2
        robot.width = robot.height = 100
        robot.anchorOffsetX = 160
        robot.anchorOffsetY = 180
        robot.x = 150
        robot.y = 150
        this.addChild( robot );
        const robot_phy = this.robot_phy = Matter.Bodies.circle(this.robot.x, this.robot.y+10, this.robot.width*3/6, { 
            // isStatic: true, 
            friction: .3, container:this, 
            restitution:0.1,
            // egretSprite:this.robot  
        }, 20)
        Matter.World.add(this.engine.world, [robot_phy])
        this.addEventListener(egret.Event.ENTER_FRAME, () => {
            // shp.rotation = (linebox.angle) * 180 / Math.PI ;
            robot.x = robot_phy.position.x;
            robot.y = robot_phy.position.y;
            //机器人停止走动
            if ((robot_phy.velocity.x < 0.001 && robot_phy.velocity.x > 0) || (robot_phy.velocity.x > -0.001 && robot_phy.velocity.x < 0)) { 
                this.robot.stop()
            }
            if (this.statusGame != 'game') return
            if (robot.y > (-this.y + Stairs._parent.height + this.robot.height/2)) {
                console.log('出界')
                this.fail()
            }
        }, this)
        // setTimeout(()=> {
        //     Matter.Body.setPosition(robot_phy, {x:10,y:0})
        // },3000)
    }
    moveRobot (e) {
        if (this.statusGame != 'game') return
        console.log(e)
        let vx,vy
        this.robot.gotoAndPlay( this.robot.currentFrame ,-1);
        if (e.stageX > this.robot.x) {
            this.robot.scaleX = Math.abs(this.robot.scaleX)
            vx = 0.05
        } else {
            this.robot.scaleX = Math.abs(this.robot.scaleX)*-1
            vx = -0.05
        }
        vy = (e.stageY-this.y+this.robot.height/2 < this.robot.y) ? -0.1 : 0
        // Matter.Body.setVelocity(this.robot_phy, {x: vx, y: -10})
        console.log(vx, vy, this.robot_phy.velocity.y)
        if (this.robot_phy.velocity.y < -1) vy = 0
        Matter.Body.applyForce(this.robot_phy, this.robot_phy.position, {
            x: vx,y: vy
        })
    }
    physics () {
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
        engine.world.gravity.y = 0.4;

        Matter.Events.on(engine, 'collisionStart', (event) => {
            if (this.statusGame != 'game') return
            var pairs = event.pairs;
            for (var i = 0; i < pairs.length; i++) {
                var pair = pairs[i];
                    console.log('kk:', pair)
                //pair.bodyA pair.bodyB是碰撞双方
                if (pair.bodyB.label === "ground Body") {
                    pair.bodyB.label = "ground end"
                    egret.Tween.get(this, {
                        loop: false,//设置循环播放
                        onChangeObj: this//更新函数作用域
                    })
                    .to({y: this.y-300}, 500)
                    .call(()=>{
                        // this.robot.stop()
                    }, this, []);
                } else if (pair.bodyA.label === "ground Body") {
                    pair.bodyA.label = "Rectangle end"
                    egret.Tween.get(this, {
                        loop: false,//设置循环播放
                        onChangeObj: this//更新函数作用域
                    })
                    .to({y: this.y-300}, 1000)
                    .call(()=>{
                        // this.robot.stop()
                    }, this, []);
                } else if (pair.bodyA.label === 'bottom' || pair.bodyB.label === 'bottom') {
                    this.success()
                }
            }
        }) 
    }
    fail () {
        this.statusGame = 'fail'
        this.reset.visible = true
        this.reset.y = -this.y + Stairs._parent.height/2
        this.reset.x = this.width/2 
        // Matter.World.remove(this.engine.world, this.robot_phy, null);
        this.robot.stop()
        this.addChild(this.reset)
    }
    success () {
        this.statusGame = 'success'
        RES.getRes('wind_mp3').play(0, 1)
        Matter.World.remove(this.engine.world, this.robot_phy, null);
        egret.Tween.get(this.robot, {
            loop: false,//设置循环播放
            onChangeObj: this//更新函数作用域
        })
        .to({y: 50}, 5000)
        .call(()=>{
            // this.robot.stop()
        }, this, []);
        egret.Tween.get(this, {
            loop: false,//设置循环播放
            onChangeObj: this//更新函数作用域
        })
        .to({y: 0}, 5000)
    }
    resets () {
        egret.Tween.get(this, {
            loop: false,//设置循环播放
            onChangeObj: this//更新函数作用域
        })
        .to({y: 0}, -this.y)
        .call(()=>{
            Matter.Body.setPosition(this.robot_phy, {x:150,y:150})
            Matter.Body.setVelocity(this.robot_phy, {x: 0, y: 0})
            this.reset.visible = false
            this.statusGame = 'game'
            this.grounds.forEach((v,i) => {
                v.label = i>0? 'ground Body' : 'ground'
            })
        }, this, []);
    }
}


