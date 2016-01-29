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
var test_url = ["http://t10.baidu.com/it/u=3155639037,1168494189&fm=76", 
"http://t11.baidu.com/it/u=1393103740,2485594801&fm=76", 
"http://t12.baidu.com/it/u=1200777389,2642167412&fm=76", 
"http://t12.baidu.com/it/u=3531762158,830413417&fm=76", 
"http://t12.baidu.com/it/u=1342360085,3267803533&fm=76", 
"http://t10.baidu.com/it/u=3376025712,1719213291&fm=76", 
"http://t10.baidu.com/it/u=2093437416,907148845&fm=76", 
"http://t10.baidu.com/it/u=1201380993,2394758279&fm=76", 
"http://t10.baidu.com/it/u=3462979038,1141443292&fm=76", 
"http://t11.baidu.com/it/u=361821001,2551580995&fm=76", 
"http://t11.baidu.com/it/u=936862015,2874375447&fm=76", 
"http://t10.baidu.com/it/u=282067632,2688500782&fm=76", 
"http://t10.baidu.com/it/u=3256178148,1526342361&fm=76", 
"http://t11.baidu.com/it/u=2393786371,182558359&fm=76", 
"http://t12.baidu.com/it/u=2006130101,4174206510&fm=76", 
"http://t11.baidu.com/it/u=1068577660,2706798653&fm=76", 
"http://t10.baidu.com/it/u=640055430,2930643358&fm=76", 
"http://t10.baidu.com/it/u=2948163420,444657651&fm=76",
];
//render class

   	var item_offset_X = 0;
    var item_offset_Y = 0;
    var start_top = 0; 
	var start_left = 0;
    
    var touchend = function(event) {
        var evnt = window.event || event;
        var current = evnt.target || evnt.srcElement;
		current = current.parentNode;
        if(event.targetTouches.length > 1 || event.scale && event.scale !== 1) return;
        var touch = event.changedTouches[0]; //touches鏁扮粍瀵硅薄鑾峰緱灞骞曚笂鎵€鏈夌殑touch锛屽栫涓€涓猼ouch
        //current.style.top = (touch.clientY - item_offset_Y)+"px";
        if ((touch.clientY -item_offset_Y - start_top) < 5 && (touch.clientY - item_offset_Y - start_top) >-5 &&
			(touch.clientX -item_offset_X - start_left) < 5 && (touch.clientX - item_offset_X - start_left) >-5){
			current.click();
        }
		if(touch.clientX >window.screen.width/2){
			move_item(current,"right",(window.screen.width-(touch.clientX - item_offset_X) - current.style.width.replace("px","")),5);
		}else{
			move_item(current,"left",(touch.clientX -item_offset_X),5);
		}

        //var txt_item = document.getElementById("txt_pos_end");
    }
    
    var touchstart = function(event) {
        var evnt = window.event || event;
        var current = evnt.target || evnt.srcElement;
		current = current.parentNode;
        start_top = current.offsetTop;
        start_left = current.offsetLeft;
        event.preventDefault(); 
        if(event.targetTouches.length > 1 || event.scale && event.scale !== 1) return;
        var touch = event.targetTouches[0]; //touches鏁扮粍瀵硅薄鑾峰緱灞骞曚笂鎵€鏈夌殑touch锛屽栫涓€涓猼ouch
        item_offset_Y = touch.clientY - start_top; 
		item_offset_X = touch.clientX - start_left;
    }

    var touchmove = function(event){
        var evnt = window.event || event;
        var current = evnt.target || evnt.srcElement;
		current = current.parentNode;
        if(event.targetTouches.length > 1 || event.scale && event.scale !== 1) 
            return;
     
        var touch = event.targetTouches[0];
		
		if(touch.clientY - item_offset_Y <0 || 
		touch.clientY - item_offset_Y + parseInt(current.style.height.replace("px","")) >window.screen.height||
		touch.clientX - item_offset_X <0 ||
		touch.clientX - item_offset_X + parseInt(current.style.width.replace("px","")) >window.screen.width)
			return
		
        current.style.top = (touch.clientY - item_offset_Y) +"px";
		current.style.left = (touch.clientX - item_offset_X) + "px";
		
    }  
	
	 function move_item(item,direct,move_long,speed){
        var move_inter = setInterval(function(){                                                                            
            if(direct == "left"){
                if(move_long >0){
                    var currentLfet = item.style.left.replace("px","");
                    item.style.left = Number(currentLfet) - speed + "px";
                    move_long -= speed;
                }else{
                    clearInterval(move_inter);
                    //icon_click_lock = 0;
                }
            }

            if(direct == "right"){
                if(move_long >0){
                    var currentLeft = item.style.left.replace("px","");
                    item.style.left = Number(currentLeft) + speed + "px";
                    move_long -= speed;
                }else{
                    clearInterval(move_inter);
                    //icon_click_lock = 0;
                }
            }
        },3);
    }
var DubaoRender = {
    render: function() {
        //preapre
        this.image_url = "http://cq01-rdqa-dev078.cq01.baidu.com:8019/lu_images/nova/ICON_health.png";    //window.ads[0].image_url;
        //this.word =  "春游出行开心"; //window.ads[0].title;
        this.word =  "测试前链今天f";//,"测试段段今天"]; //window.ads[0].title;
        this.click_url =
        "http://10.128.136.21:8091/cpro/ui/uijs.php?adclass=0&app_id=0&c=news&cf=1&ch=0&di=1&fv=0&is_app=0&jk=e8680d84255a3547&k=%E8%AE%AD%E7%8A%AC%E8%AE%A1%E5%88%92&k0=%E8%AE%AD%E7%8A%AC%E8%AE%A1%E5%88%92&kdi0=1&lsdp_cf=0&lsdp_ideaid=41525&lsdp_info=%e4%b8%8a%e6%b5%b7%e4%bb%81%e6%b5%8e%e8%8d%af%e6%88%bf%3a16966%09%e4%bd%b3%e6%b4%81%e7%89%99%e5%88%b7%3a6&luki=1&mcpm=1&n=10&p=baidu&q=120ask_cpr&rb=0&rs=1&seller_id=1&sid=47355a25840d68e8&ssp2=2&stid=4063&t=tpclicked3_mob_asp_3&td=1928671&tu=u1928671&u=http%3A%2F%2Fm%2E120ask%2Ecom%2Fjibing%2F&urlid=0" //window.ads[0].curl;
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
        },
		ChsSubString :function(str, len, hasDot)  
		{  
			var newLength = 0;  
			var newStr = "";  
			var chineseRegex = /[^\x00-\xff]/g;  
			var singleChar = "";  
			var strLength = str.replace(chineseRegex,"**").length;  
			for(var i = 0;i < strLength;i++)  
			{  
				singleChar = str.charAt(i).toString();  
				if(singleChar.match(chineseRegex) != null)  
				{  
					newLength += 2;  
				}      
				else  
				{  
					newLength++;  
				}  
				if(newLength > len)  
				{  
					break;  
				}else{
					newStr += singleChar; 
				}
 
			}  

			if(hasDot && strLength > len)  
			{  
				newStr += "...";  
			}  
			return newStr;  
		}
    },
	
	paint_ad:function()
	{		
		var screen_width = window.screen.width;
		var bd = document.body;
		//this.render_icon(bd,100,screen_width - 70,70,70/1.1,this.click_url,this.image_url,this.word,"icon_0");
		//for(var i = 0; i < this.word.length; i++)
			var new_word;
			if(this.config_controller.get_bytes(this.word) > 12){
				new_word = this.config_controller.ChsSubString(this.word,12,false);
			}
			else{
				new_word = this.word;
			}
			this.render_icon(bd,80,240,70,70/1.1,this.click_url,test_url[0],new_word,"icon_"+0);
		//for(var i = 0 ;i <test_url.length ;i++){
		//	this.render_icon(bd,80*parseInt(i/3),120*(i%3),70,70/1.1,this.click_url,test_url[i],this.word,"icon_"+i);
		//}
		var icon_0 = document.getElementById("icon_0");
		this.Tool.bind(icon_0,"touchstart",touchstart);
        this.Tool.bind(icon_0,"touchend",touchend);
        this.Tool.bind(icon_0,"touchmove",touchmove);
	},
	
    render_icon: function(parent,top,left,width,height,target_url,img_url,title,id) {

        var ad_container = document.createElement("a");
		ad_container.id = id;
		var word_len = title.length;
		var font_size = 12;
		var font_left = 0;
		var font_top = 0;
		var font_width = 0;
		if(word_len <=4){

			width = 70;
			left = window.screen.width-width;
			height = width/1.1;
			font_top = 45;
			font_left = 5
			font_width = width - 2*font_left;
		}
		if(word_len >4){
			width = 110;
			left = window.screen.width-width;
			height = width/1.1;
			font_top = 72;
			font_left = 5
			font_width = width - 2*font_left;
		}
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
        this.style_controller.set_base_style(title_item,font_top,font_left,font_width,16,"block","absolute");
		this.style_controller.append_single_font_style(title_item,12,"#fff","Microsoft YaHei","center","#",16);
		
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
