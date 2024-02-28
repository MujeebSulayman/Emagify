import { Toaster } from '@/components/ui/toaster';
import { useToast } from '../ui/use-toast';
import { CldUploadWidget } from 'next-cloudinary';
import Image from 'next/image';

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
						<>HERE IS THE IMAGE</>
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
                                <p className='p-14-medium text-dark-600'>Click here to upload an image</p>
						</div>
					)}
				</div>
			)}
		</CldUploadWidget>
	);
};

export default MediaUploader;