'use client';

import { useToast } from '../ui/use-toast';
import { CldImage, CldUploadWidget } from 'next-cloudinary';
import Image from 'next/image';

import { dataUrl, getImageSize } from '@/lib/utils';
import { PlaceholderValue } from 'next/dist/shared/lib/get-img-props';

type MediaUploaderProps = {
	onValueChange: (value: string) => void;
	setImage: React.Dispatch<any>;
	image: any;
	publicId: string;
	type: string;
};

const MediaUploader = ({
	onValueChange,
	setImage,
	image,
	publicId,
	type,
}: MediaUploaderProps) => {
	const { toast } = useToast();

	const onUploadSuccessHandler = (result: any) => {
		setImage((prevState: any) => ({
			...prevState,
			image: result?.info?.secure_url,
			publicId: result?.info?.public_id,
			height: result?.info?.height,
			width: result?.info?.width,
			secureUrl: result?.info?.secure_url,
		}));

		onValueChange(result?.info?.public_id);
		toast({
			title: 'Image uploaded successfully',
			description: '1 credit has been deducted from your account',
			duration: 5000,
			className: 'success-toast',
		});
	};

	const onUploadErrorHandler = () => {
		toast({
			title: 'Image upload failed',
			description: 'Please try again',
			duration: 5000,
			className: 'error-toast',
		});
	};

	return (
		<CldUploadWidget
			options={{
				sources: ['local', 'unsplash', 'camera'],
			}}
			uploadPreset='TheEmagify'
			// options={{ multiple: false, resourceType: 'image' }}
			onSuccess={onUploadSuccessHandler}
			onError={onUploadErrorHandler}>
			{({ open }) => (
				<div className='flex flex-col gap-4'>
					<h3 className='h3-bold text-dark-600'>Before</h3>
					{publicId ? (
						<>
							<div className='curso-pointer overflow-hidden rounded-[10px]'>
								<CldImage
									width={getImageSize(type, image, 'width')}
									height={getImageSize(type, image, 'height')}
									src={publicId}
									alt='Image'
									sizes={'(max-width: 768px) 100vw, 50vw'}
									placeholder={dataUrl as PlaceholderValue}
									className='media-uploader_cldImage'
								/>
							</div>
						</>
					) : (
						<div
							className='media-uploader_cta'
							onClick={() => open()}>
							<div className='media-uploader_cta-image'>
								<Image
									src='/assets/icons/add.svg'
									alt='Upload Image'
									width={24}
									height={24}
								/>
							</div>
							<p className='p-14-medium text-dark-600'>
								Click here to upload an image
							</p>
						</div>
					)}
				</div>
			)}
		</CldUploadWidget>
	);
};

export default MediaUploader;
