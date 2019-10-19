window.skins=window.skins||{};
                function __extends(d, b) {
                    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
                        function __() {
                            this.constructor = d;
                        }
                    __.prototype = b.prototype;
                    d.prototype = new __();
                };
                window.generateEUI = {};
                generateEUI.paths = {};
                generateEUI.styles = undefined;
                generateEUI.skins = {"eui.Button":"resource/eui_skins/ButtonSkin.exml","eui.CheckBox":"resource/eui_skins/CheckBoxSkin.exml","eui.HScrollBar":"resource/eui_skins/HScrollBarSkin.exml","eui.HSlider":"resource/eui_skins/HSliderSkin.exml","eui.Panel":"resource/eui_skins/PanelSkin.exml","eui.TextInput":"resource/eui_skins/TextInputSkin.exml","eui.ProgressBar":"resource/eui_skins/ProgressBarSkin.exml","eui.RadioButton":"resource/eui_skins/RadioButtonSkin.exml","eui.Scroller":"resource/eui_skins/ScrollerSkin.exml","eui.ToggleSwitch":"resource/eui_skins/ToggleSwitchSkin.exml","eui.VScrollBar":"resource/eui_skins/VScrollBarSkin.exml","eui.VSlider":"resource/eui_skins/VSliderSkin.exml","eui.ItemRenderer":"resource/eui_skins/ItemRendererSkin.exml"};generateEUI.paths['resource/eui_skins/BallSkin.exml'] = window.BallSkin = (function (_super) {
	__extends(BallSkin, _super);
	function BallSkin() {
		_super.call(this);
		this.skinParts = ["cannnonRotate","win","bronBtn","next","reset","bottoms","tops","lefts","rights","tiger","cannon","tips"];
		
		this.height = 667;
		this.width = 375;
		this.cannnonRotate_i();
		this.win_i();
		this.elementsContent = [this._Rect1_i(),this.bronBtn_i(),this.next_i(),this.reset_i(),this.bottoms_i(),this.tops_i(),this.lefts_i(),this.rights_i(),this.cannon_i(),this.tips_i()];
		
		eui.Binding.$bindProperties(this, ["cannon"],[0],this._TweenItem1,"target");
		eui.Binding.$bindProperties(this, [0],[],this._Object1,"rotation");
		eui.Binding.$bindProperties(this, [360],[],this._Object2,"rotation");
		eui.Binding.$bindProperties(this, ["cannon"],[0],this._TweenItem2,"target");
		eui.Binding.$bindProperties(this, [1440],[],this._Object3,"rotation");
		eui.Binding.$bindProperties(this, [2],[],this._Object3,"scaleX");
		eui.Binding.$bindProperties(this, [2],[],this._Object3,"scaleY");
		eui.Binding.$bindProperties(this, [329.51],[],this._Object3,"y");
		eui.Binding.$bindProperties(this, ["tiger"],[0],this._TweenItem3,"target");
		eui.Binding.$bindProperties(this, [1],[],this._Object4,"alpha");
	}
	var _proto = BallSkin.prototype;

	_proto.cannnonRotate_i = function () {
		var t = new egret.tween.TweenGroup();
		this.cannnonRotate = t;
		t.items = [this._TweenItem1_i()];
		return t;
	};
	_proto._TweenItem1_i = function () {
		var t = new egret.tween.TweenItem();
		this._TweenItem1 = t;
		t.paths = [this._Set1_i(),this._To1_i()];
		return t;
	};
	_proto._Set1_i = function () {
		var t = new egret.tween.Set();
		t.props = this._Object1_i();
		return t;
	};
	_proto._Object1_i = function () {
		var t = {};
		this._Object1 = t;
		return t;
	};
	_proto._To1_i = function () {
		var t = new egret.tween.To();
		t.duration = 3000;
		t.props = this._Object2_i();
		return t;
	};
	_proto._Object2_i = function () {
		var t = {};
		this._Object2 = t;
		return t;
	};
	_proto.win_i = function () {
		var t = new egret.tween.TweenGroup();
		this.win = t;
		t.items = [this._TweenItem2_i(),this._TweenItem3_i()];
		return t;
	};
	_proto._TweenItem2_i = function () {
		var t = new egret.tween.TweenItem();
		this._TweenItem2 = t;
		t.paths = [this._Set2_i(),this._To2_i()];
		return t;
	};
	_proto._Set2_i = function () {
		var t = new egret.tween.Set();
		return t;
	};
	_proto._To2_i = function () {
		var t = new egret.tween.To();
		t.duration = 2000;
		t.ease = "cubicIn";
		t.props = this._Object3_i();
		return t;
	};
	_proto._Object3_i = function () {
		var t = {};
		this._Object3 = t;
		return t;
	};
	_proto._TweenItem3_i = function () {
		var t = new egret.tween.TweenItem();
		this._TweenItem3 = t;
		t.paths = [this._Wait1_i(),this._Set3_i(),this._To3_i()];
		return t;
	};
	_proto._Wait1_i = function () {
		var t = new egret.tween.Wait();
		t.duration = 2000;
		return t;
	};
	_proto._Set3_i = function () {
		var t = new egret.tween.Set();
		return t;
	};
	_proto._To3_i = function () {
		var t = new egret.tween.To();
		t.duration = 2000;
		t.ease = "sineOut";
		t.props = this._Object4_i();
		return t;
	};
	_proto._Object4_i = function () {
		var t = {};
		this._Object4 = t;
		return t;
	};
	_proto._Rect1_i = function () {
		var t = new eui.Rect();
		t.anchorOffsetX = 187.5;
		t.anchorOffsetY = 333.5;
		t.fillColor = 0xff90f2ff;
		t.percentHeight = 100;
		t.percentWidth = 100;
		t.x = 187.5;
		t.y = 333.5;
		return t;
	};
	_proto.bronBtn_i = function () {
		var t = new eui.Button();
		this.bronBtn = t;
		t.anchorOffsetX = 40;
		t.anchorOffsetY = 40;
		t.height = 80;
		t.label = "点我";
		t.width = 80;
		t.x = 187.5;
		t.y = 54.29;
		return t;
	};
	_proto.next_i = function () {
		var t = new eui.Button();
		this.next = t;
		t.anchorOffsetX = 46.5;
		t.anchorOffsetY = 40;
		t.height = 80;
		t.label = "下一关";
		t.visible = false;
		t.width = 93;
		t.x = 122;
		t.y = 490.5;
		return t;
	};
	_proto.reset_i = function () {
		var t = new eui.Button();
		this.reset = t;
		t.anchorOffsetX = 52;
		t.anchorOffsetY = 40;
		t.height = 80;
		t.label = "重玩此关";
		t.visible = false;
		t.width = 98;
		t.x = 262.5;
		t.y = 490.5;
		return t;
	};
	_proto.bottoms_i = function () {
		var t = new eui.Rect();
		this.bottoms = t;
		t.anchorOffsetX = 187.5;
		t.anchorOffsetY = 10;
		t.fillColor = 0xff7098da;
		t.height = 20;
		t.width = 375;
		t.x = 187.5;
		t.y = 675;
		return t;
	};
	_proto.tops_i = function () {
		var t = new eui.Rect();
		this.tops = t;
		t.anchorOffsetX = 187.5;
		t.anchorOffsetY = 10;
		t.fillColor = 0xFF7098DA;
		t.height = 20;
		t.width = 375;
		t.x = 187.46;
		t.y = -9;
		return t;
	};
	_proto.lefts_i = function () {
		var t = new eui.Rect();
		this.lefts = t;
		t.anchorOffsetX = 10;
		t.anchorOffsetY = 333.5;
		t.fillColor = 0xff7098da;
		t.height = 667;
		t.width = 20;
		t.x = -8;
		t.y = 333.5;
		return t;
	};
	_proto.rights_i = function () {
		var t = new eui.Rect();
		this.rights = t;
		t.anchorOffsetX = 10;
		t.anchorOffsetY = 333.5;
		t.fillColor = 0xff7098da;
		t.height = 667;
		t.width = 20;
		t.x = 384;
		t.y = 333.5;
		return t;
	};
	_proto.cannon_i = function () {
		var t = new eui.Group();
		this.cannon = t;
		t.anchorOffsetX = 60;
		t.anchorOffsetY = 60;
		t.height = 120;
		t.width = 120;
		t.x = 189.5;
		t.y = 191.53;
		t.elementsContent = [this._Image1_i(),this.tiger_i()];
		return t;
	};
	_proto._Image1_i = function () {
		var t = new eui.Image();
		t.anchorOffsetX = 60;
		t.anchorOffsetY = 60;
		t.height = 120;
		t.scaleX = 1;
		t.scaleY = 1;
		t.source = "circle_png";
		t.width = 120;
		t.x = 60;
		t.y = 60;
		return t;
	};
	_proto.tiger_i = function () {
		var t = new eui.Image();
		this.tiger = t;
		t.alpha = 0;
		t.anchorOffsetX = 45;
		t.anchorOffsetY = 45;
		t.height = 90;
		t.scaleX = 1;
		t.scaleY = 1;
		t.source = "tiger_png";
		t.width = 90;
		t.x = 60.36;
		t.y = 60.66;
		return t;
	};
	_proto.tips_i = function () {
		var t = new eui.Label();
		this.tips = t;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 30;
		t.size = 20;
		t.text = "1";
		t.textAlign = "center";
		t.textColor = 0x598dff;
		t.verticalAlign = "middle";
		t.width = 333.2;
		t.x = 20.8;
		t.y = 97.8;
		return t;
	};
	return BallSkin;
})(eui.Skin);generateEUI.paths['resource/eui_skins/ButtonSkin.exml'] = window.skins.ButtonSkin = (function (_super) {
	__extends(ButtonSkin, _super);
	function ButtonSkin() {
		_super.call(this);
		this.skinParts = ["iconDisplay","labelDisplay"];
		
		this.minHeight = 100;
		this.minWidth = 100;
		this.elementsContent = [this.labelDisplay_i()];
		this._Rect1_i();
		
		this.iconDisplay_i();
		
		this.states = [
			new eui.State ("up",
				[
					new eui.AddItems("_Rect1","",0,"")
				])
			,
			new eui.State ("down",
				[
					new eui.AddItems("iconDisplay","",2,"labelDisplay")
				])
			,
			new eui.State ("disabled",
				[
				])
		];
	}
	var _proto = ButtonSkin.prototype;

	_proto._Rect1_i = function () {
		var t = new eui.Rect();
		this._Rect1 = t;
		t.ellipseHeight = 10;
		t.ellipseWidth = 10;
		t.fillColor = 0x38a6c4;
		t.percentHeight = 100;
		t.percentWidth = 100;
		t.x = 0;
		t.y = 0;
		return t;
	};
	_proto.iconDisplay_i = function () {
		var t = new eui.Rect();
		this.iconDisplay = t;
		t.ellipseHeight = 10;
		t.ellipseWidth = 10;
		t.fillColor = 0x25869e;
		t.percentHeight = 100;
		t.percentWidth = 100;
		t.x = 0;
		t.y = 0;
		return t;
	};
	_proto.labelDisplay_i = function () {
		var t = new eui.Label();
		this.labelDisplay = t;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.bottom = 3;
		t.left = 2;
		t.right = 1;
		t.size = 20;
		t.text = "";
		t.textAlign = "center";
		t.textColor = 0xffe0fcff;
		t.top = 1;
		t.verticalAlign = "middle";
		return t;
	};
	return ButtonSkin;
})(eui.Skin);generateEUI.paths['resource/eui_skins/CheckBoxSkin.exml'] = window.skins.CheckBoxSkin = (function (_super) {
	__extends(CheckBoxSkin, _super);
	function CheckBoxSkin() {
		_super.call(this);
		this.skinParts = ["labelDisplay"];
		
		this.elementsContent = [this._Group1_i()];
		this.states = [
			new eui.State ("up",
				[
				])
			,
			new eui.State ("down",
				[
					new eui.SetProperty("_Image1","alpha",0.7)
				])
			,
			new eui.State ("disabled",
				[
					new eui.SetProperty("_Image1","alpha",0.5)
				])
			,
			new eui.State ("upAndSelected",
				[
					new eui.SetProperty("_Image1","source","checkbox_select_up_png")
				])
			,
			new eui.State ("downAndSelected",
				[
					new eui.SetProperty("_Image1","source","checkbox_select_down_png")
				])
			,
			new eui.State ("disabledAndSelected",
				[
					new eui.SetProperty("_Image1","source","checkbox_select_disabled_png")
				])
		];
	}
	var _proto = CheckBoxSkin.prototype;

	_proto._Group1_i = function () {
		var t = new eui.Group();
		t.percentHeight = 100;
		t.percentWidth = 100;
		t.layout = this._HorizontalLayout1_i();
		t.elementsContent = [this._Image1_i(),this.labelDisplay_i()];
		return t;
	};
	_proto._HorizontalLayout1_i = function () {
		var t = new eui.HorizontalLayout();
		t.verticalAlign = "middle";
		return t;
	};
	_proto._Image1_i = function () {
		var t = new eui.Image();
		this._Image1 = t;
		t.alpha = 1;
		t.fillMode = "scale";
		t.source = "checkbox_unselect_png";
		return t;
	};
	_proto.labelDisplay_i = function () {
		var t = new eui.Label();
		this.labelDisplay = t;
		t.fontFamily = "Tahoma";
		t.size = 20;
		t.textAlign = "center";
		t.textColor = 0x707070;
		t.verticalAlign = "middle";
		return t;
	};
	return CheckBoxSkin;
})(eui.Skin);generateEUI.paths['resource/eui_skins/HScrollBarSkin.exml'] = window.skins.HScrollBarSkin = (function (_super) {
	__extends(HScrollBarSkin, _super);
	function HScrollBarSkin() {
		_super.call(this);
		this.skinParts = ["thumb"];
		
		this.minHeight = 8;
		this.minWidth = 20;
		this.elementsContent = [this.thumb_i()];
	}
	var _proto = HScrollBarSkin.prototype;

	_proto.thumb_i = function () {
		var t = new eui.Image();
		this.thumb = t;
		t.height = 8;
		t.scale9Grid = new egret.Rectangle(3,3,2,2);
		t.source = "roundthumb_png";
		t.verticalCenter = 0;
		t.width = 30;
		return t;
	};
	return HScrollBarSkin;
})(eui.Skin);generateEUI.paths['resource/eui_skins/HSliderSkin.exml'] = window.skins.HSliderSkin = (function (_super) {
	__extends(HSliderSkin, _super);
	function HSliderSkin() {
		_super.call(this);
		this.skinParts = ["track","thumb"];
		
		this.minHeight = 8;
		this.minWidth = 20;
		this.elementsContent = [this.track_i(),this.thumb_i()];
	}
	var _proto = HSliderSkin.prototype;

	_proto.track_i = function () {
		var t = new eui.Image();
		this.track = t;
		t.height = 6;
		t.scale9Grid = new egret.Rectangle(1,1,4,4);
		t.source = "track_sb_png";
		t.verticalCenter = 0;
		t.percentWidth = 100;
		return t;
	};
	_proto.thumb_i = function () {
		var t = new eui.Image();
		this.thumb = t;
		t.source = "thumb_png";
		t.verticalCenter = 0;
		return t;
	};
	return HSliderSkin;
})(eui.Skin);generateEUI.paths['resource/eui_skins/ItemRendererSkin.exml'] = window.skins.ItemRendererSkin = (function (_super) {
	__extends(ItemRendererSkin, _super);
	function ItemRendererSkin() {
		_super.call(this);
		this.skinParts = ["labelDisplay"];
		
		this.minHeight = 50;
		this.minWidth = 100;
		this.elementsContent = [this._Image1_i(),this.labelDisplay_i()];
		this.states = [
			new eui.State ("up",
				[
				])
			,
			new eui.State ("down",
				[
					new eui.SetProperty("_Image1","source","button_down_png")
				])
			,
			new eui.State ("disabled",
				[
					new eui.SetProperty("_Image1","alpha",0.5)
				])
		];
		
		eui.Binding.$bindProperties(this, ["hostComponent.data"],[0],this.labelDisplay,"text");
	}
	var _proto = ItemRendererSkin.prototype;

	_proto._Image1_i = function () {
		var t = new eui.Image();
		this._Image1 = t;
		t.percentHeight = 100;
		t.scale9Grid = new egret.Rectangle(1,3,8,8);
		t.source = "button_up_png";
		t.percentWidth = 100;
		return t;
	};
	_proto.labelDisplay_i = function () {
		var t = new eui.Label();
		this.labelDisplay = t;
		t.bottom = 8;
		t.fontFamily = "Tahoma";
		t.left = 8;
		t.right = 8;
		t.size = 20;
		t.textAlign = "center";
		t.textColor = 0xFFFFFF;
		t.top = 8;
		t.verticalAlign = "middle";
		return t;
	};
	return ItemRendererSkin;
})(eui.Skin);generateEUI.paths['resource/eui_skins/PanelSkin.exml'] = window.skins.PanelSkin = (function (_super) {
	__extends(PanelSkin, _super);
	function PanelSkin() {
		_super.call(this);
		this.skinParts = ["titleDisplay","moveArea","closeButton"];
		
		this.minHeight = 230;
		this.minWidth = 450;
		this.elementsContent = [this._Image1_i(),this.moveArea_i(),this.closeButton_i()];
	}
	var _proto = PanelSkin.prototype;

	_proto._Image1_i = function () {
		var t = new eui.Image();
		t.bottom = 0;
		t.left = 0;
		t.right = 0;
		t.scale9Grid = new egret.Rectangle(2,2,12,12);
		t.source = "border_png";
		t.top = 0;
		return t;
	};
	_proto.moveArea_i = function () {
		var t = new eui.Group();
		this.moveArea = t;
		t.height = 45;
		t.left = 0;
		t.right = 0;
		t.top = 0;
		t.elementsContent = [this._Image2_i(),this.titleDisplay_i()];
		return t;
	};
	_proto._Image2_i = function () {
		var t = new eui.Image();
		t.bottom = 0;
		t.left = 0;
		t.right = 0;
		t.source = "header_png";
		t.top = 0;
		return t;
	};
	_proto.titleDisplay_i = function () {
		var t = new eui.Label();
		this.titleDisplay = t;
		t.fontFamily = "Tahoma";
		t.left = 15;
		t.right = 5;
		t.size = 20;
		t.textColor = 0xFFFFFF;
		t.verticalCenter = 0;
		t.wordWrap = false;
		return t;
	};
	_proto.closeButton_i = function () {
		var t = new eui.Button();
		this.closeButton = t;
		t.bottom = 5;
		t.horizontalCenter = 0;
		t.label = "close";
		return t;
	};
	return PanelSkin;
})(eui.Skin);generateEUI.paths['resource/eui_skins/PenSkin.exml'] = window.BallSkin = (function (_super) {
	__extends(BallSkin, _super);
	function BallSkin() {
		_super.call(this);
		this.skinParts = ["cannnonRotate","win","bronBtn","next","reset","bottoms","tops","lefts","rights","tiger","cannon","tips"];
		
		this.height = 667;
		this.width = 375;
		this.cannnonRotate_i();
		this.win_i();
		this.elementsContent = [this._Rect1_i(),this.bronBtn_i(),this.next_i(),this.reset_i(),this.bottoms_i(),this.tops_i(),this.lefts_i(),this.rights_i(),this.cannon_i(),this.tips_i()];
		
		eui.Binding.$bindProperties(this, ["cannon"],[0],this._TweenItem1,"target");
		eui.Binding.$bindProperties(this, [0],[],this._Object1,"rotation");
		eui.Binding.$bindProperties(this, [360],[],this._Object2,"rotation");
		eui.Binding.$bindProperties(this, ["cannon"],[0],this._TweenItem2,"target");
		eui.Binding.$bindProperties(this, [1440],[],this._Object3,"rotation");
		eui.Binding.$bindProperties(this, [2],[],this._Object3,"scaleX");
		eui.Binding.$bindProperties(this, [2],[],this._Object3,"scaleY");
		eui.Binding.$bindProperties(this, [329.51],[],this._Object3,"y");
		eui.Binding.$bindProperties(this, ["tiger"],[0],this._TweenItem3,"target");
		eui.Binding.$bindProperties(this, [1],[],this._Object4,"alpha");
	}
	var _proto = BallSkin.prototype;

	_proto.cannnonRotate_i = function () {
		var t = new egret.tween.TweenGroup();
		this.cannnonRotate = t;
		t.items = [this._TweenItem1_i()];
		return t;
	};
	_proto._TweenItem1_i = function () {
		var t = new egret.tween.TweenItem();
		this._TweenItem1 = t;
		t.paths = [this._Set1_i(),this._To1_i()];
		return t;
	};
	_proto._Set1_i = function () {
		var t = new egret.tween.Set();
		t.props = this._Object1_i();
		return t;
	};
	_proto._Object1_i = function () {
		var t = {};
		this._Object1 = t;
		return t;
	};
	_proto._To1_i = function () {
		var t = new egret.tween.To();
		t.duration = 3000;
		t.props = this._Object2_i();
		return t;
	};
	_proto._Object2_i = function () {
		var t = {};
		this._Object2 = t;
		return t;
	};
	_proto.win_i = function () {
		var t = new egret.tween.TweenGroup();
		this.win = t;
		t.items = [this._TweenItem2_i(),this._TweenItem3_i()];
		return t;
	};
	_proto._TweenItem2_i = function () {
		var t = new egret.tween.TweenItem();
		this._TweenItem2 = t;
		t.paths = [this._Set2_i(),this._To2_i()];
		return t;
	};
	_proto._Set2_i = function () {
		var t = new egret.tween.Set();
		return t;
	};
	_proto._To2_i = function () {
		var t = new egret.tween.To();
		t.duration = 2000;
		t.ease = "cubicIn";
		t.props = this._Object3_i();
		return t;
	};
	_proto._Object3_i = function () {
		var t = {};
		this._Object3 = t;
		return t;
	};
	_proto._TweenItem3_i = function () {
		var t = new egret.tween.TweenItem();
		this._TweenItem3 = t;
		t.paths = [this._Wait1_i(),this._Set3_i(),this._To3_i()];
		return t;
	};
	_proto._Wait1_i = function () {
		var t = new egret.tween.Wait();
		t.duration = 2000;
		return t;
	};
	_proto._Set3_i = function () {
		var t = new egret.tween.Set();
		return t;
	};
	_proto._To3_i = function () {
		var t = new egret.tween.To();
		t.duration = 2000;
		t.ease = "sineOut";
		t.props = this._Object4_i();
		return t;
	};
	_proto._Object4_i = function () {
		var t = {};
		this._Object4 = t;
		return t;
	};
	_proto._Rect1_i = function () {
		var t = new eui.Rect();
		t.anchorOffsetX = 187.5;
		t.anchorOffsetY = 333.5;
		t.fillColor = 0xff90f2ff;
		t.percentHeight = 100;
		t.percentWidth = 100;
		t.x = 187.5;
		t.y = 333.5;
		return t;
	};
	_proto.bronBtn_i = function () {
		var t = new eui.Button();
		this.bronBtn = t;
		t.anchorOffsetX = 40;
		t.anchorOffsetY = 40;
		t.height = 80;
		t.label = "点我";
		t.width = 80;
		t.x = 187.5;
		t.y = 54.29;
		return t;
	};
	_proto.next_i = function () {
		var t = new eui.Button();
		this.next = t;
		t.anchorOffsetX = 46.5;
		t.anchorOffsetY = 40;
		t.height = 80;
		t.label = "下一关";
		t.visible = false;
		t.width = 93;
		t.x = 122;
		t.y = 490.5;
		return t;
	};
	_proto.reset_i = function () {
		var t = new eui.Button();
		this.reset = t;
		t.anchorOffsetX = 52;
		t.anchorOffsetY = 40;
		t.height = 80;
		t.label = "重玩此关";
		t.visible = false;
		t.width = 98;
		t.x = 262.5;
		t.y = 490.5;
		return t;
	};
	_proto.bottoms_i = function () {
		var t = new eui.Rect();
		this.bottoms = t;
		t.anchorOffsetX = 187.5;
		t.anchorOffsetY = 10;
		t.fillColor = 0xff7098da;
		t.height = 20;
		t.width = 375;
		t.x = 187.5;
		t.y = 675;
		return t;
	};
	_proto.tops_i = function () {
		var t = new eui.Rect();
		this.tops = t;
		t.anchorOffsetX = 187.5;
		t.anchorOffsetY = 10;
		t.fillColor = 0xFF7098DA;
		t.height = 20;
		t.width = 375;
		t.x = 187.46;
		t.y = -9;
		return t;
	};
	_proto.lefts_i = function () {
		var t = new eui.Rect();
		this.lefts = t;
		t.anchorOffsetX = 10;
		t.anchorOffsetY = 333.5;
		t.fillColor = 0xff7098da;
		t.height = 667;
		t.width = 20;
		t.x = -8;
		t.y = 333.5;
		return t;
	};
	_proto.rights_i = function () {
		var t = new eui.Rect();
		this.rights = t;
		t.anchorOffsetX = 10;
		t.anchorOffsetY = 333.5;
		t.fillColor = 0xff7098da;
		t.height = 667;
		t.width = 20;
		t.x = 384;
		t.y = 333.5;
		return t;
	};
	_proto.cannon_i = function () {
		var t = new eui.Group();
		this.cannon = t;
		t.anchorOffsetX = 60;
		t.anchorOffsetY = 60;
		t.height = 120;
		t.width = 120;
		t.x = 189.5;
		t.y = 191.53;
		t.elementsContent = [this._Image1_i(),this.tiger_i()];
		return t;
	};
	_proto._Image1_i = function () {
		var t = new eui.Image();
		t.anchorOffsetX = 60;
		t.anchorOffsetY = 60;
		t.height = 120;
		t.scaleX = 1;
		t.scaleY = 1;
		t.source = "circle_png";
		t.width = 120;
		t.x = 60;
		t.y = 60;
		return t;
	};
	_proto.tiger_i = function () {
		var t = new eui.Image();
		this.tiger = t;
		t.alpha = 0;
		t.anchorOffsetX = 45;
		t.anchorOffsetY = 45;
		t.height = 90;
		t.scaleX = 1;
		t.scaleY = 1;
		t.source = "tiger_png";
		t.width = 90;
		t.x = 60.36;
		t.y = 60.66;
		return t;
	};
	_proto.tips_i = function () {
		var t = new eui.Label();
		this.tips = t;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 30;
		t.size = 20;
		t.text = "1";
		t.textAlign = "center";
		t.textColor = 0x598dff;
		t.verticalAlign = "middle";
		t.width = 333.2;
		t.x = 20.8;
		t.y = 97.8;
		return t;
	};
	return BallSkin;
})(eui.Skin);generateEUI.paths['resource/eui_skins/ProgressBarSkin.exml'] = window.skins.ProgressBarSkin = (function (_super) {
	__extends(ProgressBarSkin, _super);
	function ProgressBarSkin() {
		_super.call(this);
		this.skinParts = ["thumb","labelDisplay"];
		
		this.minHeight = 18;
		this.minWidth = 30;
		this.elementsContent = [this._Image1_i(),this.thumb_i(),this.labelDisplay_i()];
	}
	var _proto = ProgressBarSkin.prototype;

	_proto._Image1_i = function () {
		var t = new eui.Image();
		t.percentHeight = 100;
		t.scale9Grid = new egret.Rectangle(1,1,4,4);
		t.source = "track_pb_png";
		t.verticalCenter = 0;
		t.percentWidth = 100;
		return t;
	};
	_proto.thumb_i = function () {
		var t = new eui.Image();
		this.thumb = t;
		t.percentHeight = 100;
		t.source = "thumb_pb_png";
		t.percentWidth = 100;
		return t;
	};
	_proto.labelDisplay_i = function () {
		var t = new eui.Label();
		this.labelDisplay = t;
		t.fontFamily = "Tahoma";
		t.horizontalCenter = 0;
		t.size = 15;
		t.textAlign = "center";
		t.textColor = 0x707070;
		t.verticalAlign = "middle";
		t.verticalCenter = 0;
		return t;
	};
	return ProgressBarSkin;
})(eui.Skin);generateEUI.paths['resource/eui_skins/RadioButtonSkin.exml'] = window.skins.RadioButtonSkin = (function (_super) {
	__extends(RadioButtonSkin, _super);
	function RadioButtonSkin() {
		_super.call(this);
		this.skinParts = ["labelDisplay"];
		
		this.elementsContent = [this._Group1_i()];
		this.states = [
			new eui.State ("up",
				[
				])
			,
			new eui.State ("down",
				[
					new eui.SetProperty("_Image1","alpha",0.7)
				])
			,
			new eui.State ("disabled",
				[
					new eui.SetProperty("_Image1","alpha",0.5)
				])
			,
			new eui.State ("upAndSelected",
				[
					new eui.SetProperty("_Image1","source","radiobutton_select_up_png")
				])
			,
			new eui.State ("downAndSelected",
				[
					new eui.SetProperty("_Image1","source","radiobutton_select_down_png")
				])
			,
			new eui.State ("disabledAndSelected",
				[
					new eui.SetProperty("_Image1","source","radiobutton_select_disabled_png")
				])
		];
	}
	var _proto = RadioButtonSkin.prototype;

	_proto._Group1_i = function () {
		var t = new eui.Group();
		t.percentHeight = 100;
		t.percentWidth = 100;
		t.layout = this._HorizontalLayout1_i();
		t.elementsContent = [this._Image1_i(),this.labelDisplay_i()];
		return t;
	};
	_proto._HorizontalLayout1_i = function () {
		var t = new eui.HorizontalLayout();
		t.verticalAlign = "middle";
		return t;
	};
	_proto._Image1_i = function () {
		var t = new eui.Image();
		this._Image1 = t;
		t.alpha = 1;
		t.fillMode = "scale";
		t.source = "radiobutton_unselect_png";
		return t;
	};
	_proto.labelDisplay_i = function () {
		var t = new eui.Label();
		this.labelDisplay = t;
		t.fontFamily = "Tahoma";
		t.size = 20;
		t.textAlign = "center";
		t.textColor = 0x707070;
		t.verticalAlign = "middle";
		return t;
	};
	return RadioButtonSkin;
})(eui.Skin);generateEUI.paths['resource/eui_skins/ScrollerSkin.exml'] = window.skins.ScrollerSkin = (function (_super) {
	__extends(ScrollerSkin, _super);
	function ScrollerSkin() {
		_super.call(this);
		this.skinParts = ["horizontalScrollBar","verticalScrollBar"];
		
		this.minHeight = 20;
		this.minWidth = 20;
		this.elementsContent = [this.horizontalScrollBar_i(),this.verticalScrollBar_i()];
	}
	var _proto = ScrollerSkin.prototype;

	_proto.horizontalScrollBar_i = function () {
		var t = new eui.HScrollBar();
		this.horizontalScrollBar = t;
		t.bottom = 0;
		t.percentWidth = 100;
		return t;
	};
	_proto.verticalScrollBar_i = function () {
		var t = new eui.VScrollBar();
		this.verticalScrollBar = t;
		t.percentHeight = 100;
		t.right = 0;
		return t;
	};
	return ScrollerSkin;
})(eui.Skin);generateEUI.paths['resource/eui_skins/StairsSkin.exml'] = window.StairsSkin = (function (_super) {
	__extends(StairsSkin, _super);
	function StairsSkin() {
		_super.call(this);
		this.skinParts = ["map","bottoms","tops","lefts","rights","g1","next","reset"];
		
		this.height = 2900;
		this.width = 375;
		this.elementsContent = [this.map_i(),this.bottoms_i(),this.tops_i(),this.lefts_i(),this.rights_i(),this.g1_i(),this.next_i(),this.reset_i()];
	}
	var _proto = StairsSkin.prototype;

	_proto.map_i = function () {
		var t = new eui.Image();
		this.map = t;
		t.fillMode = "repeat";
		t.percentHeight = 100;
		t.source = "universe_jpg";
		t.percentWidth = 100;
		t.x = 0;
		t.y = 0;
		return t;
	};
	_proto.bottoms_i = function () {
		var t = new eui.Rect();
		this.bottoms = t;
		t.anchorOffsetX = 187.5;
		t.anchorOffsetY = 10;
		t.fillColor = 0xff7098da;
		t.height = 20;
		t.width = 375;
		t.x = 187.5;
		t.y = 675;
		return t;
	};
	_proto.tops_i = function () {
		var t = new eui.Rect();
		this.tops = t;
		t.anchorOffsetX = 187.5;
		t.anchorOffsetY = 10;
		t.fillColor = 0xFF7098DA;
		t.height = 20;
		t.width = 375;
		t.x = 187.46;
		t.y = -9;
		return t;
	};
	_proto.lefts_i = function () {
		var t = new eui.Rect();
		this.lefts = t;
		t.anchorOffsetX = 10;
		t.anchorOffsetY = 333.5;
		t.fillColor = 0xff7098da;
		t.height = 667;
		t.width = 20;
		t.x = -8;
		t.y = 333.5;
		return t;
	};
	_proto.rights_i = function () {
		var t = new eui.Rect();
		this.rights = t;
		t.anchorOffsetX = 10;
		t.anchorOffsetY = 333.5;
		t.fillColor = 0xff7098da;
		t.height = 667;
		t.width = 20;
		t.x = 384;
		t.y = 333.5;
		return t;
	};
	_proto.g1_i = function () {
		var t = new eui.Button();
		this.g1 = t;
		t.anchorOffsetX = 83.5;
		t.anchorOffsetY = 50;
		t.label = "刚体";
		t.visible = false;
		t.width = 167;
		t.x = 88.5;
		t.y = 400;
		return t;
	};
	_proto.next_i = function () {
		var t = new eui.Button();
		this.next = t;
		t.anchorOffsetX = 40;
		t.anchorOffsetY = 40;
		t.height = 80;
		t.label = "下一关";
		t.name = "next";
		t.visible = false;
		t.width = 80;
		t.x = 117.5;
		t.y = 421.5;
		return t;
	};
	_proto.reset_i = function () {
		var t = new eui.Button();
		this.reset = t;
		t.anchorOffsetX = 40;
		t.anchorOffsetY = 40;
		t.height = 80;
		t.label = "重玩";
		t.name = "reset";
		t.visible = false;
		t.width = 80;
		t.x = 251.5;
		t.y = 421.5;
		return t;
	};
	return StairsSkin;
})(eui.Skin);generateEUI.paths['resource/eui_skins/TextInputSkin.exml'] = window.skins.TextInputSkin = (function (_super) {
	__extends(TextInputSkin, _super);
	function TextInputSkin() {
		_super.call(this);
		this.skinParts = ["textDisplay","promptDisplay"];
		
		this.minHeight = 40;
		this.minWidth = 300;
		this.elementsContent = [this._Image1_i(),this._Rect1_i(),this.textDisplay_i()];
		this.promptDisplay_i();
		
		this.states = [
			new eui.State ("normal",
				[
				])
			,
			new eui.State ("disabled",
				[
					new eui.SetProperty("textDisplay","textColor",0xff0000)
				])
			,
			new eui.State ("normalWithPrompt",
				[
					new eui.AddItems("promptDisplay","",1,"")
				])
			,
			new eui.State ("disabledWithPrompt",
				[
					new eui.AddItems("promptDisplay","",1,"")
				])
		];
	}
	var _proto = TextInputSkin.prototype;

	_proto._Image1_i = function () {
		var t = new eui.Image();
		t.percentHeight = 100;
		t.scale9Grid = new egret.Rectangle(1,3,8,8);
		t.source = "button_up_png";
		t.percentWidth = 100;
		return t;
	};
	_proto._Rect1_i = function () {
		var t = new eui.Rect();
		t.fillColor = 0xffffff;
		t.percentHeight = 100;
		t.percentWidth = 100;
		return t;
	};
	_proto.textDisplay_i = function () {
		var t = new eui.EditableText();
		this.textDisplay = t;
		t.height = 24;
		t.left = "10";
		t.right = "10";
		t.size = 20;
		t.textColor = 0x000000;
		t.verticalCenter = "0";
		t.percentWidth = 100;
		return t;
	};
	_proto.promptDisplay_i = function () {
		var t = new eui.Label();
		this.promptDisplay = t;
		t.height = 24;
		t.left = 10;
		t.right = 10;
		t.size = 20;
		t.textColor = 0xa9a9a9;
		t.touchEnabled = false;
		t.verticalCenter = 0;
		t.percentWidth = 100;
		return t;
	};
	return TextInputSkin;
})(eui.Skin);generateEUI.paths['resource/eui_skins/ToggleSwitchSkin.exml'] = window.skins.ToggleSwitchSkin = (function (_super) {
	__extends(ToggleSwitchSkin, _super);
	function ToggleSwitchSkin() {
		_super.call(this);
		this.skinParts = [];
		
		this.elementsContent = [this._Image1_i(),this._Image2_i()];
		this.states = [
			new eui.State ("up",
				[
					new eui.SetProperty("_Image1","source","off_png")
				])
			,
			new eui.State ("down",
				[
					new eui.SetProperty("_Image1","source","off_png")
				])
			,
			new eui.State ("disabled",
				[
					new eui.SetProperty("_Image1","source","off_png")
				])
			,
			new eui.State ("upAndSelected",
				[
					new eui.SetProperty("_Image2","horizontalCenter",18)
				])
			,
			new eui.State ("downAndSelected",
				[
					new eui.SetProperty("_Image2","horizontalCenter",18)
				])
			,
			new eui.State ("disabledAndSelected",
				[
					new eui.SetProperty("_Image2","horizontalCenter",18)
				])
		];
	}
	var _proto = ToggleSwitchSkin.prototype;

	_proto._Image1_i = function () {
		var t = new eui.Image();
		this._Image1 = t;
		t.source = "on_png";
		return t;
	};
	_proto._Image2_i = function () {
		var t = new eui.Image();
		this._Image2 = t;
		t.horizontalCenter = -18;
		t.source = "handle_png";
		t.verticalCenter = 0;
		return t;
	};
	return ToggleSwitchSkin;
})(eui.Skin);generateEUI.paths['resource/eui_skins/VScrollBarSkin.exml'] = window.skins.VScrollBarSkin = (function (_super) {
	__extends(VScrollBarSkin, _super);
	function VScrollBarSkin() {
		_super.call(this);
		this.skinParts = ["thumb"];
		
		this.minHeight = 20;
		this.minWidth = 8;
		this.elementsContent = [this.thumb_i()];
	}
	var _proto = VScrollBarSkin.prototype;

	_proto.thumb_i = function () {
		var t = new eui.Image();
		this.thumb = t;
		t.height = 30;
		t.horizontalCenter = 0;
		t.scale9Grid = new egret.Rectangle(3,3,2,2);
		t.source = "roundthumb_png";
		t.width = 8;
		return t;
	};
	return VScrollBarSkin;
})(eui.Skin);generateEUI.paths['resource/eui_skins/VSliderSkin.exml'] = window.skins.VSliderSkin = (function (_super) {
	__extends(VSliderSkin, _super);
	function VSliderSkin() {
		_super.call(this);
		this.skinParts = ["track","thumb"];
		
		this.minHeight = 30;
		this.minWidth = 25;
		this.elementsContent = [this.track_i(),this.thumb_i()];
	}
	var _proto = VSliderSkin.prototype;

	_proto.track_i = function () {
		var t = new eui.Image();
		this.track = t;
		t.percentHeight = 100;
		t.horizontalCenter = 0;
		t.scale9Grid = new egret.Rectangle(1,1,4,4);
		t.source = "track_png";
		t.width = 7;
		return t;
	};
	_proto.thumb_i = function () {
		var t = new eui.Image();
		this.thumb = t;
		t.horizontalCenter = 0;
		t.source = "thumb_png";
		return t;
	};
	return VSliderSkin;
})(eui.Skin);