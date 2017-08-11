var show="/rs/v_category_link";
var sort="/rs/event_category";
var sqlink="/rs/event_link"
var base_addtitle="/op/updateTitle";
var operate = '';
var flag='';
angular.module("admin",['ng','ngRoute','ngCookies',]).controller("adminCtrl",function ($scope,$location,$cookieStore,$rootScope) {
	$rootScope.u_id=$cookieStore.get("u_id");
	$rootScope.sid=$cookieStore.get("sid");
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
			 console.log(Url);
			 $(event.target).addClass("bg").siblings().removeClass("bg");
		}

	$scope.clearForm=function () {
	    $("#bulid-sort-modal").modal('hide');
	    $("#sort-mc").val("");
	    $("#add-modal").modal('hide');
	    $("#wangzhi").val("");
	    $("#mingcheng").val("");
	    $("#textarea").val("");
}
	// 关闭分类模态框
	$scope.closeAddSort=function() {
        $scope.clearForm();
        $('#bulid-sort-modal').modal("hide");
    }

}).controller('systemCtrl',function($scope){
		// $scope.msg="起始页面"
	}).
	controller('mynoteCtrl',function($scope,$rootScope,$http){
			 //显示分类
		    $scope.showSort=function() {
		    var url=targetUrl+show+"?id="+$rootScope.u_id;
			   $http({
			   	url: url,
			   	method: 'GET'
			   }).success(function(rs){
			   	if(rs.length>0){
			   		$scope.sortlist=rs;
			   		 $(".sortLink li").on('mouseover',function () {
		                    $(this).css("border","none");
		                    $(this).find(".bq-icon").css({
		                        "display":"block",
		                        "padding":"0",
		                        "border":"1px solid #F35E06",
		                        "height":"100%",
		                        "background-color":"#fff",
		                        "z-index":"999"
		                    });
		                })
		                $(".sortLink li").on('mouseout',function () {
		                    $(this).css("border","1px solid #B9EEF3");
		                    $(this).find(".bq-icon") .css({
		                        "display":"none",
		                    });
		                });
			   	}else if(rs.err){
			   		alert(rs.err)
			   	}
			   })
		       
		               
		           

		    };
		    $scope.showSort();
		    //修改分类
		    $scope.editSort=function (event) {
		        operate = 'edit';
		        $('#bulid-sort-modal').modal();
		        $("#sort-mc").val($(event.target).parent().siblings(0).html());
		        console.log($(event.target).parent().parent().attr('sortId'))
		        $('#bulid-sort-modal').attr('c_id',$(event.target).parent().parent().attr('sortId'))
		    }
			//创建分类
			$scope.addSort=function () {
			    $scope.name=$scope.sortname;
			    $scope.data={
			        name:$scope.name,
			        u_id:$rootScope.u_id,
			        sid:$rootScope.sid
			    }
			    if(operate=='edit'){
			    	// 修改
					operate = '';//重置
			        var sortId = $('#bulid-sort-modal').attr('c_id');
			        console.log(sortId);
			         var url=targetUrl+sort+"/"+sortId;
			          $http({
						   	url: url,
						   	method: 'PUT',
						   	data:$scope.data
						   }).success(function(rs){
						   	if(rs.info){
						   		 $scope.clearForm();
						           $scope.showSort();
						   	}else if(rs.err){
						   		alert(rs.err)
						   	}
						   })
				}else{
			    //新增分类
			   var url=targetUrl+sort;
			   $http({
			   	url: url,
			   	method: 'POST',
			   	data:$scope.data

			   }).success(function(rs){
			   	if(rs.info){
			   		 $scope.clearForm();
			           $scope.showSort();
			   	}else if(rs.err){
			   		alert(rs.err)
			   	}
			   })
			}
		}
		 //删除分类
		    $scope.deleteSort=function (event) {
		        if(!confirm('确认要删除吗？')){
		            return;
		        }
		        var sortId=$(event.target).parent().parent().attr("sortId");
		        var url=targetUrl+sort+"/"+sortId;
				    $scope.data={
				        sid:$rootScope.sid
				    }
			          $http({
						   	url: url,
						   	method: 'DELETE',
						   	data:$scope.data
						   }).success(function(rs){
						   	if(rs.info){
						           $scope.showSort();
						   	}else if(rs.err){
						   		alert(rs.err)
						   	}
						   })
		    }
// ======================================================================================================================================================
			//绑定分类id
		    $scope.bindId=function(event) {
		    	console.log($(event.target))
		        $("#add-modal").attr("bindid",$(event.target).parent().parent().parent().attr("sortid"));
		    }

			//添加书签
			$scope.addNote=function () {
			    $scope.name=$scope.mingcheng;
			    $scope.link=$scope.link;
			    $scope.intro=$scope.intro;
			    var c_id=$("#add-modal").attr("bindid");
			    $scope.data={
			        name:$scope.name,
			        link:$scope.link,
			        c_id:c_id,
			        intro:$scope.intro,
			        sid:$rootScope.sid
			    }
			    if(flag=='edit'){
			        // 修改
			       flag = '';//重置
			        // var noteid=$("#add-modal").attr("n_id");
			        // var data1={
			        //     name:name,
			        //     link:link,
			        //     intro:intro
			        // }
			        // zhput(sqlink+"/"+noteid,data1).then(function (rs) {
			        //     if(rs.info){
			        //         clearForm();
			        //         showSort();
			        //     }else if(rs.err){
			        //         alert(rs.err)
			        //     }
			        // })
			    }else{
			        //新增
			         var url=targetUrl+sqlink;
					   $http({
					   	url: url,
					   	method: 'POST',
					   	data:$scope.data

					   }).success(function(rs){
					   	if(rs){
					   		$scope.clearForm();
			                c_id='';
					        $scope.showSort();
					   	}else if(rs.err){
					   		alert(rs.err)
					   	}
					   })
			        // zhpost(sqlink,data).then(function (rs) {
			        //     if(rs){
			        //         clearForm();
			        //         c_id='';
			        //         showSort();

			        //     }else if(rs.err){
			        //         alert(rs.err)
			        //     }
			        // });
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