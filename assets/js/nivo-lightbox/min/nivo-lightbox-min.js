!function($,t,i,o){function e(t,i){this.el=t,this.$el=$(this.el),this.options=$.extend({},a,i),this._defaults=a,this._name=n,this.init()}var n="nivoLightbox",a={effect:"fade",theme:"default",keyboardNav:!0,clickOverlayToClose:!0,onInit:function(){},beforeShowLightbox:function(){},afterShowLightbox:function(t){},beforeHideLightbox:function(){},afterHideLightbox:function(){},onPrev:function(t){},onNext:function(t){},errorMessage:"The requested content cannot be loaded. Please try again later."};e.prototype={init:function(){var t=this;$("html").hasClass("nivo-lightbox-notouch")||$("html").addClass("nivo-lightbox-notouch"),"ontouchstart"in i&&$("html").removeClass("nivo-lightbox-notouch"),this.$el.on("click",function(i){t.showLightbox(i)}),this.options.keyboardNav&&$("body").off("keyup").on("keyup",function(i){var o=i.keyCode?i.keyCode:i.which;27==o&&t.destructLightbox(),37==o&&$(".nivo-lightbox-prev").trigger("click"),39==o&&$(".nivo-lightbox-next").trigger("click")}),this.options.onInit.call(this)},showLightbox:function(t){var i=this,o=this.$el,e=this.checkContent(o);if(e){t.preventDefault(),this.options.beforeShowLightbox.call(this);var n=this.constructLightbox();if(n){var a=n.find(".nivo-lightbox-content");if(a){if($("body").addClass("nivo-lightbox-body-effect-"+this.options.effect),this.processContent(a,o),this.$el.attr("data-lightbox-gallery")){var l=$('[data-lightbox-gallery="'+this.$el.attr("data-lightbox-gallery")+'"]');console.log(l.length),$(".nivo-lightbox-nav").show(),$(".nivo-lightbox-prev").off("click").on("click",function(t){t.preventDefault();var e=l.index(o);o=l.eq(e-1),$(o).length||(o=l.last()),i.processContent(a,o),i.options.onPrev.call(this,[o])}),$(".nivo-lightbox-next").off("click").on("click",function(t){t.preventDefault();var e=l.index(o);o=l.eq(e+1),$(o).length||(o=l.first()),i.processContent(a,o),i.options.onNext.call(this,[o])})}setTimeout(function(){n.addClass("nivo-lightbox-open"),i.options.afterShowLightbox.call(this,[n])},1)}}}},checkContent:function(t){var i=this,o=t.attr("href"),e=o.match(/(youtube|youtu|vimeo)\.(com|be)\/(watch\?v=([\w-]+)|([\w-]+))/);return null!==o.match(/\.(jpeg|jpg|gif|png)$/i)?!0:e?!0:"ajax"==t.attr("data-lightbox-type")?!0:"#"==o.substring(0,1)&&"inline"==t.attr("data-lightbox-type")?!0:"iframe"==t.attr("data-lightbox-type")},processContent:function(i,o){var e=this,n=o.attr("href"),a=n.match(/(youtube|youtu|vimeo)\.(com|be)\/(watch\?v=([\w-]+)|([\w-]+))/);if(i.html("").addClass("nivo-lightbox-loading"),this.isHidpi()&&o.attr("data-lightbox-hidpi")&&(n=o.attr("data-lightbox-hidpi")),null!==n.match(/\.(jpeg|jpg|gif|png)$/i)){var l=$("<img>",{src:n});l.one("load",function(){var o=$('<div class="nivo-lightbox-image" />');o.append(l),i.html(o).removeClass("nivo-lightbox-loading"),o.css({"line-height":$(".nivo-lightbox-content").height()+"px",height:$(".nivo-lightbox-content").height()+"px"}),$(t).resize(function(){o.css({"line-height":$(".nivo-lightbox-content").height()+"px",height:$(".nivo-lightbox-content").height()+"px"})})}).each(function(){this.complete&&$(this).load()}),l.error(function(){var t=$('<div class="nivo-lightbox-error"><p>'+e.options.errorMessage+"</p></div>");i.html(t).removeClass("nivo-lightbox-loading")})}else if(a){var h="",s="nivo-lightbox-video";if("youtube"==a[1]&&(h="http://www.youtube.com/embed/"+a[4],s="nivo-lightbox-youtube"),"youtu"==a[1]&&(h="http://www.youtube.com/embed/"+a[3],s="nivo-lightbox-youtube"),"vimeo"==a[1]&&(h="http://player.vimeo.com/video/"+a[3],s="nivo-lightbox-vimeo"),h){var r=$("<iframe>",{src:h,"class":s,frameborder:0,vspace:0,hspace:0,scrolling:"auto"});i.html(r),r.load(function(){i.removeClass("nivo-lightbox-loading")})}}else if("ajax"==o.attr("data-lightbox-type"))$.ajax({url:n,cache:!1,success:function(o){var e=$('<div class="nivo-lightbox-ajax" />');e.append(o),i.html(e).removeClass("nivo-lightbox-loading"),e.outerHeight()<i.height()&&e.css({position:"relative",top:"50%","margin-top":-(e.outerHeight()/2)+"px"}),$(t).resize(function(){e.outerHeight()<i.height()&&e.css({position:"relative",top:"50%","margin-top":-(e.outerHeight()/2)+"px"})})},error:function(){var t=$('<div class="nivo-lightbox-error"><p>'+e.options.errorMessage+"</p></div>");i.html(t).removeClass("nivo-lightbox-loading")}});else if("#"==n.substring(0,1)&&"inline"==o.attr("data-lightbox-type"))if($(n).length){var c=$('<div class="nivo-lightbox-inline" />');c.append($(n).clone().show()),i.html(c).removeClass("nivo-lightbox-loading"),c.outerHeight()<i.height()&&c.css({position:"relative",top:"50%","margin-top":-(c.outerHeight()/2)+"px"}),$(t).resize(function(){c.outerHeight()<i.height()&&c.css({position:"relative",top:"50%","margin-top":-(c.outerHeight()/2)+"px"})})}else{var g=$('<div class="nivo-lightbox-error"><p>'+e.options.errorMessage+"</p></div>");i.html(g).removeClass("nivo-lightbox-loading")}else{if("iframe"!=o.attr("data-lightbox-type"))return!1;var v=$("<iframe>",{src:n,"class":"nivo-lightbox-item",frameborder:0,vspace:0,hspace:0,scrolling:"auto"});i.html(v),v.load(function(){i.removeClass("nivo-lightbox-loading")})}if(o.attr("title")){var b=$("<span>",{"class":"nivo-lightbox-title"});b.text(o.attr("title")),$(".nivo-lightbox-title-wrap").html(b)}else $(".nivo-lightbox-title-wrap").html("")},constructLightbox:function(){if($(".nivo-lightbox-overlay").length)return $(".nivo-lightbox-overlay");var t=$("<div>",{"class":"nivo-lightbox-overlay nivo-lightbox-theme-"+this.options.theme+" nivo-lightbox-effect-"+this.options.effect}),i=$("<div>",{"class":"nivo-lightbox-wrap"}),o=$("<div>",{"class":"nivo-lightbox-content"}),e=$('<a href="#" class="nivo-lightbox-nav nivo-lightbox-prev">Previous</a><a href="#" class="nivo-lightbox-nav nivo-lightbox-next">Next</a>'),n=$('<a href="#" class="nivo-lightbox-close" title="Close">Close</a>'),a=$("<div>",{"class":"nivo-lightbox-title-wrap"}),l=0;l&&t.addClass("nivo-lightbox-ie"),i.append(o),i.append(a),t.append(i),t.append(e),t.append(n),$("body").append(t);var h=this;return h.options.clickOverlayToClose&&t.on("click",function(t){(t.target===this||$(t.target).hasClass("nivo-lightbox-content")||$(t.target).hasClass("nivo-lightbox-image"))&&h.destructLightbox()}),n.on("click",function(t){t.preventDefault(),h.destructLightbox()}),t},destructLightbox:function(){var t=this;this.options.beforeHideLightbox.call(this),$(".nivo-lightbox-overlay").removeClass("nivo-lightbox-open"),$(".nivo-lightbox-nav").hide(),$("body").removeClass("nivo-lightbox-body-effect-"+t.options.effect);var i=0;i&&($(".nivo-lightbox-overlay iframe").attr("src"," "),$(".nivo-lightbox-overlay iframe").remove()),$(".nivo-lightbox-prev").off("click"),$(".nivo-lightbox-next").off("click"),$(".nivo-lightbox-content").empty(),this.options.afterHideLightbox.call(this)},isHidpi:function(){var i="(-webkit-min-device-pixel-ratio: 1.5),                              (min--moz-device-pixel-ratio: 1.5),                              (-o-min-device-pixel-ratio: 3/2),                              (min-resolution: 1.5dppx)";return t.devicePixelRatio>1?!0:!(!t.matchMedia||!t.matchMedia(i).matches)}},$.fn[n]=function(t){return this.each(function(){$.data(this,n)||$.data(this,n,new e(this,t))})}}(jQuery,window,document);