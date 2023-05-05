const url = 'https://dummyjson.com/';

function App() {
	const refComp = React.useRef(true);
	const [users, setUsers] = React.useState(null);
	const [name, setName] = React.useState([]);

	const [list, setList] = React.useState([]);

	const [isPending, startTransition] = React.useTransition();

	React.useLayoutEffect(() => {
		if (refComp.current) {
			setUsers(
				Array.from({ length: 10000 }, (_, i) => {
					return { name: 'Sasa-' + (i + 1) };
				})
			);
		}
		return () => {
			refComp.current = false;
		};
	}, []);

	function handleChange(e) {
		setName(e.target.value);
		setList(users.filter((item) => item.name.includes(e.target.value)));
	}

	// function handleChange(e) {
	// 	setName(e.target.value);

	// 	startTransition(() => {
	// 		setList(users.filter((item) => item.name.includes(e.target.value)));
	// 	});
	// }
	return (
		<div className='App'>
			<h1>App</h1>
			<div>
				<input type='text' value={name} onChange={handleChange} />
				{isPending ? (
					<div>Loading...</div>
				) : (
					<ul>
						{list.map((item, key) => (
							<li key={key}>{item.name}</li>
						))}
					</ul>
				)}
			</div>
		</div>
	);
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
	<React.StrictMode>
		<App />
	</React.StrictMode>
);
