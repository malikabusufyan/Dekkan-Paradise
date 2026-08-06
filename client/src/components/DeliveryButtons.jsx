import useSettings from "../hooks/useSettings";

const PLATFORMS = [
  { key: "doordashUrl", label: "Order on DoorDash", className: "btn-doordash" },
  { key: "uberEatsUrl", label: "Order on Uber Eats", className: "btn-ubereats" },
  { key: "postmatesUrl", label: "Order on Postmates", className: "btn-postmates" },
];

export default function DeliveryButtons() {
  const { settings, loading } = useSettings();
  if (loading) return null;

  const activePlatforms = PLATFORMS.filter((p) => settings?.[p.key]);

  return (
    <div className="delivery-buttons">
      {activePlatforms.length > 0 ? (
        activePlatforms.map((p) => (
          <a
            key={p.key}
            href={settings[p.key]}
            target="_blank"
            rel="noreferrer"
            className={`btn btn-delivery ${p.className}`}
          >
            {p.label}
          </a>
        ))
      ) : (
        <p className="delivery-fallback">
          Online ordering links coming soon —{" "}
          {settings?.phones?.map((phone, i) => (
            <span key={phone}>
              {i > 0 && " or "}
              <a href={`tel:${phone.replace(/[^0-9+]/g, "")}`}>call {phone}</a>
            </span>
          ))}{" "}
          to place your order.
        </p>
      )}
    </div>
  );
}
