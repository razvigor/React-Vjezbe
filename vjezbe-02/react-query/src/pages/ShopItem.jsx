import { useMemo, useContext } from 'react';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import CartContext from '../context/cart/CartContext';
import ReactStars from 'react-rating-stars-component';
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/navigation';

import { Navigation } from 'swiper/modules';

const ShopItem = () => {
	const { id } = useParams();
	const { isLoading, isError, error, data, isFetching } = useQuery({
		queryKey: ['shopItem'],
		queryFn: () =>
			axios.get(`https://dummyjson.com/products/${id}`).then((res) => res.data),
	});
	const { addToCart } = useContext(CartContext);
	const rating = useMemo(() => {
		return Math.round(data?.rating);
	}, [data?.rating]);

	if (isLoading) return <div className='container mx-auto'>Loading...</div>;

	if (isError)
		return (
			<div className='container mx-auto'>
				An error has occurred: {error.message}
			</div>
		);

	return (
		<div className='container mx-auto flex flex-col justify-center items-center py-24'>
			<h1 className='text-3xl md:text-4xl mb-12'>{data.title}</h1>
			{isFetching ? (
				<div className='text-4xl'>Updating...</div>
			) : (
				<div className='flex flex-col p-3 border max-w-xl overflow-hidden rounded-xl'>
					<div className='w-full mb-3'>
						<Swiper
							spaceBetween={10}
							slidesPerView={1}
							navigation={true}
							modules={[Navigation]}
						>
							{data.images.map((item, key) => (
								<SwiperSlide key={key}>
									<img src={item} alt={data.title} className='w-full' />
								</SwiperSlide>
							))}
						</Swiper>
					</div>
					<div className='w-full flex flex-col gap-y-3'>
						<div className='flex justify-between items-center'>
							<h2 className='text-xl'>
								Brand:{' '}
								<span className='font-semibold text-green-600'>
									{data.brand}
								</span>
							</h2>
							<ReactStars
								count={5}
								size={24}
								activeColor='#ffd700'
								value={rating}
								edit={false}
							/>
						</div>
						<p className='text-gray-500'>{data.description}</p>
						<p className='text-lg'>Price: {data.price}$</p>
						<button
							type='button'
							className='btn-dark'
							onClick={() => addToCart(data)}
						>
							Add To cart
						</button>
					</div>
				</div>
			)}
		</div>
	);
};

export default ShopItem;
