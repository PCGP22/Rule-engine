import OPERATORS from "./operators";
import type {
	Operator,
	RuleEvaluationResult,
	Condition,
	OperatorSecondParameter,
	Context,
	ConditionEvalResult,
	Rule,
	DecisionTree,
} from "./engineTypes.types";

export function evaluateCondition(
	condition: Condition,
	context: Context
): ConditionEvalResult {
	const operand1 = context[condition.field];
	const operand2 = condition.value;
	const operation = OPERATORS[condition.operator];

	const resultingEvaluation: ConditionEvalResult = {
		condition: `${condition.field} = ${operand1}; expected ${condition.operator} ${operand2}`,
		result: false,
		reason: "Operation executed successfully",
	};

	if (
		operand1 === undefined ||
		typeof operand1 !== operation.firstOperandType
	) {
		resultingEvaluation.reason = "Invalid context operand";
	} else {
		resultingEvaluation.result = operation.calculate(
			operand1 as never,
			operand2 as never
		);
	}

	return resultingEvaluation;
}

export function evaluateSingleRule(
	rule: Rule,
	context: Context
): RuleEvaluationResult {
	const resultingEvaluation: RuleEvaluationResult = {
		ruleId: rule.id,
		matched: true,
		conditionResults: [],
	};

	for (let condition of rule.conditions) {
		const currentConditionResult = evaluateCondition(condition, context);
		resultingEvaluation.conditionResults.push(currentConditionResult);
		if (!currentConditionResult.result) resultingEvaluation.matched = false;
	}

	return resultingEvaluation;
}

export function evaluateRules(rules: Rule[], context: Context): DecisionTree {
	const resultingDecision: DecisionTree = {
		context,
		ruleEvaluations: [],
		winningRuleId: undefined,
	};
	let currentMaxPriority = -Infinity;

	for (let rule of rules) {
		const currentRuleResult = evaluateSingleRule(rule, context);
		resultingDecision.ruleEvaluations.push(currentRuleResult);

		if (currentRuleResult.matched && rule.priority >= currentMaxPriority) {
			(resultingDecision.winningRuleId = rule.id),
				(currentMaxPriority = rule.priority);
		}
	}

	return resultingDecision;
}
