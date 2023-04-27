class AddTodo extends React.Component {
	constructor(props) {
		super(props);
	}
	render() {
		return (
			<form onSubmit={this.props.todoSubmit}>
				<label htmlFor='todo'>Add Todo: </label>
				<input
					type='text'
					name='todo'
					id='todo'
					value={this.props.todo}
					onChange={this.props.todoChange}
				/>{' '}
				<button type='submit'>Add Todo</button>
			</form>
		);
	}
}

function DisplayTodos(props) {
	return <li>{props.todo}</li>;
}

class App extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			todos: [],
			todo: '',
		};
	}
	submitHandler = (e) => {
		e.preventDefault();
		this.setState({ todos: [...this.state.todos, this.state.todo] });
	};
	changeHandler = (e) => {
		this.setState({ todo: e.target.value });
	};
	//Life cycle methods

	componentDidMount() {
		console.log('componentDidMount');
	}

	componentDidUpdate() {
		console.log('componentDidUpdate');
	}
	componentWillUnmount() {
		console.log('componentWillUnmount');
	}

	render() {
		return (
			<div className='App'>
				<h1>App</h1>
				<AddTodo
					todoSubmit={this.submitHandler}
					todoChange={this.changeHandler}
				/>
				<ul>
					{this.state.todos.map((todo, key) => (
						<DisplayTodos key={key} todo={todo} />
					))}
				</ul>
			</div>
		);
	}
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
	<React.StrictMode>
		<App />
	</React.StrictMode>
);
