/*{{>TemplateEngine_baseJs}}*/
      var Base={config:{},cache:{},getKeysByType:function(b){b=(b||"class").toLowerCase();var a=b+"LoadFinished",c=b+"LoadFnArray",d=b+"LoadMap";this[a]="boolean"===typeof this[a]?this[a]:!0;this[c]=this[c]||[];this[d]=this[d]||{};return{status:a,array:c,map:d,type:b}},updateLoadStatus:function(b,a,c){c=this.getKeysByType(c);if(b&&(this[c.map][b]=a,"loaded"!==a))return this[c.status]=!1;b=!0;for(var d in this[c.map])if(d&&this[c.map].hasOwnProperty(d)&&"loaded"!==this[c.map][d]){b=!1;break}return this[c.status]=
        b},loadImage:function(b){var a=new Image;a.onload=a.onerror=a.onabort=function(){a.onload=a.onerror=a.onabort=null;this.updateLoadStatus(b,"loaded","image");if(this.imageLoadFinished)for(var c,d=0,h=this.imageLoadFnArray.length;d<h;d++)c=this.imageLoadFnArray.shift(),c()}.proxy(this);a.src=b},fastClone:function(b){var a=function(){};a.prototype=b;return new a},declare:function(b){b=b();var a=b.name;if(!a)throw"can't find the obj name";for(var c=b.namespace+"."+a,d=c.split("."),h=d.length,f=window,
        j="",e=0;e<h-1;e++){var g=d[e];f==window?(f[g]=window[g]=window[g]||{},j+=g):(f[g]=f[g]||{},j+="."+g);f=f[g];this.cache[j]=f}f[a]=f[a]||b;this.cache=this.cache||{};this.cache[c]=f[a];return!0},using:function(b,a,c){if(this.cache&&this.cache[b])return this.cache[b];a=a||"class";c=c||this.config.version[a]||"1.0.0";var d;switch(a){case "image":0>b.indexOf("http")&&(b=this.config.baseUrl+"img/"+(c&&"0"!==c?c.toString():"")+"/"+b);this.updateLoadStatus(b,"loading","image");this.loadImage(b);d=b;break;
        case "class":var h=this.getKeysByType(a);a=b.split(".");d=window[a[0]];for(var f=1,j=a.length;f<j;f++)d=d&&d[a[f]]?d[a[f]]:null;if(!d&&!this[h.map][b]){this.updateLoadStatus(b,"loading","class");var e=document.createElement("script");e.type="text/javascript";e.async=!0;a=this.config.baseUrl+"js/";c&&"0"!==c&&(a+=c.toString()+"/");a+=b.replace(/\./gi,"/")+".js";e.src=a.toLowerCase();e.onload=e.onerror=e.onreadystatechange=function(){if(/loaded|complete|undefined/.test(e.readyState)){e.onload=e.onerror=
        e.onreadystatechange=null;if(this.updateLoadStatus(b,"loaded","class"))for(var a,c=0,d=this[h.array].length;c<d;c++)a=this[h.array].shift(),a();e=void 0}}.proxy(this);c=document.getElementsByTagName("script")[0];c.parentNode.insertBefore(e,c)}this.cache=this.cache||{};this.cache[b]=d}return d},config:function(b){b&&(this.config=b)},run:function(b){if(b){var a=this.getKeysByType();this[a.status]?b():this[a.array].push(b)}}};
        Function.prototype.proxy=function(b){var a=this,c=Array.prototype.slice.apply(arguments).shift();return function(b){return a.apply(c,arguments)}};window.declare=Base.declare.proxy(Base);window.using=Base.using.proxy(Base);window.run=Base.run.proxy(Base);window.config=Base.config.proxy(Base);document.execCommand("BackgroundImageCache",!1,!0);

//data & config 
        /*var ads = {{bdCustAd}};*/
        /*var config = {{bdCustConf}};*/
var ads = "";
var config = "";
config.mob_lu_skin = 9;
config.conW = config.conW || config.rsi0;
config.conH = config.conH || config.rsi1; 

//render class
var DubaoRender = {
    render: function() {
        //preapre
        this.image_url = "file:///J:/template/image2/ICON_%20car.png";    //window.ads[0].image_url;
        this.word =  "春游出行开心"; //window.ads[0].title;
        this.click_url = "http://www.baidu.com" //window.ads[0].curl;
        //paint
        this.paint_ad();
    },
    //默认配置管理
    config_controller: {
        icon_config_array: [
            {
                key: "",
                font_css: ""
            }
        ],
        get_font_size_by_lenght: function(word) {
            var length = word.length;
        },
        init: function(config) {
            this.config = config;
        },
        get_var: function(name) {
        },
        //当推词有大于等于7个单词的，缩小字体大小
        get_bytes: function(title) {
            var length =  title.replace(/[^\x00-\xff]/gi, "--").length; 
            return length;
        }
    },
    paint_ad: function() {
        var ad_container = document.createElement("a");
        var container_style = this.style_controller.get_container_style();
        this.style_controller.set_style(ad_container, container_style);
        ad_container.setAttribute("href", this.click_url);
        ad_container.setAttribute("target", "_blank");
        ad_container.setAttribute("class", "test");

        var icon = document.createElement("img");
        var icon_style = this.style_controller.get_icon_style();
        this.style_controller.set_style(icon, icon_style);
        icon.src =  this.image_url;


        ad_container.appendChild(icon);
        document.body.appendChild(ad_container);
        var title = document.createElement("span");
        var span_style = this.style_controller.get_span_style();
        this.style_controller.set_style(title, span_style);
        title.innerHTML = this.word;
        ad_container.appendChild(title);
    },
    style_controller: {
        container_style: {},
        icon_style: {},
        span_style: {},
        zoom: 1,
        gen_style: function(style) {
            var result = "";
            if (style) {
                for (var key in style) {
                    result += key + ":" + style[key] + (this.pxStyle[key] ? "px;" : ";");
                }
            }
            return result;
        },
        pxStyle: { 
            width: 1,
            height: 1,
            "line-height": 1,
            "padding-left": 1,
            "padding-right": 1,
            "padding-top": 1,
            "padding-bottom": 1,
            "border-width": 1,
            "font-size": 1,
            "margin-left": 1,
            "margin-right": 1,
            "margin-top": 1, 
            "margin-bottom": 1,
            "border-left-width": 1,
            "border-right-width": 1,
            "border-top-width": 1,
            "border-bottom-width": 1,
            "top": 1,
            "left": 1,
            "bottom": 1,
            "right": 1
        },
        //兼容性处理
        getElementsByClassName: function(className, root, tagName) {
            if(root){
                root=typeof root=="string" ? document.getElementById(root) : root;   
            }else{
                root=document.body;
            }
            tagName=tagName||"*";                                    
            if (document.getElementsByClassName) {                    
                return root.getElementsByClassName(className);
            }else { 
                var tag= root.getElementsByTagName(tagName);
                var tagAll = [];            
                for (var i = 0; i < tag.length; i++) {  
                    for(var j=0,n=tag[i].className.split(' ');j<n.length;j++){
                        if(n[j]==className){
                            tagAll.push(tag[i]);
                            break;
                        }
                    }
                }
                return tagAll;
            }

        },
        set_class: function(dom, css) {
            if (!window.attachEvent) {
                dom.setAttribute("class", css);
            } else {
                dom.className = css;
            }
        },
        set_style: function(dom, style) {
            var css = this.gen_style(style);
            if (!window.attachEvent) {
                dom.setAttribute("style", css);
            } else {
                dom.style.cssText=css;
            }
        },
        get_container_style: function() {
            this.container_style["position"] = "fixed";
            this.container_style["top"] = 100;
            this.container_style["right"] = 50;
            return this.container_style;
        },
        get_icon_style: function() {
            return this.icon_style;
        },
        get_span_style: function() {
            this.span_style["font-size"] = 40 * this.zoom * 4 / window.DubaoRender.word.length;
            this.span_style["position"] = "absolute";
            this.span_style["left"] = 20 * this.zoom;
            this.span_style["bottom"] = 25 * this.zoom;
            //get font style by word length
            //get font css by icon_url
            return this.span_style;
        },
        get_font_size_by_length: function() {
        },
    },
    Tool: {
        bind: function (element, eventType, handler) {
                if (window.addEventListener) { 
                    element.addEventListener(eventType, handler, false);
                } else {
                    element.attachEvent("on" + eventType, handler);
                }   
            },
    },
}
run(DubaoRender.render.proxy(DubaoRender));
