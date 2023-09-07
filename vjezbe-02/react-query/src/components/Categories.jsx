import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import PropTypes from 'prop-types';

const Categories = ({ setState }) => {
	const { isLoading, isError, error, data, isFetching } = useQuery({
		queryKey: ['categories'],
		queryFn: () =>
			axios
				.get('https://dummyjson.com/products/categories')
				.then((res) => res.data),
	});
	if (isLoading) return <div className='container mx-auto'>Loading...</div>;

	if (isError)
		return (
			<div className='container mx-auto'>
				An error has occurred: {error.message}
			</div>
		);
	return (
		<div>
			<h2 className='text-2xl md:text-3xl mb-6'>Categories</h2>
			{isFetching ? <div className='text-2xl'>Updating...</div> : null}
			<ul className='flex flex-col gap-y-3'>
				{data.map((item, key) => (
					<li key={key}>
						<button onClick={() => setState(() => item)} className='uppercase'>
							{item}
						</button>
					</li>
				))}
			</ul>
		</div>
	);
};
Categories.propTypes = {
	setState: PropTypes.func,
};
export default Categories;
