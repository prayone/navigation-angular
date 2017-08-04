angular.module("admin",['ng','ngRoute']).controller("adminCtrl",function ($scope,$location) {
	// 登出
	$scope.logout=function(){
    localStorage.removeItem('username');
    location.href='../index.html';
	}
	// 路由页面间的跳转
	$scope.jump=function(aa,event){
			 $location.path(aa); 
			 console.log(event.target)
			 $(event.target).addClass("bg").siblings().removeClass("bg");
		}
}).controller('systemCtrl',function($scope){
		// $scope.msg="起始页面"
	}).
	controller('mynoteCtrl',function($scope){
		// $scope.msg="主页面"
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