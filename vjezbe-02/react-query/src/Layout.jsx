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
			<Outlet />
			<ReactQueryDevtools initialIsOpen />
			<Footer />
		</>
	);
};

export default Layout;
