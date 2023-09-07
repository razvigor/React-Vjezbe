import { useState, useContext } from 'react';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Categories from '../components/Categories';
import CartContext from '../context/cart/CartContext';

const Shop = () => {
	const [category, setCategory] = useState('smartphones');

	const { addToCart } = useContext(CartContext);

	const { isLoading, isError, error, data, isFetching } = useQuery({
		queryKey: ['products', 'category', category],
		queryFn: () =>
			axios
				.get(`https://dummyjson.com/products/category/${category}`)
				.then((res) => res.data.products),
	});

	if (isError)
		return (
			<div className='container mx-auto'>
				An error has occurred: {error.message}
			</div>
		);
	return (
		<div className='container mx-auto my-16 px-4 flex flex-wrap justify-between items-start'>
			<aside className='w-full lg:w-[20%]'>
				<Categories setState={setCategory} />
			</aside>
			<section className='w-full lg:w-[75%]'>
				{isLoading ? (
					<div className='container mx-auto text-2xl'>Loading...</div>
				) : (
					<>
						<h1 className='text-2xl md:text-4xl mb-6'>
							Shop - <span className='uppercase text-2xl'>{category}</span>
						</h1>
						{isFetching ? (
							<div className='text-2xl'>Updating...</div>
						) : (
							<div className='flex flex-wrap justify-between items-start gap-y-6'>
								{data.map((item) => (
									<article
										className='flex flex-col gap-y-5 border rounded-lg w-full md:w-[49%] lg:w-[32%] p-4'
										key={item.id}
									>
										<div className='w-full'>
											<img src={item.images[0]} alt={item.title} />
										</div>
										<div className='flex flex-col justify-between flex-1'>
											<div className='flex flex-col justify-between items-start'>
												<h2 className='text-xl'>{item.title}</h2>
												<p className='text-lg'>{item.brand}</p>
											</div>
											<div className='flex justify-between items-center my-3'>
												<span>Price: ${item.price}</span>
												<span>Rating: {item.rating}</span>
											</div>
											<div className='flex justify-between items-center'>
												<Link
													to={`${item.id}`}
													className='text-gray-800 flex items-center gap-x-3 group hover:text-green-500 transition-all duration-150'
												>
													See More{' '}
													<span className='relative group-hover:-right-2'>
														→
													</span>
												</Link>
												<button
													type='button'
													className='btn-dark max-w-[120px]'
													onClick={() => addToCart(item)}
												>
													Add To cart
												</button>
											</div>
										</div>
									</article>
								))}
							</div>
						)}
					</>
				)}
			</section>
		</div>
	);
};

export default Shop;
