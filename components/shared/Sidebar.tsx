'use client';

import { navLinks } from '@/constants';
import { SignedIn, SignedOut, UserButton } from '@clerk/nextjs';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Button } from '../ui/button';

const Sidebar = () => {
	const pathname = usePathname();
	return (
		<aside className='sidebar'>
			<div className='flex size-full flex-col gap-4'>
				<Link
					href='/'
					className='sidebar-logo'>
					{/* <Image
						src='/assets/images/logo-text.svg'
						alt='logo'
						width={180}
						height={280}
					/> */}
					<h2 className='text-2xl font-bold text-purple-gradient'>Emagify</h2>
				</Link>
				<nav className='sidebar-nav'>
					<SignedIn>
						<ul className='sidebar-nav_elements'>
							{navLinks.slice(0, 6).map((link) => {
								const isActive = link.route === pathname;
								return (
									<li
										key={link.route}
										className={`sidebar-nav_element hover:text-gray-700 ${
											isActive ? 'bg-gray-700 text-white' : 'text-gray-600'
										}`}>
										<Link
											href={link.route}
											className='sidebar-link'>
											<Image
												src={link.icon}
												alt='logo'
												width={24}
												height={24}
												className={`${isActive && 'brightness-900'}`}
											/>
											{link.label}
										</Link>
									</li>
								);
							})}
						</ul>
						<ul className='sidebar-nav_elements'>
							{navLinks.slice(6).map((link) => {
								const isActive = link.route === pathname;
								return (
									<li
										key={link.route}
										className={`sidebar-nav_element hover:text-gray-700 ${
											isActive ? 'bg-gray-700 text-white' : 'text-gray-600'
										}`}>
										<Link
											href={link.route}
											className='sidebar-link'>
											<Image
												src={link.icon}
												alt='logo'
												width={24}
												height={24}
												className={`${isActive && 'brightness-200'}`}
											/>
											{link.label}
										</Link>
									</li>
								);
							})}
							<li className='flex-center cursor-pointer gap-2 p-4'>
								<UserButton
									afterSignOutUrl='/'
									showName
								/>
							</li>
						</ul>
					</SignedIn>

					<SignedOut>
						<Button
							asChild
							className='button bg-gray-700 bg-cover'>
							<Link href='/sign-in'>Login</Link>
						</Button>
					</SignedOut>
				</nav>
			</div>
		</aside>
	);
};

export default Sidebar;
