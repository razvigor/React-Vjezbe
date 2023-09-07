import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import Layout from './Layout';

import Home from './pages/Home';
import Shop from './pages/Shop';
import ShopItem from './pages/ShopItem';
import ErrorPage from './pages/404';
import Login from './pages/Login';
import Signup from './pages/Signup';

const queryClient = new QueryClient();

function App() {
	return (
		<>
			<Router>
				<QueryClientProvider client={queryClient}>
					<Routes>
						<Route path='/' element={<Layout />}>
							<Route index element={<Home />} />
							<Route path='shop'>
								<Route index element={<Shop />} />
								<Route path=':id' element={<ShopItem />} />
							</Route>
							<Route path='login' element={<Login />} />
							<Route path='signup' element={<Signup />} />
							<Route path='*' element={<ErrorPage />} />
						</Route>
					</Routes>
				</QueryClientProvider>
			</Router>
		</>
	);
}

export default App;
