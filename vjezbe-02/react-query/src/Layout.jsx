import { Outlet } from 'react-router-dom';
import Footer from './components/Footer';
import Navbar from './components/Navbar';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import Cart from './components/Cart';

const Layout = () => {
	return (
		<>
			<Navbar />
			<Cart />
			<main className='min-h-screen pt-[96px]'>
				<Outlet />
			</main>
			<ReactQueryDevtools initialIsOpen />
			<Footer />
		</>
	);
};

export default Layout;
