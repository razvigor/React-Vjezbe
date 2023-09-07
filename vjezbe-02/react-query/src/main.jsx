import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import CartState from './context/cart/CartState.jsx';
import UserState from './context/user/UserState.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
	<React.StrictMode>
		<UserState>
			<CartState>
				<App />
			</CartState>
		</UserState>
	</React.StrictMode>
);
