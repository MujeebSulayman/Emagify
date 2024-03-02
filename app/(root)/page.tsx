import { Collection } from '@/components/shared/Collection';
import { navLinks } from '@/constants';
import { getAllImages } from '@/lib/actions/image.actions';
import { getUserById } from '@/lib/actions/user.actions';
import { auth } from '@clerk/nextjs';
import Image from 'next/image';
import { redirect } from 'next/navigation';
import Link from 'next/link';


const Home = async ({ searchParams }: SearchParamProps) => {
	const page = Number(searchParams?.page) || 1;
	const searchQuery = (searchParams?.query as string) || '';
	const {userId } = auth();

	if (!userId) redirect('/sign-in');
	const user = await getUserById(userId);
	const images = await getAllImages({ page, searchQuery });
	

	return (
		<>
			<section className='home'>
				<h1 className='home-heading'>
					Unleash Your Creative Vision with Emagify
				</h1>

				<ul className='flex-center w-full gap-10'>
					{' '}
					{/* Adjusted the gap */}
					{navLinks.slice(1, 5).map((link) => (
						<Link
							key={link.route}
							href={link.route}
							className='flex-center flex-col gap-2'>
							<li className='flex-center w-fit rounded-full bg-white p-2'>
								{' '}
								{/* Adjusted padding */}
								<Image
									src={link.icon}
									alt='image'
									width={24}
									height={24}
								/>
							</li>
							<p className='p-8-medium text-center text-white'>{link.label}</p>{' '}
							{/* Adjusted padding */}
						</Link>
					))}
				</ul>
			</section>

			<section className='sm:mt-12'>
				<Collection
					hasSearch={true}
					images={images?.data}
					totalPages={images?.totalPage}
					page={page}
				/>
			</section>
		</>
	);
};

export default Home;



