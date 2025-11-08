import { useNavigate } from "react-router-dom";
import OperationCard from "../components/OperationCard";

export default function LandingPage() {
	const navigate = useNavigate();

	const operations = [
		{ name: "addition", symbol: "+" },
		{ name: "subtraction", symbol: "-" },
		{ name: "multiplication", symbol: "×" },
		{ name: "division", symbol: "÷" }
	];

	return (
		<div className="flex flex-col items-center justify-center min-h-screen bg-gray-950 p-8 text-gray-800">
			<h1 className="text-3xl text-emerald-500 font-bold mb-8">Choose a Math Operation</h1>
			<div className="grid grid-cols-4 gap-6">
				{operations.map((operation) => (
					<OperationCard
					key={operation.name}
					name={operation.name}
					symbol={operation.symbol}
					progress={0}
					score={0}
					onStart={() => navigate(`/mode/${operation.name}`)}
					/>
				))}
			</div>
			<button className="mt-10 px-6 py-3 bg-red-600 text-white font-semibold rounded-lg hover:bg-red-700 transition" onClick={() => {
				if (window.confirm("Are you sure you want to reset all progress?")) {
					localStorage.removeItem("mathScores");
					window.location.reload();
				}
			}}>Reset Progress</button>
		</div>
	);
}