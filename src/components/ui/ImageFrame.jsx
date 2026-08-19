import Image from "next/image";

/**
 * Photo sitting on an offset lavender→pink gradient block, as used on the
 * About page (intro + "Why Choose Launch Laundry" sections).
 */
export default function ImageFrame({ src, alt, priority = false }) {
  return (
    <div className="relative">
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-6 bottom-6 rounded-3xl bg-gradient-to-r from-violet-200 via-violet-100 to-pink-100 sm:top-8 sm:bottom-8"
      />
      <div className="relative mx-auto w-[88%] overflow-hidden rounded-2xl bg-white p-2.5 shadow-[0_18px_45px_rgba(20,35,70,.12)] sm:p-3">
        <Image
          src={src}
          alt={alt}
          width={760}
          height={506}
          priority={priority}
          className="h-auto w-full rounded-xl object-cover"
          sizes="(max-width: 1024px) 100vw, 560px"
        />
      </div>
    </div>
  );
}
