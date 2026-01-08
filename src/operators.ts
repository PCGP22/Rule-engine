const OPERATORS = {
	equals: {
		calculate: (operand1: string, operand2: string) => operand1 === operand2,
		firstOperandType: "string",
	},
	notEquals: {
		calculate: (operand1: string, operand2: string) => operand1 !== operand2,
		firstOperandType: "string",
	},
	greaterThan: {
		calculate: (operand1: number, operand2: number) => operand1 > operand2,
		firstOperandType: "number",
	},
	lessThan: {
		calculate: (operand1: number, operand2: number) => operand1 < operand2,
		firstOperandType: "number",
	},
	in: {
		calculate: (operand1: string, operand2: string[]) =>
			operand2.includes(operand1),
		firstOperandType: "string",
	},
	between: {
		calculate: (operand1: number, operand2: [number, number]) =>
			operand1 >= operand2[0] && operand1 <= operand2[1],
		firstOperandType: "number",
	},
	matches: {
		calculate: (operand1: string, operand2: RegExp) => operand2.test(operand1),
		firstOperandType: "string",
	},
} as const;

export default OPERATORS;
