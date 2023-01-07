import type { Handle } from "@sveltejs/kit";
import { minify } from "html-minifier";

const minification_options = {
	collapseBooleanAttributes: true,
	collapseWhitespace: true,
	decodeEntities: true,
	html5: true,
	ignoreCustomComments: [/^#/],
	minifyCSS: true,
	minifyJS: true,
	removeAttributeQuotes: true,
	removeComments: true,
	removeOptionalTags: true,
	removeRedundantAttributes: true,
	removeScriptTypeAttributes: true,
	removeStyleLinkTypeAttributes: true,
	sortAttributes: true,
	sortClassName: true,
	removeEmptyElements: true
};

export const handle: Handle = async ({ resolve, event }) => {
	const response = await resolve(event);

	if (response.headers.get("Content-Type") === "text/html") {
		return new Response(minify(await response.text(), minification_options), {
			status: response.status,
			headers: response.headers
		});
	}

	return response;
};
