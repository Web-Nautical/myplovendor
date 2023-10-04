// assets
import NearMeOutlinedIcon from '@mui/icons-material/NearMeOutlined';
import MessageOutlinedIcon from '@mui/icons-material/MessageOutlined';
import AssignmentOutlinedIcon from '@mui/icons-material/AssignmentOutlined';
import WalletOutlinedIcon from '@mui/icons-material/WalletOutlined';
import CardGiftcardOutlinedIcon from '@mui/icons-material/CardGiftcardOutlined';
import { Accessibility } from '@mui/icons-material';

// ==============================|| UTILITIES MENU ITEMS ||============================== //

const utilities = {
    id: 'utilities',
    title: 'Pages',
    type: 'group',
    children: [
        {
            id: 'gigs',
            title: 'Services',
            type: 'collapse',
            icon: NearMeOutlinedIcon,
            children: [
                {
                    id: 'addgigs',
                    title: 'Add Services',
                    type: 'item',
                    url: '/gigs/addgigs',
                    breadcrumbs: false
                },
                {
                    id: 'material-icons',
                    title: 'Current Services',
                    type: 'item',
                    url: '/gigs/viewgigs',
                    breadcrumbs: false
                }
            ]
        },

        {
            id: 'util-color',
            title: 'Message',
            type: 'item',
            url: '/utils/chat',
            icon: MessageOutlinedIcon,
            breadcrumbs: false
        },
        {
            id: 'util-shadow',
            title: 'Bookings',
            type: 'item',
            url: '/utils/sales',
            icon: AssignmentOutlinedIcon,
            breadcrumbs: false
        },
        {
            id: 'util-typography',
            title: 'Payments',
            type: 'item',
            url: '/utils/payments',
            icon: WalletOutlinedIcon,
            breadcrumbs: false
        },
        {
            id: 'util',
            title: 'Membership',
            type: 'item',
            url: '/utils/membership',
            icon: CardGiftcardOutlinedIcon,
            breadcrumbs: false
        },
        {
            id: 'util-intro',
            title: 'Introduction',
            type: 'item',
            url: '/introduction',
            icon: Accessibility,
            breadcrumbs: false
        }
    ]
};

export default utilities;
