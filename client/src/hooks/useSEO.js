import { useEffect } from "react";
import { SITE_URL } from "../constants";

function upsertMeta(attr, key, content) {
  let el = document.head.querySelector(`meta[${attr}="${key}"]`);
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute("content", content);
}

function upsertCanonical(href) {
  let el = document.head.querySelector('link[rel="canonical"]');
  if (!el) {
    el = document.createElement("link");
    el.setAttribute("rel", "canonical");
    document.head.appendChild(el);
  }
  el.setAttribute("href", href);
}

// Updates document title/meta tags per route. Google's crawler renders JS and
// picks these up, but bots that don't run JS (social link previews, some
// crawlers) only ever see index.html's static tags — this only improves what
// Google itself indexes per-page, not social share cards.
export default function useSEO({ title, description, path = "/", noindex = false }) {
  useEffect(() => {
    if (title) document.title = title;
    if (description) upsertMeta("name", "description", description);

    const url = `${SITE_URL}${path}`;
    upsertCanonical(url);
    upsertMeta("property", "og:title", title || document.title);
    upsertMeta("property", "og:url", url);
    if (description) upsertMeta("property", "og:description", description);

    upsertMeta("name", "robots", noindex ? "noindex, nofollow" : "index, follow");
  }, [title, description, path, noindex]);
}
