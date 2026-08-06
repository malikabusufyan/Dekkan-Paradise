import { useEffect, useMemo, useState } from "react";
import api from "../api/client";
import MenuCard from "../components/MenuCard";

export default function Menu() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState("All");

  useEffect(() => {
    api
      .get("/menu")
      .then((res) => setItems(res.data))
      .finally(() => setLoading(false));
  }, []);

  const categories = useMemo(() => {
    const seen = [];
    for (const item of items) {
      if (!seen.includes(item.category)) seen.push(item.category);
    }
    return ["All", ...seen];
  }, [items]);

  const visibleItems = activeCategory === "All" ? items : items.filter((i) => i.category === activeCategory);

  return (
    <div className="section page-menu">
      <h1 className="page-title">Our Menu</h1>
      <p className="page-subtitle">Authentic Hyderabadi cuisine, 100% Halal.</p>

      {loading ? (
        <p>Loading menu…</p>
      ) : items.length === 0 ? (
        <p>The menu is being updated. Please check back soon.</p>
      ) : (
        <>
          <div className="category-filters">
            {categories.map((cat) => (
              <button
                key={cat}
                className={"category-pill" + (cat === activeCategory ? " active" : "")}
                onClick={() => setActiveCategory(cat)}
              >
                {cat}
              </button>
            ))}
          </div>
          <div className="menu-grid">
            {visibleItems.map((item) => (
              <MenuCard key={item._id} item={item} />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
