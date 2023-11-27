import {
    HiOutlineViewGrid,
    HiOutlineCube,
    HiOutlineShoppingCart,
    HiOutlineUsers,
    HiOutlineAnnotation,
    HiOutlineCog
} from 'react-icons/hi'


export const DASHBOARD_SIDEBAR_LINKS = [
    {
        key: 'dashboard',
        label: 'Dashboard',
        path: '/admin',
        icon: <HiOutlineViewGrid />
    },
    {
        key: 'courses',
        label: 'Courses',
        path: '/course',
        icon: <HiOutlineCube />
    },
    {
        key: 'subcriptions',
        label: 'Subcriptions',
        path: '/subcription',
        icon: <HiOutlineShoppingCart />
    },
    {
        key: 'customers',
        label: 'Customers',
        path: '/customers',
        icon: <HiOutlineUsers />
    },
    {
        key: 'notifications',
        label: 'Notifications',
        path: '/notifications',
        icon: <HiOutlineAnnotation />
    }
]
export const DASHBOARD_SIDEBAR_BOTTOM_LINKS = [
    {
        key: 'profile',
        label: 'Profile',
        path: '/profile',
        icon: <HiOutlineCog />
    }
]
export const DASHBOARD_SIDEBAR_INSTRUCTOR_LINKS = [

    {
        key: 'courses',
        label: 'Courses',
        path: '/instructor/course',
        icon: <HiOutlineCube />
    },
    {
        key: 'assignments',
        label: 'Assignments',
        path: '/instructor/assignment',
        icon: <HiOutlineCube />
    }
]
