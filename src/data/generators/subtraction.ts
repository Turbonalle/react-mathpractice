import type { Problem } from "../../types/Problem";

const optionAmount = 4;

export class SubtractionGenerator {
	private pool: [number, number][] = [];

	private fillPool(min: number, max: number) {
		this.pool = [];
		for (let i = min; i <= max; i++) {
			for (let j = min; j <= i; j++) {
				this.pool.push([i, j]);
			}
		}
	}

	private getRandomPair(min: number, max: number): [number, number] {
		if (!this.pool || this.pool.length == 0) {
			this.fillPool(min, max);
		}
		const index = Math.floor(Math.random() * this.pool.length);
		const pair = this.pool.splice(index, 1)[0];
		return pair;
	}

	private generateUnknownDifference(min: number, max: number): Problem {
		this.fillPool(min, max);
		const pair = this.getRandomPair(min, max);
		const answer = pair[0] - pair[1];
		const question = pair[0] + " - " + pair[1] + " = ?";
		let options = generateOptions(answer, min, max, optionAmount);
		options.push(answer);
		options = options.sort(() => Math.random() - 0.5);
		return { question, options, answer };
	}

	generate(mode: string): Problem {
		switch (mode) {
			case "1": {
				return this.generateUnknownDifference(0, 5);
			}
			case "2": {
				return this.generateUnknownDifference(0, 10);
			}
			default: throw new Error(`Unknown subtraction mode: $(mode)`);
		}
	}
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