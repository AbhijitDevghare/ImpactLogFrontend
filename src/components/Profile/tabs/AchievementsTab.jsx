import React from "react";
import { getAchievements } from "../../../utils/levelUtils";

export default function AchievementsTab({ posts, registeredEvents, followersList, points, userLevel }) {
  const achievements = getAchievements(posts, registeredEvents, followersList, points);

  return (
    <div className="space-y-6">
      {/* Level Progress */}
      <div className="bg-gradient-to-br from-gray-800/90 to-gray-900/90 rounded-2xl shadow-xl border border-gray-700/60 p-6">
        <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-3">
          <div className="w-8 h-8 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-lg flex items-center justify-center">
            <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
            </svg>
          </div>
          Level Progress
        </h3>

        <div className="space-y-6">
          <div className="text-center">
            <div className="w-24 h-24 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-full mx-auto mb-4 flex items-center justify-center shadow-2xl">
              <span className="text-3xl font-bold text-white">{userLevel.level}</span>
            </div>
            <h4 className="text-xl font-bold text-white mb-1">{userLevel.title}</h4>
            <p className="text-gray-400">{points} / {userLevel.level * 200} points to next level</p>
          </div>

          <div>
            <div className="flex justify-between items-center mb-2">
              <span className="text-gray-300 font-medium">Progress to Level {userLevel.level + 1}</span>
              <span className="text-emerald-300 font-bold">{Math.round((points / (userLevel.level * 200)) * 100)}%</span>
            </div>
            <div className="w-full bg-gray-700 rounded-full h-4">
              <div
                className="bg-gradient-to-r from-emerald-500 to-green-500 h-4 rounded-full transition-all duration-500"
                style={{ width: `${Math.min((points / (userLevel.level * 200)) * 100, 100)}%` }}
              ></div>
            </div>
          </div>
        </div>
      </div>

      {/* Achievement Unlocks */}
      <div className="bg-gradient-to-br from-gray-800/90 to-gray-900/90 rounded-2xl shadow-xl border border-gray-700/60 p-6">
        <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-3">
          <div className="w-8 h-8 bg-emerald-900/50 rounded-lg flex items-center justify-center">
            <svg className="w-4 h-4 text-emerald-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
            </svg>
          </div>
          Achievement Unlocks
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {achievements.map((achievement, i) => (
            <div key={i} className={`p-4 rounded-xl border transition-all duration-300 ${achievement.unlocked ? 'bg-gradient-to-br from-emerald-900/20 to-green-900/20 border-emerald-700/30' : 'bg-gray-700/30 border-gray-600/30'}`}>
              <div className="flex items-start gap-4">
                <div className={`w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0 ${achievement.unlocked ? 'bg-emerald-900/50' : 'bg-gray-600/50'}`}>
                  <svg className={`w-6 h-6 ${achievement.unlocked ? 'text-emerald-300' : 'text-gray-400'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={achievement.icon} />
                  </svg>
                </div>
                <div className="flex-1">
                  <h4 className={`font-semibold mb-1 ${achievement.unlocked ? 'text-white' : 'text-gray-400'}`}>{achievement.title}</h4>
                  <p className="text-sm text-gray-400 mb-2">{achievement.description}</p>
                  <div className="flex items-center gap-2">
                    <span className={`px-2 py-1 text-xs rounded-full ${achievement.unlocked ? 'bg-emerald-900/50 text-emerald-300' : 'bg-gray-600/50 text-gray-400'}`}>
                      {achievement.unlocked ? 'Unlocked' : 'Locked'}
                    </span>
                    <span className="text-yellow-300 text-xs">+{achievement.points} pts</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}