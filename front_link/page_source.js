{{>TemplateEngine_baseJs}}

//render class

var DubaoRender = {
    ads:{{bdCustAd}},
    config = {{bdCustConf}},
    render: function() {
        //preapre
        this.config.mob_lu_skin = 9;
        this.config.mob_lu_skin = this.config.conW || this.config.rsi0;
        this.config.conH = this.config.conH || this.config.rsi1; 
        
        this.image_url = this.ads[0].image_url;
        this.word = this.ads[0].title;
        this.click_url = this.ads[0].curl;
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
        //    this.render_icon(bd,80*parseInt(i/3),120*(i%3),70,70/1.1,this.click_url,test_url[i],this.word,"icon_"+i);
        //}
        var icon_0 = document.getElementById("icon_0");
        this.Tool.bind(icon_0,"touchstart",move_controller.touchstart);
        this.Tool.bind(icon_0,"touchend",move_controller.touchend);
        this.Tool.bind(icon_0,"touchmove",move_controller.touchmove);
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

var move_controller = {
       item_offset_X:0,
    item_offset_Y:0,
    start_top:0, 
    start_left:0,
    
    touchend :function(event) {
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
            move_controller.move_item(current,"right",(window.screen.width-(touch.clientX - item_offset_X) - current.style.width.replace("px","")),5);
        }else{
            move_controller.move_item(current,"left",(touch.clientX -item_offset_X),5);
        }

        //var txt_item = document.getElementById("txt_pos_end");
    },
    
    touchstart : function(event) {
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
    },

    touchmove:function(event){
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
        
    },
    
     move_item:function(item,direct,move_long,speed){
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
}
run(DubaoRender.render.proxy(DubaoRender));
