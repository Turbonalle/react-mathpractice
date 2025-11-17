import type { Language } from "../context/LanguageContext";

export const texts: Record<Language, any> = {
	en: {
		landing: {
			title: "Choose a Math Operation",
			reset: "Reset Progress"
		},
		modepage: {
			title: "Choose Mode",
			record: "Record",
		},
		leaderboard: {
			hover: "Hover a mode to view leaderboard",
			top10: "Top 10",
			noscore: "No scores yet"
		},
		game: {
			score: "Score",
			total: "Total Score",
			progress: "Progress",
		},
		back: "Back",
		error: "Sorry, something went wrong...",
		operations: {
			addition: {
				name: "Addition",
				modes: {
					"1": "0 - 5",
					"2": "0 - 10",
					"3": "Ten: Pairs",
					"4": "10 + x",
					"5": "10 - 20",
					"6": "Past 10: low",
					"7": "Past 10: high",
					"8": "20 - 100"
				}
			},
			subtraction: {
				name: "Subtraction",
				modes: {
					"1": "0 - 5",
					"2": "0 - 10",
					"3": "Ten: Pairs",
					"4": "",
					"5": "",
					"6": "",
					"7": "",
					"8": ""
				}
			},
			multiplication: {
				name: "Multiplication",
				modes: {
					"1": "Table 2",
					"2": "Table 3",
					"3": "Table 4",
					"4": "Table 5",
					"5": "Table 6",
					"6": "Table 7",
					"7": "Table 8",
					"8": "Table 9",
					"9": "Table 10",
					"10": "Table 2-10"
				}
			},
			division: {
				name: "Division",
				modes: {
					"1": "",
					"2": "",
					"3": "",
					"4": "",
					"5": "",
					"6": "",
					"7": "",
					"8": ""
				}
			}
		}
	},
	sv: {
		landing: {
			title: "Välj ett räknesätt",
			reset: "Återställ rekord"
		},
		modepage: {
			title: "Välj nivå",
			record: "Rekord",
		},
		leaderboard: {
			hover: "Håll muspekaren över en nivå för att se topplistan",
			top10: "Topp 10",
			noscore: "Inga poäng ännu"
		},
		game: {
			score: "Poäng",
			total: "Totalpoäng",
			progress: "Framsteg",
		},
		back: "Tillbaka",
		error: "Hoppsan, något gick snett...",
		operations: {
			addition: {
				name: "Addition",
				modes: {
					"1": "0 - 5",
					"2": "0 - 10",
					"3": "Tiopar",
					"4": "10 + x",
					"5": "10 - 20",
					"6": "Tiotalsövergång: låg",
					"7": "Tiotalsövergång: hög",
					"8": "20 - 100"
				}
			},
			subtraction: {
				name: "Subtraktion",
				modes: {
					"1": "0 - 5",
					"2": "0 - 10",
					"3": "",
					"4": "",
					"5": "",
					"6": "",
					"7": "",
					"8": ""
				}
			},
			multiplication: {
				name: "Multiplikation",
				modes: {
					"1": "Tabell 2",
					"2": "Tabell 3",
					"3": "Tabell 4",
					"4": "Tabell 5",
					"5": "Tabell 6",
					"6": "Tabell 7",
					"7": "Tabell 8",
					"8": "Tabell 9",
					"9": "Tabell 10",
					"10": "Tabell 2-10"
				}
			},
			division: {
				name: "Division",
				modes: {
					"1": "",
					"2": "",
					"3": "",
					"4": "",
					"5": "",
					"6": "",
					"7": "",
					"8": ""
				}
			}
		}
	},
	fi: {
		landing: {
			title: "Valitse laskutoimitus",
			reset: "Nollaa edistyminen"
		},
		modepage: {
			title: "Valitse taso",
			record: "Ennätys",
		},
		leaderboard: {
			hover: "Vie hiiri tason päälle nähdäksesi pistetaulukon",
			top10: "10 parhaat",
			noscore: "Ei pisteitä vielä"
		},
		game: {
			score: "Pisteet",
			total: "Kokonaispisteet",
			progress: "Edistyminen",
		},
		back: "Takaisin",
		error: "Voi ei, jokin meni vikaan...",
		operations: {
			addition: {
				name: "Yhteenlasku",
				modes: {
					"1": "0 - 5",
					"2": "0 - 10",
					"3": "Kymppiparit",
					"4": "10 + x",
					"5": "10 - 20",
					"6": "Yli 10: helppo",
					"7": "Yli 10: vaikea",
					"8": "20 - 100"
				}
			},
			subtraction: {
				name: "Vähennyslasku",
				modes: {
					"1": "0 - 5",
					"2": "0 - 10",
					"3": "",
					"4": "",
					"5": "",
					"6": "",
					"7": "",
					"8": ""
				}
			},
			multiplication: {
				name: "Kertolasku",
				modes: {
					"1": "Kertotaulu 2",
					"2": "Kertotaulu 3",
					"3": "Kertotaulu 4",
					"4": "Kertotaulu 5",
					"5": "Kertotaulu 6",
					"6": "Kertotaulu 7",
					"7": "Kertotaulu 8",
					"8": "Kertotaulu 9",
					"9": "Kertotaulu 10",
					"10": "Kertotaulut 2-10"
				}
			},
			division: {
				name: "Jakolasku",
				modes: {
					"1": "",
					"2": "",
					"3": "",
					"4": "",
					"5": "",
					"6": "",
					"7": "",
					"8": ""
				}
			}
		}
	},
	ph: {
		landing: {
			title: "Pumili ng operasyon sa matematika",
			reset: "I-reset ang progreso"
		},
		modepage: {
			title: "Pumili ng mode",
			record: "Rekord",
		},
		leaderboard: {
			hover: "I-hover ang isang mode para makita ang leaderboard",
			top10: "Top 10",
			noscore: "Wala pang mga score"
		},
		game: {
			score: "Score",
			total: "Kabuuang iskor",
			progress: "Progreso",
		},
		back: "Bumalik",
		error: "Pasensya, may nagkamali",
		operations: {
			addition: {
				name: "Pagdaragdag",
				modes: {
					"1": "0 - 5",
					"2": "0 - 10",
					"3": "Sampu: Magkapareha",
					"4": "10 + x",
					"5": "10 - 20",
					"6": "Lampas 10: mababa",
					"7": "Lampas 10: mataas",
					"8": "20 - 100"
				}
			},
			subtraction: {
				name: "Pagbabawas",
				modes: {
					"1": "0 - 5",
					"2": "0 - 10",
					"3": "",
					"4": "",
					"5": "",
					"6": "",
					"7": "",
					"8": ""
				}
			},
			multiplication: {
				name: "Pagmumultiplika",
				modes: {
					"1": "Talahanayan 2",
					"2": "Talahanayan 3",
					"3": "Talahanayan 4",
					"4": "Talahanayan 5",
					"5": "Talahanayan 6",
					"6": "Talahanayan 7",
					"7": "Talahanayan 8",
					"8": "Talahanayan 9",
					"9": "Talahanayan 10",
					"10": "Talahanayan 2-10"
				}
			},
			division: {
				name: "Dibisyon",
				modes: {
					"1": "",
					"2": "",
					"3": "",
					"4": "",
					"5": "",
					"6": "",
					"7": "",
					"8": ""
				}
			}
		}
	},
	is: {
		landing: {
			title: "Veldu stærðfræðiaðgerð",
			reset: "Endurstilla framvindu"
		},
		modepage: {
			title: "Veldu stillingu",
			record: "Met",
		},
		leaderboard: {
			hover: "Færðu bendilinn yfir stillingu til að sjá stigatöfluna",
			top10: "Top 10",
			noscore: "Engin stig enn"
		},
		game: {
			score: "Stig",
			total: "Heildarstig",
			progress: "Framvinda",
		},
		back: "Til baka",
		error: "Úps, eitthvað fór úrskeiðis...",
		operations: {
			addition: {
				name: "Samlagning",
				modes: {
					"1": "0 - 5",
					"2": "0 - 10",
					"3": "Tugapör",
					"4": "10 + x",
					"5": "10 - 20",
					"6": "Yfir 10: létt",
					"7": "Yfir 10: erfitt",
					"8": "20 - 100"
				}
			},
			subtraction: {
				name: "Frádráttur",
				modes: {
					"1": "0 - 5",
					"2": "0 - 10",
					"3": "",
					"4": "",
					"5": "",
					"6": "",
					"7": "",
					"8": ""
				}
			},
			multiplication: {
				name: "Margföldun",
				modes: {
					"1": "Tafla 2",
					"2": "Tafla 3",
					"3": "Tafla 4",
					"4": "Tafla 5",
					"5": "Tafla 6",
					"6": "Tafla 7",
					"7": "Tafla 8",
					"8": "Tafla 9",
					"9": "Tafla 10",
					"10": "Tölur 2-10"
				}
			},
			division: {
				name: "Deiling",
				modes: {
					"1": "",
					"2": "",
					"3": "",
					"4": "",
					"5": "",
					"6": "",
					"7": "",
					"8": ""
				}
			}
		}
	}
};