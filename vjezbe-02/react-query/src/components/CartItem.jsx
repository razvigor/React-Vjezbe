import { useContext } from 'react';
import CartContext from '../context/cart/CartContext';

import PropTypes from 'prop-types';

const CartItem = ({ item }) => {
	const { removeItem, increment, decrement, addQty } = useContext(CartContext);

	return (
		<li className='flex border-b justify-between w-full items-center'>
			<div className='flex flex-col items-center py-2 max-w-[80px]'>
				<img src={item.images[0]} alt={item.title} width='80' />
				<p className='text-xs my-1'>{item.title}</p>
				<p className='text-md font-semibold'>{`${item.price.toFixed(2)}$`}</p>
			</div>
			<div className='flex justify-between border border-gray-600 dark:border-gray-200 h-[42px]'>
				<button
					className='bg-gray-800 text-gray-200 text-2xl py-1 px-2 text-center flex justify-center items-center'
					onClick={() => decrement(item.id)}
				>
					<svg
						xmlns='http://www.w3.org/2000/svg'
						fill='none'
						viewBox='0 0 24 24'
						strokeWidth={1.5}
						stroke='currentColor'
						className='w-6 h-6'
					>
						<path
							strokeLinecap='round'
							strokeLinejoin='round'
							d='M19.5 12h-15'
						/>
					</svg>
				</button>

				<input
					type='text'
					name='qty'
					value={item.qty}
					onChange={(e) => addQty(item.id, parseFloat(e.target.value) || 0)}
					className='bg-gray-100 text-gray-900 width w-[35px] text-center text-xl'
				/>

				<button
					className='bg-gray-800 text-gray-200 text-2xl py-1 px-2 text-center flex justify-center items-center'
					onClick={() => increment(item.id)}
				>
					<svg
						xmlns='http://www.w3.org/2000/svg'
						fill='none'
						viewBox='0 0 24 24'
						strokeWidth={1.5}
						stroke='currentColor'
						className='w-6 h-6'
					>
						<path
							strokeLinecap='round'
							strokeLinejoin='round'
							d='M12 4.5v15m7.5-7.5h-15'
						/>
					</svg>
				</button>
			</div>
			<button
				className='bg-red-500 text-white w-8 h-8 rounded-md'
				onClick={() => removeItem(item.id)}
			>
				X
			</button>
		</li>
	);
};

CartItem.propTypes = {
	item: PropTypes.object,
};

export default CartItem;
