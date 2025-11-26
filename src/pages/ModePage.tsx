import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";
import { operations } from "../data/config";
import { useTranslation } from "../data/useTranslation";
import { resetPools } from "../data/config";
import ModeCard from "../components/ModeCard";
import Leaderboard from "../components/Leaderboard";

export default function ModePage() {
	const navigate = useNavigate();
	const { operation } = useParams();
	const [ hoveredMode, setHoveredMode ] = useState<string | null>(null);
	const { t } = useTranslation();

	const operationConfig = operation ? operations[operation] : null;
	const translatedOperation = operation ? t(`operations.${operation}.name`) : "";

	const storedScores = JSON.parse(localStorage.getItem("mathScores") || "{}");
	const operationScores = operation ? storedScores[operation] || {} : {};


	if (!operationConfig) {
		return (
			<div className="flex flex-col items-center justify-center h-[calc(100vh-52px)] bg-gray-950 text-white">
				<p className="text-red-400 text-xl mb-4">{t("error")}</p>
				<button
					className="text-emerald-400 hover:text-emerald-300 transition"
					onClick={() => navigate("/")}
				>
					← {t("back")}
				</button>
			</div>
		);
	}

	return (
		<div className="flex flex-col items-center h-[calc(100vh-52px)] bg-gray-950 text-center text-gray-800">
			<h1 className="text-emerald-500 font-semibold text-3xl my-4">{translatedOperation} - {t("modepage.title")}</h1>
			
			{/* MAIN CONTENT AREA */}
			<div className="grow flex justify-center items-start gap-4 w-full max-w-5xl h-full bg-gray-950">
					
					{/* LEFT COLUMN */}
					<div className="flex flex-col space-y-2 overflow-y-auto px-2 pt-1 h-full">
						{operationConfig.difficulties.map((modeId: string) => {
							const modeName = t(`operations.${operation}.modes.${modeId}`);
							const topRecord = operationScores[modeId]?.[0];

							return (
								<ModeCard
									key={modeId}
									name={modeName}
									record={topRecord}
									onStart={() => {
										navigate(`/mode/${operation}/${modeId}`);
										resetPools();
									}}
									onHover={() => setHoveredMode(modeId)}
									onLeave={() => setHoveredMode(null)}
								/>
							);
						})}
					</div>
					
					{/* RIGHT COLUMN */}
					{hoveredMode ? (
						<div className="bg-gray-900 p-6 rounded-2xl h-full w-[400px]">
							<Leaderboard operation={operation!} mode={hoveredMode} />
						</div>
					) : (
						<div className="hidden sm:flex bg-gray-900 p-6 rounded-2xl h-full w-[400px] items-center justify-center">
							<div className="text-gray-600 text-base">
								{t("leaderboard.hover")}
							</div>
						</div>
					)}
			</div>
		</div>
	);
}