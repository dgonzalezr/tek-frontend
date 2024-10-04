import React, { useCallback } from 'react';
import { useLocation, useMatch, useNavigate } from 'react-router-dom';
import { BqDivider, BqIcon, BqSideMenu, BqSideMenuItem } from '@beeq/react';

import { capitalize } from '../../../utils';
import { Categories, Category } from '../../../api/service.types';

const setCategoryIcon = (category: string): string => {
  const categoriesIconMap: { [key in Categories]: string } = {
    electronics: 'devices',
    jewelery: 'diamonds-four',
    "men's clothing": 't-shirt',
    "women's clothing": 'dress',
  };
  // Typescript does not allow to use dynamic keys in object, so we need to cast it to keyof typeof
  return categoriesIconMap[category as keyof typeof categoriesIconMap] ?? 'tag';
};

export const Menu: React.FC<{ categories: Category[] }> = ({ categories }) => {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const isActiveRoute = useCallback(
    (category: string): boolean => {
      // Remove leading slash from pathname
      const path = pathname.replace(/^\//, '');
      // Decode URI to handle special characters
      return decodeURI(path) === category;
    },
    [pathname],
  );

  return (
    <BqSideMenu>
      {/* Logo */}
      <div className="flex items-center gap-s py-6 pl-s" slot="logo">
        <img className="size-10" src="/logo.svg" alt="GizmoGlam store" />
        <h1 className="whitespace-nowrap text-xl">GizmoGlam</h1>
      </div>
      <BqDivider />
      {/* Static home menu item */}
      <BqSideMenuItem active={Boolean(useMatch('/'))} onBqClick={() => navigate('/')}>
        <BqIcon name="storefront" slot="prefix" />
        All Products
      </BqSideMenuItem>
      <BqDivider />
      {/* Dynamic menu items */}
      {categories.map((category) => (
        <BqSideMenuItem key={category} active={isActiveRoute(category)} onBqClick={() => navigate(category)}>
          <BqIcon name={setCategoryIcon(category)} slot="prefix" />
          {capitalize(category)}
        </BqSideMenuItem>
      ))}
    </BqSideMenu>
  );
};
