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
        $scope.userData = TestService.getUserData();
        /*ends*/
        var urlParams = $location.search();
        if(urlParams.userid!=undefined){
            var data={};
            data.username=urlParams.userid;
            data.password=urlParams.userid;
            TestService.checkLogin(data).success(function(response){
                if(response.Error==false&& response.result=="true"){
                    var expireDate = new Date();
                expireDate.setDate(expireDate.getDate() + 1);
                $cookies.put('isLoggedIn', 1, { 'expires': expireDate });
                var data ={};
                data.user_id=response.user_id;
                data.username=urlParams.userid;
                TestService.loginTheUser(data);
                    $window.location.href = "#/index"
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
        $scope.logout = function(){
            //alert('logout')
            $cookies.remove('isLoggedIn');
            //delete $cookies['isLoggedIn'];
            $location.path('/login');
        }
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
                var data ={};
                data.user_id=response.user_id;
                data.username=$scope.username;
                TestService.loginTheUser(data);
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

/*main controller*/

testApp.controller('mainController', ['$scope', '$location', '$cookies', '$window', '$http', 'TestService',
    function($scope, $location, $cookies, $window, $http, TestService) {
        $scope.activeROute = 'data';
        $scope.userData = TestService.getUserData();
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
        $scope.activeTestId=0;
        $scope.activeQuestionOptions=[];
        $scope.activeScoreRights=0;
        $scope.activeScoreWrongs=0;
        $scope.qindex=1;
        /*ends*/
        findOptionById = function(id){
            debugger
            return _.find($scope.activeQuestionOptions,{"id":id})
        }
        fetchQuestions = function(){
            TestService.fetchQuestions().success(function(response){
                if(response.Error==false){
                    $scope.questions = response.questions;
                }
                else{
                    alert("unknown error ocured");
                }
            }).error(function(response){

            })
        }
        $scope.submitAns =function(){
            var userId = $scope.userData.user_id;
            var testId = $scope.activeTestId;
            var activeQuestionId = $scope.activeQuestion.id;
            var optionId = $scope.answerOption;
            var data ={};
            data.option_id = optionId;
            TestService.submitAns(userId,testId,activeQuestionId,data).success(function(response){
                var opd = findOptionById(optionId)
                $scope.disableAns=1;
                if(opd.is_answer==1){
                    $scope.activeScoreRights++;
                    $scope.answer = "Your answer is correct!!"
                }
                else{
                    $scope.activeScoreWrongs++;
                    $scope.answer="Your answer is wrong!!"
                }
                delete $scope.questions[$scope.activeQuestionIndex];
                $scope.next();
                console.log('ans',response);
            }).error(function(response){
                alert('unknown error occured')
            })
        }
        $scope.prev=function(){
            $scope.activeQuestionIndex--;
            $scope.activeQuestion = $scope.questions[$scope.activeQuestionIndex];
            fetchQuestionsOptions($scope.activeQuestion.id);
            if($scope.disableAns==1){
                $scope.questions.splice($scope.activeQuestionIndex+1,1);
            }
            $scope.disableAns=0;
            $scope.answer="";

        }
        $scope.next=function(){
            $scope.activeQuestionIndex++;
            $scope.activeQuestion = $scope.questions[$scope.activeQuestionIndex];
            if($scope.disableAns==1){
                $scope.questions.splice($scope.activeQuestionIndex-1,1);
                $scope.activeQuestionIndex--;
            }
            fetchQuestionsOptions($scope.activeQuestion.id);
            $scope.disableAns=0;
            $scope.answer="";

        }
        $scope.startTest = function(){
            TestService.startTest($scope.userData.user_id).success(function(response){
                $scope.activeTestId = response.test_id;
                console.log('test active',$scope.activeTestId)
                $scope.activeQuestion = $scope.questions[0];
                $scope.activeQuestionIndex=0;
                fetchQuestionsOptions($scope.activeQuestion.id);
            }).error(function(response){
                alert('unknown error occured')
            })

        }
        fetchQuestionsOptions = function(id){
            TestService.fetchOptions(id).success(function(response){
                $scope.activeQuestionOptions = response.options;
                console.log($scope.activeQuestionOptions);
            }).error(function(response){

            })
        }
        fetchQuestions();
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
