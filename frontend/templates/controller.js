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
            TestService.checkLogin(data).success(function(response){
                alert(response);
            }).error(function(response){
                alert(response);
            })
        }
    }

]);
