class LayerManager {
	public constructor() {
	}
	public static main: Main;
	private static baseUILayer: egret.DisplayObjectContainer = new egret.DisplayObjectContainer();

	public static addBaseLayer(o: egret.DisplayObjectContainer) {
		LayerManager.baseUILayer.addChild(o);
	}

	public static removeBaseLayer(o: egret.DisplayObjectContainer) {
		LayerManager.baseUILayer.removeChild(o);
	}

	private static initBaseLayer() {
		LayerManager.main.addChild(LayerManager.baseUILayer);
	}

	public static init(m: Main) {
		this.main = m;
		LayerManager.initBaseLayer();
	}
}