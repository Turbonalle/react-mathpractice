import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { operations } from "../data/config";
import { useTranslation } from "../data/useTranslation";
import type { Problem } from "../types/Problem";
import ProgressBar from "../components/ProgressBar";
import OptionButton from "../components/OptionButton";

export default function GamePage() {
	const TOTAL_PROBLEMS = 10;
	const MAX_SCORE = 100;
	const PENALTY = 20;
	const TICK_SPEED = 100;
	const NEXT_PROBLEM_DELAY = 800;
	const LEADERBOARD_MAX_ENTRIES = 10;
	
	
	const { operation, mode } = useParams();
	const navigate = useNavigate();
	const { t } = useTranslation();
	
	const [problem, setProblem] = useState<Problem | null>(null);
	const [progress, setProgress] = useState(0);
	const [score, setScore] = useState(MAX_SCORE);
	const [totalScore, setTotalScore] = useState(0);
	const [isLocked, setIsLocked] = useState(false);
	const [statuses, setStatuses] = useState<(null | "wrong" | "correct")[]>([]);

	const scoreTimer = useRef<number | null>(null);

// ---- Functions --------------------------------------------------------------

	useEffect(() => {
		console.log("useEffect called");
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
			// Wrong: mark as wrong, subtract PENALTY points
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
		const newProgress = progress + 1;
		setProgress((p) => p + 1);
		if (newProgress >= TOTAL_PROBLEMS) {
			finishGame(totalScore + score);
		} else {
			generateProblem();
		}
	}

	function finishGame(finalScore: number) {
		if (!operation || !mode) return;

		const scores = JSON.parse(localStorage.getItem("mathScores") || "{}");

		scores[operation] = scores[operation] || {};
		scores[operation][mode] = scores[operation][mode] || [];

		const modeScores = scores[operation][mode];

		const lowestTopScore = modeScores.length < LEADERBOARD_MAX_ENTRIES
			? -Infinity
			: modeScores[modeScores.length - 1].score;

		let position = 0;
		for (let i = 0; i < modeScores.length; i++) {
			position++;
			if (finalScore >= modeScores[i].score) {
				break;
			}
		}

		if (finalScore > lowestTopScore) {
			const name = prompt(t("win1") + position + t("win2") + finalScore + t("win3")) || "Anonymous";
			
			modeScores.push({ name, score: finalScore });
			modeScores.sort((a: {name: string, score: number}, b: {name: string, score: number}) => b.score - a.score);
			modeScores.splice(LEADERBOARD_MAX_ENTRIES);

			localStorage.setItem("mathScores", JSON.stringify(scores));
		}

		navigate(`/mode/${operation}`);
	}


	// ---- Return -------------------------------------------------------------

	if (!operation || !mode || !problem) {
		return (
			<div className="flex flex-col items-center justify-center h-[calc(100vh-52px)] text-white bg-gray-950">
				<p className="text-xl text-red-400">{t("error")}</p>
				<button onClick={() => navigate(`/mode/${operation}`)} className="text-emerald-400 mt-4">
					← {t("back")}
				</button>
			</div>
		);
	}

	return (
		<div className="flex flex-col items-center justify-center min-h-[calc(100vh-52px)] w-full bg-gray-950">
			<div className="flex flex-col items-center justify-center w-full max-w-[500px] text-white p-4 sm:p-8 space-y-8">
				{/* Title */}
				<div className="text-center font-bold capitalize">
					<h1 className="text-2xl sm:text-6xl text-gray-500">{t(`operations.${operation}.name`)}</h1>
					<h1 className="text-4xl sm:text-6xl text-gray-500">
						"
						<span className="text-emerald-400">{t(`operations.${operation}.modes.${mode}`)}</span>
						"
					</h1>
				</div>
				<div className="w-full h-0.5 bg-gray-500"></div>
				
				{/* Total score */}
				<div className="flex flex-col w-full items-center justify-center">
					<p className="text-sm text-gray-400">{t("game.total")}:</p>
					<p className="text-6xl sm:text-6xl text-emerald-400 font-bold">{totalScore}</p>
				</div>

				{/* Score timer (reverse progress) */}
				<ProgressBar
					name={t("game.score")}
					current={score}
					total={MAX_SCORE}
					showTotal={false}
				/>

				{/* Problem display */}
				<AnimatePresence mode="wait">
					<motion.div
						key={problem.question}
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						exit={{ opacity: 0, y: -20 }}
						transition={{ duration: 0.1 }}
						className="bg-gray-800 p-6 sm:p-8 rounded-xl shadow-lg text-center w-full"
					>
						<motion.p
							initial={{ opacity: 0, y: 10 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ delay: 0, duration: 0.05 }}
							className="text-4xl sm:text-5xl font-bold mb-8"
						>
							{problem.question}
						</motion.p>

						<div className="grid grid-cols-2 gap-2">
							{problem.options.map((option, index) => (
								<motion.div
									key={option}
									initial={{ opacity: 0, scale: 0.9 }}
									animate={{ opacity: 1, scale: 1 }}
									transition={{ delay: index * 0.05, duration: 0.05 }}
								>
									<OptionButton
										key={index}
										value={option}
										onClick={() => handleAnswer(option, index)}
										locked={isLocked || statuses[index] === "wrong"}
										status={statuses[index] as any}
									/>
								</motion.div>
							))}
						</div>
					</motion.div>
				</AnimatePresence>

				{/* Progress - Problems done */}
				<ProgressBar
					name={t("game.progress")}
					current={progress}
					total={TOTAL_PROBLEMS}
					showTotal={true}
				/>
			</div>
		</div>
	);
}
