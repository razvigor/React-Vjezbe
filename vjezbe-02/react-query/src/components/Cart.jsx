import { useContext, useState } from 'react';
import CartContext from '../context/cart/CartContext';
import UserContext from '../context/user/UserContext';

import CartItem from './CartItem';
const Cart = () => {
	const { showCart, cartItems, showHideCart, clearCart } =
		useContext(CartContext);
	const { token } = useContext(UserContext);
	const [message, setMessage] = useState('');

	const user = token ? JSON.parse(atob(token.split('.')[1])) : null;
	console.log(user);

	return (
		<>
			{showCart && (
				<div className='fixed w-full max-h-screen md:w-[50%] lg:w-[30%] bg-white z-50 top-0 right-0 px-2 pb-3 flex flex-col shadow-md rounded-lg overflow-y-auto'>
					<div className='flex justify-end py-2 border-b'>
						<svg
							xmlns='http://www.w3.org/2000/svg'
							fill='none'
							viewBox='0 0 24 24'
							strokeWidth={1.5}
							stroke='currentColor'
							className='w-8 h-8 cursor-pointer'
							onClick={showHideCart}
						>
							<path
								strokeLinecap='round'
								strokeLinejoin='round'
								d='M6 18L18 6M6 6l12 12'
							/>
						</svg>
					</div>
					<div className='w-full'>
						{cartItems.length === 0 ? (
							<h4 className='text-red-600 text-3xl mt-3 text-center font-semibold '>
								Cart is Empty
							</h4>
						) : (
							<ul className='w-full'>
								{cartItems.map((item) => (
									<CartItem key={item.id} item={item} />
								))}
							</ul>
						)}
					</div>
					<div className='flex flex-col gap-y-2 py-2'>
						<div className='text-md font-semibold '>Cart Total:</div>
						<div className='text-green-600 text-2xl'>
							{cartItems
								.reduce((acc, item) => acc + item.price * item.qty, 0)
								.toFixed(2)}
							$
						</div>
					</div>
					<div className='flex'>
						{token ? (
							<button
								type='button'
								disabled={!cartItems.length}
								onClick={() => {
									// console.log(
									// 	'Items: ' + JSON.stringify(cartItems),
									// 	'User: ' + user.user
									// );
									setMessage('You have successfully completed your purchase!');
									setTimeout(() => {
										setMessage('');
										clearCart();
									}, 3000);
								}}
								className='btn-dark disabled:bg-orange-300 disabled:text-gray-800'
							>
								{cartItems.length ? 'Buy' : 'Choose at least one product'}
							</button>
						) : (
							<p className='text-lg text-center'>
								Please login. Only a logged in user can make a purchase!
							</p>
						)}
					</div>
					<p className='text-green-500 text-center text-lg'>{message}</p>
				</div>
			)}
		</>
	);
};

export default Cart;
