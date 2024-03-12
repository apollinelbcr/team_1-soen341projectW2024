import HomeIcon from './icons/HomeIcon.svelte';
import UserIcon from './icons/UserIcon.svelte';
import VehicleIcon from './icons/VehicleIcon.svelte';
import ReservationIcon from './icons/ReservationIcon.svelte';
import ReportsIcon from './icons/ReportsIcon.svelte';
import SettingsIcon from './icons/SettingsIcon.svelte';
import DocumentationIcon from './icons/DocumentationIcon.svelte';
import LogoutIcon from './icons/LogoutIcon.svelte';

export const data = [
	{
		section: 'Section 1',
		content: [
			{
				title: 'Dashboard',
				icon: HomeIcon,
				link: '/'
			}
			
		]
	},
	{
		section: 'Section 2',
		content: [
			{
				title: 'Users',
				icon: UserIcon,
				link: '/admin/users'
			},
			{
				title: 'Vehicles',
				icon: VehicleIcon,
				link: '/admin/vehicles'
			},
			{
				title: 'Reservations',
				icon: ReservationIcon,
				link: '/admin/reservations'
			}
		]
	},
	{
		section: 'Section 3',
		content: [
			{
				title: 'Reports',
				icon: ReportsIcon,
				link: '/admin/reports'
			},
			{
				title: 'Settings',
				icon: SettingsIcon,
				link: '/admin/settings'
			},
			{
				title: 'Source',
				icon: DocumentationIcon,
				link: '/admin/source'
			},
			{
				title: 'Logout',
				icon: LogoutIcon,
				link: '/admin/logout'
			}
		]
	}
];
