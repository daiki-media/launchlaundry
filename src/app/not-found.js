import PageHero from "@/components/layout/PageHero";
import NotFoundPanel from "@/components/layout/NotFoundPanel";
import CtaBanner from "@/components/ui/CtaBanner";
import { pageHero, cta } from "@/data/notFound";

// Next.js serves this for unmatched URLs and for notFound() thrown in any route
// segment. It renders inside the root layout, so Header/Footer come for free.
// No metadata export here — Next.js injects `noindex` on 404 responses itself,
// and only global-not-found.js supports a metadata export.
export default function NotFound() {
  return (
    <>
      <PageHero title={pageHero.title} breadcrumb={pageHero.breadcrumb} />
      <NotFoundPanel />
      <CtaBanner
        title={cta.title}
        description={cta.description}
        button={cta.button}
        variant="light"
      />
    </>
  );
}
