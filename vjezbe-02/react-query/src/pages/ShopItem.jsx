import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const ShopItem = () => {
	const { id } = useParams();
	const { isLoading, isError, error, data, isFetching } = useQuery({
		queryKey: ['shopItem'],
		queryFn: () =>
			axios.get(`https://dummyjson.com/products/${id}`).then((res) => res.data),
	});

	if (isLoading) return <div className='container mx-auto'>Loading...</div>;

	if (isError)
		return (
			<div className='container mx-auto'>
				An error has occurred: {error.message}
			</div>
		);

	return (
		<div className='container mx-auto flex flex-col justify-center items-center my-24'>
			<h1 className='text-3xl md:text-4xl mb-12'>{data.title}</h1>
			<div className='flex flex-col border overflow-hidden rounded-xl'>
				<div className='w-full'>
					<img src={data.thumbnail} alt={data.title} />
				</div>
			</div>
			<div>{isFetching ? 'Updating...' : ''}</div>
		</div>
	);
};

export default ShopItem;
