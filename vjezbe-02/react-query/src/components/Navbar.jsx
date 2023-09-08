import { useContext, useState } from 'react';
import { NavLink, Link, useNavigate } from 'react-router-dom';
import CartContext from '../context/cart/CartContext';
import UserContext from '../context/user/UserContext';
import {
	ShoppingCartIcon,
	Bars3Icon,
	XMarkIcon,
} from '@heroicons/react/24/outline';

const Navbar = () => {
	const { cartItems, showHideCart } = useContext(CartContext);
	const { token, logOut } = useContext(UserContext);
	const [isOpen, setIsOpen] = useState(window.innerWidth <= 768 ? false : true);
	const navigate = useNavigate();

	const logoutHandler = () => {
		logOut();
		navigate('/login');
	};
	const mobBtnOpenhandler = () => {
		setIsOpen(true);
	};
	const mobBtnClosehandler = () => {
		setIsOpen(false);
	};
	return (
		<nav className='bg-gray-900 fixed left-0 top-0 w-full z-40'>
			<div className='container mx-auto flex justify-between h-24 items-center px-4'>
				<div className='text-slate-200'>
					<Link to='/'>Logo</Link>
				</div>
				<div
					className={`absolute ${
						isOpen ? 'left-0' : 'left-full'
					} top-0 z-50 md:static w-screen h-screen flex flex-col  bg-gray-700 md:bg-transparent`}
				>
					<div className='flex justify-end pr-3 pt-3 md:hidden'>
						<button type='button' onClick={mobBtnClosehandler}>
							<XMarkIcon className='h-8 w-8 text-gray-200 hover:text-green-500' />
						</button>
					</div>
					<ul
						className='flex flex-col md:flex-row gap-y-4 md:gap-x-3 text-lg items-center justify-center h-full'
						onClick={mobBtnClosehandler}
					>
						<li>
							<NavLink
								to='/'
								className={({ isActive, isPending }) =>
									isPending
										? 'text-red-500'
										: isActive
										? 'text-green-500'
										: 'text-gray-200 hover:text-green-500'
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
										: 'text-gray-200 hover:text-green-500'
								}
							>
								Shop
							</NavLink>
						</li>
						<li>
							{!token ? (
								<NavLink
									to='login'
									className={({ isActive, isPending }) =>
										isPending
											? 'text-red-500'
											: isActive
											? 'text-green-500'
											: 'text-gray-200 hover:text-green-500'
									}
								>
									Login
								</NavLink>
							) : (
								<button
									type='button'
									onClick={logoutHandler}
									className='text-gray-200 hover:text-green-500'
								>
									Logout
								</button>
							)}
						</li>
					</ul>
				</div>
				<div className='flex gap-x-8'>
					<div className='relative flex justify-center items-center'>
						<ShoppingCartIcon
							className='h-8 w-8 text-white cursor-pointer'
							aria-hidden='true'
							onClick={showHideCart}
						/>

						<div className='text-xs text-white bg-cyan-500 rounded-full w-6 h-6 flex justify-center absolute items-center top-[-30%] right-[-30%]'>
							<span>{cartItems.length}</span>
						</div>
					</div>
					<div className='flex md:hidden'>
						<button type='button' onClick={mobBtnOpenhandler}>
							<Bars3Icon className='h-8 w-8 text-gray-200 hover:text-green-500' />
						</button>
					</div>
				</div>
			</div>
		</nav>
	);
};

export default Navbar;
