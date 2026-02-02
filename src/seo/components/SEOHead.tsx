import { Helmet } from 'react-helmet-async'
import type { Metadata } from '../core/types'

interface SEOHeadProps {
  metadata: Metadata
  schemaData?: any[]
}

export function SEOHead({ metadata, schemaData }: SEOHeadProps) {
  return (
    <Helmet>
      {/* Basic Meta Tags */}
      <title>{metadata.title}</title>
      <meta name="description" content={metadata.description} />
      <meta name="keywords" content={metadata.keywords.join(', ')} />
      
      {/* Canonical URL */}
      <link rel="canonical" href={metadata.url} />
      
      {/* Robots */}
      {metadata.noindex && <meta name="robots" content="noindex" />}
      {metadata.nofollow && <meta name="robots" content="nofollow" />}
      {metadata.noindex && metadata.nofollow && <meta name="robots" content="noindex,nofollow" />}
      {!metadata.noindex && !metadata.nofollow && <meta name="robots" content="index,follow" />}
      
      {/* Open Graph */}
      <meta property="og:type" content={metadata.type} />
      <meta property="og:title" content={metadata.title} />
      <meta property="og:description" content={metadata.description} />
      <meta property="og:url" content={metadata.url} />
      <meta property="og:site_name" content={metadata.siteName} />
      <meta property="og:locale" content={metadata.locale} />
      
      {metadata.ogImage && (
        <>
          <meta property="og:image" content={metadata.ogImage.url} />
          {metadata.ogImage.width && <meta property="og:image:width" content={metadata.ogImage.width.toString()} />}
          {metadata.ogImage.height && <meta property="og:image:height" content={metadata.ogImage.height.toString()} />}
          {metadata.ogImage.alt && <meta property="og:image:alt" content={metadata.ogImage.alt} />}
          {metadata.ogImage.type && <meta property="og:image:type" content={metadata.ogImage.type} />}
        </>
      )}
      
      {/* Twitter Card */}
      <meta name="twitter:card" content={metadata.twitter.card} />
      {metadata.twitter.site && <meta name="twitter:site" content={metadata.twitter.site} />}
      {metadata.twitter.creator && <meta name="twitter:creator" content={metadata.twitter.creator} />}
      <meta name="twitter:title" content={metadata.title} />
      <meta name="twitter:description" content={metadata.description} />
      {metadata.ogImage && <meta name="twitter:image" content={metadata.ogImage.url} />}
      
      {/* Article specific */}
      {metadata.article && metadata.type === 'article' && (
        <>
          {metadata.article.publishedTime && (
            <meta property="article:published_time" content={metadata.article.publishedTime} />
          )}
          {metadata.article.modifiedTime && (
            <meta property="article:modified_time" content={metadata.article.modifiedTime} />
          )}
          {metadata.article.author && (
            <meta property="article:author" content={metadata.article.author} />
          )}
          {metadata.article.section && (
            <meta property="article:section" content={metadata.article.section} />
          )}
          {metadata.article.tags && metadata.article.tags.map(tag => (
            <meta key={tag} property="article:tag" content={tag} />
          ))}
        </>
      )}
      
      {/* Structured Data */}
      {schemaData && schemaData.map((schema, index) => (
        <script key={index} type="application/ld+json">
          {JSON.stringify(schema)}
        </script>
      ))}
    </Helmet>
  )
}
