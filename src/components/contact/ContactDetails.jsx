import Image from "next/image";
import { details } from "@/data/contact";

export default function ContactDetails() {
  return (
    <section aria-label="Contact details" className="bg-white">
      <div className="mx-auto grid max-w-6xl gap-8 px-5 py-14 sm:grid-cols-2 lg:grid-cols-4">
        {details.map((item) => (
          <div key={item.title}>
            <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-violet-100/70 p-2.5">
              <Image src={item.icon} alt="" width={28} height={28} className="h-7 w-7" />
            </span>
            <h3 className="mt-4 text-base font-bold text-navy">{item.title}</h3>
            <div className="mt-2 space-y-1">
              {(item.links ?? item.lines.map((l) => ({ label: l }))).map((line) => (
                <p key={line.label} className="text-sm leading-relaxed text-body">
                  {line.href ? (
                    <a href={line.href} className="transition hover:text-brand">
                      {line.label}
                    </a>
                  ) : (
                    line.label
                  )}
                </p>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
