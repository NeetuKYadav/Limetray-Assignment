testApp.controller('loginController', ['$scope', '$location', '$cookies', '$window', '$http', 'TestService',
    function($scope, $location, $cookies, $window, $http, TestService) {
        $scope.activeROute = 'data';
        $scope.activeDisplay = 'rawMaterial';
        $scope.selectedItemTracker = [];
        $scope.selectedCustomUnitTracker =[];
        $scope.selectedCustomUnits=[];
        $scope.selectedItems = {};
        $scope.allRawMaterials = [];
        $scope.menuItems = [];
        $scope.allMenuItems = [];
        $scope.customUnits = [];
        $scope.initTime = 0;
        $scope.pendingHttps = 0;
        $scope.vendors = [];
        $scope.newVendorData = {};
        $scope.initTime = 0;
        /*ends*/
        $scope.login=function(){
            debugger;
            var data={};
            data.username = $scope.username;
            data.password = $scope.password;
            console.log(TestService);
            TestService.checkLogin(data).success(function(response){
                if(response.Error==false&& response.result=="true"){
                    var expireDate = new Date();
                expireDate.setDate(expireDate.getDate() + 1);
                $cookies.put('isLoggedIn', 1, { 'expires': expireDate });
                    $location.path('/index')
                }
                else if(response.Error="false"){
                    alert(response.Message)
                }
                else{
                    alert("unknown error ocured");
                }
            }).error(function(response){
                alert("unknown error ocured");
            })
        }
    }

]);
