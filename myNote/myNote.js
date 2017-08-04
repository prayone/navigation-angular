angular.module("myNote",['ng']).controller("myNoteCtrl",function ($scope) {
	$scope.user=localStorage.getItem("username");
	// 登出
	$scope.logout=function(){
    localStorage.removeItem('username');
    location.href='../index.html'
	}
	

})