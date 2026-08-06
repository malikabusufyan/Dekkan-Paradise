export default function MenuCard({ item }) {
  return (
    <div className={"menu-card" + (item.isAvailable === false ? " unavailable" : "")}>
      {item.imageUrl && (
        <div className="menu-card-image">
          <img src={item.imageUrl} alt={item.name} loading="lazy" />
        </div>
      )}
      <div className="menu-card-body">
        <div className="menu-card-header">
          <h4>{item.name}</h4>
          <span className="menu-card-price">${item.price.toFixed(2)}</span>
        </div>
        {item.description && <p className="menu-card-description">{item.description}</p>}
        {item.isAvailable === false && <span className="menu-card-badge">Currently unavailable</span>}
      </div>
    </div>
  );
}
