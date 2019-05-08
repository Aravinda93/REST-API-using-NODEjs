var 	db 			=	require("../core/db");
var 	httpMsgs	=	require("../core/httpMsgs");
var 	util		=	require("util");

//Get all the employees from the table
exports.getList 	=	function(req, res){
	db.executeSql(" SELECT * FROM Emp ", function(data, err){
		if(err)
		{
			httpMsgs.show500(req, res, err);
		}
		else
		{
			httpMsgs.sendJSON(req, res, data);
		}
	});
};

//Get a particular employee from the table
exports.get 		=	function(req, res, empno){
	db.executeSql(" SELECT * FROM emp WHERE empno = "+empno, function(data,err){
		if(err)
		{
			httpMsgs.show500(req, res, err);
		}
		else
		{
			httpMsgs.sendJSON(req, res, data);
		}
	});
};

//Add a new employee
exports.add 		=	function(req, res, reqBody){

	try{
		if(!reqBody){

			throw new Error("Input Not Valid");
		}

		var 	data	=	JSON.parse(reqBody);
		if(data){
			var sql		=	" INSERT INTO emp (Empno, Ename, Sal, Deptno) VALUES ";
			sql			+=	util.format("(%d, '%s', %d, %d)", data.Empno, data.Ename, data.Sal, data.Deptno);
			db.executeSql(sql, function(data, err){
				if(err){
					httpMsgs.show500(req, res, err);
				}
				else
				{
					httpMsgs.show200(req, res);
				}
			});
		}
		else{
			throw new Error("Input Not Valid");
		}
	}
	catch(ex){

		httpMsgs.show500(req, res, ex);
	}
};

//To Update the exisiting employee
exports.update		=	function(req, res, reqBody){
	try{
		if(!reqBody){

			throw new Error("Input Not Valid");
		}

		var 	data	=	JSON.parse(reqBody);
		if(data){

			if(!data.Empno) throw new Error("Employee Number not provided");

			var sql				=	" UPDATE Emp SET ";
			var isDataprovided	=	false;

			if(data.Ename)
			{
				sql				+=	" Ename = '" + data.Ename + "', ";
				isDataprovided	=	true;
			}

			if(data.Sal)
			{
				sql				+=	" Sal = " + data.Sal + ", ";
				isDataprovided	=	true;
			}

			if(data.Deptno)
			{
				sql				+=	" Deptno = " + data.Deptno + ",";
				isDataprovided	=	true;
			}

			sql		=	sql.slice(0, -1);

			sql		+=	" WHERE Empno = " + data.Empno;
			console.log("####################"+sql+"KKKKKKKKKKKKKKKKKKK");
			db.executeSql(sql, function(data, err){
				if(err){
					httpMsgs.show500(req, res, err);
				}
				else
				{
					httpMsgs.show200(req, res);
				}
			});
		}
		else{
			throw new Error("Input Not Valid");
		}
	}
	catch(ex){

		httpMsgs.show500(req, res, ex);
	}
};

//To Delete the exisitng employee
exports.delete		=	function(req, res, reqBody){
	try{
		if(!reqBody){

			throw new Error("Input Not Valid");
		}

		var 	data	=	JSON.parse(reqBody);
		if(data){

			if(!data.Empno) throw new Error("Employee Number not provided");

			var sql	=	" DELETE FROM Emp ";

			sql		+=	" WHERE Empno = " + data.Empno;

			db.executeSql(sql, function(data, err){
				if(err){
					httpMsgs.show500(req, res, err);
				}
				else
				{
					httpMsgs.show200(req, res);
				}
			});
		}
		else{
			throw new Error("Input Not Valid");
		}
	}
	catch(ex){

		httpMsgs.show500(req, res, ex);
	}
};
