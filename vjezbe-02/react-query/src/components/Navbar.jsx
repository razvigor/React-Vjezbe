import { useContext } from 'react';
import { NavLink, Link } from 'react-router-dom';
import CartContext from '../context/cart/CartContext';
import { ShoppingCartIcon } from '@heroicons/react/24/outline';

const Navbar = () => {
	const { cartItems, showHideCart } = useContext(CartContext);
	return (
		<nav className='bg-gray-900'>
			<div className='container mx-auto flex justify-between h-24 items-center'>
				<div className='text-slate-200'>
					<Link to='/'>Logo</Link>
				</div>
				<ul className='flex gap-x-3 text-lg'>
					<li>
						<NavLink
							to='/'
							className={({ isActive, isPending }) =>
								isPending
									? 'text-red-500'
									: isActive
									? 'text-green-500'
									: 'text-gray-200'
							}
						>
							Home
						</NavLink>
					</li>
					<li>
						<NavLink
							to='shop'
							className={({ isActive, isPending }) =>
								isPending
									? 'text-red-500'
									: isActive
									? 'text-green-500'
									: 'text-gray-200'
							}
						>
							Shop
						</NavLink>
					</li>
				</ul>
				<div className='nav__right'>
					<div className='relative flex justify-center items-center '>
						<ShoppingCartIcon
							className='h-8 w-8 text-white cursor-pointer'
							aria-hidden='true'
							onClick={showHideCart}
						/>

						<div className='text-xs text-white bg-cyan-500 rounded-full w-6 h-6 flex justify-center absolute items-center top-[-30%] right-[-30%]'>
							<span>{cartItems.length}</span>
						</div>
					</div>
				</div>
			</div>
		</nav>
	);
};

export default Navbar;
