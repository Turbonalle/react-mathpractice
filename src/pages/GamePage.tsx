import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import { operations } from "../data/config";
import type { Problem } from "../types/Problem";
import ProgressBar from "../components/ProgressBar";
import OptionButton from "../components/OptionButton";

export default function GamePage() {
	const TOTAL_PROBLEMS = 10;
	const MAX_SCORE = 100;
	const PENALTY = 20;
	const TICK_SPEED = 100;
	const NEXT_PROBLEM_DELAY = 800;

	const { operation, mode } = useParams();
	const navigate = useNavigate();

	const [problem, setProblem] = useState<Problem | null>(null);
	const [progress, setProgress] = useState(0);
	const [score, setScore] = useState(MAX_SCORE);
	const [totalScore, setTotalScore] = useState(0);
	const [isLocked, setIsLocked] = useState(false);
	const [statuses, setStatuses] = useState<(null | "wrong" | "correct")[]>([]);

	const scoreTimer = useRef<number | null>(null);


// ---- Functions --------------------------------------------------------------

	useEffect(() => {
		if (operation && mode) generateProblem();
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
					// TODO: notify that time is up
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
		setStatuses(Array(newProblem.options.length).fill(null));
		setIsLocked(false);
		startScoreTimer();
	}

	function handleAnswer(selected: number, index: number) {
		if (!problem || isLocked) return;

		if (selected === problem.answer) {
			// Correct: stop timer, mark as correct, lock input
			if (scoreTimer.current) {
				clearInterval(scoreTimer.current);
				scoreTimer.current = null;
			}
			playSound("correct");
			setStatuses((previous) => {
				const updated = [...previous];
				updated[index] = "correct";
				return updated;
			});
			setIsLocked(true);
			setTotalScore((previousScore) => previousScore + score);
			setTimeout(() => {
				nextProblem();
			}, NEXT_PROBLEM_DELAY);
		} else {
			// Wrong: mark as wrong, subtract 10 points
			playSound("wrong");
			setStatuses((previous) => {
				const updated = [...previous];
				updated[index] = "wrong";
				return updated;
			})
			setScore((previous) => Math.max(previous - PENALTY, 0));
		}
	}

	function nextProblem() {
		setProgress((progress) => progress + 1);
		if (progress >= TOTAL_PROBLEMS - 1) {
			console.log("Calling finishGame from nextProblem.");
			finishGame(totalScore + score);
		} else {
			generateProblem();
		}
	}

	function finishGame(finalScore: number) {
		if (!operation || !mode) return;

		const scores = JSON.parse(localStorage.getItem("mathScores") || "{}");

		scores[operation] = scores[operation] || {};

		if (finalScore > scores[operation][mode] || scores[operation][mode] === undefined) {
			scores[operation][mode] = finalScore;
			localStorage.setItem("mathScores", JSON.stringify(scores));
		}

		navigate(`/mode/${operation}`);
	}


// ---- Return -----------------------------------------------------------------

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
						<OptionButton
							key={index}
							value={option}
							onClick={() => handleAnswer(option, index)}
							locked={isLocked || statuses[index] === "wrong"}
							status={statuses[index] as any}
						/>
					))}
				</div>
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
