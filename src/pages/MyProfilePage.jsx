// src/pages/MyProfilePage.jsx
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUser } from "../redux/slices/AuthSlice";
import { fetchUserPoints, fetchUserBadges } from "../redux/slices/RewardsBadgesSlice";
import { fetchUserPosts } from "../redux/slices/PostSlice";
import { fetchUpcomingEvents, fetchAttendedEvents } from "../redux/slices/EventSlice";
import MainLayout from "../layout/MainLayout";
import FollowersFollowingModal from "../components/FollowersFollowingModal";
import ProfileLoadingSkeleton from "../components/Profile/ProfileLoadingSkeleton";
import ProfileHeader from "../components/Profile/ProfileHeader";
import ProfileStatsCards from "../components/Profile/ProfileStatsCards";
import ProfileTabs from "../components/Profile/ProfileTabs";
import OverviewTab from "../components/Profile/tabs/OverviewTab";
import PostsTab from "../components/Profile/tabs/PostsTab";
import EventsTab from "../components/Profile/tabs/EventsTab";
import BadgesTab from "../components/Profile/tabs/BadgesTab";
import AchievementsTab from "../components/Profile/tabs/AchievementsTab";
import { getLevel } from "../utils/levelUtils";

export default function MyProfilePage() {
  const dispatch = useDispatch();

  const user = useSelector((state) => state?.auth?.data ?? null);
  const posts = useSelector((state) => state?.posts?.userPosts ?? []);
  const points = useSelector((state) => state?.rewardsBadges?.points ?? 0);
  const badges = useSelector((state) => state?.rewardsBadges?.badges ?? []);
  const registeredEvents = useSelector((state) => state?.event?.upcomingEvents ?? []);
  const attendedEvents = useSelector((state) => state?.event?.attendedEvents ?? []);
  const followersList = user?.followers?.followers ?? [];
  const followingList = user?.following?.following ?? [];

  const [modalType, setModalType] = useState(null);
  const [activeTab, setActiveTab] = useState("overview"); // tabs: overview | posts | events | badges | achievements

  useEffect(() => {
    dispatch(getUser());
    
  }, [dispatch]);

  useEffect(() => {
    if (user?.id) {
      
      dispatch(fetchUserPosts(user.id));
      dispatch(fetchUserPoints(user.id));
      dispatch(fetchUserBadges(user.id));
      dispatch(fetchUpcomingEvents(user.id));
      dispatch(fetchAttendedEvents(user.id));
    }
  }, [dispatch, user?.id]);

  if (!user) {
    return (
      <MainLayout>
        <ProfileLoadingSkeleton />
      </MainLayout>
    );
  }

  const userLevel = getLevel(points);

  const handleFollowersClick = () => setModalType("followers");
  const handleFollowingClick = () => setModalType("following");

  const renderTabContent = () => {
    switch (activeTab) {
      case "overview":
        return <OverviewTab posts={posts} registeredEvents={registeredEvents} userLevel={userLevel} points={points} isOwnProfile={true} />;
      case "posts":
        return <PostsTab posts={posts} isOwnProfile={true} />;
      case "events":
        return <EventsTab registeredEvents={registeredEvents} attendedEvents={attendedEvents} isOwnProfile={true} />;
      case "badges":
        return <BadgesTab badges={badges} points={points} isOwnProfile={true} />;
      case "achievements":
        return <AchievementsTab posts={posts} registeredEvents={registeredEvents} followersList={followersList} points={points} userLevel={userLevel} />;
      default:
        return <OverviewTab posts={posts} registeredEvents={registeredEvents} userLevel={userLevel} points={points} isOwnProfile={true} />;
    }
  };

  return (
    <MainLayout>
      <div className="max-w-6xl mx-auto px-4 py-8 space-y-8">
        <ProfileHeader 
          user={user} 
          userLevel={userLevel} 
          isOwnProfile={true}
        />

        <ProfileStatsCards 
          posts={posts}
          followersList={followersList}
          followingList={followingList}
          points={points}
          badges={badges}
          onFollowersClick={handleFollowersClick}
          onFollowingClick={handleFollowingClick}
          showFollowingCard={true}
        />

        <ProfileTabs 
          activeTab={activeTab} 
          onTabChange={setActiveTab} 
        />

        {renderTabContent()}

        {modalType && (
          <FollowersFollowingModal
            isOpen={true}
            onClose={() => setModalType(null)}
            type={modalType}
            followers={followersList}
            following={followingList}
          />
        )}
      </div>
    </MainLayout>
  );
}

