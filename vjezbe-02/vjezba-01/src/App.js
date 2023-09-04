import { Routes, Route } from 'react-router-dom';
import Layout from './Layout';
import Home from './pages/Home';
import ErrorPage from './pages/ErrorPage';

function App() {
	return (
		<div className='App'>
			<Routes>
				<Route path='/' element={<Layout />}>
					<Route index element={<Home />} />
					<Route path='*' element={<ErrorPage />} />
				</Route>
			</Routes>
		</div>
	);
}

export default App;
