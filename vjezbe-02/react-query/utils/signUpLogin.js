import { useMutation } from '@tanstack/react-query';
import axios from 'axios';

export const useSignupMutation = () => {
	return useMutation((formPayload) => {
		return axios.post('https://fakestoreapi.com/users', formPayload);
	});
};

export const useLoginMutation = () => {
	return useMutation((formPayload) => {
		return axios.post('https://fakestoreapi.com/auth/login', formPayload);
	});
};
