import { useEffect, useState } from "react";
import api from "../../api/client";

export default function AdminSettingsTab() {
  const [form, setForm] = useState(null);
  const [phonesText, setPhonesText] = useState("");
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    api.get("/settings").then((res) => {
      setForm(res.data);
      setPhonesText((res.data.phones || []).join(", "));
    });
  }, []);

  async function handleSubmit(e) {
    e.preventDefault();
    setSaving(true);
    setSaved(false);
    const payload = {
      ...form,
      phones: phonesText
        .split(",")
        .map((p) => p.trim())
        .filter(Boolean),
    };
    const res = await api.put("/settings", payload);
    setForm(res.data);
    setSaving(false);
    setSaved(true);
  }

  if (!form) return <p>Loading settings…</p>;

  return (
    <div className="admin-tab">
      <div className="admin-form-card admin-form-card-wide">
        <h3>Site Settings</h3>
        <form onSubmit={handleSubmit} className="admin-form">
          <label>
            Address
            <input value={form.address} onChange={(e) => setForm({ ...form, address: e.target.value })} />
          </label>
          <label>
            Hours Text
            <input value={form.hoursText} onChange={(e) => setForm({ ...form, hoursText: e.target.value })} />
          </label>
          <label>
            Phone Numbers (comma-separated)
            <input value={phonesText} onChange={(e) => setPhonesText(e.target.value)} />
          </label>
          <label>
            Instagram URL
            <input value={form.instagramUrl} onChange={(e) => setForm({ ...form, instagramUrl: e.target.value })} />
          </label>
          <label>
            DoorDash URL
            <input
              value={form.doordashUrl}
              placeholder="https://www.doordash.com/store/..."
              onChange={(e) => setForm({ ...form, doordashUrl: e.target.value })}
            />
          </label>
          <label>
            Uber Eats URL
            <input
              value={form.uberEatsUrl}
              placeholder="https://www.ubereats.com/store/..."
              onChange={(e) => setForm({ ...form, uberEatsUrl: e.target.value })}
            />
          </label>
          <label>
            Postmates URL
            <input
              value={form.postmatesUrl}
              placeholder="https://postmates.com/store/..."
              onChange={(e) => setForm({ ...form, postmatesUrl: e.target.value })}
            />
          </label>
          {saved && <p className="form-success">Settings saved.</p>}
          <button type="submit" className="btn btn-primary" disabled={saving}>
            {saving ? "Saving…" : "Save Settings"}
          </button>
        </form>
      </div>
    </div>
  );
}
