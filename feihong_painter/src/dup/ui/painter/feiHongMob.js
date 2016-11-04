/**
 * @description 网盟飞虹painter
 * @author weipingjie
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
    fhTopflag: 0,
    fhBannerStatus: 0,
    sendMonitorFlag: 1,
    windowLoadedFlag:0,
    preClientY:0,
    adsToBottom:0,
    bdHeight:0,
    topBannerHeight:30,
    divHeight:0,
    frameHeight:300,
    newDivpos:0,
    loadMoreHeight:50,

    /**
     * Painter入口
     */
    render: function (slotInfo) {
        // 展现类型由painter自己确定?

        //gloabl var define
        // 0:show at bottom 1:show hover
        window.fhShowStatus = 0;
        this.frameHeight = slotInfo.paramObj.rw * 300/320;
        this.divHeight = this.frameHeight + 80;

        var e = this;
        var myDate = new Date();
        window.feihongQueryID = this.md5(Math.random()*1000000 + window.document.location.href
            + window.document.cookie + myDate.getTime());
        var showReq = '&feihong_type=1'; 
        this.sendMonitor(showReq);
        this.adSlotInfo = slotInfo;
        this.bdHeight = this.bdom.getScrollHeight();

        slotInfo.paramObj.coa += '%26tab%3D' + '0' + '%26ptn%3D' + '0';
        // 用于显示加载中图片
        this.addCss(' @-webkit-keyframes bd-loadRotate {from {-webkit-transform:rotate(0deg);}'
            + 'to {-webkit-transform:rotate(360deg);} }'
            + '@keyframes bd-loadRotate { from {-webkit-transform:rotate(0deg);} '
            + 'to {-webkit-transform:rotate(360deg);} }'
            + '.bd-load-effect { display: inline-block; vertical-align: middle; '
            + 'background: url(//t12.baidu.com/it/u=3593248742,1654771676&fm=76) no-repeat 0 0; background-size: 100%; '
            + '-webkit-animation-name: bd-loadRotate; -webkit-animation-duration: 1.3s; '
            + '-webkit-animation-iteration-count: infinite; -webkit-animation-timing-function: linear;'
            + 'animation-name: bd-loadRotate; animation-duration: 1.3s; animation-iteration-count: infinite; '
            + 'animation-timing-function: linear; }');

        var main_item = this.createBackupWrapper(slotInfo.slotId);
        this.addBackBtn(10, 100, slotInfo);
        //fhTopitem.id = 'fh_top_item';
        //document.body.appendChild(fhTopitem);

        //e.renderBanner(slotInfo);
        this.sendAdsRequest();
        this.sendAdsRequest();
        //window.onscroll = this.on_scroll_fun();
        // 数据处理中心,封装所有数据，后续所有数据从templateData获取

        this.bdom.bind(window, "touchmove", function () {

            var slotInfo = e.adSlotInfo;
            var topItem = document.getElementById('fh_top_item_' + slotInfo.slotId);
            var Stop = e.bdom.getScrollTop();
            var Cheight = e.bdom.getClientHeight();

            var topHeight = topItem.offsetTop;
            
            //for send see the feihong
            if ((e.sendMonitorFlag === 1) && (topHeight <= (Stop + Cheight))){
                e.sendMonitor('&feihong_type=3');
                e.sendMonitorFlag = 0;
            }
/****
            //if ((e.fhTopflag === 0) && (document.readyState == 'complete') &&(topHeight <= (Stop + Cheight - 50))) {
            //for auto go to top
            if ((e.fhTopflag === 0) && (document.readyState == 'complete') &&(topHeight <= (Stop + Cheight - 50))) {
                var topTop = topItem.offsetTop;
                e.fhTopflag = 1;
                var scrollLength = topTop - Stop;
                window.stepLength = scrollLength / 60;
                window.curTop = Stop;
                window.topTop = topTop
                var moveInter = setInterval(function() {
                    if (window.curTop <= window.topTop){
                        window.curTop = window.curTop + window.stepLength;
                        window.scrollTo(0, window.curTop);
                    }else{
                        clearInterval(moveInter);
                        var topItem = document.getElementById('fh_top_item');
                        topItem.style.position = 'absolute';
                        topItem.style.top = '0px';
                        topItem.style.zIndex = 2147483647;
                        topItem.style.backgroundColor = '#fff';
                        window.scrollTo(0,0);
                    }
                },3);
                window.fhShowStatus = 1;
                e.renderFloatBanner(e);
            }
            ****/
        });
    },
    sendAdsRequest: function () {
        var e = this;
        var slotInfo = e.adSlotInfo;

        e.allowSend = 0;
        var curTab = e.tabIdx;
        var choseIdx = 0;
        while (1) {
            // 1000的值还需确认
            //var randNum = parseInt(Math.random() * 1000, 10);
            var randNum = parseInt(Math.random() * 100, 10);
            if (e.indxChoosed[randNum] === 1) {
                continue;
            } else {
                choseIdx = randNum;
                e.indxChoosed[randNum] = 1;
                e.tabIdx += 1;
                break;
            }
        }

        slotInfo.paramObj.coa = slotInfo.paramObj.coa.replace(/tab%3D\d+/, 'tab%3D' + curTab);
        slotInfo.paramObj.coa = slotInfo.paramObj.coa.replace(/ptn%3D\d+/, 'ptn%3D' + choseIdx);
        var wrapperId = slotInfo.containerId;
        if (slotInfo.isOnceSeach) {
            var frameId = slotInfo.containerId + '_frame';
            var frame = document.getElementById(frameId);
            if (frame) {
                frame.width = 0;
                frame.height = 0;
            }
        }

        var dupArgs = slotInfo.response.placement.userdefine;
        var tn = '';
        var tmp = [];
        if (typeof (dupArgs) !== 'undefined') {
            var args = dupArgs.split('|');
            for (var ii = 0; ii < args.length; ii++) {
                tmp = args[ii].split('=');
                if (tmp[0] === 'tn') {
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
        slotInfo.paramObj = paramData;

        var scriptUrl = e.param.getPmpRequestUrl(slotInfo);
        scriptUrl = scriptUrl.replace('stid=5&', 'stid=0&');

        var scriptItem = document.createElement('script');
        if (slotInfo.isAsync) {
            scriptItem.src = scriptUrl;
            scriptItem.type = 'text/javascript';
            scriptItem.charset = 'UTF-8';
            var firstScript = document.getElementsByTagName('script')[0];
            firstScript.parentNode.insertBefore(scriptItem, firstScript);
        } else {
            scriptItem.src = scriptUrl;
            scriptItem.charset = 'UTF-8';
            document.body.appendChild(scriptItem);
        }
        e.sendMonitor('&feihong_type=2&tab=' + curTab + '&ptn=' + choseIdx);
        e.renderLoading(slotInfo);
        var topItem = document.getElementById('fh_top_item_' + slotInfo.slotId);
        scriptItem.onload = scriptItem.onreadystatechange = scriptItem.onerror = function () {
            e.allowSend = 1;
            var loadingItem = document.getElementById('loadding_item');
            if (!typeof (loadingItem) !== 'undefined') {
                topItem.removeChild(loadingItem);
            }

        };
        
        var newPos = document.createElement('div');
        newPos.id = 'feihong_pos_' + curTab;
        document.body.appendChild(newPos);
    },
    sendMonitor: function (request){
        var imgItem = document.createElement('img');
        imgItem.display = 'none';
        imgItem.src = 'http://202.108.23.15:8030/m.js?&inlay=1&feihong_queryid=' + window.feihongQueryID + request;
    },
    addCss: function (cssText) {
        var style = document.createElement('style');
        var head = document.head || document.getElementsByTagName('head')[0];
        style.type = 'text/css';
        // IE
        if (style.styleSheet) {
            var func = function () {
                // 防止IE中stylesheet数量超过限制而发生错误
                try {
                    style.styleSheet.cssText = cssText;
                } catch (e) {

                }
            };
            if (style.styleSheet.disabled) {
                setTimeout(func, 10);
            } else {
                func();
            }
        } else {
            // w3c浏览器中只要创建文本节点插入到style元素中就行了
            var textNode = document.createTextNode(cssText);
            style.appendChild(textNode);
        }
        head.appendChild(style);
    },
    renderBanner: function (slotInfo) {
        var screenWidth = slotInfo.paramObj.rw;
        var bannerItem = document.createElement('div');
        var topItem = document.getElementById('fh_top_item');
        bannerItem.id = 'fh_banner_item';
        bannerItem.style.display = 'block';
        bannerItem.style.position = 'relative';
        bannerItem.style.height = screenWidth * 94 / 640 + 'px';
        bannerItem.style.width = screenWidth + 'px';
        bannerItem.style.backgroundColor = '#FFF';
        bannerItem.style.margin = '0px 0px 2px 0px';

        var imgBanner = document.createElement('img');
        imgBanner.id = 'Banner_img_item';
        imgBanner.src = 'http://t12.baidu.com/it/u=3361467848,2190901240&fm=76';
        imgBanner.style.display = 'block';
        imgBanner.style.position = 'absolute';
        imgBanner.style.height = screenWidth * 94 / 640 + 'px';
        imgBanner.style.width = screenWidth + 'px';
        bannerItem.appendChild(imgBanner);
        topItem.appendChild(bannerItem);
    },

    renderLoading: function (slotInfo) {
        var screenWidth = slotInfo.paramObj.rw;
        var loadItem = document.createElement('div');

        loadItem.id = 'loadding_item';
        loadItem.style.display = 'block';
        loadItem.style.position = 'relative';
        loadItem.style.left = 0;
        loadItem.style.width = screenWidth + 'px';
        loadItem.style.height = screenWidth / 10 + 'px';
        loadItem.style.backgroundColor = '#eee';
        var itemHeight = screenWidth / 10;
        
        var loadingText = document.createElement('img');
        loadingText.id = 'loadingText';
        loadingText.src = 'http://t10.baidu.com/it/u=4139712021,1947734414&fm=76';
        loadingText.style.position = 'absolute';
        loadingText.style.width = screenWidth / 3 + 'px';
        loadingText.style.height = screenWidth * 7/ (3*56) + 'px';
        loadingText.style.top = itemHeight / 4 + 'px';
        loadingText.style.right = screenWidth * 8 / 30 + 'px';
        loadItem.appendChild(loadingText);
        

        var loadingImg = document.createElement('div');
        loadingImg.id = 'loadingImg';
        loadingImg.className = 'bd-load-effect';
        loadingImg.style.position = 'absolute';
        loadingImg.style.width = screenWidth / 20 + 'px';
        loadingImg.style.height = screenWidth / 20 + 'px';
        loadingImg.style.top = itemHeight / 4 + 'px';
        loadingImg.style.left = screenWidth * 10 / 30 + 'px';
        loadItem.appendChild(loadingImg);

        var topItem = document.getElementById('fh_top_item_' + slotInfo.slotId);
        topItem.appendChild(loadItem);
    },
    md5:function(a){function h(a,b){var c,d,g,e,f;g=a&2147483648;e=b&2147483648;c=a&1073741824;d=b&1073741824;f=(a&1073741823)+(b&1073741823);return c&d?f^2147483648^g^e:c|d?f&1073741824?f^3221225472^g^e:f^1073741824^g^e:f^g^e}function f(a,b,c,d,g,e,f){a=h(a,h(h(b&c|~b&d,g),f));return h(a<<e|a>>>32-e,b)}function k(a,b,c,d,g,e,f){a=h(a,h(h(b&d|c&~d,g),f));return h(a<<e|a>>>32-e,b)}function l(a,b,d,c,e,g,f){a=h(a,h(h(b^d^c,e),f));return h(a<<g|a>>>32-g,b)}function m(a,b,d,c,g,e,f){a=h(a,h(h(d^(b|~c),g),f));return h(a<<e|a>>>32-e,b)}function n(a){var b="",d="",c;for(c=0;3>=c;c++)d=a>>>8*c&255,d="0"+d.toString(16),b+=d.substr(d.length-2,2);return b}var g=[],e,p,q,r,s,b,c,d;a=function(a){a=a.replace(/\r\n/g,"\n");for(var b="",d=0;d<a.length;d++){var c=a.charCodeAt(d);128>c?b+=String.fromCharCode(c):(127<c&&2048>c?b+=String.fromCharCode(c>>6|192):(b+=String.fromCharCode(c>>12|224),b+=String.fromCharCode(c>>6&63|128)),b+=String.fromCharCode(c&63|128))}return b}(a);g=function(a){var b,c=a.length;b=c+8;for(var d=16*((b-b%64)/64+1),e=Array(d-1),g=0,f=0;f<c;)b=(f-f%4)/4,g=f%4*8,e[b]|=a.charCodeAt(f)<<g,f++;b=(f-f%4)/4;e[b]|=128<<f%4*8;e[d-2]=c<<3;e[d-1]=c>>>29;return e}(a);b=1732584193;c=4023233417;a=2562383102;d=271733878;for(e=0;e<g.length;e+=16)p=b,q=c,r=a,s=d,b=f(b,c,a,d,g[e+0],7,3614090360),d=f(d,b,c,a,g[e+1],12,3905402710),a=f(a,d,b,c,g[e+2],17,606105819),c=f(c,a,d,b,g[e+3],22,3250441966),b=f(b,c,a,d,g[e+4],7,4118548399),d=f(d,b,c,a,g[e+5],12,1200080426),a=f(a,d,b,c,g[e+6],17,2821735955),c=f(c,a,d,b,g[e+7],22,4249261313),b=f(b,c,a,d,g[e+8],7,1770035416),d=f(d,b,c,a,g[e+9],12,2336552879),a=f(a,d,b,c,g[e+10],17,4294925233),c=f(c,a,d,b,g[e+11],22,2304563134),b=f(b,c,a,d,g[e+12],7,1804603682),d=f(d,b,c,a,g[e+13],12,4254626195),a=f(a,d,b,c,g[e+14],17,2792965006),c=f(c,a,d,b,g[e+15],22,1236535329),b=k(b,c,a,d,g[e+1],5,4129170786),d=k(d,b,c,a,g[e+6],9,3225465664),a=k(a,d,b,c,g[e+11],14,643717713),c=k(c,a,d,b,g[e+0],20,3921069994),b=k(b,c,a,d,g[e+5],5,3593408605),d=k(d,b,c,a,g[e+10],9,38016083),a=k(a,d,b,c,g[e+15],14,3634488961),c=k(c,a,d,b,g[e+4],20,3889429448),b=k(b,c,a,d,g[e+9],5,568446438),d=k(d,b,c,a,g[e+14],9,3275163606),a=k(a,d,b,c,g[e+3],14,4107603335),c=k(c,a,d,b,g[e+8],20,1163531501),b=k(b,c,a,d,g[e+13],5,2850285829),d=k(d,b,c,a,g[e+2],9,4243563512),a=k(a,d,b,c,g[e+7],14,1735328473),c=k(c,a,d,b,g[e+12],20,2368359562),b=l(b,c,a,d,g[e+5],4,4294588738),d=l(d,b,c,a,g[e+8],11,2272392833),a=l(a,d,b,c,g[e+11],16,1839030562),c=l(c,a,d,b,g[e+14],23,4259657740),b=l(b,c,a,d,g[e+1],4,2763975236),d=l(d,b,c,a,g[e+4],11,1272893353),a=l(a,d,b,c,g[e+7],16,4139469664),c=l(c,a,d,b,g[e+10],23,3200236656),b=l(b,c,a,d,g[e+13],4,681279174),d=l(d,b,c,a,g[e+0],11,3936430074),a=l(a,d,b,c,g[e+3],16,3572445317),c=l(c,a,d,b,g[e+6],23,76029189),b=l(b,c,a,d,g[e+9],4,3654602809),d=l(d,b,c,a,g[e+12],11,3873151461),a=l(a,d,b,c,g[e+15],16,530742520),c=l(c,a,d,b,g[e+2],23,3299628645),b=m(b,c,a,d,g[e+0],6,4096336452),d=m(d,b,c,a,g[e+7],10,1126891415),a=m(a,d,b,c,g[e+14],15,2878612391),c=m(c,a,d,b,g[e+5],21,4237533241),b=m(b,c,a,d,g[e+12],6,1700485571),d=m(d,b,c,a,g[e+3],10,2399980690),a=m(a,d,b,c,g[e+10],15,4293915773),c=m(c,a,d,b,g[e+1],21,2240044497),b=m(b,c,a,d,g[e+8],6,1873313359),d=m(d,b,c,a,g[e+15],10,4264355552),a=m(a,d,b,c,g[e+6],15,2734768916),c=m(c,a,d,b,g[e+13],21,1309151649),b=m(b,c,a,d,g[e+4],6,4149444226),d=m(d,b,c,a,g[e+11],10,3174756917),a=m(a,d,b,c,g[e+2],15,718787259),c=m(c,a,d,b,g[e+9],21,3951481745),b=h(b,p),c=h(c,q),a=h(a,r),d=h(d,s);g=function(a){var b=a,c=0;for(a=8-a.length;c<a;c++)b="0"+b;return b};b=((parseInt("0x"+n(b),16)+parseInt("0x"+n(c),16))%4294967296).toString(16);a=((parseInt("0x"+n(a),16)+parseInt("0x"+n(d),16))%4294967296).toString(16);8>b.length&&(b=g(b));8>a.length&&(a=g(a));return b+a},
    
    /**
     * 其他功能函数
     */

    createBackupWrapper: function(tu) {
        try {
            var scripts = document.getElementsByTagName("script");
            var targetscript = scripts[scripts.length - 1];
            var screenWidth = this.adSlotInfo.paramObj.rw;
            var e = this;

            if (targetscript) {
                var n = targetscript.parentNode;
                if (n) {
                    var new_div = document.createElement("div");
                    new_div.id = "fh_top_item_" + tu;
                    new_div.style.width = screenWidth + 'px';
                    new_div.style.height = this.divHeight + 'px';
                    new_div.style.overflow = "hidden";
                    new_div.style.backgroundColor = '#eee';
                    //new_div.style.boxShadow = '0px 20px 16px #ddd';
                    n.insertBefore(new_div, targetscript);
                    this.newDivpos = new_div.offsetTop;

                    var clientHeight = e.bdom.getClientHeight();
                    this.bdom.bind(new_div, "scroll", function () {
                        var div_height = new_div.clientHeight;
                        var doc_height = new_div.scrollHeight;
                        var scroll_top = new_div.scrollTop;
                        if (scroll_top + div_height > (doc_height - clientHeight - 30)){
                            e.sendAdsRequest();
                            if (e.tabIdx % 4 === 0)  e.sendAdsRequest();
                        }
                    });
                    var frame =document.createElement('div');
                    frame.id = 'fhframeAds';
                    frame.style.width = (screenWidth - 12) + 'px';
                    frame.style.position = 'relative';
                    frame.style.height = this.frameHeight + 'px';
                    frame.style.marginLeft = "4px";
                    frame.style.overflow = 'hidden';
                    frame.style.boxShadow = '0px 20px 30px #bbb';

                    frame.style.borderStyle = 'solid';
                    frame.style.borderColor = '#ddd';
                    frame.style.borderWidth = '2px';
                    frame.style.borderRadius = '4px';

                    var adsDiv = document.createElement('div');
                    //adsDiv.id = 'fh_ads_item_' + tu;
                    adsDiv.id = 'fh_ads_item_pos';
                    adsDiv.style.width = screenWidth + 'px';
                    adsDiv.style.height = "auto";
                    adsDiv.style.left = '-6px';
                    adsDiv.style.position = 'relative';
                    adsDiv.style.backgroundColor = '#fff';
                    this.addTopBanner(new_div);
                    frame.appendChild(adsDiv);
                    new_div.appendChild(frame);
                    this.addLoadMoreBtn(new_div,new_div,tu);
                    return new_div;
                }
            }
        } catch (r) {}
        return !1;
    },
    addTopBanner: function(parent){
        var topBanner = document.createElement("div");
        topBanner.id = 'fhTopBanner';
        topBanner.style.width = this.adSlotInfo.paramObj.rw + 'px';
        topBanner.style.marginTop = '5px';
        topBanner.style.height = this.topBannerHeight + 'px';
        parent.appendChild(topBanner);

        var topImg = document.createElement('img');
        topImg.id = 'fhTopBannerImg';
        topImg.src = "http://t11.baidu.com/it/u=1997875537,4252755060&fm=76";
        topImg.style.marginLeft = '10px';
        topImg.style.height = '24px';
        topBanner.appendChild(topImg);


        var floatBanner = document.createElement("div");
        floatBanner.id = 'floatTopBanner';
        floatBanner.style.display = 'none';
        floatBanner.style.width = this.adSlotInfo.paramObj.rw + 'px';
        floatBanner.style.top = '0px';
        floatBanner.style.height = this.topBannerHeight + 'px';
        floatBanner.style.position = 'fixed';
        floatBanner.style.zIndex = 2147483647 ;
        floatBanner.style.backgroundColor = '#eee';

        var topImg0 = document.createElement('img');
        topImg0.src = "http://t11.baidu.com/it/u=1997875537,4252755060&fm=76";
        topImg0.style.marginTop = '3px';
        topImg0.style.marginLeft = '10px';
        topImg0.style.height = '24px';
        floatBanner.appendChild(topImg0);
        document.body.appendChild(floatBanner);

    },

    addLoadMoreBtn :function(parent,new_div,tu){
        var loadMore = document.createElement("div");
        var screenWidth = this.adSlotInfo.paramObj.rw;
        loadMore.id = 'loadmoreBtn';
        loadMore.width = "100%";
        loadMore.height = this.loadMoreHeight + 'px';
        loadMore.style.position = 'relative';

        var more_img = document.createElement("img");
        more_img.id = "clk_more";
        more_img.src = "http://t12.baidu.com/it/u=3948301196,2507352888&fm=76";
        more_img.style.width = '100px';
        more_img.style.height = '29px';
        more_img.style.marginTop = '8px';
        more_img.style.marginLeft = (this.adSlotInfo.paramObj.rw - 100)/2 + 'px';
        loadMore.appendChild(more_img);
        parent.appendChild(loadMore);
        var e = this;
        this.bdom.bind(loadMore, "click", function() {
            new_div.style.height = (e.bdom.getClientHeight() + 20) + "px";
            new_div.style.overflow = 'scroll';
            new_div.style.webkitOverflowScrolling = 'touch';
            new_div.style.position = 'fixed';
            new_div.style.top = '0px';
            new_div.style.overflow = 'auto';
            new_div.style.zIndex = 2147483647;

            var frame = document.getElementById('fhframeAds');
            frame.style.width = screenWidth + 'px';
            frame.style.height = 'auto';//e.bdom.getClientHeight() + 'px';
            frame.style.marginLeft = '0px';
            frame.style.borderStyle = 'solid';
            frame.style.borderColor = '#ddd';
            frame.style.borderWidth = '0px';
            frame.style.borderRadius = '4px';

            var adsDiv = document.getElementById('fh_ads_item_pos');
            adsDiv.style.left = '0px';

            window.scrollTo(0,0);
            var backDiv = document.getElementById('fhBackDiv');
            backDiv.style.display = 'block';

            var loadMore = document.getElementById('loadmoreBtn');
            loadMore.style.display = 'none';

            var floatBanner = document.getElementById('floatTopBanner');
            floatBanner.style.display = 'block';

            var topBanner = document.getElementById('fhTopBannerImg');
            topBanner.style.display = 'none';

            e.sendMonitor('&feihong_type=4&click_more=1');
        });

    },
    addBackBtn: function(top,left,slotInfo){
        var backDiv = document.createElement('div');
        backDiv.id = 'fhBackDiv';
        backDiv.style.position = 'fixed';
        backDiv.style.display = 'none';
        backDiv.style.height = '30px';
        backDiv.style.width = '100%';
        backDiv.style.bottom = '0px';
        //backDiv.style.boxShadow = '-15px -20px 10px #666 inset';
        backDiv.style.backgroundColor = '#222';
        backDiv.style.opacity = '0.6';
        backDiv.style.zIndex = 2147483647;

        var imgBack = document.createElement('img');
        var screenWidth = slotInfo.paramObj.rw;
        var tu = slotInfo.slotId;
        var e = this;
        imgBack.id = 'feihong_imgBack';
        imgBack.src = 'http://t10.baidu.com/it/u=163050990,889310308&fm=76';
        imgBack.style.position = 'absolute';
        imgBack.style.top = '5px';
        imgBack.style.height = '20px';
        imgBack.style.width = '63';
        imgBack.style.right = (screenWidth - 63)/2 + 'px';
        e.fhBannerStatus =  1;
        backDiv.appendChild(imgBack);

        e.bdom.bind(backDiv, 'click', function(){
            var topItem = document.getElementById('fh_top_item_' + slotInfo.slotId);
            topItem.style.height = e.divHeight + 'px';
            topItem.style.overflow = "hidden";
            topItem.style.position = 'relative';
            topItem.scrollTop = 0;
            document.documentElement.style.overflow = 'auto';
            var backDiv = document.getElementById('fhBackDiv');
            backDiv.style.display = 'none';

            var frame = document.getElementById('fhframeAds');
            frame.style.width = (screenWidth - 12) + 'px';
            frame.style.height = e.frameHeight + 'px';
            frame.style.marginLeft = "4px";
            frame.style.borderStyle = 'solid';
            frame.style.borderColor = '#ddd';
            frame.style.borderWidth = '2px';
            frame.style.borderRadius = '4px';
            var adsDiv = document.getElementById('fh_ads_item_pos');
            adsDiv.style.left = '-6px';

            var loadMore = document.getElementById('loadmoreBtn');
            loadMore.style.display = 'block';
            window.scrollTo(0,e.newDivpos);

            var floatBanner = document.getElementById('floatTopBanner');
            floatBanner.style.display = 'none';

            var topBanner = document.getElementById('fhTopBannerImg');
            topBanner.style.display = 'block';
        });
        document.body.appendChild(backDiv);

    },
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
    }


});
