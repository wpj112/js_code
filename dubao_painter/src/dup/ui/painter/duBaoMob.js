/**
 * @description 网盟嵌入式广告Painter exp
 * @author wangyungan
 **/
oojs.define({
    /**
     * painter名称
     */
    name: 'duBaoMob',
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
    AdHook: function() {

    },

    /**
     * Painter入口
     */
    render: function(slotInfo) {
        // 展现类型由painter自己确定?

        // 数据处理中心,封装所有数据，后续所有数据从templateData获取
        //var templateData = this.processSlotData(slotInfo);
        var wrapperId = slotInfo.containerId;
        //templateData['wapperId'] = wrapperId || '';

        //var scriptUrl =  templateData['serviceUrl'] + templateData['paramString'];
		var scriptUrl =  this.param.getPmpRequestUrl(slotInfo);
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
    },

    /**
     * 其他功能函数
     */

    /**
     * 获取广告容器
     * @param {string} wrapperId 总控传入的容器id
     * @return {Object} 容器Dom元素
     **/
    getWrapper : function (slotId, wrapperId) {
        var asyncWrapperId = 'cpro_' + slotId;
        var result = document.getElementById(asyncWrapperId);
        if (!result) {
            result = document.getElementById(wrapperId);
        }
        return result;
    },

    processSlotData: function(slotInfo) {
        var DEFAULT_SKIN = 'mobile_skin_white_red';

        //TODO:paramData是要发送的请求数据，需在确认！！
        var paramData = this.param.getParamObj(slotInfo);

        var response = slotInfo['response'];
        var userdefine = response['placement']['userdefine'] || {};
        var userdefineData = {};

        if (userdefine) {
            var userdata = userdefine.split('|');
            for (var term in userdata) {
                if (/,/.test(userdata[term])) {
                    //var others = [];
                    var idata = term.split(',');
                    for (var iterm in idata) {
                        if (/=/.test(idata[iterm])) {
                            var key = idata[iterm].split('=')[0];
                            var value = idata[iterm].split('=')[1];
                            userdefineData[key] = value;
                        }
                    }
                    //userdefineData['others'] = others.join(',');
                } else {
                    var key = userdata[term].split('=')[0];
                    var value = userdata[term].split('=')[1];

                    userdefineData[key] = value;
                }
            }
        }


        // 获取广告位id
        var slotId = response['tuid'].split('_')[0];
        // TODO:正式产品可去掉exp_
        var iframeId = 'exp_cproIframe' + slotInfo['id'];

        var displayType = slotInfo['displayType'] || '';
        // TODO:模板接口
        var tn = userdefineData['cpro_template'] || '';
        // var tn = 'template_inlay_all_mobile_insert_screen_wap';
        var styleType = tn.toLowerCase();

        var pvId = response['queryid'] || '';
        var unionAccount = response['placement']['basic']['cname'] || '';
        var adIndex = slotInfo['index'] || 0;

        var skin = response['placement']['fillstyle']['cloudTheme']['skin'] || '';
        if (!skin) {
            skin = DEFAULT_SKIN;
        }
        paramData['skin'] = skin;
        // TODO:实验用
        paramData['at'] = 2;

        // 插屏展现时机 insert show time
        // 默认为进入时展开. 1：进入时展开 2：底部展开 3：进入和底部展开 4:回滑时展开
        var ist = parseInt(userdefineData['ist'], 10) || 1;//util.data.getOnce('ist')|| window['ist']  || 1;
        paramData['ist'] = ist;

        // TODO:比例暂时只有6.5 slotWidth / slotHeight
        var scale = parseFloat(userdefineData['scale']) || 6.5;

        var scale = 6 / 5;
        paramData['scale'] = 6.5;

        var viewportWidth = window.innerWidth || 0;
        var viewportHeight = window.innerHeight || 0;
        var borderSize = 0;
        var adWidth;
        var adHeight;
        var userMargin;
        if (ist > 10) {
            // TODO:留um作为自定义margin接口
            userMargin = parseInt(userdefineData['um'], 10) || 1;
        } else {
            userMargin = 9 / 10;
        }
        if (viewportWidth * 1.0 / viewportHeight > scale) {
            adWidth = viewportHeight * userMargin * scale - 2 * borderSize;
            adHeight = viewportHeight * userMargin - 2 * borderSize;
        } else {
            adWidth = viewportWidth * userMargin - 2 * borderSize;
            adHeight = viewportWidth * userMargin / scale - 2 * borderSize;
        }
        var iframeWidth = adWidth;
        var iframeHeight = adHeight;

        // 强制设置rsi0， rsi1 以支持图片检索
        paramData['rsi0'] = iframeWidth;
        paramData['rsi1'] = iframeHeight;

        // 广告展现时长
        var waitSeconds = parseInt(userdefineData['bd_close_time'], 10) || 15;

        paramData['dc'] = '2';
        paramData['wt'] = 1;

        // 插屏请求的广告数强制为1
        paramData['adn'] = 1;
        paramData['n'] = unionAccount;
        //paramData['conW'] = iframeWidth;
        //paramData['conH'] = iframeHeight;
        paramData['tn'] = tn;
        paramData['qn'] = pvId;

        // TODO: paramObj中ltu转码不对，故重新赋值
        paramData['ltu'] = window.location.href;
        // 根据paramData获取paramString
        var paramStringArray = [];
        for (var key in paramData) {
            if (key && paramData.hasOwnProperty(key) && paramData[key]) {
                paramStringArray.push(''
                    + key
                    + '='
                    + encodeURIComponent(paramData[key].toString())
                );
            }
        }

        var POS_URL = 'http://pos.baidu.com/ecom?';
        var serviceUrl = POS_URL;
        var paramString = paramStringArray.join('&');

        // 封装后返回
        return {
            'slotHtmlInfo': paramData,
            'slotId': slotId,
            'iframeWidth': iframeWidth,
            'iframeHeight': iframeHeight,
            'styleType': styleType,
            'unionAccount': unionAccount,
            'adIndex': adIndex,
            'serviceUrl': serviceUrl,
            'paramString': paramString,
            'shadowSize': iframeWidth / 20,
            'tn': tn,
            'skin': skin,
            'iframeId': iframeId,
            'ist': ist,
            'waitSeconds': waitSeconds
        };
    }

});
