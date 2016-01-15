/**
 * @description 网盟业务逻辑类
 * @author zhangziqiu
 **/
oojs.define({
    /**
     * painter名称
     */
    name: 'businessLogic',
    /**
     * 命名空间，不能修改
     */
    namespace: 'dup.union.business',
    /**
     * 依赖模块
     */
    deps: {
    },
    /** 每一种展现类型, 限制的最大广告个数. 主题链接当作一种展现类型处理 **/
    adsCountLimit: {
        'inlay': 8,
        'float': 2,
        'patch': 2,
        'linkunit': 20,
        'popup': 1
    },
    /**
     * 每一种展现类型已经显示的广告个数
     * 以页面中真实存在dom的广告位为准，
     * 所以每种类型下改用具体的iframe id记录
     **/
    adsCountRecorder: {
        'inlay': {},
        'float': {},
        'patch': {},
        'linkunit': {},
        'popup': {}
    },
    /**
     * 广告个数校验参数类
     * {string} deviceType 设备类型
     * {string} displayType 展现类型
     * {string} displayMainType 展现类型主分类
     * {string} displaySubType 展现类型二级分类
     * {string} styleType 展现类型
     * {string} stuffType 物料类型
     **/
    adsCountOption: {
        deviceType: 'pc',
        displayType: 'inlay-fixed',
        displayMainType: 'inlay',
        displaySubType: 'fixed',
        styleType: 'template_inlay_all_normal',
        stuffType: 'text'
    },
    /**
     *  广告展现类型
     * */
    displayTypeMap: {
        '1001': 'inlay-fixed',
        '1002': 'inlay-float',
        '2001': 'float-left-middle',
        '2002': 'float-right-middle',
        '2003': 'float-left-bottom',
        '2004': 'float-right-bottom',
        '2005': 'float-top',
        '2006': 'float-bottom',
        '2007': 'float-linkunit-left',
        '3001': 'patch-webpage',
        '3002': 'patch-flash',
        '4001': 'captcha-webpage'
    },
    /**
     * 广告个数校验参数类的预处理
     * @param {Object} option 参数集合
     * @return {Object} 处理后的参数集合
     **/
    processAdsCountOption: function (option) {
        var result = {};

        result.deviceType = (option.deviceType
            || this.adsCountOption.deviceType
        ).toLowerCase();
        result.displayType = (option.displayType
            || this.adsCountOption.displayType
        ).toLowerCase();
        result.styleType = (option.styleType
            || this.adsCountOption.styleType
        ).toLowerCase();
        result.stuffType = (option.stuffType
            || this.adsCountOption.stuffType
        ).toLowerCase();
        result.domId = option.domId;

        // 主题链接的特殊处理
        if (result.styleType.indexOf('tlink') > -1
            || result.styleType.indexOf('linkunit') > -1
            || result.styleType.indexOf('baiducustnativead') > -1
        ) {
            result.displayType = 'linkunit-fixed';
        }
        // 悬浮的特殊处理
        if (result.styleType.indexOf('float_xuanfuwin') >= 0) {
            result.displayType = 'popup-float';// 视窗
        }

        // 从displayType中获取到主分类和二级分类
        var displayTypeArray = result.displayType.split('-');
        result.displayMainType = displayTypeArray[0]
            || this.adsCountOption.displayMainType;
        result.displaySubType = displayTypeArray[1]
            || this.adsCountOption.displaySubType;

        return result;
    },
    /**
     * 检验广告个数
     * @param {Object} option 参数集合
     *
     * @return {boolean} 是否满足广告个数限制
     **/
    checkAdsCount: function (option) {
        option = this.processAdsCountOption(option);
        var displayMainType = option.displayMainType;
        var adsCount = this.getAdsCount(option);
        var limitCount = this.adsCountLimit[displayMainType];

        return adsCount < limitCount;
    },
    g: function (id, win) {
        win = win || window;
        if ('string' === typeof id || id instanceof String) {
            return win.document.getElementById(id);
        }
        else if (id && id.nodeName && (id.nodeType ==
            1 || id.nodeType == 9)) {
            return id;
        }
        return id;
    },
    /**
     * 获取广告个数
     * @param {Object} option 参数集合
     * @return {number} 当前已经显示的广告个数
     **/
    getAdsCount: function (option) {
        option =  this.processAdsCountOption(option);
        var count = 0;
        var displayTypeMap = this.adsCountRecorder[option.displayMainType];
        for (var domId in displayTypeMap) {
            if (
                domId
                && displayTypeMap[domId]
                && displayTypeMap.hasOwnProperty(domId)
            ) {
                if (this.g(domId)) {
                    count++;
                } else {
                    displayTypeMap[domId] = undefined;
                }
            }
        }
        return count;
    },
    /**
     * 设置广告个数
     * @param {Object} option 参数集合
     *  {
             *      displayType: templateData['displayType'],
             *      styleType: templateData['styleType'],
             *      stuffType: templateData['stuffType'],
             *      domId: 'iframeId'
             *  }
     * @return {boolean} true表示设置成功
     **/
    setAdsCount: function (option) {
        option = this.processAdsCountOption(option);
        this.adsCountRecorder[option.displayMainType][option.domId] = 1;
        return true;
    },

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
    /**
     * 根据展现类型的值返回对应展现类型
     * @param {string} distp 展现类型值
     * */
    getDisplayTypeByValue : function (distp) {
        return this.displayTypeMap[distp];
    },

    /**
     * 根据字符串产生css的style
     * @param {object}
     */
    genStyle: function(style) {
        var result = "";
        for (var key in style) {
            result += key + ":" + style[key] + (typeof style[key] == 'number' ? "px;" : ";");
        }
        return result;
    },

    /**
     *  设置eclick监控
     * */
    setupViewWatch: function (templateData, wrapperId) {
        var slotId = templateData['slotId'];
        require(['viewWatch'], function (viewWatch) {
            viewWatch['register']({
                'id': slotId,
                'wrapperId': templateData['iframeId'],
                'logType': 'block',
                'extra': ''
                + 'ch='
                + templateData['channel']
                + '&jk='
                + templateData['pvId']
                + '&n='
                + templateData['unionAccount']
            });
        }, true);
    }
});
