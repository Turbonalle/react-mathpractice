import type { Problem } from "../../types/Problem";

export class MultiplicationGenerator {
	private factorPools: Record<number, number[]> = {};

	private getNextFactor(table: number): number {
		let pool = this.factorPools[table];
		if (!pool || pool.length === 0) {
			pool = [];
			for (let i = 0; i <= 10; i++) {
				pool.push(i);
			}
			this.factorPools[table] = pool;
		}
		const index = Math.floor(Math.random() * pool.length);
		return pool.splice(index, 1)[0];
	}

	generate(table: number): Problem {
		const factor = this.getNextFactor(table);
		const answer = table * factor;
		const question = `${table} × ${factor} = ?`;
		const options = generateOptions(table, answer, 4);
		options.push(answer);
		options.sort(() => Math.random() - 0.5);
		return { question, options, answer };
	}
}


// ---- Helper functions -------------------------------------------------------

function generateOptions(table: number, answer: number, optionAmount: number): number[] {
	let options: number[] = [];
	while (options.length < optionAmount - 1) {
		let factor = getRandomInt(0, 10);
		let option = table * factor;
		if (option !== answer && !options.includes(option)) {
			options.push(option);
		}
	}
	return options;
}

function getRandomInt(min: number, max: number): number {
	return (Math.floor(Math.random() * (max - min + 1)) + min);
}
