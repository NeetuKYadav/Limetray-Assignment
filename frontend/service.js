testApp.service('TestService', function($http, $filter) {
    this.filterRawMaterialsByName = function(allRawMaterials) {
        return $filter('orderBy')(allRawMaterials, 'name')
    }
    this.checkLogin=function(data){
        return $http.post('http://localhost:3000/api/users/login',data);
    }
});
