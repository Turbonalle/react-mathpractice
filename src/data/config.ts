import { additionGenerator } from "./generators/addition";
import { subtractionGenerator } from "./generators/subtraction";
import type { Problem } from "../types/Problem";

export interface OperationConfig {
	symbol: string;
	difficulties: string[];
	generate: (difficulty: string) => Problem;
}

export const operations: Record<string, OperationConfig> = {
	addition: {
		symbol: "+",
		difficulties: ["0 to 5", "0 to 10", "Pairs of ten", "Add to ten", "10 to 20", "Past ten: low", "Past ten: high", "20 to 100"],
		generate: additionGenerator
	},
	subtraction: {
		symbol: "-",
		difficulties: ["0 to 5", "0 to 10", "10 - x", "20 - x", "Past ten", "0 to 100"],
		generate: subtractionGenerator
	}
};
