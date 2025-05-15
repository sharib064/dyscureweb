"use client";
import { ChildContext } from "./../context/childcontext";
import { useContext, useState, useEffect } from "react";
import { supabase } from "@/utils/supabase";
import Image from "next/image";
import bg from "./../../../public/background.png";

export default function Dashboard() {
  const { childInfo } = useContext(ChildContext);
  const games = [
    "Letter tracing",
    "Letter sounding",
    "Word identification",
    "Word completion",
    "Letter matching",
    "Mathematical movement",
    "Word tracing",
    "Word sounding",
  ];
  const difficulties = ["Easy", "Medium", "Hard"];

  const [levels, setLevels] = useState([]);
  const [selectedGame, setSelectedGame] = useState("all");
  const [selectedDifficulty, setSelectedDifficulty] = useState("all");
  const [selectedLevel, setSelectedLevel] = useState("all");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [gameId, setGameId] = useState();
  function findGameId() {
    if (selectedGame == "Letter tracing") {
      if (selectedDifficulty == "Easy") {
        setGameId(1);
      } else if (selectedDifficulty == "Medium") {
        setGameId(2);
      } else {
        setGameId(3);
      }
    } else if (selectedGame == "Letter sounding") {
      if (selectedDifficulty == "Easy") {
        setGameId(4);
      } else if (selectedDifficulty == "Medium") {
        setGameId(5);
      } else {
        setGameId(6);
      }
    } else if (selectedGame == "Word identification") {
      if (selectedDifficulty == "Easy") {
        setGameId(7);
      } else if (selectedDifficulty == "Medium") {
        setGameId(8);
      } else {
        setGameId(9);
      }
    } else if (selectedGame == "Word completion") {
      if (selectedDifficulty == "Easy") {
        setGameId(10);
      } else if (selectedDifficulty == "Medium") {
        setGameId(11);
      } else {
        setGameId(12);
      }
    } else if (selectedGame == "Letter matching") {
      if (selectedDifficulty == "Easy") {
        setGameId(13);
      } else if (selectedDifficulty == "Medium") {
        setGameId(14);
      } else {
        setGameId(15);
      }
    } else if (selectedGame == "Mathematical movement") {
      if (selectedDifficulty == "Easy") {
        setGameId(16);
      } else if (selectedDifficulty == "Medium") {
        setGameId(17);
      } else {
        setGameId(18);
      }
    } else if (selectedGame == "Word tracing") {
      if (selectedDifficulty == "Easy") {
        setGameId(19);
      } else if (selectedDifficulty == "Medium") {
        setGameId(20);
      } else {
        setGameId(21);
      }
    } else if (selectedGame == "Word sounding") {
      if (selectedDifficulty == "Easy") {
        setGameId(22);
      } else if (selectedDifficulty == "Medium") {
        setGameId(23);
      } else {
        setGameId(24);
      }
    }
  }

  // // Fetch initial filter options
  // useEffect(() => {
  //   const fetchFilterOptions = async () => {
  //     try {
  //       // Fetch unique games
  //       const { data: gameData } = await supabase
  //         .from('results')
  //         .select('game')
  //         .neq('game', null);
  //       setGames(['all', ...new Set(gameData.map(item => item.game))]);

  //       // Fetch unique difficulties
  //       const { data: difficultyData } = await supabase
  //         .from('results')
  //         .select('difficulty')
  //         .neq('difficulty', null);
  //       setDifficulties(['all', ...new Set(difficultyData.map(item => item.difficulty))]);

  //       // Fetch unique levels
  //       const { data: levelData } = await supabase
  //         .from('results')
  //         .select('level')
  //         .neq('level', null);
  //       setLevels(['all', ...new Set(levelData.map(item => item.level))]);
  //     } catch (error) {
  //       console.error('Error fetching filter options:', error);
  //     }
  //   };

  //   fetchFilterOptions();
  // }, []);

  const fetchResults = async () => {
    setLoading(true);
    findGameId();
    try {
      const { data, error } = await supabase
        .from("game-progess")
        .select("*")
        .eq("Children_id", childInfo.id)
        .eq("Game_id", gameId);

      if (error) throw error;
      setResults(data || []);
    } catch (error) {
      console.error("Error fetching results:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen flex flex-col"
      style={{
        backgroundImage: `url(${bg.src})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
      }}
    >
      <header className="h-20 bg-black w-full flex items-center relative">
        <div className="absolute left-4">
          <Image
            src="/1025.png"
            width={100}
            height={180}
            alt="logo"
            sizes="18"
            priority
          />
        </div>

        <p className="text-2xl font-bold text-center text-white w-full">
          {childInfo ? `Welcome ${childInfo.Name}` : "Dashboard"}
        </p>
      </header>

      <div className="flex-grow p-6">
        <div className="bg-black/90 backdrop-blur-sm rounded-xl shadow-lg p-8 space-y-6 max-w-6xl mx-auto">
          <h1 className="text-2xl font-bold text-center text-white mb-6">
            Results Dashboard
          </h1>

          {/* Filter Controls */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
            {/* Game Dropdown */}
            <div>
              <label
                htmlFor="game"
                className="block text-sm font-medium text-white mb-1"
              >
                Game
              </label>
              <select
                id="game"
                className="w-full px-3 py-2 border text-white border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-yellow-500 focus:border-yellow-500 "
                value={selectedGame}
                onChange={(e) => setSelectedGame(e.target.value)}
              >
                {games.map((game) => (
                  <option key={game} value={game} className="text-black">
                    {game === "all" ? "All Games" : game}
                  </option>
                ))}
              </select>
            </div>

            {/* Difficulty Dropdown */}
            <div>
              <label
                htmlFor="difficulty"
                className="block text-sm font-medium text-white mb-1"
              >
                Difficulty
              </label>
              <select
                id="difficulty"
                className="w-full px-3 py-2 border text-white border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-yellow-500 focus:border-yellow-500 "
                value={selectedDifficulty}
                onChange={(e) => setSelectedDifficulty(e.target.value)}
              >
                {difficulties.map((difficulty) => (
                  <option
                    key={difficulty}
                    value={difficulty}
                    className="text-black"
                  >
                    {difficulty === "all" ? "All Difficulties" : difficulty}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Get Results Button */}
          <div className="flex justify-center">
            <button
              onClick={fetchResults}
              disabled={loading}
              className={`py-2 px-6 border border-transparent rounded-md shadow-sm text-sm font-medium text-black bg-yellow-500 hover:bg-yellow-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500 transition-colors ${
                loading ? "opacity-70 cursor-not-allowed" : ""
              }`}
            >
              {loading ? (
                <span className="flex items-center justify-center">
                  <svg
                    className="animate-spin -ml-1 mr-2 h-4 w-4 text-black"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Loading...
                </span>
              ) : (
                "Get Results"
              )}
            </button>
          </div>

          {/* Results Table */}
          {results.length > 0 && (
            <div className="mt-8 overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-800">
                  <tr>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider"
                    >
                      Children Id
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider"
                    >
                      Game Id
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider"
                    >
                      Level No
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider"
                    >
                      Time Played
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider"
                    >
                      Remarks
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-gray-700 divide-y divide-gray-600">
                  {results.map((result, index) => (
                    <tr
                      key={index}
                      className={
                        index % 2 === 0 ? "bg-gray-600" : "bg-gray-700"
                      }
                    >
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-white">
                        {result.Children_id}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-white">
                        {result.Game_id}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-white">
                        {result.Level_no}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-white">
                        {result.Time_played}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-white">
                        {result.Remarks}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {results.length === 0 && !loading && (
            <div className="mt-8 text-center text-white">
              No results found. Apply filters and click "Get Results".
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
