// Create web server 

// Path: server.js
// Create web server 
var http = require('http');
var url = require('url');
var fs = require('fs');
var comments = require('./comments.js');
var members = require('./members.js');
var skills = require('./skills.js');
var server = http.createServer(function(req, res) {
    var path = url.parse(req.url).pathname;
    switch (path) {
        case '/':
            fs.readFile(__dirname + '/index.html', function(err, data) {
                if (err) return send404(res);
                res.writeHead(200, { 'Content-Type': path == 'json.js' ? 'text/javascript' : 'text/html' })
                res.write(data, 'utf8');
                res.end();
            });
            break;
        case '/comments':
            comments.getComments(req, res);
            break;
        case '/members':
            members.getMembers(req, res);
            break;
        case '/skills':
            skills.getSkills(req, res);
            break;
        default:
            send404(res);
    }
});
send404 = function(res) {
    res.writeHead(404);
    res.write('404');
    res.end();
};
server.listen(8080);
console.log('Listening at http://localhost:8080');