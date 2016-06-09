module.exports = {
	beforeSend: function(req, res, next) {
		if(!req.prerender.documentHTML) {
			  return next();
		}
		var removeContent = function(content){
			var pageContent = content;
			pageContent = pageContent.replace(/<script(.*?)\/script>/gi, '');
			pageContent = pageContent.replace(/<style.*?>([\s\S]*?)<\/style>/gi, '');
			pageContent = pageContent.replace(/<iframe[\s\S]*\/iframe>/gi, '');
			return pageContent;
		};
		req.prerender.documentHTML = removeContent(req.prerender.documentHTML.toString());
		
		var matches = req.prerender.documentHTML.toString().match(/<script(?:.*?)>(?:[\S\s]*?)<\/script>/gi);
		for (var i = 0; matches && i < matches.length; i++) {
			if(matches[i].indexOf('GoogleAnalyticsObject') !== -1) {
				continue;
			}
			if(matches[i].indexOf('application/ld+json') === -1) {
				req.prerender.documentHTML = req.prerender.documentHTML.toString().replace(matches[i], '');
			}
		}

		next();
	}
};
