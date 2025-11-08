import type { Problem } from "../../types/Problem";

export function subtractionGenerator(difficulty: string): Problem {
	let a: number = 0;
	let b: number = 0;
	let answer: number = 0;
	let options: number[] = [];
	let question: string = "";
	const optionAmount = 4;

	switch (difficulty) {
		case "0-5": {
			a = getRandomInt(1, 5);
			b = getRandomInt(0, a);
			answer = a - b;
			options = generateOptions(answer, 0, 5, optionAmount);
			break;
		}
		case "0-10": {
			a = getRandomInt(5, 10);
			b = getRandomInt(1, a);
			answer = a - b;
			options = generateOptions(answer, 5, 10, optionAmount);
			break;
		}
	}

	options.push(answer);
	options = options.sort(() => Math.random() - 0.5);
	return { question, options, answer };
}



// ---- Helper functions -------------------------------------------------------

function getRandomInt(min: number, max: number): number {
	return (Math.floor(Math.random() * (max - min + 1)) + min);
}

function generateOptions(answer: number, min: number, max: number, optionAmount: number): number[] {
	let options: number[] = [];
	while (options.length < optionAmount - 1) {
		let option = getRandomInt(min, max);
		if (option !== answer && !options.includes(option)) {
			options.push(option);
		}
	}
	return options;
}