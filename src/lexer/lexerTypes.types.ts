export type ElementReadResult = {
	finalIndex: number;
	resultingElement: Token;
};

export type Token = {
	type: string;
	element: string;
};
