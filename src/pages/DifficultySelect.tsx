import { useParams, useNavigate } from "react-router-dom";
import { operations } from "../data/config";
import DifficultyCard from "../components/DifficultyCard";

export default function DifficultySelect() {
	const { operation } = useParams();
	const navigate = useNavigate();

	const operationConfig = operation ? operations[operation] : null;

	const storedScores = JSON.parse(localStorage.getItem("mathScores") || "{}");
	const operationScores = operation ? storedScores[operation] || {} : {};

	if (!operationConfig) {
		return (
			<div className="flex flex-col items-center justify-center min-h-screen bg-gray-950 text-white">
				<p className="text-red-400 text-xl mb-4">Invalid operation selected</p>
				<button
					className="text-emerald-400 hover:text-emerald-300 transition"
					onClick={() => navigate("/")}
				>
					← Back to Home
				</button>
			</div>
		);
	}

	return (
		<div className="flex flex-col items-center justify-center min-h-screen bg-gray-950 p-8 text-center text-gray-800">
			<h1 className="text-3xl text-emerald-400 font-bold mb-8 capitalize">
				{operation} - Select Difficulty
			</h1>
			<div className="grid grid-cols-1 sm:grid-cols-2 md-grid-cols-3 gap-6">
				{operationConfig.difficulties.map((mode: string) => (
					<DifficultyCard
						key={mode}
						name={mode}
						score={operationScores[mode] || 0}
						finished={!!operationScores[mode]}
						onStart={() => navigate(`/mode/${operation}/${mode}`)}
					/>
				))}
			</div>

			<button
				className="mt-10 text-gray-400 hover:text-emerald-400 transition"
				onClick={() => navigate("/")}
			>
				← Back to Home
			</button>
		</div>
	);
}