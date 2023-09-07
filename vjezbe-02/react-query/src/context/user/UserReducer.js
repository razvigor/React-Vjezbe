import { LOGIN_SUCCESS, LOG_OUT, LOGIN_ERROR } from '../Types';

const UserReducer = (state, action) => {
	switch (action.type) {
		case LOGIN_SUCCESS:
			return {
				...state,
				token: action.payload,
			};
		case LOG_OUT:
			return {
				...state,
				token: '',
			};

		case LOGIN_ERROR:
			return {
				...state,
				errorMessage: action.error,
			};

		default:
			throw new Error(`Unhandled action type: ${action.type}`);
	}
};

export default UserReducer;
