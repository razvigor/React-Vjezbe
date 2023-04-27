const AddTodos = React.memo(({ todo, onTodoChange, onTodoSubmit }) => {
	console.log('%cRendered AddTodos', 'color: yellow');
	return (
		<div>
			<form onSubmit={onTodoSubmit}>
				<label htmlFor='todo'>Todo: </label>
				<input
					type='text'
					id='todo'
					name='todo'
					value={todo}
					onChange={onTodoChange}
				/>{' '}
				<button type='submit'>Add Todo</button>
			</form>
		</div>
	);
});

const IncrementNumber = React.memo(({ num, onNumClick }) => {
	console.log('%cRendered IncrementNumber', 'color: green');
	return (
		<div>
			<button onClick={onNumClick}>{num}</button>
		</div>
	);
});

function App() {
	console.log('%cRendered App', 'color: red');
	const [todos, setTodos] = React.useState([]);
	const [todo, setTodo] = React.useState('');
	const [num, setNum] = React.useState(0);

	// function todoChange(e) {
	// 	setTodo(e.target.value);
	// }
	// function todoSubmit(e) {
	// 	e.preventDefault();
	// 	setTodos((t) => [...t, todo]);
	// }
	// function increment() {
	// 	setNum((n) => n + 1);
	// }

	const todoChange = React.useCallback(
		(e) => {
			setTodo(e.target.value);
		},
		[setTodo]
	);

	const todoSubmit = React.useCallback(
		(e) => {
			e.preventDefault();
			setTodos((t) => [...t, todo]);
		},
		[setTodos, todo]
	);
	const increment = React.useCallback(() => {
		setNum((n) => n + 1);
	}, [setNum]);
	return (
		<div className='App'>
			<AddTodos
				todo={todo}
				onTodoChange={todoChange}
				onTodoSubmit={todoSubmit}
			/>
			<IncrementNumber num={num} onNumClick={increment} />
			<ul>
				{todos.map((todo, key) => (
					<li key={key}>{todo}</li>
				))}
			</ul>
		</div>
	);
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
	<React.StrictMode>
		<App />
	</React.StrictMode>
);
