import { Link } from "react-router-dom";
import useSettings from "../hooks/useSettings";

export default function Footer() {
  const { settings } = useSettings();

  return (
    <footer className="footer">
      <div className="footer-inner">
        <div className="footer-col">
          <h3>Dekkan Paradise</h3>
          <p>Hyderabadi Indian Restaurant (Halal)</p>
          <p>{settings?.address}</p>
        </div>
        <div className="footer-col">
          <h4>Hours</h4>
          <p>{settings?.hoursText}</p>
        </div>
        <div className="footer-col">
          <h4>Call to Order</h4>
          {settings?.phones?.map((phone) => (
            <p key={phone}>
              <a href={`tel:${phone.replace(/[^0-9+]/g, "")}`}>{phone}</a>
            </p>
          ))}
        </div>
        <div className="footer-col">
          <h4>Follow Us</h4>
          {settings?.instagramUrl && (
            <a href={settings.instagramUrl} target="_blank" rel="noreferrer">
              Instagram
            </a>
          )}
          <p>
            <Link to="/admin/login" className="admin-link">
              Admin Login
            </Link>
          </p>
        </div>
      </div>
      <p className="footer-copyright">© {new Date().getFullYear()} Dekkan Paradise. All rights reserved.</p>
    </footer>
  );
}
