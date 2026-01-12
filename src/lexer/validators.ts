export const QUERY_OPERATORS = ["if", "and", "then", "elseif", "else"];

export function isValidIdentifier(character: string): boolean {
	return /\S/i.test(character);
}

export function isNumber(character: string): boolean {
	return !!parseInt(character, 10);
}

export function isNumberOrUnderscore(character: string): boolean {
	return character === "_" || !isNaN(parseInt(character, 10));
}

export function isOperator(character: string): boolean {
	const operators = [">", "<", "="];
	return operators.includes(character);
}
