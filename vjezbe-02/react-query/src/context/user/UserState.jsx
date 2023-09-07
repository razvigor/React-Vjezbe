import { useReducer } from 'react';
import UserContext from './UserContext';
import UserReducer from './UserReducer';

import { LOGIN_ERROR, LOGIN_SUCCESS, LOG_OUT } from '../Types';

import PropTypes from 'prop-types';

let token = localStorage.getItem('token') ? localStorage.getItem('token') : '';

const UserState = ({ children }) => {
	const initalState = {
		token: '' || token,
		errorMessage: null,
	};

	const [state, dispatch] = useReducer(UserReducer, initalState);

	const logIn = (token) => {
		if (token) {
			dispatch({ type: LOGIN_SUCCESS, payload: token });
			localStorage.setItem('token', token);
			return token;
		}
		dispatch({ type: LOGIN_ERROR, error: token.errors[0] });
		return;
	};
	const logOut = () => {
		dispatch({ type: LOG_OUT });
		localStorage.removeItem('token');
	};

	return (
		<UserContext.Provider value={{ token: state.token, logIn, logOut }}>
			{children}
		</UserContext.Provider>
	);
};
UserState.propTypes = {
	children: PropTypes.node,
};

export default UserState;
