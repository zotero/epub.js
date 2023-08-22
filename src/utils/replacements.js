import { qs, qsa } from "./core";
import Url from "./url";
import Path from "./path";

export function replaceBase(doc, section){
	var base;
	var head;
	var url = section.url;
	var absolute = (url.indexOf("://") > -1);

	if(!doc){
		return;
	}

	head = qs(doc, "head");
	base = qs(head, "base");

	if(!base) {
		base = doc.createElement("base");
		head.insertBefore(base, head.firstChild);
	}

	// Fix for Safari crashing if the url doesn't have an origin
	if (!absolute && window && window.location) {
		url = window.location.origin + url;
	}

	base.setAttribute("href", url);
}

export function replaceCanonical(doc, section){
	var head;
	var link;
	var url = section.canonical;

	if(!doc){
		return;
	}

	head = qs(doc, "head");
	link = qs(head, "link[rel='canonical']");

	if (link) {
		link.setAttribute("href", url);
	} else {
		link = doc.createElement("link");
		link.setAttribute("rel", "canonical");
		link.setAttribute("href", url);
		head.appendChild(link);
	}
}

export function replaceMeta(doc, section){
	var head;
	var meta;
	var id = section.idref;
	if(!doc){
		return;
	}

	head = qs(doc, "head");
	meta = qs(head, "link[property='dc.identifier']");

	if (meta) {
		meta.setAttribute("content", id);
	} else {
		meta = doc.createElement("meta");
		meta.setAttribute("name", "dc.identifier");
		meta.setAttribute("content", id);
		head.appendChild(meta);
	}
}

// TODO: move me to Contents
export function replaceLinks(contents, fn) {

	var links = contents.querySelectorAll("a[href]");

	if (!links.length) {
		return;
	}

	var base = qs(contents.ownerDocument, "base");
	var location = base ? base.getAttribute("href") : undefined;
	var replaceLink = function(link){
		var href = link.getAttribute("href");

		if(href.indexOf("mailto:") === 0){
			return;
		}

		var absolute = (href.indexOf("://") > -1);

		if(absolute){

			link.setAttribute("target", "_blank");

		}else{
			var linkUrl;
			try {
				linkUrl = new Url(href, location);
			} catch(error) {
				// NOOP
			}

			link.onclick = function(){

				if(linkUrl && linkUrl.hash) {
					fn(linkUrl.Path.path + linkUrl.hash);
				} else if(linkUrl){
					fn(linkUrl.Path.path);
				} else {
					fn(href);
				}

				return false;
			};
		}
	}.bind(this);

	for (var i = 0; i < links.length; i++) {
		replaceLink(links[i]);
	}


}

export function substituteInText(text, urls, replacements) {
	urls.forEach((url, i) => {
		if (url && replacements[i]) {
			// Account for special characters in the file name.
			// See https://stackoverflow.com/a/6318729.
			url = url.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
			text = text.replace(new RegExp(url, "g"), replacements[i]);
		}
	});
	return text;
}

export function substituteInDocument(doc, urls, replacements, relativeTo) {
	let map = new Map();
	for (let [i, url] of urls.entries()) {
		if (url && replacements[i]) {
			map.set(url, replacements[i]);
		}
	}
	let nodeIter = doc.createNodeIterator(doc, NodeFilter.SHOW_ELEMENT, (node) => {
		return node.hasAttribute("src") || node.hasAttribute("href")
		|| node.hasAttributeNS("http://www.w3.org/1999/xlink", "href")
			? NodeFilter.FILTER_ACCEPT
			: NodeFilter.FILTER_SKIP;
	});
	let node;
	while ((node = nodeIter.nextNode())) {
		let src = node.getAttribute("src");
		src = src && relativeTo.resolve(src);
		let href = node.getAttribute("href");
		href = href && relativeTo.resolve(href);
		let xlinkHref = node.getAttributeNS("http://www.w3.org/1999/xlink", "href");
		xlinkHref = xlinkHref && relativeTo.resolve(xlinkHref);
		if (src && map.has(src)) {
			node.setAttribute("src", map.get(src));
		}
		if (href && map.has(href)) {
			node.setAttribute("href", map.get(href));
		}
		if (xlinkHref && map.has(xlinkHref)) {
			node.setAttributeNS("http://www.w3.org/1999/xlink", "href", map.get(xlinkHref));
		}
	}
	return doc;
}
