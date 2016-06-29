(function(){
    var oojsGlobal = window._dup_exp_global || window._dup_exp_c_global || window._dup_global ||window._ssp_global ||{} ;

    (function(global) {

        //oojs的全局设置函数
        var $oojs_config = {
            //设置全局作用域
            global: global,
            //为Function原型添加的proxy函数的函数名. false表示不添加. 默认为'proxy'. 可以使用oojs.proxy替代
            proxyName: false,
            //设置代码库根目录. node模式使用文件路径(可以使相对路径), 浏览器模式下需要提供完整的url地址.
            basePath: 'http://cpro.baidustatic.com/cpro/ui/dup/'
        };

    })(oojsGlobal);

    (function(oojs) {
        oojs.setPath('http://dup.baidustatic.com/');

        // 单独导入示例
        // 自动分析依赖导入示例
        oojs.define({
    /**
     * painter名称
     */
    name: 'bdom',
    /**
     * 命名空间，不能修改
     */
    namespace: 'dup.union.common',
    /**
     * 依赖模块
     */
    deps: {
    },
    /**
     * 绑定事件
     */
    bind: function (element, type, listener) {
        if (typeof element === 'string') {
            element = this.one(element);
        }
        type = type.replace(/^on/i, '').toLowerCase();


        if (element.addEventListener) {
            element.addEventListener(
                type,
                listener,
                false
            );
        }
        else if (element.attachEvent) {
            element.attachEvent('on' + type, listener);
        }
        return element;
    },
    /**
     * 移除事件
     */
    unbind: function (element, type, listener) {
        element = this.one(element);
        if (!element) {
            return null;
        }
        type = type.replace(/^on/i, '').toLowerCase();

        if (element.removeEventListener) {
            element.removeEventListener(
                type,
                listener,
                false
            );
        }
        else if (element.detachEvent) {
            element.detachEvent('on' + type, listener);
        }
        return element;
    },
    // 有context的one，在一个节点之下查找
    subOne: function (node, cond) {
        var that = this;
        if (node.constructor === Object) {
            node = this.one(node);
        }
        if (typeof cond === 'string') {
            var gotById = document.getElementById(cond);
            var n = gotById;
            while (n) {
                if (n === node) {
                    return gotById;
                }
                n = n.parentNode;
            }
            return null;
        }
        else if (cond.constructor === Object) {
            var result = null;
            that.traverse(
                node,
                function (n) {
                    if (that.is(n, cond)) {
                        result = n;
                        return false;
                    }
                }
            );
            return result;
        }
    },
    one: function (cond) {
        if (!cond) {
            return;
        }
        if (cond.nodeName) {
            return cond;
        }
        if (arguments.length > 1) {
            cond = Array.prototype
                .slice
                .call(arguments, 0);
        }
        if (typeof cond === 'string') {
            return document.getElementById(cond);
        }
        else if (cond.constructor === Object) {
            return this.subOne(
                document.documentElement,
                cond
            );
        }
        else if (cond.constructor === Array) {
            var queue = cond.concat([]);
            var node = document.documentElement;
            while (queue.length && node) {
                node = this.subOne(node, queue.shift());
            }
            return node;
        }
    },
    traverse: function (node, callback) {
        if (!node) {
            return;
        }
        if (callback(node) === false) {
            return;
        }
        var children = node.childNodes;
        if (!children) {
            return;
        }
        for (var i = 0, len = children.length; i < len; i++) {
            var child = children[i];
            var ret = this.traverse(child, callback);
            if (ret === false) {
                return false;
            }
        }
    },
    /**
     * #### 返回类型
     *
     * @param {*} unknown 需要判断类型的参数
     * @return {string} lowercase的类型名称
     * @description modified from baidu tangram.
     */
    langGetType: function (unknown) {
        var objectType = {};
        var str = 'Array Boolean Date Error Function Number RegExp String'
            .split(' ');

        // 给 objectType 集合赋值，建立映射
        for (var i = 0, len = str.length; i < len; i++) {
            objectType['[object ' + str[i] + ']'] = str[i].toLowerCase();
        }

        // null和undefined都返回null，用 == 进行判断
        // 否则，unknown为空时，返回结果会为 object
        return unknown == null
            ? 'null'
            : objectType[
            Object.prototype.toString.call(/**@type {Object}*/(unknown))
            ] || 'object';
    },
    /**
     * ##### 判断传入的win是否是window对象
     * 如果win对象不可访问(比如跨域iframe中的top),则认为其不是window对象
     *
     * @param {*} win 需要判断的window对象
     * @return {boolean} 判断结果
     */
    isWindow: function (win) {
        try {
            if (win
                && typeof win === 'object'
                && win.document
                && 'setInterval' in win
            ) {
                return true;
            }
        }
        catch (ex) {
            return false;
        }

        return false;
    },
    /**
     * #### 判断Window对象是否被嵌套在iframe中
     *
     * @param {Window} win 要检测的Window对象
     * @param {Window=} another 进行比较的Window对象
     * @return {boolean} true表示Window对象被嵌套
     */
    isInIframe: function (win, another) {
        // another在没有传入的情况下，默认是parent
        another = arguments.length === 2 ? another : win.parent;
        // 先检查win与another是否相等。
        // 在两者相等的情况下，只需要判断win是否为Window对象或者有读取权限。
        // 两者不相等，则默认是被iframe调用。
        return win != another || !this.isWindow(win);
    },
    /**
     * #### 判断win对象是否包含在跨域的iframe中
     * 同时传递win和another，判断win和another之间是否跨域。
     *
     * @param {Window} win 要检测的window对象
     * @param {Window=} another 进行比较的窗口window对象
     * @return {boolean} true表示win与another存在跨域
     */
    isInCrossDomainIframe: function (win, another) {
        /**
         * #### 检测parent的location是否可以被访问到
         *
         * ！注意：这边用函数包裹try/catch逻辑的用意是GCC会将try/catch压没了...
         *        后续保持这种写法，不要单独抽出逻辑实现
         *
         * @inner
         * @param {Window} win Window对象
         * @return {boolean} 判断结果。 true:可访问 / false:不可访问
         */
        function checkAccess(win) {
            try {
                return !!win.parent.location.toString();
            }
            catch (ex) {
                return false;
            }
        }

        // 进行比较的Window对象默认为parent
        another = arguments.length === 2 ? another : win.parent;

        // 每一次循环都检测先win与another之间是否是嵌套关系。
        var count = 0;
        var maxCount = 10;
        while (count++ < maxCount && this.isInIframe(win, another)) {
            // 检测是否跨域
            if (!checkAccess(win)) {
                return true;
            }
            win = win.parent;
        }

        // 如果超过10层嵌套，即认为是跨域iframe调用
        return count >= maxCount;
    },
    /**
     * 从当前页面开始，向上获取最后一个没有跨域的window对象
     * 如果没有跨域嵌套，则获取top
     *
     * @example 函数的调用可能有如下几种情况
     * 1. getNotCrossDomainTopWindow() - 例如获取浏览器地址栏的需求会用到
     * 2. getNotCrossDomainTopWindow(8)
     * 3. getNotCrossDomainTopWindow(function () {}) - 例如获取ltu参数会用到，一般用于有条件地向上层遍历的情况
     * 4. getNotCrossDomainTopWindow(function () {}, 8) - 带数字的都是需要指定向上层遍历的层数的需求
     *
     * @param {Function=} condition 导致向上层窗口遍历中止的判断函数
     * @param {number=} maxCount 最大向上遍历层数，默认值为10
     * @return {Window} top window对象
     **/
    getNotCrossDomainTopWindow: function (condition, maxCount) {
        // 只有一个实参，且是数字类型，则此时传入参数实际是maxCount
        // 需要进行参数值交换
        if (arguments.length === 1
            && this.langGetType(arguments[0]) === 'number'
        ) {
            maxCount = arguments[0];
            condition = undefined;
        }
        // 剩余的情况可能为：无实参 或 两个实参
        // 无实参的情况只需要进行maxCount的默认赋值
        maxCount = maxCount || 10;

        var win = window;
        var count = 0;
        // 如果存在跨域或window被篡改的情况，则退出循环
        // 函数内部对condition有意义的参数就只有win，故只传入win
        // condition内部对于win怎么使用，视具体情况而定
        // condition函数必须有return，且必须为boolean类型
        while (count++ < maxCount
        && this.isInIframe(win)
        && !this.isInCrossDomainIframe(win)
        && (!condition || !condition(win))
            ) {
            win = win.parent;
        }

        return win;
    },
    langGetAttribute: function (target, name) {

        var result = target;

        // ####设计思路和折中
        // `try + catch`的性能问题。
        // try {
        //     result = eval(name);
        // } catch(e) {
        //     result = undefined;
        // }

        // 'a.b.c'
        // ['a','b','c']
        var parts = name.split('.');
        while (parts.length) {
            if (
                result === undefined
                || result === null
            ) {
                return undefined;
            }
            result = result[parts.shift()];
        }
        return result;

    },
    /**
     * #### 读取
     *
     * @param {string} key 指定键值 key
     * @param {boolean=} isGlobal true则是从全局里拿
     *
     * @return {*} 成功，返回value / 失败，返回undefined
     */
    getInfo: function (key, isGlobal) {
        // 用于保存Page Session级别的信息
        var pageInfo = {};

        var topWin = this.getNotCrossDomainTopWindow();
        var globalInfo = topWin[STORE_NAME] || (topWin[STORE_NAME] = {});

        var store = isGlobal ? globalInfo : pageInfo;
        var result;
        if (this.langGetType(key) === 'string') {
            result = this.langGetAttribute(store, key);
        }
        return result;
    },
    getDocumentTitle: function () {
        var topWindow = this.getNotCrossDomainTopWindow();
        var title = topWindow.document.title;
        var maxLength = 60;
        if (title.length > maxLength) {
            title = title.substr(0, maxLength);
        }
        return title;
    },
    /**
     * 以下是bom相关
     */

    getScrollWidth: function (win) {
        try {
            win = win || window;
            if (win.document.compatMode === 'BackCompat') {
                return win.document.body.scrollWidth;
            }
            else {
                return win.document.documentElement.scrollWidth;
            }
        }
        catch (e) {
            return 0;
        }
    },
    getScrollHeight: function (win) {
        try {
            win = win || window;
            if (win.document.compatMode === 'BackCompat') {
                return win.document.body.scrollHeight;
            }
            else {
                return win.document.documentElement.scrollHeight;
            }
        }
        catch (e) {
            return 0;
        }
    },
    getClientWidth: function (win) {
        try {
            win = win || window;
            if (win.document.compatMode === 'BackCompat') {
                return win.document.body.clientWidth;
            }
            else {
                return win.document.documentElement.clientWidth;
            }
        }
        catch (e) {
            return 0;
        }
    },
    getClientHeight: function (win) {
        try {
            win = win || window;
            if (win.document.compatMode === 'BackCompat') {
                return win.document.body.clientHeight;
            }
            else {
                return win.document.documentElement.clientHeight;
            }
        }
        catch (e) {
            return 0;
        }
    },
    getScrollTop: function (win) {
        win = win || window;
        var d = win.document;
        return window.pageYOffset
            || d.documentElement.scrollTop
            || d.body.scrollTop;
    },
    /**
     * 获取横向滚动量
     */
    getScrollLeft: function (win) {
        win = win || window;
        var d = win.document;
        return window.pageXOffset
            || d.documentElement.scrollLeft
            || d.body.scrollLeft;
    },
});

        /**
 * @description logic.js 各种逻辑，不涉及具体的浏览器相关
 * @author lushan02
 **/
oojs.define({
    /**
     * painter名称
     */
    name: 'logic',
    /**
     * 命名空间，不能修改
     */
    namespace: 'dup.union.common',
    /**
     * 依赖模块
     */
    deps: {
    },
    /**
     * 将url中的使用escape编码(%u[\d|\w]{4})格式的参数
     * 转换为encodeURIComponent格式
     * eg:
     * "a=%u4E2D%u56FD"转换后为:"a=%E4%B8%AD%E5%9B%BD"
     *
     * @name this.escapeToEncode
     * @function
     * @param {string}
     *            url
     *
     * @return {string} 参数被转换编码后的url
     */
    escapeToEncode: function (url) {
        var result = url || '';
        if (result) {
            result = result.replace(
                /%u[\d|\w]{4}/g,
                function (word) {
                    return encodeURIComponent(unescape(word));
                }
            );
        }
        return result;
    },
    // @delete {
    /**
     * 使用数据格式化字符串模版
     *
     * @example
     * var template = "<div>{name}-{age}</div>";
     *    var data = {name:zhangziqiu, age:18};
     *    //output:<div>zhangziqiu-18</div>
     *    var result = this.template(template, data);
     * @function
     * @return {string} 格式化后的字符串
     */
    template: function (source, data) {
        var regexp = /{(.*?)}/g;
        return source.replace(
            regexp,
            function (match, subMatch, index, s) {
                return data[subMatch] || '';
            }
        );
    },

    /**
     * 将json字符串解析成json对象
     */
    jsonToObj: function (jsonString) {
        var result = '';

        if (window.JSON && window.JSON.parse) {
            result = window.JSON.parse(jsonString);
        }

        return result;
    },

    /**
     * 获取url上指定参数的值
     */
    getUrlQueryValue: function (url, key) {
        if (url && key) {
            var reg = new RegExp(
                '(^|&|\\?|#)' + key + '=([^&]*)(&|\x24)',
                ''
            );
            var match = url.match(reg);
            if (match) {
                return match[2];
            }
        }
        return null;
    },
    parseUrlQuery: function (url, startChar) {
        url = url || '';
        startChar = startChar || '?'; // it can also be '#'
        var me = arguments.callee;
        if (!me.hasOwnProperty[startChar]) {
            me[startChar] = {};
        }
        var map = me[startChar];
        if (map.hasOwnProperty(url)) {
            return map[url];
        }
        var ret = {};
        var idx = url.indexOf(startChar);
        var urlPart = url.substring(idx + 1);
        var pairs = urlPart.split('&');
        if (idx !== -1) {
            for (var i = 0, len = pairs.length; i < len; i++) {
                var pair = pairs[i].split('=');
                var key = decodeURIComponent(pair[0]);
                var value = decodeURIComponent(pair[1]);
                if (!ret.hasOwnProperty(key)) {
                    ret[key] = value;
                }
                else {
                    if (ret[key].constructor !== Array) {
                        ret[key] = [ret[key]];
                    }
                    ret[key].push(value);
                }
            }
        }
        map[url] = ret;
        return ret;
    }
});


        /**
 * @description cookie.js 操作cookie的类
 * @author lushan02
 **/
oojs.define({
    /**
     * painter名称
     */
    name: 'cookie',
    /**
     * 命名空间，不能修改
     */
    namespace: 'dup.union.common',
    /**
     * 依赖模块
     */
    deps: {
    },
    getRaw: function (key, win) {
        var result;
        var win = win || window;
        var doc = win.document;
        var reg = new RegExp(''
            + '(^| )'
            + key
            + '=([^;]*)(;|\x24)'
        );
        var regResult = reg.exec(doc.cookie);
        if (regResult) {
            result = regResult[2];
        }
        return result;
    },
    setRaw: function (key, value, options) {
        options = options || {};

        // 计算cookie过期时间
        var expires = options.expires;
        if ('number' == typeof options.expires) {
            expires = new Date();
            expires.setTime(expires.getTime() + options.expires);
        }

        document.cookie = ''
            + key
            + '='
            + value
            + (options.path ? '; path=' + options.path : '')
            + (expires ? '; expires=' + expires.toGMTString() : '')
            + (options.domain ? '; domain=' + options.domain : '')
            + (options.secure ? '; secure' : '');
    },
    remove: function (key) {
        var t = new Date();
        t.setTime(t.getTime() - 86400);
        this.setRaw(key, '', {
            path: '/',
            expires: t
        });
    }
});

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

    })(oojsGlobal.oojs);
})();
