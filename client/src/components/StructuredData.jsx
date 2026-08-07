import { useEffect, useState } from "react";
import api from "../api/client";
import useSettings from "../hooks/useSettings";
import { SITE_URL } from "../constants";

const SCRIPT_ID = "restaurant-structured-data";

export default function StructuredData() {
  const { settings } = useSettings();
  const [reviewStats, setReviewStats] = useState(null);

  useEffect(() => {
    api.get("/reviews").then((res) => {
      const reviews = res.data;
      if (reviews.length === 0) return;
      const average = reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length;
      setReviewStats({ count: reviews.length, average });
    });
  }, []);

  useEffect(() => {
    if (!settings) return;

    const data = {
      "@context": "https://schema.org",
      "@type": "Restaurant",
      name: "Dekkan Paradise",
      image: `${SITE_URL}/logo.jpg`,
      url: SITE_URL,
      telephone: settings.phones?.[0],
      servesCuisine: ["Indian", "Hyderabadi", "Halal"],
      priceRange: "$$",
      address: {
        "@type": "PostalAddress",
        streetAddress: "5360 N. Mesa St, Suite 11K",
        addressLocality: "El Paso",
        addressRegion: "TX",
        postalCode: "79912",
        addressCountry: "US",
      },
      openingHours: ["We-Mo 17:00-23:00"],
      sameAs: [settings.instagramUrl].filter(Boolean),
      ...(reviewStats && {
        aggregateRating: {
          "@type": "AggregateRating",
          ratingValue: reviewStats.average.toFixed(1),
          reviewCount: reviewStats.count,
        },
      }),
    };

    let script = document.getElementById(SCRIPT_ID);
    if (!script) {
      script = document.createElement("script");
      script.type = "application/ld+json";
      script.id = SCRIPT_ID;
      document.head.appendChild(script);
    }
    script.textContent = JSON.stringify(data);
  }, [settings, reviewStats]);

  return null;
}
