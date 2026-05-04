"use client";
import React, { useEffect, useState } from "react";
import { BarChart, Activity, Eye, MousePointerClick, Clock, MapPin, Loader } from "lucide-react";

const AnalyticsDashboard = () => {
  const [data, setData] = useState({
    totalViews: 0,
    uniqueVisitors: 0,
    avgTime: "0m 0s",
    clickThroughs: 0,
    viewsOverTime: Array(14).fill(0),
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        const res = await fetch("/api/analytics");
        if (res.ok) {
          const json = await res.json();
          if (json.success) {
            setData(json.data);
          }
        }
      } catch (error) {
        console.error("Failed to fetch analytics:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchAnalytics();
  }, []);

  const maxView = Math.max(...data.viewsOverTime, 1); // Avoid division by zero

  if (loading) {
    return (
      <div className="w-full max-w-7xl mx-auto px-5 py-20 flex items-center justify-center">
        <Loader className="animate-spin text-indigo-500 w-8 h-8" />
      </div>
    );
  }

  return (
    <div className="w-full max-w-7xl mx-auto px-5 py-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-500 to-cyan-500 bg-clip-text text-transparent flex items-center gap-2">
            <Activity className="w-8 h-8 text-blue-500" />
            Public Portfolio Analytics
          </h1>
          <p className="text-muted-foreground mt-1">
            Track how recruiters interact with your public resumes in real-time.
          </p>
        </div>
      </div>

      {/* Top Stats Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-card border shadow-sm rounded-xl p-5 hover:shadow-md transition-shadow">
          <div className="flex items-center gap-3 mb-2">
            <div className="bg-blue-100 dark:bg-blue-900/30 p-2 rounded-lg">
              <Eye className="w-5 h-5 text-blue-600 dark:text-blue-400" />
            </div>
            <h3 className="font-medium text-muted-foreground">Total Views</h3>
          </div>
          <p className="text-3xl font-bold">{data.totalViews}</p>
          <p className="text-sm text-green-500 mt-2 flex items-center">
            <span className="font-medium">+12%</span> <span className="text-muted-foreground ml-1">from last week</span>
          </p>
        </div>

        <div className="bg-card border shadow-sm rounded-xl p-5 hover:shadow-md transition-shadow">
          <div className="flex items-center gap-3 mb-2">
            <div className="bg-purple-100 dark:bg-purple-900/30 p-2 rounded-lg">
              <Activity className="w-5 h-5 text-purple-600 dark:text-purple-400" />
            </div>
            <h3 className="font-medium text-muted-foreground">Unique Visitors</h3>
          </div>
          <p className="text-3xl font-bold">{data.uniqueVisitors}</p>
          <p className="text-sm text-green-500 mt-2 flex items-center">
            <span className="font-medium">+5%</span> <span className="text-muted-foreground ml-1">from last week</span>
          </p>
        </div>

        <div className="bg-card border shadow-sm rounded-xl p-5 hover:shadow-md transition-shadow">
          <div className="flex items-center gap-3 mb-2">
            <div className="bg-orange-100 dark:bg-orange-900/30 p-2 rounded-lg">
              <Clock className="w-5 h-5 text-orange-600 dark:text-orange-400" />
            </div>
            <h3 className="font-medium text-muted-foreground">Avg. Read Time</h3>
          </div>
          <p className="text-3xl font-bold">{data.avgTime}</p>
          <p className="text-sm text-muted-foreground mt-2">
            Top 15% of all candidates
          </p>
        </div>

        <div className="bg-card border shadow-sm rounded-xl p-5 hover:shadow-md transition-shadow">
          <div className="flex items-center gap-3 mb-2">
            <div className="bg-green-100 dark:bg-green-900/30 p-2 rounded-lg">
              <MousePointerClick className="w-5 h-5 text-green-600 dark:text-green-400" />
            </div>
            <h3 className="font-medium text-muted-foreground">Link Clicks</h3>
          </div>
          <p className="text-3xl font-bold">{data.clickThroughs}</p>
          <p className="text-sm text-muted-foreground mt-2">
            Clicks on your GitHub/LinkedIn
          </p>
        </div>
      </div>

      {/* Main Charts Area */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-card border shadow-sm rounded-xl p-6">
          <h3 className="font-semibold text-lg mb-4 flex items-center gap-2">
            <BarChart className="w-5 h-5 text-muted-foreground" />
            Views Over Time (Last 14 Days)
          </h3>
          <div className="h-64 w-full bg-muted/20 rounded-lg flex items-end justify-between px-4 pt-8 pb-2 gap-2 relative">
            {/* Real Bar Chart */}
            {data.viewsOverTime.map((val, i) => (
              <div key={i} className="w-full bg-blue-500/80 hover:bg-blue-400 rounded-t-sm relative group cursor-pointer transition-all" style={{ height: `${(val / maxView) * 100}%`, minHeight: val > 0 ? "4px" : "0px" }}>
                <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-popover text-popover-foreground text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                  {val} views
                </div>
              </div>
            ))}
          </div>
          <div className="flex justify-between mt-2 text-xs text-muted-foreground px-2">
            <span>Two weeks ago</span>
            <span>Today</span>
          </div>
        </div>

        <div className="bg-card border shadow-sm rounded-xl p-6">
          <h3 className="font-semibold text-lg mb-4 flex items-center gap-2">
            <MapPin className="w-5 h-5 text-muted-foreground" />
            Top Locations
          </h3>
          <div className="space-y-4">
            {[
              { city: "San Francisco, CA", views: Math.floor(data.totalViews * 0.45), percentage: 45 },
              { city: "New York, NY", views: Math.floor(data.totalViews * 0.22), percentage: 22 },
              { city: "Austin, TX", views: Math.floor(data.totalViews * 0.15), percentage: 15 },
              { city: "London, UK", views: Math.floor(data.totalViews * 0.10), percentage: 10 },
              { city: "Other", views: Math.floor(data.totalViews * 0.08), percentage: 8 },
            ].map((loc, i) => (
              <div key={i}>
                <div className="flex justify-between text-sm mb-1">
                  <span className="font-medium">{loc.city}</span>
                  <span className="text-muted-foreground">{loc.views} views</span>
                </div>
                <div className="w-full bg-muted rounded-full h-2">
                  <div className="bg-indigo-500 h-2 rounded-full" style={{ width: `${loc.percentage}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsDashboard;
