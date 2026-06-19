"use client";

import { products as defaultProducts } from "./data";
import type { Product } from "./data";
export type { Product };

const STORAGE_KEY = "furniova_products";
const ORDERS_KEY = "furniova_orders";
const AUTH_KEY = "furniova_auth";
const CONFIG_KEY = "furniova_config";

const defaultConfig = {
  password: "furniova123",
  dashboardPath: "furniova-cp-7x9k2",
};

export function getConfig() {
  if (typeof window === "undefined") return defaultConfig;
  const stored = localStorage.getItem(CONFIG_KEY);
  return stored ? JSON.parse(stored) : defaultConfig;
}

export function updateConfig(updates: Partial<{ password: string; dashboardPath: string }>) {
  if (typeof window === "undefined") return;
  const config = getConfig();
  const newConfig = { ...config, ...updates };
  localStorage.setItem(CONFIG_KEY, JSON.stringify(newConfig));
  return newConfig;
}

export function login(password: string): boolean {
  if (typeof window === "undefined") return false;
  const config = getConfig();
  if (password === config.password) {
    const session = { loggedIn: true, timestamp: Date.now() };
    localStorage.setItem(AUTH_KEY, JSON.stringify(session));
    return true;
  }
  return false;
}

export function logout() {
  if (typeof window === "undefined") return;
  localStorage.removeItem(AUTH_KEY);
}

export function isLoggedIn(): boolean {
  if (typeof window === "undefined") return false;
  const stored = localStorage.getItem(AUTH_KEY);
  if (!stored) return false;
  try {
    const session = JSON.parse(stored);
    const expiresIn = 24 * 60 * 60 * 1000;
    if (Date.now() - session.timestamp > expiresIn) {
      logout();
      return false;
    }
    return session.loggedIn === true;
  } catch {
    return false;
  }
}

export function changePassword(oldPassword: string, newPassword: string): boolean {
  const config = getConfig();
  if (oldPassword !== config.password) return false;
  updateConfig({ password: newPassword });
  return true;
}

export function changeDashboardUrl(newPath: string): boolean {
  if (!newPath || newPath.trim() === "") return false;
  const cleanPath = newPath.replace(/[\/\s]/g, "");
  updateConfig({ dashboardPath: cleanPath });
  return true;
}

export function getProducts(): Product[] {
  if (typeof window === "undefined") return defaultProducts;
  const stored = localStorage.getItem(STORAGE_KEY);
  if (!stored) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(defaultProducts));
    return defaultProducts;
  }
  return JSON.parse(stored);
}

export function saveProducts(products: Product[]) {
  if (typeof window === "undefined") return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(products));
}

export function addProduct(product: Product) {
  const products = getProducts();
  const newId = String(Math.max(...products.map((p) => parseInt(p.id)), 0) + 1);
  const newProduct = { ...product, id: newId };
  products.push(newProduct);
  saveProducts(products);
  return newProduct;
}

export function updateProduct(id: string, updates: Partial<Product>) {
  const products = getProducts();
  const index = products.findIndex((p) => p.id === id);
  if (index !== -1) {
    products[index] = { ...products[index], ...updates };
    saveProducts(products);
  }
  return products[index];
}

export function deleteProduct(id: string) {
  const products = getProducts();
  const filtered = products.filter((p) => p.id !== id);
  saveProducts(filtered);
}

export function resetProducts() {
  saveProducts(defaultProducts);
}

export interface Order {
  id: string;
  orderNumber: string;
  customerName: string;
  email: string;
  phone: string;
  whatsapp: string;
  address: string;
  city: string;
  province: string;
  postal: string;
  items: {
    id: string;
    name: string;
    price: number;
    quantity: number;
    selectedColor: string;
    selectedMaterial: string;
    image: string;
  }[];
  subtotal: number;
  shipping: number;
  tax: number;
  total: number;
  status: "pending" | "processing" | "shipped" | "delivered" | "cancelled";
  paymentMethod: string;
  createdAt: string;
}

export function getOrders(): Order[] {
  if (typeof window === "undefined") return [];
  const stored = localStorage.getItem(ORDERS_KEY);
  return stored ? JSON.parse(stored) : [];
}

export function saveOrders(orders: Order[]) {
  if (typeof window === "undefined") return;
  localStorage.setItem(ORDERS_KEY, JSON.stringify(orders));
}

export function updateOrderStatus(orderId: string, status: Order["status"]) {
  const orders = getOrders();
  const index = orders.findIndex((o) => o.id === orderId);
  if (index !== -1) {
    orders[index].status = status;
    saveOrders(orders);
  }
  return orders[index];
}

export function deleteOrder(orderId: string) {
  const orders = getOrders();
  const filtered = orders.filter((o) => o.id !== orderId);
  saveOrders(filtered);
}

export function generateOrderNumber(): string {
  const prefix = "FV";
  const year = new Date().getFullYear();
  const random = Math.floor(Math.random() * 10000).toString().padStart(4, "0");
  return `#${prefix}-${year}-${random}`;
}

export function getDashboardStats() {
  const products = getProducts();
  const orders = getOrders();
  const totalRevenue = orders
    .filter((o) => o.status !== "cancelled")
    .reduce((sum, o) => sum + o.total, 0);
  const pendingOrders = orders.filter((o) => o.status === "pending").length;
  return {
    totalProducts: products.length,
    totalOrders: orders.length,
    totalRevenue,
    pendingOrders,
  };
}