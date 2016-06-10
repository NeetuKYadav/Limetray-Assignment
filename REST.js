var mysql   = require("mysql");

function REST_ROUTER(router,connection,md5) {
    var self = this;
    self.handleRoutes(router,connection,md5);
}

REST_ROUTER.prototype.handleRoutes = function(router,connection,md5) {
    var self = this;
    router.get("/",function(req,res){
        res.json({"Message" : "Api entry point !"});
    });
    router.post("/users/login",function(req,res){
        var query = "select count(id) as ct from user where username='"+req.body.username+"' and pwd='"+req.body.password+"'";
        console.log(query);
        var table = "[]"
        query = mysql.format(query,table);
        connection.query(query,function(err,rows){
            if(err) {
                res.json({"Error" : true, "Message" : "Error executing MySQL query2","Errormsg":err.toString()});
            } else {

                if(rows[0].ct==0){
                    var query = "select count(id) as ct from user where username='"+req.body.username+"'";
        console.log(query);
        var table = "[]"
        query = mysql.format(query,table);
        connection.query(query,function(err,rows){
            if(err) {
                res.json({"Error" : true, "Message" : "Error executing MySQL query2","Errormsg":err.toString()});
            } else if(rows[0].ct==0) {
                res.json({"Error" : false, "Message" : "Username InValid !","result":"false"});

            }
            else{
                res.json({"Error" : false, "Message" : "password InValid !","result":"false"});
            }
        })
                    
                }
                else{
                    res.json({"Error" : false, "Message" : "User Valid !","result":"true"});
                }
            }
        });
    });
    router.post("/user/:id/test",function(req,res){
        var query = "insert into test(user_id) values("+req.params.id+");"
        var table = [];
        console.log(query);
        query = mysql.format(query,table);
        connection.query(query,function(err,rows){
            if(err){
                res.json({"Error" : true, "Message" : "Error executing MySQL query","Errormsg":err.toString()});
            }
            else{
                res.json({"Error" : false, "Message" : "Your test has been started;","test_id":rows.insertId});
            }
        });

    });
    router.post("/user/:id/test/:id2/question/:id3/answer",function(req,res){
        var query = "insert into test_answer(test_id,option_id,question_id) values("+req.params.id2+","+req.body.option_id+","+req.params.id3+");"
        console.log(query);
        connection.query(query,function(err,rows){
            if(err){
                res.json({"Error" : true, "Message" : "Error executing MySQL query","Errormsg":err.toString()});
            }
            else{
                res.json({"Error" : true, "Message" : "Your test has been started;","test_id":rows.insertId});
            }
        });

    });

    router.get("/question",function(req,res){
        var query = "SELECT * FROM question";
        var table = [];
        query = mysql.format(query,table);
        connection.query(query,function(err,rows){
            if(err) {
                res.json({"Error" : true, "Message" : "Error executing MySQL query","Errormsg":err.toString()});
            } else {
                res.json({"Error" : false, "Message" : "Success", "questions" : rows});
            }
        });
    });
    router.get("/question/:id/option",function(req,res){
        var query = "select * from question_option where question_id="+req.params.id;
        var table = [];
        query = mysql.format(query,table);
        connection.query(query,function(err,rows){
            if(err) {
                res.json({"Error" : true, "Message" : "Error executing MySQL query"});
            } else {
                res.json({"Error" : false, "Message" : "Success", "options" : rows});
            }
        });
    });
}

module.exports = REST_ROUTER;
