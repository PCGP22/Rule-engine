import OPERATORS from "./operators";

export type DecisionTree = {
	context: Context;
	ruleEvaluations: RuleEvaluationResult[];
	winningRuleId?: string;
};

export type ConditionEvalResult = {
	condition: string;
	result: boolean;
	reason: string;
};

export type RuleEvaluationResult = {
	ruleId: string;
	matched: boolean;
	conditionResults: ConditionEvalResult[];
};

export type Action = {
	type: string;
	params: Record<string, string>;
};

export type Rule = {
	id: string;
	action: Action;
	conditions: Condition[];
	priority: number;
};

export type Context = Record<string, string | number>;

export type OperatorCollection = typeof OPERATORS;
export type Operator = keyof OperatorCollection;
export type OperatorSecondParameter<K extends Operator> = Parameters<
	OperatorCollection[K]["calculate"]
>[1];

export type Condition<K extends Operator = Operator> = {
	field: string;
	operator: K;
	value: OperatorSecondParameter<K>;
};
