'use client';

import React from 'react';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import Link from 'next/link';
import Image from 'next/image';
import { SignedIn, SignedOut, UserButton, auth } from '@clerk/nextjs';
import { navLinks } from '@/constants';
import { redirect, usePathname } from 'next/navigation';
import { Button } from '../ui/button';
// import { getUserById } from '@/lib/actions/user.actions';

// const { userId } = auth();

// if (!userId) redirect('/sign-in');

const MobileNav = async () => {
	// const user = await getUserById(userId);
	const pathname = usePathname();
	return (
		<header className='header'>
			<Link
				href='/'
				className='flex items-center gap-2 md:py-2'>
				{/* <Image 
                    src='/assets/images/logo-text.svg'
                    alt='logo'
                    width={180}
                    height={30}
                    /> */}
				<h2 className='text-2xl font-bold text-gray-600'>Emagify</h2>
			</Link>
			<nav className=' flex gap-2'>
				<SignedIn>
					<div className='flex gap-2'>
						<Image
							src='/assets/icons/coins.svg'
							alt='coins'
							width={50}
							height={50}
							className='size-9 md:size-12'
						/>
						{/* <h3 className='text-gray-700 m-2'>{user.creditBalance} Credits</h3> */}
					</div>
					<UserButton afterSignOutUrl='/' />
					<Sheet>
						<SheetTrigger>
							<Image
								src='/assets/icons/menu.svg'
								alt='menu'
								width={32}
								height={32}
								className='cursor-pointer'
							/>
						</SheetTrigger>
						<SheetContent className='sheet-content sm:w-64'>
							<>
								{/* <Image src='/assets/images/logo-text.svg' alt='logo' width={180} height={30} /> */}
								<h2 className='text-2xl font-bold text-gray-700'>Emagify</h2>
							</>

							<ul className='header-nav_elements'>
								{navLinks.map((link) => {
									const isActive = link.route === pathname;
									return (
										<li
											key={link.route}
											className={`${
												isActive && 'gradient-text'
											} p-18 flex whitespace-nowrap text-dark-700`}>
											<Link
												href={link.route}
												className='sidebar-link cursor-pointer'>
												<Image
													src={link.icon}
													alt='logo'
													width={24}
													height={24}
												/>
												{link.label}
											</Link>
										</li>
									);
								})}
							</ul>
						</SheetContent>
					</Sheet>
				</SignedIn>

				<SignedOut>
					<div className='flex gap-2'>
						<Button
							asChild
							className='button bg-gray-700 bg-cover'>
							<Link href='/sign-in'>Login</Link>
						</Button>
						<Button
							asChild
							className='button bg-gray-700 bg-cover'>
							<Link href='/sign-up'>Sign Up</Link>
						</Button>
					</div>
				</SignedOut>
			</nav>
		</header>
	);
};

export default MobileNav;

	