const initalCount = {
	count: 0,
};

function countReducer(state, action) {
	//console.log(action);
	switch (action.type) {
		case 'INCREMENT':
			return {
				...state,
				count: state.count + action.step,
			};
		case 'DECREMENT':
			return {
				...state,
				count: state.count - action.step,
			};
		case 'RESET':
			return initalCount;
		default:
			throw new Error(`Unhandled action type: ${action.type}`);
	}
}

function Counter({ step = 2 }) {
	const [state, dispatch] = React.useReducer(countReducer, initalCount);
	return (
		<div className='counter'>
			<h2>{state.count}</h2>
			<button
				type='button'
				onClick={() => dispatch({ type: 'INCREMENT', step })}
			>
				INCREMENT
			</button>
			<button
				type='button'
				onClick={() => dispatch({ type: 'DECREMENT', step })}
			>
				DECREMENT
			</button>
			<button type='button' onClick={() => dispatch({ type: 'RESET' })}>
				RESET
			</button>
		</div>
	);
}

function App() {
	return (
		<div className='App'>
			<h1>App</h1>
			<Counter />
		</div>
	);
}
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
	<React.StrictMode>
		<App />
	</React.StrictMode>
);
