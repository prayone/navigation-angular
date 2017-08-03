angular.module('myModule',['ng','ngRoute']).controller('myctrl',function($scope){
	$scope.kan=true;
	// 搜索框
	$scope.searchWeb=function(){
		var webCof = {
				"baidu_so":'https://www.baidu.com/s?wd=',
				"taobao_so":'https://s.taobao.com/search?q=',
				"jd_so":'http://search.jd.com/Search?enc=utf-8&keyword=',
				"zhihu_so":"https://www.zhihu.com/search?q=",
				"douban_so":"https://www.douban.com/search?q=",
				"weibo_so":"http://s.weibo.com/",
				"wechat_so":"http://weixin.sogou.com/",
				"github_so":"https://github.com/search?q=",
				"shipin_so":"http://www.soku.com/search_video/?q=",
				"yinyue_so":"http://music.hao123.com/search?key=",
				"wangpan_so":"http://www.panc.cc/"
				};
				console.log($scope.words)
		var key = $('.myTab li.active').find('a').attr('dataurl');
			location.href = webCof[key]+$scope.words;

	};
	//其他搜索
	$scope.addqita=function(event){
		var txt=$(event.target).text();
		var dataurl=event.target.getAttribute("dataurl");
		$(".other_so").
		html(txt+'<span class="caret"></span>').attr("dataurl",dataurl).css("color","#444");
	    $(".myTab li").removeClass("active");
	    $(".other_so").parent().addClass("active");
	};
	//二维码
	$scope.indexewm=function(event) {
		var iewmsrc="http://pan.baidu.com/share/qrcode?w=150&h=150&url=";
	    $("#indexewm-modal").modal();
		var title=$(event.target).parent().siblings(0).html();
		$scope.ewmtitle=title;
	    var link=$(event.target).parent().siblings(0).attr("href");
		$scope.ewmlink=link;
	    $(".ewmimg").attr("src",iewmsrc+link);
	}
})