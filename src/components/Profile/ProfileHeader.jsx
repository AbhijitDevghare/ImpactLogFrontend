import React from "react";

export default function ProfileHeader({ 
  user, 
  userLevel, 
  isOwnProfile = false, 
  isFollowing = false, 
  isLoadingFollow = false, 
  onFollowToggle = null 
}) {
  return (
    <div className="relative bg-gradient-to-br from-purple-900/20 via-gray-900/90 to-indigo-900/20 rounded-3xl shadow-2xl border border-gray-700/60 overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-900/10 via-transparent to-indigo-900/10"></div>
      <div className="absolute top-0 right-0 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl"></div>

      {/* Cover Image */}
      <div className="h-64 bg-gradient-to-r from-purple-600/20 via-indigo-600/20 to-blue-600/20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 via-transparent to-transparent"></div>
        {/* Decorative elements */}
        <div className="absolute top-8 left-8 w-20 h-20 bg-white/10 rounded-full blur-xl"></div>
        <div className="absolute top-16 right-16 w-16 h-16 bg-purple-400/20 rounded-full blur-lg"></div>
        <div className="absolute bottom-12 left-1/3 w-12 h-12 bg-indigo-400/20 rounded-full blur-md"></div>
      </div>

      {/* Profile Info Overlay */}
      <div className="absolute bottom-6 left-6 right-6">
        <div className="flex items-end gap-6">
          {/* Avatar with Level Badge */}
          <div className="relative">
            <img
              src={user.avatarUrl || "https://i.pravatar.cc/150?img=65"}
              alt={user.name || "User"}
              className="w-32 h-32 rounded-full object-cover border-4 border-gray-800 shadow-2xl"
            />
            {/* Level Badge */}
            <div className={`absolute -bottom-2 -right-2 w-10 h-10 bg-gradient-to-r ${userLevel.color} rounded-full flex items-center justify-center shadow-lg border-2 border-gray-800`}>
              <span className="text-white font-bold text-sm">{userLevel.level}</span>
            </div>
          </div>

          {/* Profile Details */}
          <div className="flex-1 text-white">
            <div className="flex flex-col md:flex-row md:items-center gap-4 mb-2">
              <div>
                <h1 className="text-3xl font-bold">{user.name || "Anonymous"}</h1>
                <p className="text-purple-300 font-medium">{userLevel.title}</p>
              </div>
              
              {/* Action Button */}
              {isOwnProfile ? (
                <button className="px-6 py-2 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg">
                  Edit Profile
                </button>
              ) : onFollowToggle && (
                <button
                  onClick={onFollowToggle}
                  disabled={isLoadingFollow}
                  className={`px-6 py-2 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg ${
                    isFollowing
                      ? "bg-gray-700 hover:bg-gray-600 text-white border border-gray-600"
                      : "bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white"
                  }`}
                >
                  {isLoadingFollow ? (
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      <span>Loading...</span>
                    </div>
                  ) : isFollowing ? (
                    "Unfollow"
                  ) : (
                    "Follow"
                  )}
                </button>
              )}
            </div>

            {/* Bio */}
            <p className="text-gray-300 text-lg max-w-2xl">
              {user.bio || "Making a positive impact in our community 🌱"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}