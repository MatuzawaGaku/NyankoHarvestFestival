var titleLayer = cc.Layer.extend({
  ctor : function(){
    this._super();
    var size = cc.director.getWinSize();

    var title = cc.Sprite.create(res.title_png);
    title.setPosition(size.width/2, size.height/2);
    title.setScale(1,1);
    this.addChild(title);
    for(i = 0; i < 2; i++){
      var rp = new mode();
      rp.pictureValue = i;
      rp.setPosition(220, 60*(i + 1));
      rp.setScale(1,1);
      this.addChild(rp);
    }
  }
});

var mode = cc.Sprite.extend({
  ctor : function(){
    this._super();
    if(i == 0)this.initWithFile(res.start_png);
    if(i == 1)this.initWithFile(res.help_png);
    cc.eventManager.addListener(lis,this);
  },
});

//押されたときの処理
var lis = cc.EventListener.create({
  event : cc.EventListener.TOUCH_ONE_BY_ONE,
  swallowTouches: true,
  onTouchBegan: function(touch, event){
  var target = event.getCurrentTarget();
  var location = target.convertToNodeSpace(touch.getLocation());
  var targetSize = target.getContentSize();
  var targetRectangle = cc.rect(0,0,targetSize.width, targetSize.height);
  if(cc.rectContainsPoint(targetRectangle,location)){
    if(target.pictureValue == 0){
      cc.director.runScene(new gameScene());
    }
    if(target.pictureValue == 1){
      cc.director.runScene(new helpScene());
    }
}
}
});

var titleScene = cc.Scene.extend({
  onEnter : function() {
    this._super();
    var titlelayer = new titleLayer();
    this.addChild(titlelayer);
  }
});
