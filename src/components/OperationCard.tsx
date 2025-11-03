interface OperationCardProps {
	name: string;
	symbol: string;
	progress: number;
	onStart: () => void;
}

export default function OperationCard({ name, symbol, progress, onStart }: OperationCardProps) {
	return (
			<button
				className="p-4 bg-gray-200 shadow rounded-xl hover:scale-105 transition flex flex-col items-center text-center w-45 border-2 border-emerald-500"
				onClick={onStart}
			>
				<h2 className="text-2xl font-bold mb-2 capitalize">{name}</h2>
				<div className="text-4xl mb-4">{symbol}</div>
				<p className="text-gray-500 mb-3">Progress: {progress}%</p>
			</button>
	);
}
