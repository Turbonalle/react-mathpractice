interface ModeCardProps {
	name: string;
	record: { name: string; score: number } | undefined;
	onStart: () => void;
	onHover: () => void;
	onLeave: () => void;
}

export default function ModeCard({ name, record, onStart, onHover, onLeave }: ModeCardProps) {
	return (
			<button
				className="p-2 bg-gray-300 shadow rounded-xl hover:scale-105 transition flex flex-col items-center text-center w-55 border-2 border-emerald-500"
				onClick={onStart}
				onMouseEnter={onHover}
				onMouseLeave={onLeave}
			>
				<h2 className="text-2xl font-bold mb-1">{name}</h2>
				{record ? (
					<div className="text-gray-500 text-sm">Record: {record.name}, {record.score}</div>
				) : (
					<div className="text-gray-500 text-sm">Record: -</div>
				)}
			</button>
	);
}