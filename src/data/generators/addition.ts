import type { Problem } from "../../types/Problem";

export function additionGenerator(difficulty: string): Problem {
	let a = 0, b = 0, sum = 0, answer = 0;
	let options: number[] = [];
	const optionAmount = 4;

	switch (difficulty) {
		case "0 to 5": {
			sum = getRandomInt(0, 5);
			a = Math.floor(Math.random() * (sum + 1));
			b = sum - a;
			answer = sum;
			options = generateOptions(answer, 0, 5, optionAmount);
			break;
		}
		case "0 to 10": {
			sum = getRandomInt(5, 10);
			a = Math.floor(Math.random() * (sum + 1));
			b = sum - a;
			answer = sum;
			options = generateOptions(answer, 0, 5, optionAmount);
			break;
		}
	}

	options.push(answer);
	options = options.sort(() => Math.random() - 0.5);
	return { a, b, answer, options };
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