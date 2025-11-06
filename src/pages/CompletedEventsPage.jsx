import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCompletedEvents, fetchRegisteredUsers, giveRewards } from "../redux/slices/EventSlice";
import { fetchBadges } from "../redux/slices/RewardsBadgesSlice";

export default function CompletedEventsPage() {
  const dispatch = useDispatch();
  const { completedEvents = [], loading = false, error = null } = useSelector((state) => state?.event || {});
  const { badges = [] } = useSelector((state) => state.rewardsBadges);

  const [selectedEvent, setSelectedEvent] = useState(null);
  const [registeredUsers, setRegisteredUsers] = useState([]);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [points, setPoints] = useState("");
  const [badgeId, setBadgeId] = useState("");
  const [showPanel, setShowPanel] = useState(false);
  const [panelLoading, setPanelLoading] = useState(false);
  const [badgeName,setBadgeName] = useState("");

  useEffect(() => {
    dispatch(fetchCompletedEvents());
    dispatch(fetchBadges());
  }, [dispatch]);

  const handleGiveRewards = async (event) => {
    console.log(event)
    setSelectedEvent(event);
    setPanelLoading(true);
    setPoints(event.points || 0);
    setBadgeId(event.badge_id || "");
    setBadgeName(event.badge_name)
    try {
      const users = await dispatch(fetchRegisteredUsers(event.id)).unwrap();
      setRegisteredUsers(users);
      setSelectedUsers(users.map(u => u.id));
      setShowPanel(true);
    } catch (err) {
      console.error("Failed to fetch users:", err);
    } finally {
      setPanelLoading(false);
    }
  };

  const handleSelectAll = () => {
    if (selectedUsers.length === registeredUsers.length) {
      setSelectedUsers([]);
    } else {
      setSelectedUsers(registeredUsers.map(u => u.userId));
    }
  };

  const handleUserToggle = (userId) => {
    setSelectedUsers(prev =>
      prev.includes(userId) ? prev.filter(id => id !== userId) : [...prev, userId]
    );
  };

  const handleSubmitRewards = async () => {
    if (selectedUsers.length === 0) {
      alert("Please select users");
      return;
    }
    try {
      await dispatch(giveRewards({
        selectedUsers,
        event_id: selectedEvent.id,
        points: parseInt(points),
        badge_id: badgeId,
        badge_name:badgeName
      })).unwrap();
      alert("Rewards given successfully!");
      setShowPanel(false);
      setSelectedEvent(null);
      setSelectedUsers([]);
      setPoints("");
      setBadgeId("");
    } catch (err) {
      console.error("Failed to give rewards:", err);
      alert("Failed to give rewards");
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-8 py-10">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-2xl font-bold text-white">Completed Events</h1>
        <p className="text-gray-400 mt-1">Manage rewards for your completed events.</p>
      </div>

      {/* Loading */}
      {loading && (
        <div className="text-center py-12 text-gray-400">Loading completed events...</div>
      )}

      {/* Error */}
      {!loading && error && (
        <div className="text-center py-12 text-red-400">
          {String(error) || "Something went wrong."}
        </div>
      )}

      {/* Events List */}
      {!loading && !error && completedEvents.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {completedEvents.map((event) => (
            <div
              key={event.id}
              className="bg-gray-800/80 backdrop-blur border border-gray-700/60 rounded-2xl p-4 flex flex-col"
            >
              <h3 className="text-lg font-semibold text-white truncate">
                {event.event_name || event.title}
              </h3>
              <p className="text-gray-400 mt-2 text-sm">
                Date: {event.scheduled_date ? new Date(event.scheduled_date).toLocaleDateString() : "N/A"}
              </p>
              <p className="text-gray-400 text-sm">
                Location: {event.location?.address || "N/A"}
              </p>
              <button
                onClick={() => handleGiveRewards(event)}
                className="mt-4 px-4 py-2 rounded-lg bg-gradient-to-r from-yellow-500 to-yellow-600 text-white font-semibold hover:from-yellow-600 hover:to-yellow-700 transition"
              >
                Give Rewards
              </button>
            </div>
          ))}
        </div>
      )}

      {/* No Events */}
      {!loading && !error && completedEvents.length === 0 && (
        <div className="text-center py-12 text-gray-400">
          No completed events found.
        </div>
      )}

      {/* Reward Panel */}
      {showPanel && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-gray-800 rounded-lg p-6 w-full max-w-2xl max-h-96 overflow-y-auto">
            <h2 className="text-lg font-semibold mb-4 text-white">Assign Rewards for {selectedEvent?.event_name}</h2>
            <div className="mb-4 text-gray-300">
              <p>Points: {points}</p>
              <p>Badge: {badges.find(b => b.id === badgeId)?.name || "None"}</p>
            </div>
            {panelLoading ? (
              <div className="text-center text-gray-400">Loading users...</div>
            ) : (
              <>
                <div className="mb-4">
                  <button
                    onClick={handleSelectAll}
                    className="px-4 py-2 rounded bg-blue-500 text-white hover:bg-blue-600"
                  >
                    {selectedUsers.length === registeredUsers.length ? "Deselect All" : "Select All"}
                  </button>
                </div>
                <div className="mb-4 max-h-40 overflow-y-auto">
                  {registeredUsers.map((user) => (
                    <div key={user.user.id} className="flex items-center mb-2">
                      <input
                        type="checkbox"
                        checked={selectedUsers.includes(user.user.id)}
                        onChange={() => handleUserToggle(user.user.id)}
                        className="mr-2"
                      />
                      <span className="text-white">{user.user.name} (@{user.user.username})</span>
                    </div>
                  ))}
                </div>
                <div className="flex gap-4">
                  <button
                    onClick={handleSubmitRewards}
                    className="flex-1 px-4 py-2 rounded bg-green-500 text-white hover:bg-green-600"
                  >
                    Submit Rewards
                  </button>
                  <button
                    onClick={() => setShowPanel(false)}
                    className="px-4 py-2 rounded bg-gray-500 text-white hover:bg-gray-600"
                  >
                    Cancel
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}