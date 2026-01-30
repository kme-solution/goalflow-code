// components/layout/Sidebar/MenuItem.tsx
'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ChevronDown, ChevronRight } from 'lucide-react';
import type { MenuItem as MenuItemType } from '@/lib/menu-config';

interface MenuItemProps {
  item: MenuItemType;
  userRole: string;
  level?: number;
}

export default function MenuItem({ item, userRole, level = 0 }: MenuItemProps) {
  const pathname = usePathname();
  const [isExpanded, setIsExpanded] = useState(false);
  
  const hasChildren = item.items && item.items.length > 0;
  const isActive = item.href ? pathname === item.href || pathname.startsWith(item.href + '/') : false;
  
  const handleClick = (e: React.MouseEvent) => {
    if (hasChildren && !item.href) {
      e.preventDefault();
      setIsExpanded(!isExpanded);
    }
  };
  
  const paddingLeft = level === 0 ? 'pl-0' : level === 1 ? 'pl-8' : 'pl-12';
  
  const content = (
    <div className={`flex items-center justify-between rounded-lg p-3 transition-colors ${
      isActive ? 'bg-blue-600 text-white' : 'hover:bg-gray-800'
    }`}>
      <div className="flex items-center space-x-3">
        <span className="text-lg">{item.icon ? <item.icon /> : null}</span>
        <span className="font-medium">{item.label}</span>
      </div>
      {hasChildren && (
        <span className="text-gray-400">
          {isExpanded ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
        </span>
      )}
      {item.badge && (
        <span className={`ml-2 rounded-full px-2 py-1 text-xs font-semibold ${
          isActive ? 'bg-white text-blue-600' : 'bg-blue-600 text-white'
        }`}>
          {item.badge}
        </span>
      )}
    </div>
  );
  
  return (
    <div className={`${paddingLeft} space-y-1`}>
      {item.href ? (
        <Link href={item.href} onClick={handleClick}>
          {content}
        </Link>
      ) : (
        <button onClick={handleClick} className="w-full text-left">
          {content}
        </button>
      )}
      
      {hasChildren && isExpanded && (
        <div className="mt-1 space-y-1">
          {item.items!.map((child) => (
            <MenuItem 
              key={child.id} 
              item={child} 
              userRole={userRole} 
              level={level + 1} 
            />
          ))}
        </div>
      )}
    </div>
  );
}