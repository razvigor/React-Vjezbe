const url = 'https://dummyjson.com/';
function App() {
	const refComp = React.useRef(true);
	const [users, setUsers] = React.useState(null);
	const [name, setName] = React.useState([]);

	const [list, setList] = React.useState([]);

	const [isPending, startTransition] = React.useTransition();

	React.useLayoutEffect(() => {
		async function fetchUsers() {
			const res = await fetch(url + 'users');
			const data = await res.json();
			//console.log(data.users);
			setUsers(data.users);
		}
		if (refComp.current) {
			fetchUsers();
		}
		return () => {
			refComp.current = false;
		};
	}, []);

	// function handleChange(e) {
	// 	setName(e.target.value);
	// 	setList(largeList.filter((item) => item.name.includes(e.target.value)));
	// }

	function handleChange(e) {
		setName(e.target.value);
		startTransition(() => {
			setList(users.filter((item) => item.firstName.includes(e.target.value)));
		});
	}
	return (
		<div className='App'>
			<h1>App</h1>
			<div>
				<input type='text' value={name} onChange={handleChange} />
				{isPending ? (
					<div>Loading...</div>
				) : (
					<ul>
						{list.map((item) => (
							<li key={item.id}>
								{item.firstName + ' ' + item.lastName + ' - ' + item.username}
							</li>
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
