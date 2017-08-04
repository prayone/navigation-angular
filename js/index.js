var targetUrl = "http://119.29.254.72:9000";
var base_login = '/op/login';
var base_register="/op/register";
angular.module('myModule',['ng','ngRoute']).controller('myctrl',function($scope,$http){
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

	// 注册登录
	$scope.register=function(){
		var username = $scope.yhm;
		var password = $scope.mm1;
		var PWD = $scope.mm2;
		if(password!=PWD){
			alert('两次输入密码不一致')
			return
		}
        if(username==""||password==""){
            alert("用户名或者密码不能为空！")
            return;
        }
        $scope.data = {
            username:username,
            password:password
        };
      
        var url=targetUrl+base_register;
         $http({
            url: url,
            method: 'POST',
            data:$scope.data
            
        }).success(function(rs){
        	if(rs.info){
                alert("注册成功！")
                location.href = 'index.html';
            }else{
                alert(rs.err)
                $scope.yhm="";
                
            }
        }).error(function(rs){
        	if(rs.err){
        		alert(rs)
            }
        });
};
	// 已有账户
	$scope.have=function(){
		$("#zhuce-modal").modal('hide');
	}
	// 登录接口
	$scope.login=function(){
				// 登陆接口'/op/login'
	            var username=$scope.dlm;
	            var password=$scope.mm3;
	            if(username==""||password==""){
	                alert("用户名或者密码不能为空！")
	                return
	            }
	            $scope.data = {
	                username:username,
	                password:password
	            }
				 var url=targetUrl+base_login;
		         $http({
		            url: url,
		            method: 'POST',
		            data:$scope.data
		            
		        }).success(function(rs){
		        	if(rs.info){
                    alert("登陆成功！")
                    localStorage.setItem('username',username)
                    // setCookie('sid',rs.sid)
                    // setCookie('u_id',rs.userid);
                    // setCookie('u_title',rs.title);
                    window.location.href="./mynote/mynote.html";
		            }else{
		                alert(rs.err)
		            }
		        }).error(function(rs){
		        		alert(rs)
		        });


			};



})