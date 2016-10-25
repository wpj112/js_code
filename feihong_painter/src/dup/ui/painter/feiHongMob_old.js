/**
 * @description 网盟嵌入式广告Painter exp
 * @author wangyungan
 **/
oojs.define({
    /**
     * painter名称
     */
    name: 'feiHongMob',
    /**
     * 命名空间，不能修改
     */
    namespace: 'dup.ui.painter',
    /**
     * 依赖模块
     */
    deps: {
        param: 'dup.business.param',
        bdom: 'dup.union.common.bdom',
    },
    /**
     * 回调接口对象
     */
    AdHook: function () {
 
    },
    adSlotInfo: {},
    scriptUrl: "",
    indxChoosed: {},
    tabIdx: 0,
    allowSend: 1,
    /**
     * Painter入口
     */
    render: function (slotInfo) {
        // 展现类型由painter自己确定?
        var e = this;
        this.adSlotInfo = slotInfo;
          // 用于显示加载中图片
         this.addCss(' @-webkit-keyframes bd-loadRotate {from {-webkit-transform:rotate(0deg);} to {-webkit-transform:rotate(360deg);} } @keyframes bd-loadRotate { from {-webkit-transform:rotate(0deg);} to {-webkit-transform:rotate(360deg);} } .bd-load-effect { display: inline-block; vertical-align: middle; background: url(//t12.baidu.com/it/u=3593248742,1654771676&fm=76) no-repeat 0 0; background-size: 100%; -webkit-animation-name: bd-loadRotate; -webkit-animation-duration: 1.3s; -webkit-animation-iteration-count: infinite; -webkit-animation-timing-function: linear; animation-name: bd-loadRotate; animation-duration: 1.3s; animation-iteration-count: infinite; animation-timing-function: linear; }');
        //window.onscroll = this.on_scroll_fun();
        // 数据处理中心,封装所有数据，后续所有数据从templateData获取
        //var templateData = this.processSlotData(slotInfo);
        this.bdom.bind(window, "scroll", function () {
            
          
            var slotInfo = e.adSlotInfo;
            //  文档高度 -(滚到条位置 + 流量器窗口高度) >30
            var Stop = e.bdom.getScrollTop();
            var Cheight = e.bdom.getClientHeight();
            var Sheight = e.bdom.getScrollHeight();
 
            if ((Stop + Cheight - Sheight > -30) && e.allowSend) {
                //alert("you are in the bottom!");
                var cur_tab = e.tabIdx;
                var chose_idx = 0;
                while (1) {
                    var rand_num = parseInt(Math.random() * 1000, 10); //1000的值还需确认
                    if (e.indxChoosed[rand_num] === 1) {
                        continue
                    } else {
                        chose_idx = rand_num;
                        e.indxChoosed[rand_num] = 1;
                        e.tabIdx += 1;
                        break;
                    }
                }
                slotInfo.paramObj.tab = cur_tab;
                slotInfo.paramObj.ptn = chose_idx;
                var wrapperId = slotInfo.containerId;
                if (slotInfo.isOnceSeach) {
                    var frameId = slotInfo.containerId + '_frame'
                    var frame = document.getElementById(frameId);
                    if (frame) {
                        frame.width = 0;
                        frame.height = 0;
                    }
                }
                //templateData['wapperId'] = wrapperId || '';
 
                //var scriptUrl =  templateData['serviceUrl'] + templateData['paramString'];
                var dup_args = slotInfo.response.placement.userdefine;
                var tn = "";
                if (typeof (dup_args) != "undefined") {
                    var args = dup_args.split("|");
                    for (var ii = 0; ii < args.length; ii++) {
                        tmp = args[ii].split("=")
                        if (tmp[0] == "tn") {
                            tn = tmp[1];
                        }
                    }
                }
 
                var paramData = slotInfo.paramObj;
                if (slotInfo.isOnceSeach) {
                    paramData['ari'] = 2;
                    paramData['dc'] = 2;
                    paramData['dtm'] = 'HTML_POST';
                }
                slotInfo.paramObj = paramData
 
                var scriptUrl = e.param.getPmpRequestUrl(slotInfo);
                scriptUrl = scriptUrl.replace('stid=5&', 'stid=0&');
 
                if (slotInfo.isAsync) {
                    var scriptItem = document.createElement('script');
                    scriptItem.src = scriptUrl;
                    scriptItem.type = 'text/javascript';
                    scriptItem.charset = 'UTF-8';
                    var firstScript = document.getElementsByTagName('script')[0];
                    firstScript.parentNode.insertBefore(scriptItem, firstScript);
                } else {
                    var scriptItem = document.createElement('script');
                    scriptItem.src = scriptUrl;
                    scriptItem.charset = "UTF-8"
                    document.body.appendChild(scriptItem);
                    //document.write('<script charset="utf-8" src="' + scriptUrl + '"><\/script>');
                }
                e.allowSend = 0;
                e.render_loading(slotInfo);
                scriptItem.onload = scriptItem.onreadystatechange = function () {
                    //alert("加载完成");
                    e.allowSend = 1;
                    var loading_item = document.getElementById("loadding_item");
                    if (typeof(loading_item) != 'undefined'){
                        document.body.removeChild(loading_item);
                    }
                    
                    
                }
                var new_pos = document.createElement("div");
                new_pos.id = "feihong_pos_" + cur_tab;
                document.body.appendChild(new_pos);
            }
 
        });
 
    },
    addCss:function (cssText){
        var style = document.createElement('style'); //创建一个style元素
        var head = document.head || document.getElementsByTagName('head')[0]; //获取head元素
        style.type = 'text/css'; //这里必须显示设置style元素的type属性为text/css，否则在ie中不起作用
        if(style.styleSheet){ //IE
            var func = function(){
                //防止IE中stylesheet数量超过限制而发生错误
                try{ 
                    style.styleSheet.cssText = cssText;
                }catch(e){

                }
            }
            //如果当前styleSheet还不能用，则放到异步中则行
            if(style.styleSheet.disabled){
                setTimeout(func,10);
            }else{
                func();
            }
        }else{
            //w3c浏览器中只要创建文本节点插入到style元素中就行了
            var textNode = document.createTextNode(cssText);
            style.appendChild(textNode);
        }
        head.appendChild(style); //把创建的style元素插入到head中    
    },
    render_loading: function(slotInfo){
        var screen_width = slotInfo.paramObj.rw;
        
        var load_item = document.createElement("div");
        load_item.id = "loadding_item";
        load_item.style.display = "block";
        load_item.style.position = "relative";
        load_item.style.left = 0;
        load_item.style.width = screen_width +"px";
        load_item.style.height = screen_width/10+"px";
        load_item.style.backgroundColor = "#eee";
        
        var item_height = screen_width/10;
        var loading_img = document.createElement("div");
        loading_img.id = "loading_img";
        loading_img.className = "bd-load-effect";
        loading_img.style.position = "absolute";
        loading_img.style.width = screen_width/20+"px";
        loading_img.style.height = screen_width/20+"px";
        loading_img.style.top = item_height/4 + "px";
        loading_img.style.left = screen_width*10/30 +"px";
        load_item.appendChild(loading_img);
        document.body.appendChild(load_item);
        
        var loading_text = document.createElement("span");
        loading_text.id = "loading_text";
        loading_text.innerHTML = "更多内容加载中";
        loading_text.style.position = "absolute";
        loading_text.style.width = screen_width/3+"px";
        loading_text.style.height = item_height/2+"px";
        loading_text.style.top = item_height/4 + "px";
        loading_text.style.right = screen_width*8/30 + "px";
        loading_text.style.font = item_height*2/5+"px \"Microsoft YaHei\"";
        loading_text.style.lineHeight = screen_width/20 + "px";
        load_item.appendChild(loading_text);
        
        document.body.appendChild(load_item);
        
        
        
    },
    /**
     * 其他功能函数
     */
 
    /**
     * 获取广告容器
     * @param {string} wrapperId 总控传入的容器id
     * @return {Object} 容器Dom元素
     **/
    getWrapper: function (slotId, wrapperId) {
        var asyncWrapperId = 'cpro_' + slotId;
        var result = document.getElementById(asyncWrapperId);
        if (!result) {
            result = document.getElementById(wrapperId);
        }
        return result;
    },
 
 
});