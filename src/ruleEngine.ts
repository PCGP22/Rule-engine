import operatorMap from "./operators";
import { isValidOperation } from "./validators";
import type { Condition, Decision, Facts, Rule } from "./engineTypes.types";

function solveOperation(condition: Condition, facts: Facts): boolean {
	const { operator, fact: conditionFact } = condition;
	const operand1 = facts[conditionFact];
	const operand2 = condition.value;
	const operation = operatorMap.get(operator);

	if (operation === undefined)
		throw new Error(`Invalid operation: ${operator}`);

	return operation(operand1, operand2);
}

function makeDecision(rules: Rule[], facts: Facts): Decision {
	const decision: Decision = {
		matchedRule: [],
		actions: [],
		tracing: [],
	};

	let currentPriority = -Infinity;

	for (let rule of rules) {
		const results: boolean[] = [];
		checkConditions(rule, results);
		pushResults(rule, results, decision);
	}

	return decision;

	function checkConditions(rule: Rule, results: boolean[]) {
		for (let condition of rule.conditions) {
			let operationResult =
				isValidOperation(condition, facts) && solveOperation(condition, facts);

			decision.tracing.push({ condition, result: operationResult });
			results.push(operationResult);
		}
	}

	function pushResults(rule: Rule, results: boolean[], decision: Decision) {
		if (results.every((r) => r) && rule.priority > currentPriority) {
			currentPriority = rule.priority;

			decision.matchedRule.push(rule.id);
			decision.actions = [rule.action];
		}
	}
}

console.dir(
	makeDecision(
		[
			{
				id: "big-file",
				conditions: [
					{ fact: "file.size", operator: "greaterThan", value: 5_000_000 },
				],
				action: {
					type: "move",
					params: { target: "/big-files" },
				},
				priority: 10,
			},
			{
				id: "pdf-file",
				conditions: [{ fact: "file.type", operator: "equals", value: "pdf" }],
				action: {
					type: "move",
					params: { target: "/pdf-files" },
				},
				priority: 100,
			},
		],
		{
			"file.size": 7_000_000,
			"file.type": "pdf",
		}
	),
	{ depth: null }
);
