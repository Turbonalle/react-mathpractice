interface LeaderboardProps {
	operation: string;
	mode: string;
};

export default function Leaderboard({ operation, mode }: LeaderboardProps) {
	const scores = JSON.parse(localStorage.getItem("mathScores") || "{}");
	const modeScores = scores[operation]?.[mode] || [];

	return (
		<div className="text-2xl text-emerald-400 font-semibold mb-4 capitailze gap-2">
			<h2 className="mb-4">Top 10</h2>
			
			{modeScores.length === 0 ? (
				<p className="text-gray-400">No scores yet.</p>
			) : (
				<ol>
					{modeScores.map((entry: { name: string; score: number }, i: number) => (
						<li key={i} className="flex justify-between bg-gray-800 px-4 py-2 mb-2">
							<span>{i + 1}. {entry.name}</span>
							<span className="text-emerald-400">{entry.score}</span>
						</li>
					))}
				</ol>
			)}
		</div>
	);
}