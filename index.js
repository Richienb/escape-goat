// Multiple `.replace()` calls are actually faster than using replacer functions #2.
const _htmlEscape = string => string
	.replaceAll('&', '&amp;') // Must happen first or else it will escape other just-escaped characters.
	.replaceAll('"', '&quot;')
	.replaceAll('\'', '&#39;')
	.replaceAll('<', '&lt;')
	.replaceAll('>', '&gt;');

const _htmlUnescape = htmlString => htmlString
	.replaceAll('&gt;', '>')
	.replaceAll('&lt;', '<')
	.replaceAll('&#0?39;', '\'')
	.replaceAll('&quot;', '"')
	.replaceAll('&amp;', '&'); // Must happen last or else it will unescape other characters in the wrong order.

export function htmlEscape(strings, ...values) {
	if (typeof strings === 'string') {
		return _htmlEscape(strings);
	}

	let output = strings[0];
	for (const [index, value] of values.entries()) {
		output = output + _htmlEscape(String(value)) + strings[index + 1];
	}

	return output;
}

export function htmlUnescape(strings, ...values) {
	if (typeof strings === 'string') {
		return _htmlUnescape(strings);
	}

	let output = strings[0];
	for (const [index, value] of values.entries()) {
		output = output + _htmlUnescape(String(value)) + strings[index + 1];
	}

	return output;
}
