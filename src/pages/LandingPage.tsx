import { useNavigate } from "react-router-dom";
import OperationCard from "../components/OperationCard";
import { useTranslation } from "../data/useTranslation";

export default function LandingPage() {
	const navigate = useNavigate();
	const { t } = useTranslation();

	const operations = [
		{ id: "addition", name: t("operations.addition.name"), symbol: "+" },
		{ id: "subtraction", name: t("operations.subtraction.name"), symbol: "-" },
		{ id: "multiplication", name: t("operations.multiplication.name"), symbol: "×" },
		{ id: "division", name: t("operations.division.name"), symbol: "÷" }
	];

	return (
		<div className="flex flex-col items-center justify-center h-[calc(100vh-52px)] bg-gray-950 p-8 text-gray-800">
			<h1 className="text-3xl text-emerald-500 text-center font-bold mb-8">{t("landing.title")}</h1>
			<div className="grid grid-rows-4 md:grid-rows-1 md:grid-cols-4 gap-x-6 gap-y-2">
				{operations.map((operation) => (
					<OperationCard
					key={operation.name}
					name={operation.name}
					symbol={operation.symbol}
					onStart={() => navigate(`/mode/${operation.id}`)}
					/>
				))}
			</div>
			<button
				className="mt-10 px-6 py-3 bg-red-600 text-white font-semibold rounded-lg hover:bg-red-700 transition"
				onClick={() => {
					if (window.confirm("Are you sure you want to reset all progress?")) {
						localStorage.removeItem("mathScores");
						window.location.reload();
					}
				}}
			>
				{t("landing.reset")}
			</button>
		</div>
	);
}