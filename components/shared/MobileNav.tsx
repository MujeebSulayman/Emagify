import React from 'react';
import {
	Sheet,
	SheetContent,
	SheetDescription,
	SheetHeader,
	SheetTitle,
	SheetTrigger,
} from '@/components/ui/sheet';
import Link from 'next/link';
import Image from 'next/image';
import { SignedIn, UserButton } from '@clerk/nextjs';

const MobileNav = () => {
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
				<h2 className='text-2xl font-bold text-primary'>Emagify</h2>
			</Link>
			<nav className=' flex gap-2'>
				<SignedIn>
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
							<SheetHeader>
								<SheetTitle>Are you absolutely sure?</SheetTitle>
								<SheetDescription>
									This action cannot be undone. This will permanently delete
									your account and remove your data from our servers.
								</SheetDescription>
							</SheetHeader>
						</SheetContent>
					</Sheet>
				</SignedIn>
			</nav>
		</header>
	);
};

export default MobileNav;
