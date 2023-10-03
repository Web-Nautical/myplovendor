/* eslint-disable */
// assets
import { IconDashboard } from '@tabler/icons';

// constant
const icons = { IconDashboard };

// ==============================|| DASHBOARD MENU ITEMS ||============================== //

const dashboard = {
    id: 'dashboard',
    title: 'Dashboard',
    type: 'group',
    children: [
        {
            id: 'introduction',
            title: 'Introduction',
            type: 'item',
            url: '/introduction',
            icon: icons.IconDashboard,
            breadcrumbs: false
        },
        {
            id: 'default',
            title: 'Dashboard',
            type: 'item',
            url: '/',
            icon: icons.IconDashboard,
            breadcrumbs: false
        },
      
        
    ]
};

export default dashboard;
