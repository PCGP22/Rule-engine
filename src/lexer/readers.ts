import { ElementReadResult } from "./lexerTypes.types";
import {
	isValidIdentifier,
	isNumber,
	isNumberOrUnderscore,
	isOperator,
	QUERY_OPERATORS,
} from "./validators";

export function readIdentifierOrOperator(
	query: string,
	startIndex: number
): ElementReadResult {
	let index = startIndex;
	let resultingType = "identifier";
	const startingCharacter = query[startIndex];

	if (startingCharacter === "'") {
		index++;

		while (query[index] !== "'" && index < query.length) {
			index++;
		}

		index++;
	} else {
		while (isValidIdentifier(query[index])) {
			index++;
		}
	}

	const currentElement = query.slice(startIndex, index);

	if (QUERY_OPERATORS.includes(currentElement)) {
		resultingType = "query_operator";
	}

	return {
		finalIndex: index,
		resultingElement: {
			type: resultingType,
			element: currentElement,
		},
	};
}

export function readNumber(
	query: string,
	startIndex: number
): ElementReadResult {
	let index = startIndex;
	while (isNumberOrUnderscore(query[index])) {
		index++;
	}

	return {
		finalIndex: index,
		resultingElement: {
			type: "number",
			element: query.slice(startIndex, index),
		},
	};
}

export function readOperator(
	query: string,
	startIndex: number
): ElementReadResult {
	let index = startIndex;
	while (isOperator(query[index])) {
		index++;
	}

	return {
		finalIndex: index,
		resultingElement: {
			type: "operator",
			element: query.slice(startIndex, index),
		},
	};
}

export function peek(query: string, startIndex: number): ElementReadResult {
	let currentWord = "";
	let index = startIndex;

	for (let i = index; i < query.length; i++) {
		const currentCharacter = query[i];
		if (currentCharacter === " ") continue;

		if (isOperator(currentCharacter)) {
			return readOperator(query, i);
		}

		if (isNumber(currentCharacter)) {
			return readNumber(query, i);
		}

		if (isValidIdentifier(currentCharacter)) {
			return readIdentifierOrOperator(query, i);
		}
	}

	console.log("Reached string end");
	return {
		finalIndex: query.length,
		resultingElement: {
			type: "end_of_query",
			element: "",
		},
	};
}
