function App() {
	const [formData, setFormData] = React.useState({
		username: '',
		password: '',
	});
	const [error, setError] = React.useState('');

	const submitHandler = (e) => {
		e.preventDefault();
		if (formData.username === '' || formData.password === '') {
			setError('Sva polja moraju biti popunjena!');
			return;
		}
		setError('');
		alert(`Username: ${formData.username}, Password: ${formData.password}`);
		setFormData({
			username: '',
			password: '',
		});
	};

	const changeHandler = (e) => {
		const { name, value } = e.target;
		setFormData({
			...formData,
			[name]: value,
		});
	};

	React.useEffect(() => {
		console.log(formData);
	}, [formData]);

	return (
		<form onSubmit={submitHandler}>
			<div>
				<label htmlFor='username'>Username</label>
				<input
					type='text'
					name='username'
					id='username'
					value={formData.username}
					onChange={changeHandler}
				/>
			</div>
			<div>
				<label htmlFor='password'>Password</label>
				<input
					type='password'
					name='password'
					id='password'
					value={formData.password}
					onChange={changeHandler}
				/>
			</div>
			<div>{error && <p style={{ color: 'red' }}>{error}</p>}</div>
			<button type='submit'>Login</button>
		</form>
	);
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
