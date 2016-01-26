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


var natural_width = 0;		
var natural_height = 0;
var test_url = ["http://cq01-rdqa-dev078.cq01.baidu.com:8019/lu_images/nova/ICON_redpacket.png", 
"http://cq01-rdqa-dev078.cq01.baidu.com:8019/lu_images/nova/ICON_resume.png", 
"http://cq01-rdqa-dev078.cq01.baidu.com:8019/lu_images/nova/ICON_friend.png", 
"http://cq01-rdqa-dev078.cq01.baidu.com:8019/lu_images/nova/ICON_car.png", 
"http://cq01-rdqa-dev078.cq01.baidu.com:8019/lu_images/nova/ICON_fitment.png", 
"http://cq01-rdqa-dev078.cq01.baidu.com:8019/lu_images/nova/ICON_food.png", 
"http://cq01-rdqa-dev078.cq01.baidu.com:8019/lu_images/nova/ICON_transportation.png", 
"http://cq01-rdqa-dev078.cq01.baidu.com:8019/lu_images/nova/ICON_health.png", 
"http://cq01-rdqa-dev078.cq01.baidu.com:8019/lu_images/nova/ICON_pet.png", 
"http://cq01-rdqa-dev078.cq01.baidu.com:8019/lu_images/nova/ICON_nanny.png", 
"http://cq01-rdqa-dev078.cq01.baidu.com:8019/lu_images/nova/ICON_movie.png", 
"http://cq01-rdqa-dev078.cq01.baidu.com:8019/lu_images/nova/ICON_marry.png", 
"http://cq01-rdqa-dev078.cq01.baidu.com:8019/lu_images/nova/ICON_read.png", 
"http://cq01-rdqa-dev078.cq01.baidu.com:8019/lu_images/nova/ICON_journey.png", 
"http://cq01-rdqa-dev078.cq01.baidu.com:8019/lu_images/nova/ICON_shopping.png", 
"http://cq01-rdqa-dev078.cq01.baidu.com:8019/lu_images/nova/ICON_ticket.png", 
"http://cq01-rdqa-dev078.cq01.baidu.com:8019/lu_images/nova/ICON_housingsales.png", 
"http://cq01-rdqa-dev078.cq01.baidu.com:8019/lu_images/nova/ICON_education.png", 
];
//render class

    var item_offset_Y = 0;
    var start_top = 0; 
    
    var touchend = function(event) {
        var evnt = window.event || event;
        var current = evnt.target || evnt.srcElement;
		current = current.parentNode;
        if(event.targetTouches.length > 1 || event.scale && event.scale !== 1) return;
        var touch = event.changedTouches[0]; //touches鏁扮粍瀵硅薄鑾峰緱灞骞曚笂鎵€鏈夌殑touch锛屽栫涓€涓猼ouch
        current.style.top = (touch.clientY - item_offset_Y)+"px";
        if ((touch.clientY -item_offset_Y - start_top) < 10 && (touch.clientY - item_offset_Y - start_top) >-10){
			event.preventDefault()
			alert("click");
        }
        //var txt_item = document.getElementById("txt_pos_end");
    }
    
    var touchstart = function(event) {
        var evnt = window.event || event;
        var current = evnt.target || evnt.srcElement;
		current = current.parentNode;
        start_top = current.offsetTop;
        var cur_left = current.offsetLeft;
        event.preventDefault(); 
        if(event.targetTouches.length > 1 || event.scale && event.scale !== 1) return;
        var touch = event.targetTouches[0]; //touches鏁扮粍瀵硅薄鑾峰緱灞骞曚笂鎵€鏈夌殑touch锛屽栫涓€涓猼ouch
        item_offset_Y = touch.clientY - start_top; 
    }

    var touchmove = function(event){
        var evnt = window.event || event;
        var current = evnt.target || evnt.srcElement;
		current = current.parentNode;
        if(event.targetTouches.length > 1 || event.scale && event.scale !== 1) 
            return;
     
        var touch = event.targetTouches[0];
        current.style.top = (touch.clientY - item_offset_Y) +"px";
    }  
var DubaoRender = {
    render: function() {
        //preapre
        this.image_url = "http://t10.baidu.com/it/u=2909006259,535599738&fm=76";    //window.ads[0].image_url;
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
	paint_ad:function()
	{		
		var screen_width = window.screen.width;
		var bd = document.body;
		//this.render_icon(bd,100,screen_width - 100,100,100,this.click_url,this.image_url,this.word);
		for(var i = 0 ;i <test_url.length ;i++){
			this.render_icon(bd,120*parseInt(i/3),110*(i%3),70,70,this.click_url,test_url[i],this.word,"icon_"+i);
		}
		var icon_0 = document.getElementById("icon_0");
		this.Tool.bind(icon_0,"touchstart",touchstart);
        this.Tool.bind(icon_0,"touchend",touchend);
        this.Tool.bind(icon_0,"touchmove",touchmove);
	},
    render_icon: function(parent,top,left,width,height,target_url,img_url,title,id) {

        var ad_container = document.createElement("a");
		ad_container.id = id;
        this.style_controller.set_base_style(ad_container,top,left,width,height,"block","fixed");
        ad_container.setAttribute("href", target_url);
        ad_container.setAttribute("target", "_blank");
        ad_container.setAttribute("class", "test");

        var icon = document.createElement("img");
		icon.src =  img_url;
		var img_tmp = new Image();
		img_tmp.src = img_url;
		
		if(img_tmp.complete){
			natural_width = img_tmp.width;		
			natural_height = img_tmp.height;
			img_tmp = null;
		}else{
			img_tmp.onload = function(){
				natural_width = img_tmp.width;		
				natural_height = img_tmp.height;
				img_tmp = null;
			};
		}
        this.style_controller.set_base_style(icon,0,0,width,height,"block","absolute");
        icon.src =  img_url;

        ad_container.appendChild(icon);
        var title_item = document.createElement("span");
        this.style_controller.set_base_style(title_item,50,5,60,16,"block","absolute");
		this.style_controller.append_single_font_style(title_item,14,"#fff","Microsoft YaHei","center","#",16);
		
        title_item.innerHTML = title;
        ad_container.appendChild(title_item);
		
		parent.appendChild(ad_container);
    },
              //样式控制器
            style_controller:{
                style_buf:{},
                render_B9_img_ads:{},
                zoom: 0,
                _gen_style: function(style) {
                    var result = "";
                    if (style) {
                        for (var key in style) {
                            result += key + ":" + style[key] + (this.pxStyle[key] ? "px;" : ";");
                        }
                        return result;
                    }
                },

                pxStyle: { 
                    "width": 1,
                    "height": 1,
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
          
                _set_class: function(dom, css) {
                    if (!window.attachEvent) {
                        dom.setAttribute("class", css);
                    } else {
                        dom.className = css;
                    }
                },

                _set_style: function(dom,style) {
                    if(typeof style == 'undefined'){
                        var css = this._gen_style(this.style_buf);                        
                    }else{
                        var css = this._gen_style(style);
                    }
                    if (!window.attachEvent) {
                        dom.setAttribute("style", css);
                    } else {
                        dom.style.cssText=css;
                    }
                },

                _append_style: function(dom) {
                    var css = this._gen_style(this.style_buf);
                    if (!window.attachEvent) {
                        var old_css = dom.getAttribute("style");
                        dom.setAttribute("style", old_css + css);
                    } else {
                        var old_css = dom.style.cssText;
                        dom.style.cssText= old_css + css;
                    }
                },

                //设置基本布局配置
                set_base_style: function(dom,top,left,width,height,display,position){
                    this.style_buf = [];
                    this.style_buf["display"] = display;
                    this.style_buf["position"] = position;
                    this.style_buf["top"] = top;
                    this.style_buf["left"] = left;
                    this.style_buf["width"] = width;
                    this.style_buf["height"] = height;
                    this.style_buf["overflow"] = "hidden";
                    this._set_style(dom);
                },

                //增加修饰单行类型字体、大小、前后背景颜色设置
                append_single_font_style: function(dom,font_size,font_color,font_family,pos,back_color,line_height){
                    this.style_buf = [];
                    this.style_buf["font"] = font_size + "px " + "\"" + font_family+ "\"";
                    this.style_buf["color"] = font_color;
                    this.style_buf["text-align"] = pos;
                    this.style_buf["background-color"] = back_color;
                    this.style_buf["line-height"] = line_height;
                    this.style_buf["overflow"] = "hidden";
                    this.style_buf["white-space"] = "nowrap";
                    this.style_buf["text-overflow"] = "ellipsis";
                    this.style_buf["o-text-overflow"] = "ellipsis";
                    this.style_buf["text-decoration"] = "none";
                    this._append_style(dom);
                },

                //增加圆角或阴影效果及设置透明度
                //redius 参数为圆角
                //shadows_arg 参数 (水平位移) (垂值位移) (模糊半径) (颜色)
                //示例 "0px 0px 7px #efefef" 
                //opacity 为0-1.0 一个数字，用于配置透明度 默认为1             
                append_effects_style: function(dom,radius_arg,shadow_arg,opacity){
                    this.style_buf = [];
                    this.style_buf["-moz-border-radius"] = radius_arg + "px";
                    this.style_buf["-webkit-border-radius"] = radius_arg + "px";
                    this.style_buf["border-radius"] = radius_arg + "px";
                    this.style_buf["-moz-box-shadow"] = shadow_arg;
                    this.style_buf["-webkit-box-shadow"] = shadow_arg;
                    this.style_buf["box-shadow"] = shadow_arg;
                    this.style_buf["opacity"] = opacity;
                    this._append_style(dom);
                },

                //增加两种填充值及边框属性(盒子模型)
                //pad_arg&margin_arg 参数中会有四个值，其对应的位置 上右下左
                //border_arg 参数: 边框像素 边框类型 边框颜色 eg:"1px solid #bbb"
                append_boxmod_style: function(dom,pad_arg,margin_arg,border_arg){
                    this.style_buf = [];
                    this.style_buf["padding"] = pad_arg;
                    this.style_buf["margin"] = margin_arg;
                    this.style_buf["border"] = border_arg;
                    this._append_style(dom);
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
