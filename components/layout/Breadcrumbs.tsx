'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { ChevronRight, Home } from 'lucide-react';

interface BreadcrumbItem {
  label: string;
  href: string;
  isLast: boolean;
}

export default function Breadcrumbs() {
  const pathname = usePathname();
  
  // Generate breadcrumb items from pathname
  const generateBreadcrumbs = (): BreadcrumbItem[] => {
    const pathSegments = pathname.split('/').filter(Boolean);
    
    const breadcrumbs: BreadcrumbItem[] = [
      { label: 'Dashboard', href: '/dashboard', isLast: pathSegments.length === 0 }
    ];
    
    let currentPath = '';
    pathSegments.forEach((segment, index) => {
      currentPath += `/${segment}`;
      const isLast = index === pathSegments.length - 1;
      
      // Skip numeric IDs (like user IDs, goal IDs)
      if (/^\d+$/.test(segment)) {
        return;
      }
      
      // Format label
      const label = segment
        .split('-')
        .map(word => {
          // Handle special cases
          const specialCases: Record<string, string> = {
            'my': 'My',
            'hr': 'HR',
            'ceo': 'CEO',
            'id': 'Details',
          };
          return specialCases[word] || word.charAt(0).toUpperCase() + word.slice(1);
        })
        .join(' ');
      
      // Skip certain segments
      if (segment === 'dashboard' && index === 0) return;
      
      breadcrumbs.push({
        label,
        href: currentPath,
        isLast,
      });
    });
    
    return breadcrumbs;
  };
  
  const breadcrumbs = generateBreadcrumbs();
  
  return (
    <nav className="flex items-center gap-2" aria-label="Breadcrumb">
      {breadcrumbs.map((item, index) => (
        <div key={item.href} className="flex items-center gap-2">
          {index === 0 ? (
            <Link
              href={item.href}
              className="flex items-center gap-2 text-gray-500 hover:text-primary transition-colors"
            >
              <Home className="h-4 w-4" />
              {!item.isLast && <span className="hidden sm:inline">{item.label}</span>}
            </Link>
          ) : (
            <>
              <ChevronRight className="h-4 w-4 text-gray-400" />
              {item.isLast ? (
                <span className="text-sm font-medium text-gray-900">
                  {item.label}
                </span>
              ) : (
                <Link
                  href={item.href}
                  className="text-sm text-gray-500 hover:text-primary transition-colors"
                >
                  {item.label}
                </Link>
              )}
            </>
          )}
        </div>
      ))}
    </nav>
  );
}