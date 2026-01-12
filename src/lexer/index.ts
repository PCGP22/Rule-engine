import type { ElementReadResult, Token } from "./lexerTypes.types";
import { peek } from "./readers";
import { QueryRepresentations } from "../operators";

const query = `
	IF file.size > 5_000_000
	AND file.type IN ['pdf']
	THEN move target = './big files'
	ELSEIF file.size < 2_000_000
	THEN move target = './small files'
	ELSE move target = '../unfiltered', rename = 'redundant'
`;

function parseQueryToTokens(query: string): Token[] {
	const tokens: Token[] = [];
	query = query.toLowerCase();

	for (let i = 0; i < query.length; i++) {
		if (query[i] === " ") {
			continue;
		} else {
			const { finalIndex, resultingElement } = peek(query, i);
			i = finalIndex;
			tokens.push(resultingElement);
		}
	}

	return tokens;
}

function parseTokens(tokens: Token[]) {
	const resultTree = [];
	let currentParse = {};
	for (let token of tokens) {
	}
}

/**
 *
 */

console.log(parseQueryToTokens(query));
