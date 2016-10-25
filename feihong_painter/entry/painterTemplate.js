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
        $import('dup.union.common.bdom');
        $import('dup.union.common.logic');
        $import('dup.union.common.cookie');
        $import('dup.union.business.businessLogic');
        $import('dup.ui.painter.feiHongMob');
    })(oojsGlobal.oojs);
})();
