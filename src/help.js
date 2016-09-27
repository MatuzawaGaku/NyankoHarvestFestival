var helpScene = cc.Scene.extend({
  ctor : function(){
    this._super();
    var size = cc.director.getWinSize();
    var label = cc.LabelTTF.create("上から降ってくるリンゴをGETしよう\n虫を取っちゃダメだよ\nファイトだよ!!\nもう一回この画面をクリックするとタイトルに戻るよ"
    , "PixelMplus10","10",cc.TEXT_ALIGNMENT_CENTER);
    label.setPosition(size.width/2, size.height/2);

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
       cc.director.runScene(new titleScene());
   },
});

var helpScene = cc.Scene.extend({
  onEnter : function(){
    this._super();
    var helplayer = new helpLayer();
    this.addChild(helplayer);
  },
});
