"use client";

import { useEffect, useState } from "react";
import { Package, ShoppingCart, DollarSign, Clock, TrendingUp } from "lucide-react";
import { getDashboardStats, getOrders } from "@/lib/admin";
import type { Order } from "@/lib/admin";

export default function AdminDashboard() {
  const [stats, setStats] = useState({ totalProducts: 0, totalOrders: 0, totalRevenue: 0, pendingOrders: 0 });
  const [recentOrders, setRecentOrders] = useState<Order[]>([]);

  useEffect(() => {
    setStats(getDashboardStats());
    const orders = getOrders();
    setRecentOrders(orders.slice(-5).reverse());
  }, []);

  const statCards = [
    { label: "Total Products", value: stats.totalProducts, icon: Package, color: "#6A8C40" },
    { label: "Total Orders", value: stats.totalOrders, icon: ShoppingCart, color: "#3B82F6" },
    { label: "Revenue", value: `$${stats.totalRevenue.toFixed(2)}`, icon: DollarSign, color: "#F5A623" },
    { label: "Pending Orders", value: stats.pendingOrders, icon: Clock, color: "#E25C5C" },
  ];

  return (
    <div>
      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-1" style={{ fontFamily: "Poppins, sans-serif", color: "#262A2E" }}>
          Dashboard
        </h2>
        <p className="text-sm" style={{ color: "#555D5E" }}>
          Welcome to Furniova Admin Panel
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {statCards.map((stat) => (
          <div key={stat.label} className="rounded-2xl p-6" style={{ background: "#FFFFFF", border: "1px solid #E5E5E2" }}>
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 rounded-xl flex items-center justify-center" style={{ background: `${stat.color}15` }}>
                <stat.icon className="w-6 h-6" style={{ color: stat.color }} />
              </div>
              <TrendingUp className="w-4 h-4" style={{ color: "#22C55E" }} />
            </div>
            <p className="text-2xl font-bold mb-1" style={{ color: "#262A2E" }}>{stat.value}</p>
            <p className="text-sm" style={{ color: "#555D5E" }}>{stat.label}</p>
          </div>
        ))}
      </div>

      {/* Recent Orders */}
      <div className="rounded-2xl p-6" style={{ background: "#FFFFFF", border: "1px solid #E5E5E2" }}>
        <h3 className="text-lg font-bold mb-4" style={{ fontFamily: "Poppins, sans-serif", color: "#262A2E" }}>
          Recent Orders
        </h3>
        {recentOrders.length === 0 ? (
          <div className="text-center py-12">
            <ShoppingCart className="w-12 h-12 mx-auto mb-3" style={{ color: "#E5E5E2" }} />
            <p className="text-sm" style={{ color: "#555D5E" }}>No orders yet. Orders will appear here when customers place them.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr style={{ borderBottom: "1px solid #E5E5E2" }}>
                  <th className="text-left text-xs font-semibold pb-3 pr-4" style={{ color: "#555D5E" }}>Order #</th>
                  <th className="text-left text-xs font-semibold pb-3 pr-4" style={{ color: "#555D5E" }}>Customer</th>
                  <th className="text-left text-xs font-semibold pb-3 pr-4" style={{ color: "#555D5E" }}>Total</th>
                  <th className="text-left text-xs font-semibold pb-3 pr-4" style={{ color: "#555D5E" }}>Status</th>
                  <th className="text-left text-xs font-semibold pb-3" style={{ color: "#555D5E" }}>Date</th>
                </tr>
              </thead>
              <tbody>
                {recentOrders.map((order) => (
                  <tr key={order.id} style={{ borderBottom: "1px solid #E5E5E2" }}>
                    <td className="py-3 pr-4 text-sm font-medium" style={{ color: "#262A2E" }}>{order.orderNumber}</td>
                    <td className="py-3 pr-4 text-sm" style={{ color: "#555D5E" }}>{order.customerName}</td>
                    <td className="py-3 pr-4 text-sm font-semibold" style={{ color: "#6A8C40" }}>${order.total.toFixed(2)}</td>
                    <td className="py-3 pr-4">
                      <span className="px-2.5 py-1 rounded-full text-xs font-semibold capitalize" style={{
                        background: order.status === "delivered" ? "#E8F0E0" : order.status === "cancelled" ? "#FEE2E2" : order.status === "shipped" ? "#DBEAFE" : "#FEF3C7",
                        color: order.status === "delivered" ? "#5A7836" : order.status === "cancelled" ? "#E25C5C" : order.status === "shipped" ? "#3B82F6" : "#D97706",
                      }}>{order.status}</span>
                    </td>
                    <td className="py-3 text-sm" style={{ color: "#555D5E" }}>{new Date(order.createdAt).toLocaleDateString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}