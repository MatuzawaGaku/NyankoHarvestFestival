//titleScene.js
var titleLayer = cc.Layer.extend({
  ctor : function(){
    this._super();
    var size = cc.director.getWinSize();
    var title_png = cc.Sprite.create(res.title_png);
    title_png.setPosition(size.width/2, size.height/2);
    this.addChild(title_png);

    var start_png = cc.Sprite.create(res.start_png);
    start_png.setPosition(size.width * 3/ 6, size.height / 5);
    this.addChild(start_png);

    // タップイベントリスナーを登録する
     cc.eventManager.addListener({
         event: cc.EventListener.TOUCH_ONE_BY_ONE,
         swallowTouches: true,
         onTouchBegan: this.onTouchBegan,
         onTouchMoved: this.onTouchMoved,
         onTouchEnded: this.onTouchEnded
     }, this);

     return true;
 },

 onTouchBegan: function(touch, event) {
     return true;
 },
 onTouchMoved: function(touch, event) {},
 onTouchEnded: function(touch, event) {
     // 次のシーンに切り替える
     cc.director.runScene(new gameScene());
 },
});

var titleScene = cc.Scene.extend({
  onEnter: function(){
    this._super();
    var layer = new titleLayer();
    this.addChild(layer);
  }
})
