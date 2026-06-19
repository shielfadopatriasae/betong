"use client";

import { useEffect, useState } from "react";
import { getOrders, updateOrderStatus, deleteOrder } from "@/lib/admin";
import type { Order } from "@/lib/admin";
import { formatPrice } from "@/lib/utils";

const statusOptions: Order["status"][] = ["pending", "processing", "shipped", "delivered", "cancelled"];

export default function OrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    setOrders(getOrders());
  }, []);

  const handleStatusChange = (orderId: string, status: Order["status"]) => {
    updateOrderStatus(orderId, status);
    setOrders(getOrders());
  };

  const handleDelete = (orderId: string) => {
    if (confirm("Delete this order?")) {
      deleteOrder(orderId);
      setOrders(getOrders());
    }
  };

  return (
    <div>
      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-1" style={{ fontFamily: "Poppins, sans-serif", color: "#262A2E" }}>Orders</h2>
        <p className="text-sm" style={{ color: "#555D5E" }}>{orders.length} orders total</p>
      </div>

      {orders.length === 0 ? (
        <div className="rounded-2xl p-12 text-center" style={{ background: "#FFFFFF", border: "1px solid #E5E5E2" }}>
          <p className="text-sm" style={{ color: "#555D5E" }}>No orders yet.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {orders.slice().reverse().map((order) => (
            <div key={order.id} className="rounded-2xl p-6" style={{ background: "#FFFFFF", border: "1px solid #E5E5E2" }}>
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
                <div>
                  <p className="text-sm font-bold" style={{ color: "#262A2E" }}>{order.orderNumber}</p>
                  <p className="text-xs" style={{ color: "#555D5E" }}>{order.customerName} • {order.email}</p>
                  <p className="text-xs" style={{ color: "#555D5E" }}>{new Date(order.createdAt).toLocaleString()}</p>
                </div>
                <div className="flex items-center gap-3">
                  <select
                    value={order.status}
                    onChange={(e) => handleStatusChange(order.id, e.target.value as Order["status"])}
                    className="px-3 py-1.5 rounded-lg text-xs font-medium outline-none"
                    style={{ border: "1px solid #E5E5E2", color: "#262A2E" }}
                  >
                    {statusOptions.map((s) => (
                      <option key={s} value={s}>{s.charAt(0).toUpperCase() + s.slice(1)}</option>
                    ))}
                  </select>
                  <button onClick={() => handleDelete(order.id)} className="text-xs px-3 py-1.5 rounded-lg" style={{ border: "1px solid #E25C5C", color: "#E25C5C" }}>Delete</button>
                </div>
              </div>

              <div className="space-y-2 mb-4">
                {order.items.map((item, i) => (
                  <div key={i} className="flex items-center justify-between text-sm">
                    <span style={{ color: "#555D5E" }}>{item.name} x{item.quantity}</span>
                    <span className="font-medium" style={{ color: "#262A2E" }}>{formatPrice(item.price * item.quantity)}</span>
                  </div>
                ))}
              </div>

              <div className="flex justify-between items-center pt-3 text-sm" style={{ borderTop: "1px solid #E5E5E2" }}>
                <span style={{ color: "#555D5E" }}>Total</span>
                <span className="font-bold" style={{ color: "#6A8C40" }}>{formatPrice(order.total)}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}