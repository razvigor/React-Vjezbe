import { useReducer } from 'react';
import CartContext from './CartContext';
import CartReducer from './CartReducer';
import {
	SHOW_HIDE_CART,
	ADD_TO_CART,
	REMOVE_ITEM,
	INCREMENT_QTY,
	DECREMENT_QTY,
	ADD_QTY,
	CLEAR_CART,
} from '../Types';
import PropTypes from 'prop-types';

const CartState = ({ children }) => {
	const initalState = {
		showCart: false,
		cartItems: [],
	};

	const [state, dispatch] = useReducer(CartReducer, initalState);

	const addToCart = (item) => {
		if (state.cartItems.some((cartItem) => cartItem.id === item.id)) return;
		dispatch({ type: ADD_TO_CART, payload: item });
	};

	const showHideCart = () => {
		dispatch({ type: SHOW_HIDE_CART });
	};

	const removeItem = (id) => {
		dispatch({ type: REMOVE_ITEM, payload: id });
	};
	const increment = (id) => {
		dispatch({ type: INCREMENT_QTY, payload: id });
	};
	const decrement = (id) => {
		//console.log(initalState);
		dispatch({ type: DECREMENT_QTY, payload: id });
	};
	const addQty = (id, qty) => {
		dispatch({ type: ADD_QTY, payload: { id, qty } });
	};
	const clearCart = () => {
		dispatch({ type: CLEAR_CART });
	};

	return (
		<CartContext.Provider
			value={{
				showCart: state.showCart,
				cartItems: state.cartItems,
				addToCart,
				showHideCart,
				removeItem,
				increment,
				decrement,
				addQty,
				clearCart,
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
