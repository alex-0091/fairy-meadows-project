"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Users, Home, BookOpen, LogOut, Bell, ChevronDown, Trash2, Check, X } from "lucide-react";

type Inquiry = {
  id: number;
  customerName: string;
  phone: string;
  type: string;
  message: string | null;
  status: string;
  createdAt: string;
  flat: { name: string; layout: string };
};

type Flat = {
  id: number;
  name: string;
  layout: string;
  type: string;
  salePriceLac: number | null;
  rentPerNight: number | null;
  status: string;
};

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState<"inquiries" | "flats" | "blogs">("inquiries");
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [flats, setFlats] = useState<Flat[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      const [inqRes, flatsRes] = await Promise.all([
        fetch("/api/inquiries"),
        fetch("/api/flats"),
      ]);
      if (inqRes.ok) setInquiries(await inqRes.json());
      if (flatsRes.ok) setFlats(await flatsRes.json());
    } catch {
      // ignore
    }
    setLoading(false);
  };

  const handleLogout = async () => {
    await fetch("/api/admin/logout", { method: "POST" });
    router.push("/admin");
  };

  const updateInquiryStatus = async (id: number, status: string) => {
    await fetch(`/api/inquiries`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, status }),
    });
    fetchData();
  };

  const updateFlatStatus = async (id: number, status: string) => {
    await fetch(`/api/flats`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, status }),
    });
    fetchData();
  };

  const statusColors: Record<string, string> = {
    new: "bg-blue-100 text-blue-800",
    contacted: "bg-yellow-100 text-yellow-800",
    confirmed: "bg-green-100 text-green-800",
    closed: "bg-gray-100 text-gray-600",
    available: "bg-green-100 text-green-800",
    rented: "bg-yellow-100 text-yellow-800",
    sold: "bg-gray-100 text-gray-600",
  };

  return (
    <div className="min-h-screen bg-warm-sand">
      {/* Top Nav */}
      <nav className="bg-pine-forest text-warm-sand px-6 py-4 flex items-center justify-between shadow-lg">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-terracotta rounded-full flex items-center justify-center">
            <span className="font-bold text-white text-sm font-fraunces">M</span>
          </div>
          <div>
            <div className="font-fraunces font-bold text-sm">Fairy Meadows Admin</div>
              <div className="text-warm-sand/50 text-xs">Multi Stars · M&amp;E Corporation</div>
          </div>
        </div>
        <div className="flex items-center space-x-4">
          <div className="relative">
            <Bell className="w-5 h-5 text-warm-sand/60" />
            {inquiries.filter(i => i.status === "new").length > 0 && (
              <span className="absolute -top-1 -right-1 bg-terracotta text-white text-xs w-4 h-4 rounded-full flex items-center justify-center font-bold">
                {inquiries.filter(i => i.status === "new").length}
              </span>
            )}
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center space-x-1 text-warm-sand/70 hover:text-warm-sand text-sm transition-colors"
          >
            <LogOut className="w-4 h-4" />
            <span>Logout</span>
          </button>
        </div>
      </nav>

      {/* Stats Bar */}
      <div className="bg-pine-forest/5 border-b border-pine-forest/10 px-6 py-4">
        <div className="max-w-6xl mx-auto grid grid-cols-3 gap-4">
          {[
            { label: "Total Inquiries", value: inquiries.length, icon: "📩", color: "text-blue-600" },
            { label: "New Leads", value: inquiries.filter(i => i.status === "new").length, icon: "🔥", color: "text-orange-600" },
            { label: "Available Flats", value: flats.filter(f => f.status === "available").length, icon: "🏔️", color: "text-green-600" },
          ].map((stat) => (
            <div key={stat.label} className="bg-white rounded-2xl p-4 text-center shadow-sm">
              <div className="text-2xl mb-1">{stat.icon}</div>
              <div className={`text-2xl font-bold font-fraunces ${stat.color}`}>{stat.value}</div>
              <div className="text-moss-slate/60 text-xs">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-6 py-8">
        {/* Tabs */}
        <div className="flex border-b border-pine-forest/10 mb-6">
          {([
            { id: "inquiries", label: "Leads & Inquiries", icon: <Users className="w-4 h-4" /> },
            { id: "flats", label: "Flats Manager", icon: <Home className="w-4 h-4" /> },
            { id: "blogs", label: "Blog Posts", icon: <BookOpen className="w-4 h-4" /> },
          ] as const).map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center space-x-2 px-5 py-3 text-sm font-semibold border-b-2 -mb-px transition-all ${
                activeTab === tab.id
                  ? "border-pine-forest text-pine-forest"
                  : "border-transparent text-moss-slate/50 hover:text-moss-slate"
              }`}
            >
              {tab.icon}
              <span>{tab.label}</span>
            </button>
          ))}
        </div>

        {/* Inquiries Tab */}
        {activeTab === "inquiries" && (
          <div className="space-y-3">
            <h3 className="font-fraunces text-xl font-bold text-pine-forest mb-4">Customer Inquiries</h3>
            {loading ? (
              <div className="text-center py-10 text-moss-slate/50">Loading...</div>
            ) : inquiries.length === 0 ? (
              <div className="text-center py-10 bg-white rounded-2xl text-moss-slate/50">
                No inquiries yet. They'll appear here when customers contact you.
              </div>
            ) : (
              inquiries.map((inq) => (
                <div key={inq.id} className="bg-white rounded-2xl p-5 shadow-sm border border-pine-forest/5">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-1">
                        <span className="font-semibold text-pine-forest">{inq.customerName}</span>
                        <span className={`text-xs px-2 py-0.5 rounded-full font-semibold ${statusColors[inq.status] || "bg-gray-100"}`}>
                          {inq.status}
                        </span>
                        <span className={`text-xs px-2 py-0.5 rounded-full bg-orange-50 text-orange-700 font-semibold`}>
                          {inq.type}
                        </span>
                      </div>
                      <div className="text-sm text-moss-slate/70 mb-1">
                        📱 {inq.phone} · {inq.flat.name} ({inq.flat.layout})
                      </div>
                      {inq.message && (
                        <div className="text-sm text-moss-slate/60 italic">"{inq.message}"</div>
                      )}
                      <div className="text-xs text-moss-slate/40 mt-1">
                        {new Date(inq.createdAt).toLocaleDateString("en-PK", { dateStyle: "medium" })}
                      </div>
                    </div>
                    <div className="flex flex-col gap-1">
                      {["new", "contacted", "confirmed", "closed"].map((s) => (
                        <button
                          key={s}
                          onClick={() => updateInquiryStatus(inq.id, s)}
                          className={`text-xs px-2 py-1 rounded-lg transition-colors font-medium ${
                            inq.status === s
                              ? "bg-pine-forest text-white"
                              : "bg-pine-forest/5 text-pine-forest hover:bg-pine-forest/10"
                          }`}
                        >
                          {s}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div className="mt-3 flex gap-2">
                    <a
                      href={`https://wa.me/${inq.phone.replace(/\D/g, "")}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs bg-green-500 text-white px-3 py-1.5 rounded-lg font-semibold hover:bg-green-600 transition-colors"
                    >
                      💬 WhatsApp
                    </a>
                    <a
                      href={`tel:${inq.phone}`}
                      className="text-xs bg-blue-50 text-blue-700 px-3 py-1.5 rounded-lg font-semibold hover:bg-blue-100 transition-colors"
                    >
                      📞 Call
                    </a>
                  </div>
                </div>
              ))
            )}
          </div>
        )}

        {/* Flats Tab */}
        {activeTab === "flats" && (
          <div>
            <h3 className="font-fraunces text-xl font-bold text-pine-forest mb-4">Properties Manager</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {flats.map((flat) => (
                <div key={flat.id} className="bg-white rounded-2xl p-5 shadow-sm">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h4 className="font-fraunces font-bold text-pine-forest">{flat.name}</h4>
                      <p className="text-xs text-moss-slate/50 mt-0.5">{flat.layout} · {flat.type}</p>
                    </div>
                    <span className={`text-xs px-2 py-1 rounded-full font-semibold ${statusColors[flat.status] || "bg-gray-100"}`}>
                      {flat.status}
                    </span>
                  </div>
                  {flat.salePriceLac && (
                    <div className="text-sm text-orange-700 font-semibold">PKR {flat.salePriceLac} Lac</div>
                  )}
                  {flat.rentPerNight && (
                    <div className="text-sm text-green-700 font-semibold">PKR {flat.rentPerNight.toLocaleString()}/night</div>
                  )}
                  <div className="flex gap-2 mt-4">
                    {["available", "rented", "sold"].map((s) => (
                      <button
                        key={s}
                        onClick={() => updateFlatStatus(flat.id, s)}
                        className={`flex-1 text-xs py-1.5 rounded-lg font-medium transition-colors ${
                          flat.status === s
                            ? "bg-pine-forest text-white"
                            : "bg-pine-forest/5 text-pine-forest hover:bg-pine-forest/10"
                        }`}
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Blogs Tab */}
        {activeTab === "blogs" && (
          <div>
            <h3 className="font-fraunces text-xl font-bold text-pine-forest mb-4">Blog Posts</h3>
            <div className="bg-white rounded-2xl p-6 text-center text-moss-slate/50">
              Blog management coming soon. Posts are managed via seed data for now.
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
