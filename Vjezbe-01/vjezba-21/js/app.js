function useLocalStorageState(
	key,
	defaultValue = '',
	{ stringifyState = JSON.stringify, parseState = JSON.parse } = {}
) {
	const [state, setState] = React.useState(() => {
		const valueInLocalStorage = window.localStorage.getItem(key);
		if (valueInLocalStorage) {
			return parseState(valueInLocalStorage);
		}
		return typeof defaultValue === 'function' ? defaultValue() : defaultValue;
	});

	const prevKeyRef = React.useRef(key);

	React.useEffect(() => {
		const prevKey = prevKeyRef.current;
		if (prevKey !== key) {
			window.localStorage.removeItem(prevKey);
		}
		prevKeyRef.current = key;
		window.localStorage.setItem(key, stringifyState(state));
	}, [key, state, stringifyState]);

	return [state, setState];
}

function useFetch(url) {
	const [data, setData] = React.useState(null);
	const [loading, setLoading] = React.useState(null);
	const [error, setError] = React.useState(null);
	const ref = React.useRef(true);

	React.useEffect(() => {
		setLoading(true);
		setData(null);
		setError(null);

		if (ref.current) {
			fetch(url)
				.then((res) => {
					return res.json();
				})
				.then((json) => {
					setData(json);
					setLoading(false);
				})
				.catch((err) => {
					setLoading(false);
					setError(err.message);
				});
		}

		return () => {
			ref.current = false;
		};
	}, [url]);

	return { data, loading, error };
}

function App() {
	const [user, setUser] = useLocalStorageState('user', null);
	const [state, setState] = React.useState('');
	const { data, loading, error } = useFetch('https://dummyjson.com/products/1');

	return (
		<div className='App'>
			<h1>App</h1>
			{user ? (
				<div className='user'>
					<p>
						Hello <strong style={{ color: 'green' }}>{user}</strong>
					</p>
				</div>
			) : (
				<div className='user-form'>
					<form
						onSubmit={(e) => {
							e.preventDefault();
							setUser(state);
							setState('');
						}}
					>
						<input
							type='text'
							value={state}
							onChange={(e) => setState(e.target.value)}
							placeholder='User Name'
						/>
						<button type='submit'>Add User</button>
					</form>
				</div>
			)}

			{loading && <p>Loading...</p>}
			{data && <p>{data.title}</p>}
			{error && <p style={{ color: 'red' }}>{error}</p>}
		</div>
	);
}

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
	<React.StrictMode>
		<App />
	</React.StrictMode>
);
