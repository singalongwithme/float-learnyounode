var http = require('http');
var url = require('url');

var server = http.createServer(function (req, res) {

	if (req.method != 'GET') {
		return 'I only receive GET methods!';
	}
	var data = {};
	var parsed = url.parse(req.url, true);
	var date = new Date(parsed.query.iso);

	res.writeHead(200, { 'Content-type': 'applicaton/json' });

	if (parsed.pathname === '/api/parsetime') {

		data.hour = date.getHours();
		data.minute = date.getMinutes();
		data.second = date.getSeconds();

	} else if (parsed.pathname === '/api/unixtime') {
		data.unixtime = date.getTime();
	} else {
		res.writeHead(404);
		res.end();
	}

	res.end(JSON.stringify(data));

})

server.listen(process.argv[2])