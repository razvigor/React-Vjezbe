import { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Formik } from 'formik';
import { useLoginMutation } from '../../utils/signUpLogin';
import UserContext from '../context/user/UserContext';

const Login = () => {
	const { logIn } = useContext(UserContext);
	const { mutate } = useLoginMutation();
	const navigate = useNavigate();
	const [errorMessage, setErrorMessage] = useState('');
	return (
		<div className='flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8'>
			<div className='sm:mx-auto sm:w-full sm:max-w-sm'>
				<h1 className='mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900'>
					Log in to your account
				</h1>
			</div>

			<div className='mt-10 sm:mx-auto sm:w-full sm:max-w-sm'>
				<Formik
					initialValues={{ username: '', password: '' }}
					validate={(values) => {
						const errors = {};
						if (!values.username) {
							errors.username = 'Required';
						}
						if (!values.password) {
							errors.password = 'Required';
						}
						return errors;
					}}
					onSubmit={(values, { resetForm }) => {
						mutate(values, {
							onSuccess: (response) => {
								logIn(response.data.token);
								resetForm();
								navigate('/shop');
							},
							onError: (res) => {
								setErrorMessage(res.response.data);
								setTimeout(() => {
									setErrorMessage('');
								}, 3000);
							},
						});
					}}
				>
					{({
						values,
						errors,
						touched,
						handleChange,
						handleBlur,
						handleSubmit,
						isSubmitting,
						/* and other goodies */
					}) => (
						<form className='space-y-6' onSubmit={handleSubmit}>
							<div>
								<label
									htmlFor='Username'
									className='block text-sm font-medium leading-6 text-gray-900'
								>
									Username
								</label>
								<div className='mt-2'>
									<input
										id='username'
										name='username'
										type='text'
										autoComplete='username'
										required
										onChange={handleChange}
										onBlur={handleBlur}
										value={values.username}
										className='input'
									/>
									<div className='text-red-500'>
										{errors.username && touched.username && errors.username}
									</div>
								</div>
							</div>

							<div>
								<div className='flex items-center justify-between'>
									<label
										htmlFor='password'
										className='block text-sm font-medium leading-6 text-gray-900'
									>
										Password
									</label>
								</div>
								<div className='mt-2'>
									<input
										id='password'
										name='password'
										type='password'
										autoComplete='current-password'
										required
										onChange={handleChange}
										onBlur={handleBlur}
										value={values.password}
										className='input'
									/>
									<div className='text-red-500'>
										{errors.password && touched.password && errors.password}
									</div>
								</div>
							</div>

							<div>
								<button
									type='submit'
									disabled={isSubmitting}
									className='btn-dark'
								>
									Sign in
								</button>
							</div>
							{errorMessage && (
								<div className='flex justify-center'>
									<p className='text-lg text-red-500'>{errorMessage}</p>
								</div>
							)}
						</form>
					)}
				</Formik>

				<p className='mt-10 text-center text-sm text-gray-500'>
					Not a member?{' '}
					<Link
						to='/signup'
						className='font-semibold leading-6 text-indigo-600 hover:text-indigo-500'
					>
						Sign Up
					</Link>
				</p>
			</div>
		</div>
	);
};

export default Login;
