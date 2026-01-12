const OPERATORS = {
	equals: {
		calculate: (operand1: string, operand2: string) => operand1 === operand2,
		firstOperandType: "string",
		queryRepresentation: "==",
	},
	notEquals: {
		calculate: (operand1: string, operand2: string) => operand1 !== operand2,
		firstOperandType: "string",
		queryRepresentation: "!=",
	},
	greaterThan: {
		calculate: (operand1: number, operand2: number) => operand1 > operand2,
		firstOperandType: "number",
		queryRepresentation: ">",
	},
	lessThan: {
		calculate: (operand1: number, operand2: number) => operand1 < operand2,
		firstOperandType: "number",
		queryRepresentation: "<",
	},
	in: {
		calculate: (operand1: string, operand2: string[]) =>
			operand2.includes(operand1),
		firstOperandType: "string",
		queryRepresentation: "in",
	},
	between: {
		calculate: (operand1: number, operand2: [number, number]) =>
			operand1 >= operand2[0] && operand1 <= operand2[1],
		firstOperandType: "number",
		queryRepresentation: "between",
	},
	matches: {
		calculate: (operand1: string, operand2: RegExp) => operand2.test(operand1),
		firstOperandType: "string",
		queryRepresentation: "matches",
	},
} as const;

type Operator = keyof typeof OPERATORS;
type QueryRepresentation = (typeof OPERATORS)[Operator]["queryRepresentation"];

export const QueryRepresentations: Record<QueryRepresentation, Operator> =
	{} as Record<QueryRepresentation, Operator>;

for (const [operator, operatorValues] of Object.entries(OPERATORS) as [
	Operator,
	(typeof OPERATORS)[Operator],
][]) {
	QueryRepresentations[operatorValues.queryRepresentation] = operator;
}

export default OPERATORS;
