import type {
	Operator,
	OperatorSecondParameter,
	Condition,
} from "./engineTypes.types";

function createCondition<K extends Operator>(
	field: string,
	operator: K,
	value: OperatorSecondParameter<K>
): Condition<K> {
	return {
		field,
		operator,
		value,
	};
}

function parseRuleStatement(statement: string) {
	//TODO: LEXER
}
