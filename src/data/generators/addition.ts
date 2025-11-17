import type { Problem } from "../../types/Problem";

export function additionGenerator(mode: string): Problem {
	let a: number = 0;
	let b: number = 0;
	let sum: number = 0;
	let answer: number = 0;
	let options: number[] = [];
	let question: string = "";
	const optionAmount = 4;

	switch (mode) {
		case "1": {
			sum = getRandomInt(0, 5);
			a = Math.floor(Math.random() * (sum + 1));
			b = sum - a;
			answer = sum;
			options = generateOptions(answer, 0, 5, optionAmount);
			question = a + " + " + b + " = ?";
			break;
		}
		case "2": {
			sum = getRandomInt(5, 10);
			a = Math.floor(Math.random() * (sum + 1));
			b = sum - a;
			answer = sum;
			options = generateOptions(answer, 0, 5, optionAmount);
			question = a + " + " + b + " = ?";
			break;
		}
		case "3": {
			sum = 10;
			a = Math.floor(Math.random() * (sum + 1));
			b = sum - a;
			answer = 10 - a;
			options = generateOptions(answer, 0, 10, optionAmount);
			question = a + " + ? = " + sum;
			break;
		}
		case "4": {
			sum = getRandomInt(10, 20);
			a = 10;
			b = sum - a;
			answer = sum;
			options = generateOptions(answer, 0, 10, optionAmount);
			question = a + " + " + b + " = ?";
			break;
		}
		case "5": {
			sum = getRandomInt(10, 20);
			a = getRandomInt(10, sum);
			b = sum - a;
			answer = sum;
			options = generateOptions(answer, 0, 10, optionAmount);
			question = a + " + " + b + " = ?";
			break;
		}
		case "6": {
			sum = getRandomInt(11, 15);
			a = getRandomInt(5, 9);
			b = sum - a;
			answer = sum;
			options = generateOptions(answer, 2, 10, optionAmount);
			question = a + " + " + b + " = ?";
			break;
		}
		case "7": {
			sum = getRandomInt(15, 20);
			a = getRandomInt(5, 9);
			b = sum - a;
			answer = sum;
			options = generateOptions(answer, 6, 15, optionAmount);
			question = a + " + " + b + " = ?";
			break;
		}
		case "8": {
			sum = getRandomInt(20, 100);
			a = getRandomInt(20, sum);
			b = sum - a;
			answer = sum;
			options = generateOptions(answer, 0, 80, optionAmount);
			question = a + " + " + b + " = ?";
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