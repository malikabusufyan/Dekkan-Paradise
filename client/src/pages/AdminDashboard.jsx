import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import AdminMenuTab from "./admin/AdminMenuTab";
import AdminVideosTab from "./admin/AdminVideosTab";
import AdminReviewsTab from "./admin/AdminReviewsTab";
import AdminSettingsTab from "./admin/AdminSettingsTab";
import useSEO from "../hooks/useSEO";

const TABS = [
  { key: "menu", label: "Menu" },
  { key: "videos", label: "Videos" },
  { key: "reviews", label: "Reviews" },
  { key: "settings", label: "Settings" },
];

export default function AdminDashboard() {
  useSEO({ title: "Admin Dashboard | Dekkan Paradise", path: "/admin", noindex: true });

  const { username, logout } = useAuth();
  const [activeTab, setActiveTab] = useState("menu");

  return (
    <div className="section page-admin-dashboard">
      <div className="admin-header">
        <div>
          <h1 className="page-title">Admin Dashboard</h1>
          <p className="page-subtitle">Logged in as {username}</p>
        </div>
        <button className="btn btn-outline" onClick={logout}>
          Log Out
        </button>
      </div>

      <div className="admin-tabs">
        {TABS.map((tab) => (
          <button
            key={tab.key}
            className={"admin-tab-button" + (activeTab === tab.key ? " active" : "")}
            onClick={() => setActiveTab(tab.key)}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {activeTab === "menu" && <AdminMenuTab />}
      {activeTab === "videos" && <AdminVideosTab />}
      {activeTab === "reviews" && <AdminReviewsTab />}
      {activeTab === "settings" && <AdminSettingsTab />}
    </div>
  );
}
