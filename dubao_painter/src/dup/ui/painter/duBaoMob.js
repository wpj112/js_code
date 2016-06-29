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
        if (slotInfo.isOnceSeach)
        {
            var frameId = slotInfo.containerId + '_frame'
            var frame = document.getElementById(frameId);
            if (frame){
                frame.width = 0;
                frame.height = 0;
            }
        }
        //templateData['wapperId'] = wrapperId || '';

        //var scriptUrl =  templateData['serviceUrl'] + templateData['paramString'];
        var paramData =  slotInfo.paramObj;
            if (slotInfo.isOnceSeach) {
            paramData['ari'] = 2;
            paramData['dc'] = 2;
            paramData['dtm'] = 'HTML_POST';
            }
            slotInfo.paramObj = paramData
		
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


});
