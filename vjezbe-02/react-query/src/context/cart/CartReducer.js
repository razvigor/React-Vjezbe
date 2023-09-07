import {
	SHOW_HIDE_CART,
	ADD_TO_CART,
	REMOVE_ITEM,
	INCREMENT_QTY,
	DECREMENT_QTY,
	ADD_QTY,
	CLEAR_CART,
} from '../Types';

const CartReducer = (state, action) => {
	switch (action.type) {
		case SHOW_HIDE_CART: {
			return {
				...state,
				showCart: !state.showCart,
			};
		}
		case ADD_TO_CART: {
			return {
				...state,
				cartItems: [...state.cartItems, { ...action.payload, qty: 1 }],
			};
		}
		case REMOVE_ITEM: {
			return {
				...state,
				cartItems: state.cartItems.filter((item) => item.id !== action.payload),
			};
		}
		case INCREMENT_QTY: {
			const cartItem = state.cartItems.find(
				(item) => item.id === action.payload
			);
			cartItem.qty = cartItem.qty + 1;

			return {
				...state,
				carttItems: [...state.cartItems, cartItem],
			};
		}
		case DECREMENT_QTY: {
			const cartItem = state.cartItems.find(
				(item) => item.id === action.payload
			);

			if (cartItem.qty <= 1) return state;

			cartItem.qty = cartItem.qty - 1;
			return {
				...state,
				carttItems: [...state.cartItems, cartItem],
			};
		}
		case ADD_QTY: {
			const cartItem = state.cartItems.find(
				(item) => item.id === action.payload.id
			);
			cartItem.qty = action.payload.qty;
			return {
				...state,
				carttItems: [...state.cartItems, cartItem],
			};
		}
		case CLEAR_CART: {
			return {
				...state,
				cartItems: [],
			};
		}

		default:
			throw new Error(`Unhandled action type: ${action.type}`);
	}
};

export default CartReducer;
