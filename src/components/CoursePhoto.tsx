import { useState } from "react";
import { COURSE_PHOTOS } from "@/data/photos";
import { CourseArt } from "@/components/CourseArt";
import type { Course } from "@/data/courses";

/**
 * Renders a realistic photo for the given course slug.
 * If the image fails to load, gracefully falls back to the
 * matching SVG scene from CourseArt so the card never looks broken.
 */
export function CoursePhoto({
  slug,
  className,
}: {
  slug: Course["slug"];
  className?: string;
}) {
  const [failed, setFailed] = useState(false);
  const src = COURSE_PHOTOS[slug];

  if (!src || failed) {
    return <CourseArt slug={slug} className={className} />;
  }

  return (
    <img
      src={src}
      alt=""
      loading="lazy"
      decoding="async"
      className={className}
      onError={() => setFailed(true)}
      draggable={false}
    />
  );
}
