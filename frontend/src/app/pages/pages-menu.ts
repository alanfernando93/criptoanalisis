import { MenuItem } from './menu-item';

export const MENU_ITEMS: MenuItem[] = [{
  title: 'Dashboard',
  icon: 'nb-home',
  link: '/pages/dashboard',
  home: true,
  key: 'dashboard',
},
{
  title: 'Asesoria Principiantes',
  icon: 'nb-compose',
  link: '/pages/dashboard',
  home: true,
  key: 'advice',
}, {
  title: 'Tutoriales',
  icon: 'nb-home',
  link: '/pages/dashboard',
  home: true,
  key: 'tutorials',
}, {
  title: 'Eventos',
  icon: 'nb-edit',
  link: '/pages/dashboard',
  home: true,
  key: 'events',
}, {
  title: 'Gane $CA tokens',
  icon: 'nb-audio',
  link: '/pages/dashboard',
  home: true,
  key: 'win',
}, {
  title: 'Nosotros',
  icon: 'nb-grid-a',
  link: '/pages/dashboard',
  home: true,
  key: 'us',
}, {
  title: 'FEATURES',
  group: true,
  key: 'group',
},
{
  title: 'Consultivo',
  icon: 'nb-layout-sidebar-right',
  key: 'advisory',
  children: [
    {
      title: 'Lista Consultas',
      link: '/pages/advisories/list',
      key: 'list',
    },
    {
      title: 'Asesor de Pestañas',
      link: '/pages/advisories/tab',
      key: 'tab',
    },
  ],
}, {
  title: 'Mercados',
  icon: 'nb-title',
  key: 'market',
  children: [
    {
      title: 'Lista de Mercados',
      link: '/pages/markets/list',
      key: 'list',
    },
  ],
}, {
  title: 'Moneda',
  icon: 'nb-plus-circled',
  key: 'coin',
  children: [
    {
      title: 'Vista',
      link: '/pages/coins/view',
      key: 'view',
    },
  ],
},
];
