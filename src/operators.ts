import type { Operation, Operand } from "./engineTypes.types";

const operatorMap = new Map<string, Operation>([
	["equals", (operand1: Operand, operand2: Operand) => operand1 === operand2],
	[
		"greaterThan",
		(operand1: Operand, operand2: Operand) => operand1 > operand2,
	],
	["lessThan", (operand1: Operand, operand2: Operand) => operand1 < operand2],
	[
		"endsWith",
		(operand1: Operand, operand2: Operand) =>
			String(operand1).endsWith(String(operand2)),
	],
	[
		"startsWith",
		(operand1: Operand, operand2: Operand) =>
			String(operand1).startsWith(String(operand2)),
	],
]);

export default operatorMap;
