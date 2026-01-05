export const availableOperatorsType = {
	equals: "same",
	greaterThan: "number",
	lessThan: "number",
	endsWith: "string",
	startsWith: "string",
} as const;

export type Facts = Record<string, string | number>;

export type Operand = number | string;

export type Operator = keyof typeof availableOperatorsType;

export type Condition = {
	fact: string;
	operator: Operator;
	value: string | number;
};

export interface Action {
	type: string;
	params: Facts;
}

export type Rule = {
	id: string;
	conditions: Condition[];
	action: Action;
	priority: number;
};

export type ConditionResult = { condition: Condition; result: boolean };

export type Decision = {
	matchedRule: string[];
	actions: Action[];
	tracing: ConditionResult[];
};

export type Operation = <T extends Operand>(
	operand1: T,
	operand2: T
) => boolean;
