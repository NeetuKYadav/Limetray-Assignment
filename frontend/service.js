testApp.service('TestService', function($http, $filter,localStorageService) {
    this.filterRawMaterialsByName = function(allRawMaterials) {
        return $filter('orderBy')(allRawMaterials, 'name')
    }
    this.checkLogin=function(data){
        return $http.post('http://localhost:3000/api/users/login',data);
    }
    this.loginTheUser = function(data){
        localStorageService.set("userdata",data);
    }
    this.getUserData = function(){
        return localStorageService.get('userdata');
    }
    this.fetchQuestions = function(){
        return $http.get('http://localhost:3000/api/question');
    }
    this.startTest = function(id){
        return $http.post('http://localhost:3000/api/user/'+id+'/test');
    }
    this.fetchOptions = function(id){
        return $http.get('http://localhost:3000/api/question/'+id+'/option');
    }
    this.submitAns = function(id1,id2,id3,data){
        return $http.post('http://localhost:3000/api/user/'+id1+'/test/'+id2+'/question/'+id3+'/answer',data);
    }


});
