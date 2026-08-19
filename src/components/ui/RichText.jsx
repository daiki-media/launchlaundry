// Renders content arrays from src/data/home.js: plain strings stay plain,
// { b: "..." } segments become <strong> (keyword emphasis for SEO copy).
export default function RichText({ segments }) {
  if (typeof segments === "string") return segments;
  return segments.map((seg, i) =>
    typeof seg === "string" ? (
      seg
    ) : (
      <strong key={i} className="font-semibold text-navy">
        {seg.b}
      </strong>
    )
  );
}
