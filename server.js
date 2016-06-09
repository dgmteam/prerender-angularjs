#!/usr/bin/env node
process.env.PORT = 9999;
var prerender = require('./lib');
var server = prerender({
    //workers: process.env.PRERENDER_NUM_WORKERS,
	workers: 10,
    iterations: process.env.PRERENDER_NUM_ITERATIONS
});
//server.createPage);

server.use(prerender.sendPrerenderHeader());
// server.use(prerender.basicAuth());
// server.use(prerender.whitelist());
server.use(prerender.blacklist());
// server.use(prerender.logger());
server.use(prerender.removeScriptTags());
server.use(prerender.httpHeaders());
//server.use(prerender.inMemoryHtmlCache());
//server.use(prerender.s3HtmlCache());
server.start();
