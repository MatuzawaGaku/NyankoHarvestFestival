var itemsLayer;
var cat;
var basket;
var direction = 1;
var xSpeed = 0; //カートの移動速度
var score1 = 0;
var score2 = 0;
var score3 = 0;
var scorecount1;
var scorecount2;
var scorecount3;
var time = 60;
var timecount;

var detectedX;　 //現在タッチしているX座標
var savedX;　 //前回タッチしていたX座標
var touching = false;　 //タッチ状況管理用flag
var audioEngine;
var i = 1;

var gameScene = cc.Scene.extend({
  onEnter: function() {
    this._super();
    gameLayer = new game();
    gameLayer.init();
    this.addChild(gameLayer);

    audioEngine = cc.audioEngine;
    if (audioEngine.isMusicPlaying()) {
      audioEngine.playMusic(res.bgm , true);
    }
  }
});

var game = cc.Layer.extend({
  init: function() {
    this._super();
    //グラデーション背景
    //  var backgroundLayer = cc.LayerGradient.create(cc.color(0,0,0,255), cc.color(0x46,0x82,0xB4,255));

    //森の背景
    var background = new cc.Sprite(res.gb_png);
    var size = cc.director.getWinSize();
    background.setPosition(cc.p(size.width / 2.0, size.height / 2.0));
    var backgroundLayer = cc.Layer.create();
    backgroundLayer.addChild(background);
    this.addChild(backgroundLayer);

    //アイテムがおちてくるレイヤー
    itemsLayer = cc.Layer.create();
    this.addChild(itemsLayer);

    //ショッピングカートを操作するレイヤー
    topLayer = cc.Layer.create();
    this.addChild(topLayer,0);

    cat = cc.Sprite.create(res.cat_0png);


    basket = cc.Sprite.create(res.basket_png);
    topLayer.addChild(cat,2);
    topLayer.addChild(basket,0);
    cat.addChild(basket,0);


    basket.setPosition(cat.getPosition().x+75,cat.getPosition().y+80);
    cat.setPosition(240, 64);

    this.schedule(this.addItem, 1);


    //タッチイベントのリスナー追加
    cc.eventManager.addListener(touchListener, this);
    //カートの移動のため　Update関数を1/60秒ごと実行させる　
    this.scheduleUpdate();

    //SCORE表示
    var score_counter = new cc.Sprite.create(res.gamecount_png);
    score_counter.setPosition(cc.p(size.width*0.865,size.height*0.076));
    var scorelayer = cc.Layer.create();
    scorelayer.addChild(score_counter,0);
    this.addChild(scorelayer);

    scorecount1 = new cc.LabelTTF("0", "Arial", 25);
    scorecount1.setPosition(cc.p(size.width*0.965,size.height*0.055));
    scorecount1.fillStyle = "black";
    this.addChild(scorecount1);

    scorecount2 = new cc.LabelTTF("0", "Arial", 25);
    scorecount2.setPosition(cc.p(size.width*0.9,size.height*0.055));
    scorecount2.fillStyle = "black";
    this.addChild(scorecount2);

    scorecount3 = new cc.LabelTTF("0", "Arial", 25);
    scorecount3.setPosition(cc.p(size.width*0.838, size.height*0.055));
    scorecount3.fillStyle = "black";
    this.addChild(scorecount3);

    // タイマー表示
    timecount = new cc.LabelTTF(time, "Arial", 40);
    timecount.setPosition(cc.p(size.width * 0.11, size.height * 0.89));
    timecount.fillStyle = "black";
    this.addChild(timecount);

  },
  addItem: function() {
    var item = new Item();
    itemsLayer.addChild(item, 1);
  },
  removeItem: function(item) {
    itemsLayer.removeChild(item);
  },
  timer_count: function(){
  time--;
  if (time < 0) {
    time = 0;
    cc.director.runScene(new titleScene());
  }
  timecount.setString(""+time);
},
  //カートの移動のため　Update関数を1/60秒ごと実行させる関数
  update: function(dt) {
    this.schedule(this.timer_count,1);
    if (touching) {
      //現在タッチしているX座標と前回の座標の差分をとる
      var deltaX = savedX - detectedX;
      //差分でカートが右にいくか左にいくかを判断する
      if (deltaX > 0) {
        xSpeed = -2;
      }
      if (deltaX < 0) {
        xSpeed = 2;
      }
      //saveXに今回のX座標を代入し、onTouchMovedイベントで
      //detectedX変数が更新されても対応できるようにする
      savedX = detectedX;
      if (xSpeed > 0) {

        cat.setFlippedX(true);
        basket.setPosition(basket.getPosition().x/2,basket.getPosition().y)

        i+=1;
        if(i==1){cat.initWithFile(res.cat_1png);cat.setFlippedX(true);}
        if(i==2){cat.initWithFile(res.cat_2png);cat.setFlippedX(true);}
        if(i==3){i=0}
      }
      if (xSpeed < 0) {
        cat.setFlippedX(false);
        basket.setPosition(75,80);

        i+=1;
        if(i==1){cat.initWithFile(res.cat_1png);}
        if(i==2){cat.initWithFile(res.cat_2png);}
        if(i==3){i=0}
      }

      cat.setPosition(cat.getPosition().x + xSpeed, cat.getPosition().y);
    }
  }

});

var Item = cc.Sprite.extend({
  ctor: function() {
    this._super();
    //ランダムに虫と果物を生成する
    if (Math.random() < 0.5) {
      this.initWithFile(res.bug_png);
      this.isbug = true;
    } else {
      this.initWithFile(res.apple_png);
      this.isbug = false;
    }
  },
  //アイテムが生成された後、描画されるときに実行
  onEnter: function() {
    this._super();
    //ランダムな位置に
    this.setPosition(Math.random() * 400 + 40, 350);
    //ランダムな座標に移動させる
    var moveAction = cc.MoveTo.create(8, new cc.Point(Math.random() * 400 + 40, -50));
    this.runAction(moveAction);
    this.scheduleUpdate();
  },
  update: function(dt) {
    //果物の処理
if(direction == 1 && (this.getPosition().y < 65 && this.getPosition().y > 60 &&Math.abs(this.getPosition().x - (cat.getPosition().x + 30)) < 30 && !this.isBomb)) {
  gameLayer.removeItem(this);
  score1++;
  if(score1 > 9) {
    score2++;
    if(score2 > 9){
      score3++;
      score2 = 0;
      scorecount3.setString(score3);
    }
    score1 = 0;
    scorecount2.setString(score2);
  }
  scorecount1.setString(score1);
  console.log("FRUIT");
}

 if (direction == 0 && (this.getPosition().y < 65 && this.getPosition().y > 60 &&Math.abs(this.getPosition().x - (cat.getPosition().x - 30)) < 30  && !this.isBomb)) {
   gameLayer.removeItem(this);
   score1++;
   if(score1 > 9) {
     score2++;
     if(score2 > 9){
       score3++;
       score2 = 0;
       scorecount3.setString(score3);
     }
     score1 = 0;
     scorecount2.setString(score2);
   }
   scorecount1.setString(score1);
   console.log("FRUIT");
 }

//虫の処理
if(direction == 1 &&(this.getPosition().y < 60 &&Math.abs(this.getPosition().x - (cat.getPosition().x + 30)) < 25 && this.isBomb)) {
  gameLayer.removeItem(this);
  score2--;
  if(score2 < 0){
    if(score3 >= 1) {
      score3--;
      score2 = 9;
      scorecount3.setString(score3);
    }else{
      score2 = 0;
      score1 = 0;
      scorecount1.setString(score1);
    }
  }
  scorecount2.setString(score2);
  console.log("BUG");
}

if (direction == 0 &&(this.getPosition().y < 60 &&Math.abs(this.getPosition().x - (cat.getPosition().x - 30)) < 25 && this.isBomb)){
  gameLayer.removeItem(this);
  score2--;
  if(score2 < 0){
    if(score3 >= 1){
      score3--;
      score2 = 9;
      scorecount3.setString(score3);
    }else{
      score2 = 0;
      score1 = 0;
      scorecount1.setString(score1);
    }
  }
  scorecount2.setString(score2);
  console.log("BUG");
}

//地面に落ちたアイテムを消す
  if(this.getPosition().y < -30){
    gameLayer.removeItem(this);
  }
}
});
//バーチャルアナログパッド用のタッチリスナーの実装
var touchListener = cc.EventListener.create({
  event: cc.EventListener.TOUCH_ONE_BY_ONE,
  swallowTouches: true,
  onTouchBegan: function(touch, event) {
    touching = true;
    //現在タッチ中のX座標を保持する変数へ代入
    detectedX = touch.getLocation().x;
    //前回タッチしていたX座標として代入
    savedX = detectedX;
    return true;
  },
  onTouchMoved: function(touch, event) {
    //現在タッチ中のX座標を保持する変数へ代入
    detectedX = touch.getLocation().x;
  },
  onTouchEnded: function(touch, event) {
    //タッチflagをOFF
    touching = false;
  }
})
