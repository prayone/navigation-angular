var show="/rs/v_category_link";
var sort="/rs/event_category";
var sqlink="/rs/event_link"
var base_addtitle="/op/updateTitle";
var operate = '';
var flag='';
   
	


angular.module("admin",['ng','ngRoute','ngCookies',]).controller("adminCtrl",function ($scope,$location,$cookieStore) {
	var u_id=$cookieStore.get("u_id");

	 var username = localStorage.getItem('username');
	//防止非法进入
	if(!username){
		location.href='../index.html'
	}
	// 登出
	$scope.logout=function(){
    localStorage.removeItem('username');
    location.href='../index.html';
	}
	// 路由页面间的跳转
	$scope.jump=function(aa,event){
			 $location.path(aa); 
			 var hash= window.location.hash;
			 // console.log(hash)
			 var Url="#"+aa;
			 console.log(Url)
			 $(event.target).addClass("bg").siblings().removeClass("bg");
		}

	function clearForm() {
    $("#bulid-sort-modal").modal('hide');
    $("#sort-mc").val("");
    $("#add-modal").modal('hide');
    $("#wangzhi").val("");
    $("#mingcheng").val("");
    $("#textarea").val("");

}

}).controller('systemCtrl',function($scope){
		// $scope.msg="起始页面"
	}).
	controller('mynoteCtrl',function($scope){
		// 我的书签：创建分类
			$scope.addSort=function () {
			    var name=$("#sort-mc").val();
			    $scope.data={
			        name:name,
			        u_id:u_id
			    }
			    if(operate=='edit'){
			    	// 修改
					operate = '';//重置
			        var sortId = $('#bulid-sort-modal').attr('c_id');
			       // zhput(sort+"/"+sortId,data).then(function (rs) {
			       // 	 	if(rs.info){
			       //          clearForm();
			       //          showSort();
			       //      }else if(rs.err){
			       //          alert(rs.err)
			       //      }
			       // })
				}else{
			    	//新增
			   //      zhpost(sort,data).then(function (rs) {
			   //      	if(rs.info){
			   //              clearForm();
			   //              showSort();
						// }else if(rs.err){
			   //      		alert(rs.err)
						// }
			   //      });
			   var url=targetUrl+sort;
			   $http({
			   	url: url,
			   	method: 'POST',
			   	data:$scope.data

			   }).success(function(rs){
			   	if(rs.info){
			   		 clearForm();
			          showSort();
			   	}else if(rs.err){
			   		alert(rs.err)
			   	}
			   })
			}
		}

	}).
	controller('myqqCtrl',function($scope){
		// $scope.msg="详情页面"
	}).
	controller('myweixinCtrl',function($scope){
		// $scope.msg="详情页面"
	}).
	controller('myinfoCtrl',function($scope){
		// $scope.msg="详情页面"
	}).
	controller('mysafeCtrl',function($scope){
		// $scope.msg="详情页面"
	}).
	config(function($routeProvider){ //配置路由地址。字典
		$routeProvider.
		when('/system',{
			templateUrl:'tpl/system.html',
			controller:"systemCtrl"  //此处声明的控制器可以供所有模板元素使用
		}).
		when('/mynote',{
			templateUrl:'tpl/mynote.html',
			controller:"mynoteCtrl"
		}).
		when('/myqq',{
			templateUrl:'tpl/myqq.html',
			controller:"myqqCtrl"
		}).
		when('/myweixin',{
			templateUrl:'tpl/myweixin.html',
			controller:"myweixinCtrl"
		}).
		when('/myinfo',{
			templateUrl:'tpl/myinfo.html',
			controller:"myinfoCtrl"
		}).
		when('/mysafe',{
			templateUrl:'tpl/mysafe.html',
			controller:"mysafeCtrl"
		}).
		otherwise({//若地址栏未提供、或者提供了不存在的地址
			redirectTo:'/system'
		})
	})