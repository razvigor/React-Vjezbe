import { useReducer } from 'react';
import CartContext from './CartContext';
import CartReducer from './CartReducer';
import { SHOW_HIDE_CART, ADD_TO_CART, REMOVE_ITEM } from '../Types';
import PropTypes from 'prop-types';

const CartState = ({ children }) => {
	const initalState = {
		showCart: false,
		cartItems: [],
	};

	const [state, dispatch] = useReducer(CartReducer, initalState);

	const addToCart = (item) => {
		dispatch({ type: ADD_TO_CART, payload: item });
	};

	const showHideCart = () => {
		dispatch({ type: SHOW_HIDE_CART });
	};

	const removeItem = (id) => {
		dispatch({ type: REMOVE_ITEM, payload: id });
	};

	return (
		<CartContext.Provider
			value={{
				showCart: state.showCart,
				cartItems: state.cartItems,
				addToCart,
				showHideCart,
				removeItem,
			}}
		>
			{children}
		</CartContext.Provider>
	);
};

CartState.propTypes = {
	children: PropTypes.node,
};
export default CartState;
