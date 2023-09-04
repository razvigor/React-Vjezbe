import { useContext } from 'react';
import CartContext from '../context/cart/CartContext';

import PropTypes from 'prop-types';

const CartItem = ({ item }) => {
	const { removeItem } = useContext(CartContext);

	return (
		<li className='flex border-b border-gray-400 justify-between'>
			<img src={item.thumbnail} alt={item.title} width='80' />
			<div>
				{item.title} {`${item.price} $`}
			</div>
			<button className='CartItem__button' onClick={() => removeItem(item.id)}>
				Remove
			</button>
		</li>
	);
};

CartItem.propTypes = {
	item: PropTypes.object,
};

export default CartItem;
