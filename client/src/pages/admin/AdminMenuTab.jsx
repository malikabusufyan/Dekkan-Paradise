import { useEffect, useState } from "react";
import api from "../../api/client";
import { MENU_CATEGORIES } from "../../constants";

const emptyForm = { name: "", description: "", price: "", category: MENU_CATEGORIES[0], image: null };

export default function AdminMenuTab() {
  const [items, setItems] = useState([]);
  const [form, setForm] = useState(emptyForm);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  function loadItems() {
    api.get("/menu").then((res) => setItems(res.data));
  }

  useEffect(loadItems, []);

  async function handleSubmit(e) {
    e.preventDefault();
    setSubmitting(true);
    setError("");
    try {
      const data = new FormData();
      data.append("name", form.name);
      data.append("description", form.description);
      data.append("price", form.price);
      data.append("category", form.category);
      if (form.image) data.append("image", form.image);

      await api.post("/menu", data, { headers: { "Content-Type": "multipart/form-data" } });
      setForm(emptyForm);
      loadItems();
    } catch (err) {
      setError(err.response?.data?.message || "Failed to add menu item");
    } finally {
      setSubmitting(false);
    }
  }

  async function handleDelete(id) {
    if (!confirm("Delete this menu item?")) return;
    await api.delete(`/menu/${id}`);
    loadItems();
  }

  return (
    <div className="admin-tab">
      <div className="admin-form-card">
        <h3>Add Menu Item</h3>
        <form onSubmit={handleSubmit} className="admin-form">
          <label>
            Name
            <input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required />
          </label>
          <label>
            Description
            <textarea
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
              rows={2}
            />
          </label>
          <label>
            Price ($)
            <input
              type="number"
              step="0.01"
              min="0"
              value={form.price}
              onChange={(e) => setForm({ ...form, price: e.target.value })}
              required
            />
          </label>
          <label>
            Category
            <select value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })}>
              {MENU_CATEGORIES.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </label>
          <label>
            Image (optional)
            <input type="file" accept="image/*" onChange={(e) => setForm({ ...form, image: e.target.files[0] })} />
          </label>
          {error && <p className="form-error">{error}</p>}
          <button type="submit" className="btn btn-primary" disabled={submitting}>
            {submitting ? "Adding…" : "Add Item"}
          </button>
        </form>
      </div>

      <div className="admin-list-card">
        <h3>Current Menu ({items.length})</h3>
        <table className="admin-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Category</th>
              <th>Price</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {items.map((item) => (
              <tr key={item._id}>
                <td>{item.name}</td>
                <td>{item.category}</td>
                <td>${item.price.toFixed(2)}</td>
                <td>
                  <button className="btn btn-danger-small" onClick={() => handleDelete(item._id)}>
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
