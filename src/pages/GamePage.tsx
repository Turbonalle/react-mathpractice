import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import { operations } from "../data/config";
import type { Problem } from "../types/Problem";
import ProgressBar from "../components/ProgressBar";

export default function GamePage() {
	const TOTAL_PROBLEMS = 10;
	const MAX_SCORE = 100;
	const TICK_SPEED = 100;
	const NEXT_PROBLEM_DELAY = 800;

	const { operation, mode } = useParams();
	const navigate = useNavigate();

	const [problem, setProblem] = useState<Problem | null>(null);
	const [feedback, setFeedback] = useState("");
	const [progress, setProgress] = useState(0);
	const [score, setScore] = useState(MAX_SCORE);
	const [totalScore, setTotalScore] = useState(0);

	const scoreTimer = useRef<number | null>(null);

	useEffect(() => {
		if (operation && mode) generateProblem();
		// Cleanup timer when leaving
		return (() => {
			if (scoreTimer.current) clearInterval(scoreTimer.current);
		});
	}, [operation, mode]);

	function startScoreTimer() {
		if (scoreTimer.current) clearInterval(scoreTimer.current);
		setScore(MAX_SCORE);

		scoreTimer.current = setInterval(() => {
			setScore((prev) => {
				if (prev <= 0) {
					clearInterval(scoreTimer.current!);
					scoreTimer.current = null;
					setFeedback("⏳ Time's up!");
					nextProblem();
					return 0;
				}
				return prev - 1;
			});
		}, TICK_SPEED);
	}

	function playSound(type: "correct" | "wrong") {
		const audio = new Audio(
			type === "correct"
				? "/sounds/correct.wav"
				: "/sounds/wrong.wav"
		);
		audio.volume = 0.3;
		audio.play().catch(() => {});
	}

	function generateProblem() {
		if (!operation || !mode) return;
		const op = operations[operation];
		const newProblem = op.generate(mode);
		setProblem(newProblem);
		setFeedback("");
		startScoreTimer();
		// setTimeout(() => startScoreTimer(), 0);
	}

	function handleAnswer(selected: number) {
		if (!problem) return;
		if (scoreTimer.current) clearInterval(scoreTimer.current);

		if (selected === problem.answer) {
			setTotalScore((previousScore) => previousScore + score);
			playSound("correct");
			setFeedback("✅ Correct!");
		} else {
			playSound("wrong");
			setFeedback("❌ Try again!");
		}
		nextProblem();
	}

	function nextProblem() {
		setProgress((progress) => progress + 1);
		if (progress >= TOTAL_PROBLEMS - 1) {
			setTimeout(() => finishGame(), NEXT_PROBLEM_DELAY);
		} else {
			setTimeout(() => generateProblem(), NEXT_PROBLEM_DELAY);
		}
	}

	function finishGame() {
		if (!operation || !mode) return;

		const scores = JSON.parse(localStorage.getItem("mathScores") || "{}");

		scores[operation] = scores[operation] || {};
		scores[operation][mode] = totalScore;

		localStorage.setItem("mathScores", JSON.stringify(scores));

		navigate(`/mode/${operation}`);
	}

	if (!operation || !mode) {
		return (
			<div className="flex flex-col items-center justify-center min-h-screen text-white bg-gray-950">
				<p className="text-xl text-red-400">Invalid mode selected.</p>
				<button onClick={() => navigate(`/mode/${operation}`)} className="text-emerald-400 mt-4">
					← Go Home
				</button>
			</div>
		);
	}

	if (!problem) {
		return (
			<div className="flex items-center justify-center min-h-screen text-white bg-gray-950">
				<p>Loading problem...</p>
			</div>
		);
	}

	return (
		<div className="flex flex-col items-center justify-center min-h-screen bg-gray-950 text-white p-8 space-y-8">
			<h1 className="text-3xl text-emerald-400 font-bold capitalize">
				{operation} — {mode}
			</h1>

			{/* Score timer (reverse progress) */}
			<div className="w-80">
				<p className="text-sm mb-1 text-gray-400">
					Score: <span className="text-emerald-400">{score}</span>
				</p>
				<p className="text-sm mb-1 text-gray-400">
					Total Score: <span className="text-emerald-400">{totalScore}</span>
				</p>
				<div className="w-full h-4 bg-gray-700 rounded-full">
					<div
						className="h-full bg-emerald-500 rounded-full transition-all"
						style={{ width: `${score}%` }}
					/>
				</div>
			</div>

			{/* Problem display */}
			<div className="bg-gray-800 p-8 rounded-xl shadow-lg text-center w-80">
				<p className="text-5xl font-bold mb-8">
					{problem.question}
				</p>

				<div className="grid grid-cols-2 gap-2">
					{problem.options.map((option, index) => (
						<button
							key={index}
							onClick={() => handleAnswer(option)}
							className="bg-gray-200 text-black text-2xl font-semibold py-3 rounded-xl hover:bg-emerald-400 transition"
						>
							{option}
						</button>
					))}
				</div>

				<p className="text-xl mt-6">{feedback}</p>
			</div>

			{/* Progress bar (how many problems done) */}
			<div className="w-80">
				<p className="text-sm mb-1 text-gray-400">Progress:
					<span className="text-emerald-400"> {progress} / {TOTAL_PROBLEMS}</span>
				</p>
				<ProgressBar current={progress} total={TOTAL_PROBLEMS} />
			</div>

			<button
				onClick={() => navigate(`/mode/${operation}`)}
				className="mt-10 text-gray-400 hover:text-emerald-400 transition"
			>
				← Back
			</button>
		</div>
	);
}
