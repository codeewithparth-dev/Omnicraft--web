import { Helmet } from 'react-helmet-async';

/**
 * Reusable SEO component for managing document head.
 * Strictly follows user-provided titles and descriptions.
 */
export default function SEO({ title, description }) {
  const baseUrl = 'https://omnicraft.agency';
  // Note: Canonical and OG images are kept for best practices
  const image = '/logo.png';

  return (
    <Helmet>
      {/* Standard Metadata */}
      <title>{title}</title>
      <meta name="description" content={description} />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content="website" />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={`${baseUrl}${image}`} />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={`${baseUrl}${image}`} />
    </Helmet>
  );
}
