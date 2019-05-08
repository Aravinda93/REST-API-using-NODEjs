var 	settings	=	require("../settings");

//Show the message when incorrect data or table is referenced which is not present in the db
exports.show500		=	function(req, res, err){
	if(settings.httpMsgsFormat === "HTML")
	{
		res.writeHead(500, "Internal Error Occured",{"Content-Type":"text/html"});
		res.write("<html><head><title>500</title></head><body>500: Internal Error. Details: "+err+" </body></html>");	
	}
	else
	{
		res.writeHead(500,"Internal Error Occured",{"Content-Type":"application/json"});
		res.write(JSON.stringify({data:" ERROR occurred: " + err }));
	}
	res.end();
};

//Display  data on the page
exports.sendJSON	=	function(req, res, data){
	res.writeHead(200,{"Content-Type":"application/json"});
	if(data)
	{
		res.write(JSON.stringify(data.recordset));
	}
	else
	{
		res.write(JSON.stringify({data:" No Data Found for the query "}));
	}

	res.end();
};

//Display if user is trying to access HTTML methods other than PUT, GET, POST, DELETE
exports.show405	=	function(req, res){
	if(settings.httpMsgsFormat === 'HTML')
	{
		res.writeHead(405,"Method not Supported",{"Content-Type":"text/html"});
		res.write("<html><head><title>405</title></head><body></body>405: Method not Supported</html>");
	}
	else
	{
		res.writeHead(405,"Method not Supported",{"Content-Type":"application/json"});
		res.write(JSON.stringify({data : "Method not Supported"}));
	}
	res.end();
};

//Display the messahe when the users tried to access url which is not available
exports.show404	=	function(req, res){
	if(settings.httpMsgsFormat === 'HTML')
	{
		res.writeHead(404,"Resource Not Found",{"Content-Type":"text/html"});
		res.write("<html><head><title>404</title></head><body></body>404: Resource Not Found</html>");
	}
	else
	{
		res.writeHead(404,"Resource Not Found",{"Content-Type":"application/json"});
		res.write(JSON.stringify({data : "Resource Not Found"}));
	}
	res.end();
};

//Display when user is trying to bloat with lot of information such as 100s of POST request then we display this  message 
exports.show413	=	function(req, res){
	if(settings.httpMsgsFormat === 'HTML')
	{
		res.writeHead(413,"Request entity too large",{"Content-Type":"text/html"});
		res.write("<html><head><title>405</title></head><body></body>413: Request entity too large</html>");
	}
	else
	{
		res.writeHead(413,"Request entity too large",{"Content-Type":"application/json"});
		res.write(JSON.stringify({data : "Request entity too large"}));
	}
	res.end();
};

//Display when the request is successful
exports.show200	=	function(req, res){
	res.writeHead(200,{"Content-Type":"application/json"});
	res.end();
};

//Display the home page
exports.showHome	=	function(req,res)
{
	if(settings.httpMsgsFormat	===	"HTML")
	{
		res.writeHead(200,{"Content-Type" : "text/html"});
		res.write("<html><head><title>REST API | Home</title></head><body>Valid endpoints:<br/> /employees - to list all employee <br/>/employees/empno - to GET particular employee </body></html>")
	}
	else
	{
		res.writeHead(200,{"Content-Type":"application/JSON"});
		res.write(JSON.stringify([
			{url:"/employees",operation:"GET",description:"To list all employees"},
			{url:"/employees/<empno>", operation:"GET", description:"To search particular employee"}
		]));
	}
	res.end();
}
