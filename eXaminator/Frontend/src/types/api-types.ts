export type Base = {
	id: number;
};

export type QuestionSet = Base & {
	name: string;
	questions: Question[];
	creationTime: string;
};

export type Question = Base & {
	text: string;
	questionSetId: number;
	points: number;
	answers: QuestionAnswer[];
};

export type Answer = Base & {
	text: string;
};

export type QuestionAnswer = Answer & {
	isCorrect: boolean;
};
