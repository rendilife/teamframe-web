"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

type WheelScrollGalleryProps = {
  children: ReactNode;
  label: string;
};

/**
 * Scroll a horizontal screenshot strip with the ordinary vertical mouse wheel.
 * The strip intentionally has no CSS scroll-snap: scrollLeft changes would
 * otherwise be snapped back to the same card on some browsers.
 *
 * Native touch swipes, trackpad horizontal gestures and normal page scrolling
 * at the start/end of the strip remain available.
 */
export default function WheelScrollGallery({ children, label }: WheelScrollGalleryProps) {
  const galleryRef = useRef<HTMLDivElement>(null);
  const [canGoBack, setCanGoBack] = useState(false);
  const [canGoForward, setCanGoForward] = useState(false);

  useEffect(() => {
    const gallery = galleryRef.current;
    if (!gallery) return;

    const updateArrows = () => {
      const max = Math.max(0, gallery.scrollWidth - gallery.clientWidth);
      setCanGoBack(gallery.scrollLeft > 2);
      setCanGoForward(gallery.scrollLeft < max - 2);
    };

    const onWheel = (event: WheelEvent) => {
      if (event.ctrlKey || event.metaKey || event.defaultPrevented) return;
      // Let native touchpad horizontal gestures work without interference.
      if (Math.abs(event.deltaX) > Math.abs(event.deltaY)) return;

      const multiplier = event.deltaMode === 1 ? 36 : event.deltaMode === 2 ? gallery.clientHeight : 1;
      const delta = event.deltaY * multiplier;
      if (!delta) return;

      const maxScroll = Math.max(0, gallery.scrollWidth - gallery.clientWidth);
      const previous = gallery.scrollLeft;
      const target = Math.max(0, Math.min(maxScroll, previous + delta));
      // At the beginning/end, let the page scroll normally.
      if (Math.abs(target - previous) < 0.5) return;

      event.preventDefault();
      // No snap behavior in the horizontal strip, so this actually advances
      // on every wheel tick rather than jumping back to the same screenshot.
      gallery.scrollLeft = target;
      updateArrows();
    };

    const onResize = () => updateArrows();
    gallery.addEventListener("wheel", onWheel, { passive: false });
    gallery.addEventListener("scroll", updateArrows, { passive: true });
    window.addEventListener("resize", onResize);
    const resizeObserver = typeof ResizeObserver !== "undefined"
      ? new ResizeObserver(updateArrows)
      : null;
    resizeObserver?.observe(gallery);
    updateArrows();

    return () => {
      gallery.removeEventListener("wheel", onWheel);
      gallery.removeEventListener("scroll", updateArrows);
      window.removeEventListener("resize", onResize);
      resizeObserver?.disconnect();
    };
  }, []);

  const scrollByPage = (direction: -1 | 1) => {
    const gallery = galleryRef.current;
    if (!gallery) return;
    gallery.scrollBy({ left: direction * Math.round(gallery.clientWidth * 0.82), behavior: "smooth" });
  };

  return (
    <div className="mt-8">
      <div className="mb-4 flex items-center justify-end gap-2">
        <button
          type="button"
          aria-label="Previous screenshots"
          onClick={() => scrollByPage(-1)}
          disabled={!canGoBack}
          className="flex h-10 w-11 items-center justify-center rounded-xl border border-[#28535a] bg-[#12262e] text-xl text-[#8aeee3] transition hover:bg-[#1c3e42] disabled:cursor-not-allowed disabled:opacity-35"
        >
          ←
        </button>
        <button
          type="button"
          aria-label="Next screenshots"
          onClick={() => scrollByPage(1)}
          disabled={!canGoForward}
          className="flex h-10 w-11 items-center justify-center rounded-xl border border-[#28535a] bg-[#12262e] text-xl text-[#8aeee3] transition hover:bg-[#1c3e42] disabled:cursor-not-allowed disabled:opacity-35"
        >
          →
        </button>
      </div>
      <div
        ref={galleryRef}
        role="region"
        aria-label={label}
        tabIndex={0}
        // Do not use snap-x here: mouse-wheel scrollLeft and scroll-snap conflict.
        className="flex gap-5 overflow-x-auto overscroll-x-contain pb-4 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#53eddc]"
      >
        {children}
      </div>
    </div>
  );
}
