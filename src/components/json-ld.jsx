/**
 * Renders schema.org structured data. Server component: the JSON is part of the
 * initial HTML, which is what crawlers read.
 */
export function JsonLd({ data }) {
  // Escape "<" so a string in the data can never close the script tag.
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }}
    />
  );
}
