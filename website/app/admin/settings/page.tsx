"use client";

import { useState } from "react";
import { Save, Store, Phone, Mail, MapPin, Lock, Key, AlertCircle, CheckCircle } from "lucide-react";
import { getConfig, updateConfig, changePassword } from "@/lib/admin";

export default function SettingsPage() {
  const [saved, setSaved] = useState(false);
  const [passwordMsg, setPasswordMsg] = useState<{ type: "success" | "error"; text: string } | null>(null);
  const [urlMsg, setUrlMsg] = useState<{ type: "success" | "error"; text: string } | null>(null);

  const config = getConfig();

  const [settings, setSettings] = useState({
    storeName: "Furniova",
    email: "hello@furniova.com",
    phone: "+62 857-8860-7416",
    address: "Jakarta, Indonesia",
    whatsapp: "6285788607416",
    currency: "USD",
    freeShippingThreshold: 200,
    taxRate: 7.5,
  });

  const [passwords, setPasswords] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [newDashboardUrl, setNewDashboardUrl] = useState("");

  const handleSaveSettings = () => {
    localStorage.setItem("furniova_settings", JSON.stringify(settings));
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const handleChangePassword = () => {
    if (!passwords.oldPassword || !passwords.newPassword) {
      setPasswordMsg({ type: "error", text: "Semua field harus diisi" });
      return;
    }
    if (passwords.newPassword !== passwords.confirmPassword) {
      setPasswordMsg({ type: "error", text: "Password baru tidak cocok" });
      return;
    }
    if (passwords.newPassword.length < 6) {
      setPasswordMsg({ type: "error", text: "Password minimal 6 karakter" });
      return;
    }

    const success = changePassword(passwords.oldPassword, passwords.newPassword);
    if (success) {
      setPasswordMsg({ type: "success", text: "Password berhasil diubah!" });
      setPasswords({ oldPassword: "", newPassword: "", confirmPassword: "" });
    } else {
      setPasswordMsg({ type: "error", text: "Password lama salah" });
    }
    setTimeout(() => setPasswordMsg(null), 3000);
  };

  const handleChangeUrl = () => {
    if (!newDashboardUrl.trim()) {
      setUrlMsg({ type: "error", text: "URL tidak boleh kosong" });
      return;
    }

    const cleanUrl = newDashboardUrl.replace(/[\/\s]/g, "");
    if (cleanUrl.length < 4) {
      setUrlMsg({ type: "error", text: "URL minimal 4 karakter" });
      return;
    }

    updateConfig({ dashboardPath: cleanUrl });
    setUrlMsg({ type: "success", text: `URL dashboard diubah menjadi: /${cleanUrl}` });
    setNewDashboardUrl("");
    setTimeout(() => setUrlMsg(null), 5000);
  };

  return (
    <div>
      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-1" style={{ fontFamily: "Poppins, sans-serif", color: "#262A2E" }}>Settings</h2>
        <p className="text-sm" style={{ color: "#555D5E" }}>Manage your store and security settings</p>
      </div>

      <div className="max-w-2xl space-y-6">
        {/* Store Info */}
        <div className="rounded-2xl p-6" style={{ background: "#FFFFFF", border: "1px solid #E5E5E2" }}>
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: "#E8F0E0" }}>
              <Store className="w-5 h-5" style={{ color: "#6A8C40" }} />
            </div>
            <h3 className="text-lg font-bold" style={{ fontFamily: "Poppins, sans-serif", color: "#262A2E" }}>Store Information</h3>
          </div>
          <div className="space-y-4">
            <div>
              <label className="block text-xs font-semibold mb-1.5" style={{ color: "#555D5E" }}>Store Name</label>
              <input type="text" value={settings.storeName} onChange={(e) => setSettings({ ...settings, storeName: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl text-sm outline-none" style={{ border: "1px solid #E5E5E2", color: "#262A2E" }} />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold mb-1.5" style={{ color: "#555D5E" }}>Email</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4" style={{ color: "#555D5E" }} />
                  <input type="email" value={settings.email} onChange={(e) => setSettings({ ...settings, email: e.target.value })}
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl text-sm outline-none" style={{ border: "1px solid #E5E5E2", color: "#262A2E" }} />
                </div>
              </div>
              <div>
                <label className="block text-xs font-semibold mb-1.5" style={{ color: "#555D5E" }}>Phone</label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4" style={{ color: "#555D5E" }} />
                  <input type="text" value={settings.phone} onChange={(e) => setSettings({ ...settings, phone: e.target.value })}
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl text-sm outline-none" style={{ border: "1px solid #E5E5E2", color: "#262A2E" }} />
                </div>
              </div>
            </div>
            <div>
              <label className="block text-xs font-semibold mb-1.5" style={{ color: "#555D5E" }}>Address</label>
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4" style={{ color: "#555D5E" }} />
                <input type="text" value={settings.address} onChange={(e) => setSettings({ ...settings, address: e.target.value })}
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl text-sm outline-none" style={{ border: "1px solid #E5E5E2", color: "#262A2E" }} />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold mb-1.5" style={{ color: "#555D5E" }}>Currency</label>
                <select value={settings.currency} onChange={(e) => setSettings({ ...settings, currency: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl text-sm outline-none" style={{ border: "1px solid #E5E5E2", color: "#262A2E" }}>
                  <option value="USD">USD ($)</option>
                  <option value="IDR">IDR (Rp)</option>
                  <option value="EUR">EUR (€)</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-semibold mb-1.5" style={{ color: "#555D5E" }}>Tax Rate (%)</label>
                <input type="number" value={settings.taxRate} onChange={(e) => setSettings({ ...settings, taxRate: parseFloat(e.target.value) || 0 })}
                  className="w-full px-4 py-2.5 rounded-xl text-sm outline-none" style={{ border: "1px solid #E5E5E2", color: "#262A2E" }} />
              </div>
            </div>
            <div>
              <label className="block text-xs font-semibold mb-1.5" style={{ color: "#555D5E" }}>Free Shipping Threshold ($)</label>
              <input type="number" value={settings.freeShippingThreshold} onChange={(e) => setSettings({ ...settings, freeShippingThreshold: parseFloat(e.target.value) || 0 })}
                className="w-full px-4 py-2.5 rounded-xl text-sm outline-none" style={{ border: "1px solid #E5E5E2", color: "#262A2E" }} />
            </div>
          </div>
          <div className="flex items-center gap-4 mt-6 pt-4" style={{ borderTop: "1px solid #E5E5E2" }}>
            <button onClick={handleSaveSettings} className="flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold text-white" style={{ background: "#6A8C40" }}>
              <Save className="w-4 h-4" /> Save Settings
            </button>
            {saved && <span className="text-sm font-medium" style={{ color: "#22C55E" }}>✓ Settings saved!</span>}
          </div>
        </div>

        {/* Change Password */}
        <div className="rounded-2xl p-6" style={{ background: "#FFFFFF", border: "1px solid #E5E5E2" }}>
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: "#FEF3C7" }}>
              <Lock className="w-5 h-5" style={{ color: "#D97706" }} />
            </div>
            <div>
              <h3 className="text-lg font-bold" style={{ fontFamily: "Poppins, sans-serif", color: "#262A2E" }}>Change Password</h3>
              <p className="text-xs" style={{ color: "#555D5E" }}>Ubah password untuk keamanan dashboard</p>
            </div>
          </div>

          {passwordMsg && (
            <div className="flex items-center gap-2 p-3 rounded-xl mb-4" style={{ background: passwordMsg.type === "success" ? "#E8F0E0" : "#FEE2E2", color: passwordMsg.type === "success" ? "#5A7836" : "#E25C5C" }}>
              {passwordMsg.type === "success" ? <CheckCircle className="w-4 h-4" /> : <AlertCircle className="w-4 h-4" />}
              <span className="text-sm">{passwordMsg.text}</span>
            </div>
          )}

          <div className="space-y-4">
            <div>
              <label className="block text-xs font-semibold mb-1.5" style={{ color: "#555D5E" }}>Password Lama</label>
              <input type="password" value={passwords.oldPassword} onChange={(e) => setPasswords({ ...passwords, oldPassword: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl text-sm outline-none" style={{ border: "1px solid #E5E5E2", color: "#262A2E" }} />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold mb-1.5" style={{ color: "#555D5E" }}>Password Baru</label>
                <input type="password" value={passwords.newPassword} onChange={(e) => setPasswords({ ...passwords, newPassword: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl text-sm outline-none" style={{ border: "1px solid #E5E5E2", color: "#262A2E" }} />
              </div>
              <div>
                <label className="block text-xs font-semibold mb-1.5" style={{ color: "#555D5E" }}>Konfirmasi Password</label>
                <input type="password" value={passwords.confirmPassword} onChange={(e) => setPasswords({ ...passwords, confirmPassword: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl text-sm outline-none" style={{ border: "1px solid #E5E5E2", color: "#262A2E" }} />
              </div>
            </div>
            <button onClick={handleChangePassword} className="px-6 py-3 rounded-xl text-sm font-semibold text-white" style={{ background: "#D97706" }}>
              Ubah Password
            </button>
          </div>
        </div>

        {/* Change Dashboard URL */}
        <div className="rounded-2xl p-6" style={{ background: "#FFFFFF", border: "1px solid #E5E5E2" }}>
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: "#DBEAFE" }}>
              <Key className="w-5 h-5" style={{ color: "#3B82F6" }} />
            </div>
            <div>
              <h3 className="text-lg font-bold" style={{ fontFamily: "Poppins, sans-serif", color: "#262A2E" }}>Dashboard URL</h3>
              <p className="text-xs" style={{ color: "#555D5E" }}>Ubah URL dashboard agar tidak bisa ditebak orang lain</p>
            </div>
          </div>

          {urlMsg && (
            <div className="flex items-center gap-2 p-3 rounded-xl mb-4" style={{ background: urlMsg.type === "success" ? "#E8F0E0" : "#FEE2E2", color: urlMsg.type === "success" ? "#5A7836" : "#E25C5C" }}>
              {urlMsg.type === "success" ? <CheckCircle className="w-4 h-4" /> : <AlertCircle className="w-4 h-4" />}
              <span className="text-sm">{urlMsg.text}</span>
            </div>
          )}

          <div className="space-y-4">
            <div>
              <label className="block text-xs font-semibold mb-1.5" style={{ color: "#555D5E" }}>URL Dashboard Saat Ini</label>
              <div className="px-4 py-2.5 rounded-xl text-sm font-mono" style={{ background: "#F0F5EC", color: "#5A7836" }}>
                /{config.dashboardPath}
              </div>
            </div>
            <div>
              <label className="block text-xs font-semibold mb-1.5" style={{ color: "#555D5E" }}>URL Baru</label>
              <input type="text" value={newDashboardUrl} onChange={(e) => setNewDashboardUrl(e.target.value)}
                placeholder="Contoh: my-secret-panel-2024"
                className="w-full px-4 py-2.5 rounded-xl text-sm outline-none" style={{ border: "1px solid #E5E5E2", color: "#262A2E" }} />
              <p className="text-xs mt-1" style={{ color: "#555D5E" }}>
                Hanya huruf, angka, dan tanda hubung. Minimal 4 karakter.
              </p>
            </div>
            <button onClick={handleChangeUrl} className="px-6 py-3 rounded-xl text-sm font-semibold text-white" style={{ background: "#3B82F6" }}>
              Ubah URL Dashboard
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}