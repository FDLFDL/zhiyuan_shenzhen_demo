/*
 * Created by ${ananten.hu} on 2016/05/11.
 */
var url = location.href.split('#')[0];
url = url.replace('&', '%26');
$.ajax({
    url: 'http://s.speiyou.net/node/wxsdk/service.js?url=' + url,
    dataType: 'text',
    type: "post",
    success: function (data) {
        var data = eval("(" + data + ")");
        wx.config({
            debug: false,
            appId: data.appId,
            timestamp: data.timestamp,
            nonceStr: data.nonceStr,
            signature: data.signature,
            jsApiList: [
                'onMenuShareTimeline',
                'onMenuShareAppMessage',
                'onMenuShareQQ',
                'onMenuShareWeibo',
                'onMenuShareQZone'
            ]
        });
        wx.ready(function () {
            wx.onMenuShareAppMessage(OA.SHARE);
            wx.onMenuShareTimeline(OA.SHARE);
            wx.onMenuShareQQ(OA.SHARE);
            wx.onMenuShareWeibo(OA.SHARE);
            wx.onMenuShareQZone(OA.SHARE);
        });

        wx.error(function (res) {
            alert(res.errMsg);
        });
    }
});


OA = {};
OA.SHARE = {
    title: '中考志愿如何填报',
    desc: '上海中考志愿填报',
    link: 'http://s.speiyou.net/web/zhiyuan/sh2016/index.html',
    imgUrl: 'http://s.speiyou.net/web/zhiyuan/sh2016/img/a1_2x.png',
    success: function () {
        var mark = $('.mark').length;
        if (mark) {
            $('.mark').hide()
        }
    },
    cancel: function () {
        var mark = $('.mark').length;
        if (mark) {
            $('.mark').hide()
        }
    },
    fail: function () {
        var mark = $('.mark').length;
        if (mark) {
            $('.mark').hide()
        }
    }
};



/*获取参数*/
function getRequest(name) {
    var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i');
    var r = window.location.search.substr(1).match(reg);
    if (r != null) {
        return decodeURIComponent(r[2]);
    }
    return null;
}
/*Zepto.cookie plugin*/
(function(a){a.extend(a.fn,{cookie:function(b,c,d){var e,f,g,h;if(arguments.length>1&&String(c)!=="[object Object]"){d=a.extend({},d);if(c===null||c===undefined)d.expires=-1;return typeof d.expires=="number"&&(e=d.expires*24*60*60*1e3,f=d.expires=new Date,f.setTime(f.getTime()+e)),c=String(c),document.cookie=[encodeURIComponent(b),"=",d.raw?c:encodeURIComponent(c),d.expires?"; expires="+d.expires.toUTCString():"",d.path?"; path="+d.path:"",d.domain?"; domain="+d.domain:"",d.secure?"; secure":""].join("")}return d=c||{},h=d.raw?function(a){return a}:decodeURIComponent,(g=(new RegExp("(?:^|; )"+encodeURIComponent(b)+"=([^;]*)")).exec(document.cookie))?h(g[1]):null}})})(Zepto);

/**
 * 判断入口页面，若非index.html，跳转至index.html
 */
(function(){
    if(document.URL.indexOf("index.html") > 0 ){
        $.fn.cookie('entrance', 1);
    }else if(!$.fn.cookie('entrance')){
        window.location.href = 'index.html';
    }

})();