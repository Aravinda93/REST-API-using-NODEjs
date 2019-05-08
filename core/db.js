var 	sqlDb 		=	require('mssql');
var 	settings	=	require('../settings');

exports.executeSql	=	function(sql, callback){
	var 	conn 	=	new sqlDb.ConnectionPool(settings.dbConfig);
	conn.connect().then(function(){
		console.log("Connection Successful");
		var req 	=	new sqlDb.Request(conn);
		req.query(sql).then(function(recordset){
			callback(recordset);
		}).catch(function(err){
			console.log("**** Query Execution Failed ****");
			console.log(err);
			callback(null, err);
		});
	}).catch(function(err){
		console.log("**** Connection Failed ****");
		console.log(err);
		callback(null, err);
	});
};