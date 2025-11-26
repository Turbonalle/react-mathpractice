import { useTranslation } from "../data/useTranslation";

interface ModeCardProps {
	name: string;
	record: { name: string; score: number } | undefined;
	onStart: () => void;
	onHover: () => void;
	onLeave: () => void;
}

export default function ModeCard({ name, record, onStart, onHover, onLeave }: ModeCardProps) {
	const { t } = useTranslation();

	return (
			<button
				className="p-2 bg-gray-300 shadow rounded-xl hover:scale-105 transition flex flex-col items-center text-center w-65 border-2 border-gray-600 hover:border-emerald-400"
				onClick={onStart}
				onMouseEnter={onHover}
				onMouseLeave={onLeave}
			>
				<h2 className="text-2xl font-bold mb-1">{name}</h2>
				{record ? (
					<div className="text-gray-500 text-sm">{t("modepage.record")}: {record.name}, {record.score}</div>
				) : (
					<div className="text-gray-500 text-sm">{t("modepage.record")}: -</div>
				)}
			</button>
	);
};