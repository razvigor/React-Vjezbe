const initalCount = {
	count: 0,
};

function countReducer(state, action) {
	//console.log(action);
	switch (action.type) {
		case 'increment':
			return {
				...state,
				count: state.count + action.step,
			};
		case 'decrement':
			return {
				...state,
				count: state.count - action.step,
			};
		case 'reset':
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
				onClick={() => dispatch({ type: 'increment', step })}
			>
				Increment
			</button>
			<button
				type='button'
				onClick={() => dispatch({ type: 'decrement', step })}
			>
				Decrement
			</button>
			<button type='button' onClick={() => dispatch({ type: 'reset' })}>
				Reset
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
