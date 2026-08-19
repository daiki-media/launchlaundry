/**
 * The article itself.
 *
 * The HTML comes from WordPress and has already been cleaned and rewritten by
 * src/lib/wpHtml.js at build time — links pulled onto this domain, empty
 * headings dropped, anchors added, images made lazy. Styling lives in the
 * `.post-body` rules in src/app/globals.css so the WordPress markup does not
 * need a class on every element.
 */
export default function PostBody({ html }) {
  return (
    <div className="post-body" dangerouslySetInnerHTML={{ __html: html }} />
  );
}
