"use client";

import { useEffect, useRef, type ReactNode } from "react";

type WheelScrollGalleryProps = {
  children: ReactNode;
  label: string;
};

/**
 * Mouse wheel moves the horizontal screenshot gallery only while hovered.
 * Once the gallery reaches an edge, the wheel scrolls the page normally.
 * Touch swipes, trackpad horizontal gestures and keyboard remain native.
 */
export default function WheelScrollGallery({ children, label }: WheelScrollGalleryProps) {
  const galleryRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const gallery = galleryRef.current;
    if (!gallery) return;

    const onWheel = (event: WheelEvent) => {
      // Preserve normal horizontal trackpad gestures.
      if (Math.abs(event.deltaX) >= Math.abs(event.deltaY)) return;

      const multiplier = event.deltaMode === 1 ? 36 : event.deltaMode === 2 ? gallery.clientHeight : 1;
      const delta = event.deltaY * multiplier;
      if (!delta) return;

      const maxScroll = Math.max(0, gallery.scrollWidth - gallery.clientWidth);
      const currentScroll = gallery.scrollLeft;
      const canMove = delta > 0 ? currentScroll < maxScroll - 1 : currentScroll > 1;

      // Do not trap the user when the gallery is at either end.
      if (!canMove) return;

      event.preventDefault();
      gallery.scrollLeft = Math.min(maxScroll, Math.max(0, currentScroll + delta));
    };

    // A non-passive native listener is required for preventDefault on wheel.
    gallery.addEventListener("wheel", onWheel, { passive: false });
    return () => gallery.removeEventListener("wheel", onWheel);
  }, []);

  return (
    <div
      ref={galleryRef}
      role="region"
      aria-label={label}
      tabIndex={0}
      className="mt-10 flex snap-x snap-proximity gap-5 overflow-x-auto overscroll-x-contain pb-4 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#53eddc]"
    >
      {children}
    </div>
  );
}
