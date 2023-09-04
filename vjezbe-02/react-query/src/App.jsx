import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import Layout from './Layout';

import Home from './pages/Home';
import Shop from './pages/Shop';
import ShopItem from './pages/ShopItem';

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
						</Route>
					</Routes>
				</QueryClientProvider>
			</Router>
		</>
	);
}

export default App;
