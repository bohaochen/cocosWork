cc.Class({
        extends: cc.Component,
    
    
        properties: {
            starPrefab: {
                default: null,
                type: cc.Prefab
            },
            
            maxStarDuration: 0,
            minStarDuration: 0,
            
            ground: {
                default: null,
                type: cc.Node
            },
            
            player: {
                default: null,
                type: cc.Node
            },
    
    
            scoreDisplay: {
                default: null,
                type: cc.Label
            }, 

        },
    
    
        // use this for initialization
        onLoad: function () {
            //获取地平面的y轴坐标，node属性里有x（x轴坐标），y（y轴坐标），width（宽度），height（高度）
            this.groundY = this.ground.y + this.ground.height/2;   
            //初始化定时器
            this.timer = 0;
            this.starDuration = 0;
            //生成一个新的星星
            this.spawnNewStar();
            this.score = 0;
        //   this.setLandscape();
        },
        setLandscape() {
            //设置横屏
            if (cc.sys.isNative && cc.sys.os === cc.sys.OS_ANDROID) {
                jsb.reflection.callStaticMethod("org/cocos2dx/javascript/AppActivity",
                "changeOrientation", "(I)V", 0); //0横1竖
            }else if (cc.sys.isNative && cc.sys.os === cc.sys.OS_IOS) {
                jsb.reflection.callStaticMethod("IOSHelper", "changeOrientation:", 0);
            }else {
                cc.view.setOrientation(cc.macro.ORIENTATION_LANDSCAPE);
            }
            let width = cc.view.getFrameSize().height < cc.view.getFrameSize().width ?
            cc.view.getFrameSize().width : cc.view.getFrameSize().height;
            let height = cc.view.getFrameSize().height > cc.view.getFrameSize().width ?
            cc.view.getFrameSize().width : cc.view.getFrameSize().height;
            cc.view.setFrameSize(width, height);
            cc.view.setDesignResolutionSize(width, height, cc.ResolutionPolicy.FIXED_WIDTH);
        },
        spawnNewStar: function(){
            //使用给定的模板在场景中生成一个新节点
            var newStar = cc.instantiate(this.starPrefab); //iinstantiate是复制给定的对象
            //将新增的节点添加到Canvas节点下面
            this.node.addChild(newStar);
            //为星星设置一个随机位置
            this.node.zIndex = 99;
            console.log("newStar",newStar)

            newStar.setPosition(this.getNewStarPosition());

            //将Game组件的实例传入星星组件
            newStar.getComponent("Star").mainlogic = this;      //mainlogic是脚本Star中的一个变量
        },
        
        getNewStarPosition: function(){                            
        var randX = 0;
        // 根据地平面位置和主角跳跃高度，随机得到一个星星的 y 坐标
        var randY = this.groundY + Math.random() * this.player.getComponent('Player').jumpHeight + 50;
        // 根据屏幕宽度，随机得到一个星星 x 坐标
        var maxX = this.node.width/2;
        randX = (Math.random() - 0.5) * 2 * maxX;
        // 返回星星坐标
        return cc.v2(randX, randY);
        },
    
        update:function(a){
        }
    });
