window.skins={};
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
                generateEUI.skins = {"eui.Button":"resource/eui_skins/ButtonSkin.exml","eui.CheckBox":"resource/eui_skins/CheckBoxSkin.exml","eui.HScrollBar":"resource/eui_skins/HScrollBarSkin.exml","eui.HSlider":"resource/eui_skins/HSliderSkin.exml","eui.Panel":"resource/eui_skins/PanelSkin.exml","eui.TextInput":"resource/eui_skins/TextInputSkin.exml","eui.ProgressBar":"resource/eui_skins/ProgressBarSkin.exml","eui.RadioButton":"resource/eui_skins/RadioButtonSkin.exml","eui.Scroller":"resource/eui_skins/ScrollerSkin.exml","eui.ToggleSwitch":"resource/eui_skins/ToggleSwitchSkin.exml","eui.VScrollBar":"resource/eui_skins/VScrollBarSkin.exml","eui.VSlider":"resource/eui_skins/VSliderSkin.exml","eui.ItemRenderer":"resource/eui_skins/ItemRendererSkin.exml","homePage":"resource/eui_skins/homePage.exml","HomePage":"resource/eui_skins/HomePage.exml","ChooseCard":"resource/eui_skins/ChooseCard.exml","ChooseCardPage":"resource/eui_skins/ChooseCardPage.exml","CardUI":"resource/eui_skins/CardUI.exml","PlayerListUI":"resource/eui_skins/PlayerListUI.exml","Player":"resource/eui_skins/Player.exml","ShowOutsUI":"resource/eui_skins/ShowOutsUI.exml"};generateEUI.paths['resource/eui_skins/ButtonSkin.exml'] = window.skins.ButtonSkin = (function (_super) {
	__extends(ButtonSkin, _super);
	function ButtonSkin() {
		_super.call(this);
		this.skinParts = ["labelDisplay","iconDisplay"];
		
		this.minHeight = 50;
		this.minWidth = 100;
		this.elementsContent = [this._Image1_i(),this.labelDisplay_i(),this.iconDisplay_i()];
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
	}
	var _proto = ButtonSkin.prototype;

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
		t.left = 8;
		t.right = 8;
		t.size = 20;
		t.textAlign = "center";
		t.textColor = 0xFFFFFF;
		t.top = 8;
		t.verticalAlign = "middle";
		return t;
	};
	_proto.iconDisplay_i = function () {
		var t = new eui.Image();
		this.iconDisplay = t;
		t.horizontalCenter = 0;
		t.verticalCenter = 0;
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
})(eui.Skin);generateEUI.paths['resource/eui_skins/UI/CardUI.exml'] = window.CardUISkin = (function (_super) {
	__extends(CardUISkin, _super);
	function CardUISkin() {
		_super.call(this);
		this.skinParts = ["cardLabel","rectMask"];
		
		this.height = 125;
		this.width = 85;
		this.elementsContent = [this._Rect1_i(),this.cardLabel_i(),this.rectMask_i()];
	}
	var _proto = CardUISkin.prototype;

	_proto._Rect1_i = function () {
		var t = new eui.Rect();
		t.ellipseHeight = 20;
		t.ellipseWidth = 20;
		t.fillColor = 0xffffff;
		t.height = 125;
		t.width = 85;
		t.x = 0;
		t.y = 0;
		return t;
	};
	_proto.cardLabel_i = function () {
		var t = new eui.Label();
		this.cardLabel = t;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.fontFamily = "Microsoft YaHei";
		t.height = 125;
		t.size = 40;
		t.text = "?";
		t.textAlign = "center";
		t.textColor = 0x000000;
		t.verticalAlign = "middle";
		t.width = 85;
		t.y = 0;
		return t;
	};
	_proto.rectMask_i = function () {
		var t = new eui.Rect();
		this.rectMask = t;
		t.ellipseHeight = 20;
		t.ellipseWidth = 20;
		t.fillAlpha = 0.5;
		t.height = 125;
		t.width = 85;
		t.x = 0;
		t.y = 0;
		return t;
	};
	return CardUISkin;
})(eui.Skin);generateEUI.paths['resource/eui_skins/UI/ChooseCardPage.exml'] = window.ChooseCardPageSkin = (function (_super) {
	__extends(ChooseCardPageSkin, _super);
	function ChooseCardPageSkin() {
		_super.call(this);
		this.skinParts = ["btn_noChoose","btn_goBack"];
		
		this.height = 1334;
		this.width = 750;
		this.elementsContent = [this._Image1_i(),this._Rect1_i(),this._Rect2_i(),this._Rect3_i(),this._Rect4_i(),this.btn_noChoose_i(),this.btn_goBack_i(),this._Group1_i()];
	}
	var _proto = ChooseCardPageSkin.prototype;

	_proto._Image1_i = function () {
		var t = new eui.Image();
		t.height = 1334;
		t.source = "chooseBg_jpg";
		t.width = 750;
		t.x = 0;
		t.y = 0;
		return t;
	};
	_proto._Rect1_i = function () {
		var t = new eui.Rect();
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.ellipseHeight = 50;
		t.ellipseWidth = 50;
		t.fillColor = 0x444444;
		t.height = 280;
		t.visible = false;
		t.width = 715;
		t.x = 17;
		t.y = 25;
		return t;
	};
	_proto._Rect2_i = function () {
		var t = new eui.Rect();
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.ellipseHeight = 50;
		t.ellipseWidth = 50;
		t.fillColor = 0x444444;
		t.height = 280;
		t.visible = false;
		t.width = 715;
		t.x = 17;
		t.y = 325;
		return t;
	};
	_proto._Rect3_i = function () {
		var t = new eui.Rect();
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.ellipseHeight = 50;
		t.ellipseWidth = 50;
		t.fillColor = 0x444444;
		t.height = 280;
		t.visible = false;
		t.width = 715;
		t.x = 17;
		t.y = 625;
		return t;
	};
	_proto._Rect4_i = function () {
		var t = new eui.Rect();
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.ellipseHeight = 50;
		t.ellipseWidth = 50;
		t.fillColor = 0x444444;
		t.height = 280;
		t.visible = false;
		t.width = 715;
		t.x = 17;
		t.y = 925;
		return t;
	};
	_proto.btn_noChoose_i = function () {
		var t = new eui.Button();
		this.btn_noChoose = t;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 72;
		t.label = "不选";
		t.width = 202;
		t.x = 94;
		t.y = 1232;
		return t;
	};
	_proto.btn_goBack_i = function () {
		var t = new eui.Button();
		this.btn_goBack = t;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 72;
		t.label = "返回";
		t.width = 202;
		t.x = 452;
		t.y = 1232;
		return t;
	};
	_proto._Group1_i = function () {
		var t = new eui.Group();
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 280;
		t.visible = false;
		t.width = 715;
		t.x = 17;
		t.y = 25;
		t.elementsContent = [this._Rect5_i(),this._Rect6_i(),this._Rect7_i(),this._Rect8_i(),this._Rect9_i(),this._Rect10_i(),this._Rect11_i(),this._Rect12_i()];
		return t;
	};
	_proto._Rect5_i = function () {
		var t = new eui.Rect();
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.ellipseHeight = 10;
		t.ellipseWidth = 10;
		t.height = 125;
		t.scaleX = 1;
		t.scaleY = 1;
		t.width = 75;
		t.x = 20;
		t.y = 145;
		return t;
	};
	_proto._Rect6_i = function () {
		var t = new eui.Rect();
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.ellipseHeight = 10;
		t.ellipseWidth = 10;
		t.height = 125;
		t.scaleX = 1;
		t.scaleY = 1;
		t.width = 85;
		t.x = 17;
		t.y = 10;
		return t;
	};
	_proto._Rect7_i = function () {
		var t = new eui.Rect();
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.ellipseHeight = 10;
		t.ellipseWidth = 10;
		t.height = 125;
		t.scaleX = 1;
		t.scaleY = 1;
		t.width = 85;
		t.x = 117;
		t.y = 10;
		return t;
	};
	_proto._Rect8_i = function () {
		var t = new eui.Rect();
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.ellipseHeight = 10;
		t.ellipseWidth = 10;
		t.height = 125;
		t.scaleX = 1;
		t.scaleY = 1;
		t.width = 85;
		t.x = 217;
		t.y = 10;
		return t;
	};
	_proto._Rect9_i = function () {
		var t = new eui.Rect();
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.ellipseHeight = 10;
		t.ellipseWidth = 10;
		t.height = 125;
		t.scaleX = 1;
		t.scaleY = 1;
		t.width = 85;
		t.x = 317;
		t.y = 10;
		return t;
	};
	_proto._Rect10_i = function () {
		var t = new eui.Rect();
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.ellipseHeight = 10;
		t.ellipseWidth = 10;
		t.height = 125;
		t.scaleX = 1;
		t.scaleY = 1;
		t.width = 85;
		t.x = 416;
		t.y = 10;
		return t;
	};
	_proto._Rect11_i = function () {
		var t = new eui.Rect();
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.ellipseHeight = 10;
		t.ellipseWidth = 10;
		t.height = 125;
		t.scaleX = 1;
		t.scaleY = 1;
		t.width = 85;
		t.x = 516;
		t.y = 10;
		return t;
	};
	_proto._Rect12_i = function () {
		var t = new eui.Rect();
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.ellipseHeight = 10;
		t.ellipseWidth = 10;
		t.height = 125;
		t.scaleX = 1;
		t.scaleY = 1;
		t.width = 85;
		t.x = 615;
		t.y = 10;
		return t;
	};
	return ChooseCardPageSkin;
})(eui.Skin);generateEUI.paths['resource/eui_skins/UI/HomePage.exml'] = window.HomePageSkin = (function (_super) {
	__extends(HomePageSkin, _super);
	function HomePageSkin() {
		_super.call(this);
		this.skinParts = ["g_common","btn_add","g_playerList","g_scroller","btn_calculate","btn_clear"];
		
		this.height = 1334;
		this.width = 750;
		this.elementsContent = [this._Image1_i(),this._Rect1_i(),this._Rect2_i(),this.g_common_i(),this.g_scroller_i(),this.btn_calculate_i(),this.btn_clear_i()];
	}
	var _proto = HomePageSkin.prototype;

	_proto._Image1_i = function () {
		var t = new eui.Image();
		t.height = 1334;
		t.source = "pokerBg_jpg";
		t.width = 750;
		t.x = 0;
		t.y = 0;
		return t;
	};
	_proto._Rect1_i = function () {
		var t = new eui.Rect();
		t.fillColor = 0x367f2c;
		t.height = 1334;
		t.visible = false;
		t.width = 750;
		t.x = 0;
		t.y = 0;
		return t;
	};
	_proto._Rect2_i = function () {
		var t = new eui.Rect();
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.ellipseHeight = 30;
		t.ellipseWidth = 30;
		t.fillAlpha = 0.8;
		t.height = 248;
		t.width = 690;
		t.x = 30;
		t.y = 56;
		return t;
	};
	_proto.g_common_i = function () {
		var t = new eui.Group();
		this.g_common = t;
		t.height = 248;
		t.width = 690;
		t.x = 30;
		t.y = 56;
		return t;
	};
	_proto.g_scroller_i = function () {
		var t = new eui.Scroller();
		this.g_scroller = t;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 887.52;
		t.width = 750;
		t.x = 0;
		t.y = 330;
		t.viewport = this._Group1_i();
		return t;
	};
	_proto._Group1_i = function () {
		var t = new eui.Group();
		t.elementsContent = [this.g_playerList_i()];
		return t;
	};
	_proto.g_playerList_i = function () {
		var t = new eui.Group();
		this.g_playerList = t;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 670;
		t.scaleX = 1;
		t.scaleY = 1;
		t.width = 750;
		t.x = 0;
		t.y = 20;
		t.elementsContent = [this.btn_add_i()];
		return t;
	};
	_proto.btn_add_i = function () {
		var t = new eui.Button();
		this.btn_add = t;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.bottom = 0;
		t.height = 76;
		t.horizontalCenter = 0;
		t.label = "添加玩家";
		t.width = 218;
		return t;
	};
	_proto.btn_calculate_i = function () {
		var t = new eui.Button();
		this.btn_calculate = t;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 79.12;
		t.label = "计算";
		t.width = 170.1;
		t.x = 343.9;
		t.y = 1224.97;
		return t;
	};
	_proto.btn_clear_i = function () {
		var t = new eui.Button();
		this.btn_clear = t;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 79.12;
		t.label = "清空";
		t.width = 170.1;
		t.x = 549.9;
		t.y = 1224.97;
		return t;
	};
	return HomePageSkin;
})(eui.Skin);generateEUI.paths['resource/eui_skins/UI/PlayerUI.exml'] = window.PlayerUISkin = (function (_super) {
	__extends(PlayerUISkin, _super);
	function PlayerUISkin() {
		_super.call(this);
		this.skinParts = ["g_cards","lab_result","g_label","btn_close","g_player"];
		
		this.height = 248;
		this.width = 690;
		this.elementsContent = [this.g_player_i()];
	}
	var _proto = PlayerUISkin.prototype;

	_proto.g_player_i = function () {
		var t = new eui.Group();
		this.g_player = t;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 248;
		t.width = 690;
		t.x = 0;
		t.elementsContent = [this._Rect1_i(),this.g_cards_i(),this.g_label_i(),this.btn_close_i()];
		return t;
	};
	_proto._Rect1_i = function () {
		var t = new eui.Rect();
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.ellipseHeight = 30;
		t.ellipseWidth = 30;
		t.fillAlpha = 0.8;
		t.height = 248;
		t.scaleX = 1;
		t.scaleY = 1;
		t.width = 690;
		t.x = 0;
		t.y = 0;
		return t;
	};
	_proto.g_cards_i = function () {
		var t = new eui.Group();
		this.g_cards = t;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 200;
		t.width = 245.34;
		t.x = 18.33;
		t.y = 25;
		return t;
	};
	_proto.g_label_i = function () {
		var t = new eui.Group();
		this.g_label = t;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 200;
		t.width = 305;
		t.x = 355;
		t.y = 25;
		t.elementsContent = [this.lab_result_i()];
		return t;
	};
	_proto.lab_result_i = function () {
		var t = new eui.Label();
		this.lab_result = t;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.fontFamily = "Microsoft YaHei";
		t.height = 119;
		t.lineSpacing = 20;
		t.size = 40;
		t.text = "胜率：？";
		t.textAlign = "center";
		t.verticalAlign = "middle";
		t.verticalCenter = 0;
		t.width = 306;
		t.x = 0;
		return t;
	};
	_proto.btn_close_i = function () {
		var t = new eui.Image();
		this.btn_close = t;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 55;
		t.source = "close_png";
		t.width = 55;
		t.x = 651;
		t.y = -17.5;
		return t;
	};
	return PlayerUISkin;
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