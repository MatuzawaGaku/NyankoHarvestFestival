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


      var help_png = cc.Sprite.create(res.help_png);
      help_png.setPosition(size.width*1/6, size.height/1.5);
      this.addChild(help_png);
      var label = cc.LabelTTF.create("ヘルプだワン!!", "Arial", 40);
         label.setPosition(size.width / 2, size.height * 4 / 5);
         this.addChild(label, 4);
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
     cc.director.runScene(new gameScene());
 },
});

var titleScene = cc.Scene.extend({
  onEnter: function(){
    this._super();
    var layer = new titleLayer();
    this.addChild(layer);
  }
});
