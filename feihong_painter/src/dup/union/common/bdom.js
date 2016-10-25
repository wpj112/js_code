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
