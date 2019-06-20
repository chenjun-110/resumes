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
var asd = (function (_super) {
    __extends(asd, _super);
    function asd() {
        var _this = _super.call(this) || this;
        _this.LineArr = [];
        _this.addEventListener(egret.Event.ADDED_TO_STAGE, _this.onAddToStage, _this);
        console.log('水果刀');
        return _this;
    }
    asd.prototype.onAddToStage = function (event) {
        // var bg = this.createBitmapByName("bg");
        // this.addChild(bg);
        this.stage.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onStageTouch, this);
        this.stage.addEventListener(egret.TouchEvent.TOUCH_MOVE, throttle(this.onStageTouch, 100), this);
        this.stage.addEventListener(egret.TouchEvent.TOUCH_END, this.onStageTouch, this);
        this.addEventListener(egret.Event.ENTER_FRAME, this.clean, this);
    };
    asd.prototype.dis = function (x1, x2, y1, y2) {
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
    };
    asd.prototype.createLine = function (x, y) {
        var effect = this.createBitmapByName("paopao_png");
        effect['type'] = 0;
        effect.width = 130;
        effect.height = 130;
        effect.x = x;
        effect.y = y;
        effect.scaleX = 0.2;
        effect.scaleY = 0.2;
        effect.anchorOffsetX = effect.width / 2;
        effect.anchorOffsetY = effect.height / 2;
        this.addChild(effect);
        this.LineArr.push(effect);
    };
    asd.prototype.onStageTouch = function (evt) {
        if (evt.type == "touchBegin") {
        }
        else if (evt.type == "touchMove") {
            // if(this.LineArr.length>0)
            // {
            //     var x1 = this.LineArr[this.LineArr.length-1].x;
            //     var y1 = this.LineArr[this.LineArr.length-1].y;
            //     var x2 = evt.stageX;
            //     var y2 = evt.stageY;
            //     var dis = this.dis(x1,x2,y1,y2);
            //     if(dis>5)
            //     {
            //         // var point1X = (x1+x2)/2;
            //         // var point1Y = (y1+y2)/2;
            //         // var point2X = (x1+point1X)/2;
            //         // var point2Y = (y1+point1Y)/2;
            //         // var point3X = (point2X+x2)/2;
            //         // var point3Y = (point2Y+y2)/2;
            //         // var center1X = (x1+point2X)/2;
            //         // var center1Y = (y1+point2Y)/2;
            //         // var center2X = (point2X+point1X)/2;
            //         // var center2Y = (point2Y+point1Y)/2;
            //         // var center3X = (point1X+point3X)/2;
            //         // var center3Y = (point1Y+point3Y)/2;
            //         // var center4X = (point3X+x2)/2;
            //         // var center4Y = (point3Y+y2)/2;
            //         // this.createLine(center1X,center1Y);
            //         // this.createLine(point2X,point2Y);
            //         // this.createLine(center2X,center2Y);
            //         // this.createLine(point1X,point1Y);
            //         // this.createLine(center3X,center3Y);
            //         // this.createLine(point3X,point3Y);
            //         // this.createLine(center4X,center4Y);
            //     }
            // }
            this.createLine(evt.stageX, evt.stageY);
        }
        else if (evt.type == "touchEnd") {
        }
    };
    asd.prototype.clean = function () {
        if (this.LineArr.length > 0) {
            console.log(this.LineArr.length);
            for (var a = 0; a < this.LineArr.length; a++) {
                if (this.LineArr[a].scaleX < 0.6 && this.LineArr[a]['type'] == 0) {
                    this.LineArr[a].scaleX = this.LineArr[a].scaleX + 0.02;
                    this.LineArr[a].scaleY = this.LineArr[a].scaleY + 0.02;
                }
                else {
                    this.LineArr[a]['type'] = 1;
                    this.LineArr[a].scaleX = this.LineArr[a].scaleX - 0.01;
                    this.LineArr[a].scaleY = this.LineArr[a].scaleY - 0.01;
                    if (this.LineArr[a].scaleX <= 0) {
                        this.removeChild(this.LineArr[a]);
                        this.LineArr.splice(a, 1);
                        a--;
                    }
                }
            }
        }
    };
    asd.prototype.createBitmapByName = function (name) {
        var result = new egret.Bitmap();
        var texture = RES.getRes(name);
        result.texture = texture;
        return result;
    };
    return asd;
}(egret.DisplayObjectContainer));
__reflect(asd.prototype, "asd");
//其中 bg是背景图片 effect 是圆形图片
//实现原理 移动时候创建圆形bitmap 讨巧的做法
//效果图如下
function throttle(fn, interval) {
    var __self = fn, // 保存需要被延迟执行的函数引用
    timer, // 定时器
    firstTime = true; // 是否是第一次调用
    return function () {
        var args = arguments, __me = this;
        if (firstTime) {
            __self.apply(__me, args);
            return firstTime = false;
        }
        if (timer) {
            return false;
        }
        timer = setTimeout(function () {
            clearTimeout(timer);
            timer = null;
            __self.apply(__me, args);
        }, interval || 500);
    };
}
;
