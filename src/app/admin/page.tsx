"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  LayoutDashboard, Users, MessageSquare, Wand2, TrendingUp,
  Smartphone, Activity, LogOut, RefreshCw,
} from "lucide-react";
import AnimatedCounter from "@/components/AnimatedCounter";
import Link from "next/link";
import { useRouter } from "next/navigation";

interface AnalyticsData {
  overview: {
    totalEvents: number;
    todayEvents: number;
    weekEvents: number;
    monthEvents: number;
    uniqueVisitors: number;
    totalLeads: number;
    totalChats: number;
    totalConcepts: number;
  };
  eventTypes: { type: string; count: number }[];
  deviceBreakdown: { device: string; count: number }[];
  recentLeads: {
    id: number;
    name: string;
    email: string;
    company: string | null;
    projectType: string | null;
    budget: string | null;
    status: string;
    createdAt: string;
  }[];
  recentEvents: {
    id: string;
    eventType: string;
    pagePath: string | null;
    device: string | null;
    createdAt: string;
  }[];
}

export default function AdminDashboard() {
  const [data, setData] = useState<AnalyticsData | null>(null);
  const [authed, setAuthed] = useState(false);
  const [loading, setLoading] = useState(true);
  const [loginForm, setLoginForm] = useState({ email: "", password: "" });
  const [loginError, setLoginError] = useState("");
  const router = useRouter();

  useEffect(() => {
    const session = sessionStorage.getItem("pst_admin");
    if (session === "true") {
      setAuthed(true);
      fetchData();
    } else {
      setLoading(false);
    }
  }, []);

    const fetchData = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/analytics/summary", {
        headers: { Authorization: "Bearer pst_admin" },
      });
      const json = await res.json();
      setData(json);
    } catch {
      // ignore
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError("");
    setLoading(true);

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(loginForm),
      });
      const data = await res.json();

      if (res.ok && data.success) {
        sessionStorage.setItem("pst_admin", "true");
        setAuthed(true);
        fetchData();
      } else {
        setLoginError(data.error || "Invalid credentials");
        setLoading(false);
      }
    } catch {
      setLoginError("Connection error. Please try again.");
      setLoading(false);
    }
  };

  const handleLogout = () => {
    sessionStorage.removeItem("pst_admin");
    setAuthed(false);
    router.push("/");
  };

  // Login Screen
  if (!authed) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-mesh p-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-md p-8 rounded-3xl glass-strong"
        >
          <div className="text-center mb-8">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-purple-500 to-cyan-400 flex items-center justify-center mx-auto mb-4">
              <LayoutDashboard className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-2xl font-bold">Admin Dashboard</h1>
            <p className="text-sm mt-2" style={{ color: "var(--text-secondary)" }}>
              Sign in to access analytics and leads
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1.5">Email</label>
              <input
                type="email"
                required
                value={loginForm.email}
                onChange={(e) => setLoginForm({ ...loginForm, email: e.target.value })}
                className="w-full px-4 py-3 rounded-xl glass border-0 outline-none text-sm"
                style={{ background: "var(--glass-bg)", color: "var(--text-primary)" }}
                placeholder="admin@parulsofttechai.com"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1.5">Password</label>
              <input
                type="password"
                required
                value={loginForm.password}
                onChange={(e) => setLoginForm({ ...loginForm, password: e.target.value })}
                className="w-full px-4 py-3 rounded-xl glass border-0 outline-none text-sm"
                style={{ background: "var(--glass-bg)", color: "var(--text-primary)" }}
                placeholder="••••••••"
              />
            </div>
            {loginError && (
              <p className="text-sm text-red-400">{loginError}</p>
            )}
            <button type="submit" className="btn-primary w-full justify-center">
              Sign In
            </button>
          </form>

          <div className="mt-6 pt-6 border-t text-center" style={{ borderColor: "var(--glass-border)" }}>
            <Link href="/" className="text-sm hover:text-gradient" style={{ color: "var(--text-muted)" }}>
              ← Back to site
            </Link>
          </div>
        </motion.div>
      </div>
    );
  }

  // Dashboard
  return (
    <div className="min-h-screen bg-mesh">
      {/* Top Bar */}
      <div className="glass-strong sticky top-0 z-40 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500 to-cyan-400 flex items-center justify-center">
            <LayoutDashboard className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="font-bold">Analytics Dashboard</h1>
            <p className="text-xs" style={{ color: "var(--text-muted)" }}>ParulSoftTechAI</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <button onClick={fetchData} className="btn-glass text-sm py-2">
            <RefreshCw className="w-4 h-4" /> Refresh
          </button>
          <button onClick={handleLogout} className="btn-glass text-sm py-2 text-red-400">
            <LogOut className="w-4 h-4" /> Logout
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {loading ? (
          <div className="flex items-center justify-center py-32">
            <RefreshCw className="w-8 h-8 animate-spin" style={{ color: "var(--accent-purple)" }} />
          </div>
        ) : data ? (
          <>
            {/* Stats Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
              {[
                { label: "Total Events", value: data.overview.totalEvents, icon: Activity, color: "#8b5cf6" },
                { label: "Unique Visitors", value: data.overview.uniqueVisitors, icon: Users, color: "#06b6d4" },
                { label: "Total Leads", value: data.overview.totalLeads, icon: TrendingUp, color: "#ec4899" },
                { label: "AI Chats", value: data.overview.totalChats, icon: MessageSquare, color: "#3b82f6" },
              ].map((stat, i) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="p-6 rounded-2xl glass-strong"
                >
                  <div className="flex items-center justify-between mb-3">
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: `${stat.color}20` }}>
                      <stat.icon className="w-5 h-5" style={{ color: stat.color }} />
                    </div>
                  </div>
                  <div className="text-3xl font-bold mb-1">
                    <AnimatedCounter end={stat.value} />
                  </div>
                  <div className="text-sm" style={{ color: "var(--text-muted)" }}>{stat.label}</div>
                </motion.div>
              ))}
            </div>

            {/* Secondary Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
              {[
                { label: "Events Today", value: data.overview.todayEvents },
                { label: "Events This Week", value: data.overview.weekEvents },
                { label: "Events This Month", value: data.overview.monthEvents },
                { label: "AI Concepts Generated", value: data.overview.totalConcepts },
              ].map((s) => (
                <div key={s.label} className="p-4 rounded-xl glass">
                  <div className="text-2xl font-bold">
                    <AnimatedCounter end={s.value} />
                  </div>
                  <div className="text-xs" style={{ color: "var(--text-muted)" }}>{s.label}</div>
                </div>
              ))}
            </div>

            <div className="grid lg:grid-cols-2 gap-6 mb-8">
              {/* Event Types Breakdown */}
              <div className="p-6 rounded-2xl glass-strong">
                <h3 className="font-bold mb-4 flex items-center gap-2">
                  <Activity className="w-5 h-5 text-gradient-cyan" />
                  Event Types
                </h3>
                {data.eventTypes.length > 0 ? (
                  <div className="space-y-3">
                    {data.eventTypes.map((e) => {
                      const max = data.eventTypes[0]?.count || 1;
                      const pct = (e.count / max) * 100;
                      return (
                        <div key={e.type}>
                          <div className="flex justify-between text-sm mb-1">
                            <span style={{ color: "var(--text-secondary)" }}>{e.type}</span>
                            <span className="font-bold">{e.count}</span>
                          </div>
                          <div className="h-2 rounded-full glass overflow-hidden">
                            <motion.div
                              initial={{ width: 0 }}
                              animate={{ width: `${pct}%` }}
                              transition={{ duration: 0.8 }}
                              className="h-full rounded-full bg-gradient-to-r from-purple-500 to-cyan-400"
                            />
                          </div>
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  <p className="text-sm" style={{ color: "var(--text-muted)" }}>No events yet</p>
                )}
              </div>

              {/* Device Breakdown */}
              <div className="p-6 rounded-2xl glass-strong">
                <h3 className="font-bold mb-4 flex items-center gap-2">
                  <Smartphone className="w-5 h-5 text-gradient-cyan" />
                  Device Breakdown
                </h3>
                {data.deviceBreakdown.length > 0 ? (
                  <div className="flex items-center justify-around py-4">
                    {data.deviceBreakdown.map((d) => {
                      const total = data.deviceBreakdown.reduce((s, x) => s + x.count, 0);
                      const pct = Math.round((d.count / total) * 100);
                      return (
                        <div key={d.device} className="text-center">
                          <div className="text-4xl font-bold text-gradient mb-1">{pct}%</div>
                          <div className="text-sm capitalize" style={{ color: "var(--text-secondary)" }}>{d.device}</div>
                          <div className="text-xs" style={{ color: "var(--text-muted)" }}>{d.count} events</div>
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  <p className="text-sm" style={{ color: "var(--text-muted)" }}>No data yet</p>
                )}
              </div>
            </div>

            {/* Recent Leads */}
            <div className="p-6 rounded-2xl glass-strong mb-8">
              <h3 className="font-bold mb-4 flex items-center gap-2">
                <Users className="w-5 h-5 text-gradient-cyan" />
                Recent Leads
              </h3>
              {data.recentLeads.length > 0 ? (
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b" style={{ borderColor: "var(--glass-border)" }}>
                        <th className="text-left py-3 px-2 font-medium" style={{ color: "var(--text-muted)" }}>Name</th>
                        <th className="text-left py-3 px-2 font-medium" style={{ color: "var(--text-muted)" }}>Email</th>
                        <th className="text-left py-3 px-2 font-medium" style={{ color: "var(--text-muted)" }}>Project Type</th>
                        <th className="text-left py-3 px-2 font-medium" style={{ color: "var(--text-muted)" }}>Budget</th>
                        <th className="text-left py-3 px-2 font-medium" style={{ color: "var(--text-muted)" }}>Status</th>
                        <th className="text-left py-3 px-2 font-medium" style={{ color: "var(--text-muted)" }}>Date</th>
                      </tr>
                    </thead>
                    <tbody>
                      {data.recentLeads.map((lead) => (
                        <tr key={lead.id} className="border-b" style={{ borderColor: "var(--glass-border)" }}>
                          <td className="py-3 px-2 font-medium">{lead.name}</td>
                          <td className="py-3 px-2" style={{ color: "var(--text-secondary)" }}>{lead.email}</td>
                          <td className="py-3 px-2" style={{ color: "var(--text-secondary)" }}>{lead.projectType || "—"}</td>
                          <td className="py-3 px-2" style={{ color: "var(--text-secondary)" }}>{lead.budget || "—"}</td>
                          <td className="py-3 px-2">
                            <span className="text-xs px-2 py-1 rounded-md glass">{lead.status}</span>
                          </td>
                          <td className="py-3 px-2 text-xs" style={{ color: "var(--text-muted)" }}>
                            {new Date(lead.createdAt).toLocaleDateString()}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <p className="text-sm" style={{ color: "var(--text-muted)" }}>No leads yet</p>
              )}
            </div>

            {/* Recent Activity */}
            <div className="p-6 rounded-2xl glass-strong">
              <h3 className="font-bold mb-4 flex items-center gap-2">
                <Activity className="w-5 h-5 text-gradient-cyan" />
                Recent Activity
              </h3>
              {data.recentEvents.length > 0 ? (
                <div className="space-y-2 max-h-80 overflow-y-auto no-scrollbar">
                  {data.recentEvents.map((event) => (
                    <div key={event.id} className="flex items-center gap-3 p-3 rounded-lg glass">
                      <div className="w-2 h-2 rounded-full bg-purple-400" />
                      <span className="text-sm font-medium">{event.eventType}</span>
                      <span className="text-xs" style={{ color: "var(--text-muted)" }}>{event.pagePath}</span>
                      <span className="text-xs ml-auto" style={{ color: "var(--text-muted)" }}>
                        {new Date(event.createdAt).toLocaleTimeString()}
                      </span>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-sm" style={{ color: "var(--text-muted)" }}>No activity yet</p>
              )}
            </div>
          </>
        ) : (
          <div className="text-center py-32">
            <p style={{ color: "var(--text-muted)" }}>No data available</p>
          </div>
        )}
      </div>
    </div>
  );
}
