import { useState } from 'react';
import { Formik } from 'formik';
import { useNavigate } from 'react-router-dom';
import { useSignupMutation } from '../../utils/signUpLogin';

const Signup = () => {
	const { mutate } = useSignupMutation();
	const navigate = useNavigate();
	const [successMessage, setSuccessMesage] = useState('');
	const [errorMessage, setErrorMessage] = useState('');

	return (
		<div className='flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8'>
			<div className='sm:mx-auto sm:w-full lg:w-96'>
				<h2 className='mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900'>
					Sign up
				</h2>
			</div>

			<div className='mt-10 sm:mx-auto w-full md:w-3/5'>
				<Formik
					initialValues={{
						email: '',
						firstname: '',
						lastname: '',
						username: '',
						phone: '',
						password: '',
						address: {
							city: 'kilcoole',
							street: '7835 new road',
							number: 3,
							zipcode: '12926-3874',
							geolocation: {
								lat: '-37.3159',
								long: '81.1496',
							},
						},
					}}
					validate={(values) => {
						const errors = {};
						if (!values.email) {
							errors.email = 'Required';
						}
						if (!values.firstname) {
							errors.firstname = 'Required';
						}
						if (!values.lastname) {
							errors.lastname = 'Required';
						}
						if (!values.username) {
							errors.username = 'Required';
						}
						if (!values.phone) {
							errors.phone = 'Required';
						}
						if (!values.password) {
							errors.password = 'Required';
						}
						return errors;
					}}
					onSubmit={(values, { resetForm }) => {
						mutate(
							{
								email: values.email,
								username: values.username,
								password: values.password,
								name: {
									firstname: values.firstname,
									lastname: values.lastname,
								},
								address: values.address,
								phone: values.phone,
							},
							{
								onSuccess: (response) => {
									console.log(response);
									setSuccessMesage('You have successfully registered!');
									setTimeout(() => {
										setSuccessMesage('');
										resetForm();
										navigate('/login');
									}, 3000);
								},
								onError: (res) => {
									setErrorMessage(res.data);
									setTimeout(() => {
										setErrorMessage('');
									}, 3000);
								},
							}
						);
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
						<form
							className='flex flex-wrap justify-between gap-y-2'
							onSubmit={handleSubmit}
						>
							<div className='w-full sm:w-[49%]'>
								<label
									htmlFor='email'
									className='block text-sm font-medium leading-6 text-gray-900'
								>
									Email address
								</label>
								<div className='w-full'>
									<input
										id='email'
										name='email'
										type='email'
										autoComplete='email'
										value={values.email}
										onChange={handleChange}
										onBlur={handleBlur}
										className='input'
									/>
								</div>
								<div className='text-red-500'>
									{errors.email && touched.email && errors.email}
								</div>
							</div>

							<div className='w-full sm:w-[49%]'>
								<label
									htmlFor='firstname'
									className='block text-sm font-medium leading-6 text-gray-900'
								>
									First Name
								</label>
								<div className='w-full'>
									<input
										id='firstname'
										name='firstname'
										type='text'
										autoComplete='firstname'
										value={values.firstname}
										onChange={handleChange}
										onBlur={handleBlur}
										className='input'
									/>
								</div>
								<div className='text-red-500'>
									{errors.firstname && touched.firstname && errors.firstname}
								</div>
							</div>

							<div className='w-full sm:w-[49%]'>
								<label
									htmlFor='lastname'
									className='block text-sm font-medium leading-6 text-gray-900'
								>
									Last Name
								</label>
								<div className='w-full'>
									<input
										id='lastname'
										name='lastname'
										type='text'
										autoComplete='lastname'
										value={values.lastname}
										onChange={handleChange}
										onBlur={handleBlur}
										className='input'
									/>
								</div>
								<div className='text-red-500'>
									{errors.lastname && touched.lastname && errors.lastname}
								</div>
							</div>
							<div className='w-full sm:w-[49%]'>
								<label
									htmlFor='username'
									className='block text-sm font-medium leading-6 text-gray-900'
								>
									User Name
								</label>
								<div className='w-full'>
									<input
										id='username'
										name='username'
										type='text'
										autoComplete='username'
										value={values.username}
										onChange={handleChange}
										onBlur={handleBlur}
										className='input'
									/>
								</div>
								<div className='text-red-500'>
									{errors.username && touched.username && errors.username}
								</div>
							</div>

							<div className='w-full sm:w-[49%]'>
								<label
									htmlFor='phone'
									className='block text-sm font-medium leading-6 text-gray-900'
								>
									Phone
								</label>
								<div className='w-full'>
									<input
										id='phone'
										name='phone'
										type='tel'
										autoComplete='phone'
										value={values.phone}
										onChange={handleChange}
										onBlur={handleBlur}
										className='input'
									/>
								</div>
								<div className='text-red-500'>
									{errors.phone && touched.phone && errors.phone}
								</div>
							</div>

							<div className='w-full sm:w-[49%]'>
								<label
									htmlFor='password'
									className='block text-sm font-medium leading-6 text-gray-900'
								>
									Password
								</label>
								<div className='w-full'>
									<input
										id='password'
										name='password'
										type='password'
										autoComplete='current-password'
										required
										value={values.password}
										onChange={handleChange}
										onBlur={handleBlur}
										className='input'
									/>
								</div>
								<div className='text-red-500'>
									{errors.password && touched.password && errors.password}
								</div>
							</div>

							<div className='w-full mt-3'>
								<button
									type='submit'
									disabled={isSubmitting}
									className='btn-dark'
								>
									Sign in
								</button>
							</div>
							{successMessage && (
								<div className='flex justify-center'>
									<p className='text-lg text-green-500'>{successMessage}</p>
								</div>
							)}
							{errorMessage && (
								<div className='flex justify-center'>
									<p className='text-lg text-red-500'>{errorMessage}</p>
								</div>
							)}
						</form>
					)}
				</Formik>
			</div>
		</div>
	);
};

export default Signup;
