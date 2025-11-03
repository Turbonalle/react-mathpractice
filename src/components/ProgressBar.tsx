interface ProgressBarProps {
	current: number,
	total: number
}

export default function OperationCard({ current, total }: ProgressBarProps) {
	const percent = (current / total) * 100;
	return (
		<div className="w-full h-4 bg-gray-300 rounded-full">
			<div
				className="h-full bg-green-500 rounded-full transition-all"
				style={{ width: `${percent}%`}}
			/>
		</div>
	);
}