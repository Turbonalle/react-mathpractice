import { additionGenerator } from "./generators/addition";
import { subtractionGenerator } from "./generators/subtraction";
import { MultiplicationGenerator } from "./generators/multiplication";
// import { divisionGenerator } from "./generators/division";
import type { Problem } from "../types/Problem";

export interface OperationConfig {
	symbol: string;
	difficulties: string[];
	generate: (difficulty: string) => Problem;
}

const multiplicationGenerator = new MultiplicationGenerator();

export const operations: Record<string, OperationConfig> = {
	addition: {
		symbol: "+",
		difficulties: ["1", "2", "3", "4", "5", "6", "7", "8"],
		generate: additionGenerator
	},
	subtraction: {
		symbol: "-",
		difficulties: ["1", "2", "3", "4", "5", "6", "7", "8"],
		generate: subtractionGenerator
	},
	multiplication: {
		symbol: "×",
		difficulties: ["1", "2", "3", "4", "5", "6", "7", "8", "9"],
		generate: (mode: string) => {
			switch (mode) {
				case "1": return multiplicationGenerator.generate(2);
				case "2": return multiplicationGenerator.generate(3);
				case "3": return multiplicationGenerator.generate(4);
				case "4": return multiplicationGenerator.generate(5);
				case "5": return multiplicationGenerator.generate(6);
				case "6": return multiplicationGenerator.generate(7);
				case "7": return multiplicationGenerator.generate(8);
				case "8": return multiplicationGenerator.generate(9);
				case "9": return multiplicationGenerator.generate(10);
				default: throw new Error(`Unknown multiplication mode: ${mode}`);
			}
		}
	},
	// division: {
	// 	symbol: "/",
	// 	difficulties: ["1", "2", "3", "4", "5", "6", "7", "8"],
	// 	generate: divisionGenerator
	// },
};
