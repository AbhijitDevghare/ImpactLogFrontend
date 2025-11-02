import React, { useState } from "react";

export default function PostsTab({ posts, isOwnProfile = false }) {
  const [selectedPost, setSelectedPost] = useState(null);

  const title = isOwnProfile ? "Your Posts" : "Their Posts";
  const emptyMessage = isOwnProfile
    ? "Share your thoughts and connect with the community!"
    : "This user hasn't shared any posts yet.";

  return (
    <div className="bg-gradient-to-br from-gray-800/90 to-gray-900/90 rounded-2xl shadow-xl border border-gray-700/60 p-6 relative">
      <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-3">
        <div className="w-8 h-8 bg-pink-900/50 rounded-lg flex items-center justify-center">
          <svg
            className="w-4 h-4 text-pink-300"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
            />
          </svg>
        </div>
        {title} ({posts.length})
      </h3>

      {posts?.length > 0 ? (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {posts.map((post) => (
            <div
              key={post.id}
              className="relative group cursor-pointer"
              onClick={() => setSelectedPost(post)}
            >
              <div className="aspect-square overflow-hidden rounded-xl bg-gray-700/50">
                <img
                  src={post.mediaUrls?.[0] || "https://via.placeholder.com/300"}
                  alt="Post"
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                />
              </div>
              <div className="absolute inset-0 bg-black/60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 rounded-xl">
                <div className="text-center text-white">
                  <div className="flex items-center justify-center gap-4 mb-2">
                    <div className="flex items-center gap-1">
                      ❤️ <span className="text-sm">{post.likes || 12}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      💬 <span className="text-sm">{post.comments || 8}</span>
                    </div>
                  </div>
                  <p className="text-sm px-2 line-clamp-2">{post.content}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-16">
          <h4 className="text-xl font-bold text-white mb-2">No posts yet</h4>
          <p className="text-gray-400 mb-6">{emptyMessage}</p>
          {isOwnProfile && (
            <button className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-300 transform hover:scale-105">
              Create Your First Post
            </button>
          )}
        </div>
      )}

      {/* 🟣 Popup Modal */}
      {selectedPost && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-6">
          <div className="bg-gray-900 rounded-2xl overflow-hidden w-full max-w-4xl shadow-2xl relative">
            <button
              onClick={() => setSelectedPost(null)}
              className="absolute top-4 right-4 bg-gray-800 text-white rounded-full p-2 hover:bg-gray-700"
            >
              ✖
            </button>
            <div className="flex flex-col md:flex-row">
              <img
                src={selectedPost.mediaUrls?.[0] || "https://via.placeholder.com/500"}
                alt="Post"
                className="w-full md:w-1/2 h-80 object-cover"
              />
              <div className="p-6 flex flex-col justify-between md:w-1/2">
                <div>
                  <h4 className="text-white text-lg font-semibold mb-2">
                    {selectedPost.title || "Post Details"}
                  </h4>
                  <p className="text-gray-300 mb-4">{selectedPost.content}</p>
                </div>
                <div className="flex justify-between text-gray-400 text-sm mt-4">
                  <p>❤️ {selectedPost.likes || 12} Likes</p>
                  <p>💬 {selectedPost.comments || 8} Comments</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
