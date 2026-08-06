import useSettings from "../hooks/useSettings";
import DeliveryButtons from "../components/DeliveryButtons";

export default function Contact() {
  const { settings, loading } = useSettings();

  return (
    <div className="section page-contact">
      <h1 className="page-title">Contact &amp; Order</h1>
      <p className="page-subtitle">Visit us, call us, or order online for delivery.</p>

      {!loading && settings && (
        <div className="contact-grid">
          <div className="contact-info">
            <h3>Location</h3>
            <p>{settings.address}</p>

            <h3>Hours</h3>
            <p>{settings.hoursText}</p>

            <h3>Call to Order</h3>
            {settings.phones.map((phone) => (
              <p key={phone}>
                <a href={`tel:${phone.replace(/[^0-9+]/g, "")}`}>{phone}</a>
              </p>
            ))}

            <h3>Order Online</h3>
            <DeliveryButtons />

            {settings.instagramUrl && (
              <>
                <h3>Follow Us</h3>
                <a href={settings.instagramUrl} target="_blank" rel="noreferrer">
                  Instagram
                </a>
              </>
            )}
          </div>

          <div className="contact-map">
            <iframe
              title="Dekkan Paradise location"
              width="100%"
              height="100%"
              style={{ border: 0, minHeight: 350 }}
              loading="lazy"
              allowFullScreen
              src={`https://www.google.com/maps?q=${encodeURIComponent(settings.address)}&output=embed`}
            />
          </div>
        </div>
      )}
    </div>
  );
}
