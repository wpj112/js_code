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
