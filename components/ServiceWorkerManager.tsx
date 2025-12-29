"use client";

import { useEffect, useState } from "react";

const ServiceWorkerManager = () => {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (!("serviceWorker" in navigator)) {
      return;
    }

    let mounted = true;

    navigator.serviceWorker
      .register("/sw.js")
      .then(registration => {
        if (mounted) {
          setReady(registration.active !== null);
        }
        registration.addEventListener("updatefound", () => {
          const installing = registration.installing;
          if (!installing) {
            return;
          }
          installing.addEventListener("statechange", () => {
            if (installing.state === "activated" && mounted) {
              setReady(true);
            }
          });
        });
      })
      .catch(() => {
        setReady(false);
      });

    return () => {
      mounted = false;
    };
  }, []);

  return (
    <span className="sr-only" aria-live="polite">
      Service worker {ready ? "ready" : "initialising"}
    </span>
  );
};

export default ServiceWorkerManager;
