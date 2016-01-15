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

