var		http 		=	require("http");
var 	emp			=	require("../controllers/employee");
var 	settings	=	require("../settings");
var 	httpMsgs	=	require('./httpMsgs');


http.createServer(function(req, res){

	switch(req.method){
		case "GET"		:
			if(req.url === '/'){
				httpMsgs.showHome(req,res);
				res.end();
			}
			else if(req.url === '/employees'){
				console.log(req.url);
				emp.getList(req, res)
			}
			else{
				var empnopatt 	=	"[0-9]+";
				var patt		=	new RegExp("/employees/"+empnopatt);
				if(patt.test(req.url)){
					patt		=	new RegExp(empnopatt);
					var empno	=	patt.exec(req.url);
					emp.get(req, res, empno);	
				}
				else
				{
					httpMsgs.show404(req,res);
				}
			}
			break;

		case "POST"		:
			if(req.url === '/employees'){
				var reqBody	=	'';
				req.on("data", function(data){
					reqBody += data;
					if(reqBody.length > 1e7) //10 MB
					{
						httpMsgs.show413(req, res);
					}
				});

				req.on("end", function(){
					emp.add(req, res, reqBody);	
				});

			}
			else{
				httpMsgs.show404(req,res);
			}
			break;

		case "PUT"		:
			if(req.url === '/employees'){
				var reqBody	=	'';
				req.on("data", function(data){
					reqBody += data;
					if(reqBody.length > 1e7) //10 MB
					{
						httpMsgs.show413(req, res);
					}
				});

				req.on("end", function(){
					emp.update(req, res, reqBody);	
				});
			}
			else{
				httpMsgs.show404(req,res);
			}
			break;

		case "DELETE"	:
			if(req.url === '/employees'){
				var reqBody	=	'';
				req.on("data", function(data){
					reqBody += data;
					if(reqBody.length > 1e7) //10 MB
					{
						httpMsgs.show413(req, res);
					}
				});

				req.on("end", function(){
					emp.delete(req, res, reqBody);	
				});
			}
			else{
				httpMsgs.show404(req,res);
			}
			break;

		default			:
			httpMsgs.show(req,res);
			break;
	}
}).listen(settings.webPort,function(){
	console.log("Started Listening at : " + settings.webPort);
});