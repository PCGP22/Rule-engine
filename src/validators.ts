import { availableOperatorsType } from "./engineTypes.types";
import type { Condition, Facts, Operator } from "./engineTypes.types";

function checkOperandsType(
	operator: Operator,
	operands: Array<string | number | null>
): boolean {
	if (availableOperatorsType[operator] === "same") {
		return typeof operands[0] === typeof operands[1];
	}

	if (operands.some((o) => typeof o !== availableOperatorsType[operator])) {
		return false;
	}

	return true;
}

export function isValidOperation(condition: Condition, facts: Facts): boolean {
	const firstOperand = facts[condition.fact];

	if (firstOperand === undefined) {
		return false;
	}

	const secondOperand = condition.value ?? null;
	const operands = [firstOperand, secondOperand];

	return checkOperandsType(condition.operator, operands);
}
