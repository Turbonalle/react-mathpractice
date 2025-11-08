interface DifficultyCardProps {
	name: string;
	score: number;
	finished: boolean;
	onStart: () => void;
}

export default function DifficultyCard({ name, score, onStart }: DifficultyCardProps) {
	return (
			<button
				className="p-4 bg-gray-200 shadow rounded-xl hover:scale-105 transition flex flex-col items-center text-center w-55 border-2 border-emerald-500"
				onClick={onStart}
			>
				<h2 className="text-2xl font-bold mb-2">{name}</h2>
				<p className="text-gray-500 mb-2">Best score: {score}</p>
			</button>
	);
}