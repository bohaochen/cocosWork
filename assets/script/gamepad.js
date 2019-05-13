// Learn cc.Class:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://docs.cocos2d-x.org/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://docs.cocos2d-x.org/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] https://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html

cc.Class({
    extends: cc.Component,

    properties: {
        smallCircle:null,//小圆
        handleBox:null,//监听区域
        max_r:60,//大圆半径
    },

    onLoad:function(){
        this.drawCircle();


        this.addTouchEvent();
    },

    addTouchEvent:function(){
        //监听遥感区域
        this.node.on(cc.Node.EventType.TOUCH_START, this.onTouchStart, this);
        this.node.on(cc.Node.EventType.TOUCH_MOVE, this.onTouchMove, this);
        this.node.on(cc.Node.EventType.TOUCH_END, this.onTouchEnd, this);
        this.node.on(cc.Node.EventType.TOUCH_CANCEL, this.onTouchCancel, this);
    },

    onTouchStart: function(event) {
        console.log("start ...");
    },

    onTouchMove: function(event) {
        var touch_pos = event.getLocation();
        //获取当前触摸点得V2对象
        var pos = this.node.convertToNodeSpaceAR(touch_pos);
        //转换一个点坐标为相对此节点局部空间系坐标，锚点为该节点的原点
        console.log("pos ...",pos);
        var length = pos.mag();
        //获取当前向量长度
        if(length>this.max_r){
            //如果当前触摸点向量长度大于最大半径，则修改当前向量长度控制在大圆半径内
            pos.x =  pos.x/(length/this.max_r);
            pos.y =  pos.y/(length/this.max_r);
        }
        this.smallCircle.clear();
        this.drawCircle(pos.x,pos.y);
    },

    onTouchEnd: function(event) {
        console.log("end ...");
        this.smallCircle.clear();
        this.drawCircle(0,0);
    },

    onTouchCancel: function(event) {
        console.log("cancel ...");
        this.smallCircle.clear();
        this.drawCircle(0,0);
    },


    drawCircle:function(x=0,y=0){
        var graphics=this.getComponent(cc.Graphics);
        console.log("this.max_r",this.max_r)
        graphics.circle(0,0,this.max_r);
        // graphics.circle(0,0,20);
        //添加颜色及透明度
        let fillColor = new cc.Color(0,0,0,0);//声明一个颜色变量
        fillColor.a=120;//添加透明度
        graphics.fillColor=fillColor;//填充
        graphics.stroke();
        graphics.fill();
        this.drawSmallCircle(x,y);
   },
   drawSmallCircle:function(x,y){
        var sprite = this.getComponent(cc.Graphics);
        sprite.circle(x,y,25);
        //添加颜色及透明度
        let fillColor = new cc.Color(255,255,255,255);//声明一个颜色变量
        fillColor.a=60;//添加透明度
        sprite.fillColor=fillColor;//填充
        sprite.stroke();
        sprite.fill();
        this.smallCircle = sprite;
    },

        


    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start () {

    },

    // update (dt) {},
});
