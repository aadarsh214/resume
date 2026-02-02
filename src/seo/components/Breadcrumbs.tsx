import type { BreadcrumbItem } from '../core/types'

interface BreadcrumbsProps {
  items: BreadcrumbItem[]
  className?: string
}

export function Breadcrumbs({ items, className = '' }: BreadcrumbsProps) {
  if (!items || items.length <= 1) {
    return null
  }

  return (
    <nav className={`flex items-center space-x-2 text-sm text-gray-600 ${className}`} aria-label="Breadcrumb">
      {items.map((item, index) => (
        <div key={item.url} className="flex items-center">
          {index > 0 && (
            <svg
              className="mx-2 h-4 w-4 text-gray-400"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                clipRule="evenodd"
              />
            </svg>
          )}
          
          {index === items.length - 1 ? (
            <span className="font-medium text-gray-900" aria-current="page">
              {item.name}
            </span>
          ) : (
            <a
              href={item.url}
              className="hover:text-gray-900 transition-colors"
            >
              {item.name}
            </a>
          )}
        </div>
      ))}
    </nav>
  )
}

// Schema.org structured data for breadcrumbs
export function BreadcrumbSchema({ items }: { items: BreadcrumbItem[] }) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url
    }))
  }

  return (
    <script type="application/ld+json">
      {JSON.stringify(schema)}
    </script>
  )
}
