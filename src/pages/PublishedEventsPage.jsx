import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getPublishedEvents, changeEventStatus } from "../redux/slices/EventSlice";

export default function PublishedEventsPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { publishedEvents = [], loading, error } = useSelector((state) => state.event);
  const [expandedId, setExpandedId] = useState(null);

  useEffect(() => {
    dispatch(getPublishedEvents());
  }, [dispatch]);

  const handleToggleDetails = (id) => {
    setExpandedId(expandedId === id ? null : id);
  };

  const handleChangeStatus = (id, currentStatus) => {
    const newStatus = currentStatus === "published" ? "cancelled" : "published";
    dispatch(changeEventStatus({ id, status: newStatus }));
  };

  if (loading)
    return <div className="text-center py-12 text-white">Loading events...</div>;
  if (error)
    return <div className="text-center py-12 text-red-400">Error: {error}</div>;

  return (
    <div className="min-h-screen  text-white p-6">
      <h1 className="text-3xl font-bold mb-8 text-center">Published Events</h1>

      {publishedEvents.length === 0 ? (
        <p className="text-center text-gray-400">No published events found.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
          {publishedEvents.map((ev) => (
            <div
              key={ev.id}
              className="bg-gray-800/80 rounded-2xl p-6 border border-gray-700/50 hover:border-purple-500/50 transition-colors"
            >
              <h2 className="text-xl font-bold mb-2">{ev.event_name}</h2>
              <p className="text-gray-400 mb-1">
                Date: {new Date(ev.scheduled_date).toLocaleDateString()}
              </p>
              <p className="text-gray-400 mb-1">
                Location: {ev.location?.address || "N/A"}
              </p>
              <p className="text-emerald-300 mb-4">Points: +{ev.points}</p>

              <div className="flex flex-col gap-2">
                {/* ✅ Inline Details */}
                <button
                  onClick={() => handleToggleDetails(ev.id)}
                  className="w-full py-2 bg-purple-600 hover:bg-purple-500 text-white rounded-lg transition-colors"
                >
                  {expandedId === ev.id ? "Hide Details" : "View Details"}
                </button>

                {expandedId === ev.id && (
                  <div className="bg-gray-700 p-3 mt-2 rounded-lg text-sm text-gray-200">
                    <p>
                      <strong>Description:</strong> {ev.description || "No description."}
                    </p>
                    <p>
                      <strong>Category:</strong> {ev.category || "N/A"}
                    </p>
                    <p>
                      <strong>Volunteers Needed:</strong> {ev.volunteers_needed || "N/A"}
                    </p>
                  </div>
                )}

                {/* ✅ Change Status */}
                <button
                  onClick={() => handleChangeStatus(ev.id, ev.status)}
                  className="w-full py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg transition-colors"
                >
                  Change Status ({ev.status})
                </button>

                {/* ✅ View Registered Users */}
                <button
                  onClick={() => navigate(`/event/${ev.id}/registereduser`)}
                  className="w-full py-2 bg-green-600 hover:bg-green-500 text-white rounded-lg transition-colors"
                >
                  View Registered Users
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
