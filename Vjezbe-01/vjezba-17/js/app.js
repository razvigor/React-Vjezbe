const initialCount = {
	count: 0,
};
const CountContext = React.createContext();

function countReducer(state, action) {
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
			return initialCount;
		default:
			throw new Error(`Unhandled action type: ${action.type}`);
	}
}

function useCountContext() {
	const context = React.useContext(CountContext);
	if (!context) {
		throw new Error('useCountContext must be used within the CountProvider');
	}
	return context;
}

function CountProvider({ children }) {
	const [state, dispatch] = React.useReducer(countReducer, initialCount);
	const value = [state, dispatch];
	return (
		<CountContext.Provider value={value}>{children}</CountContext.Provider>
	);
}

function DisplayCount() {
	const [state] = useCountContext();

	return <div className='display'>{state.count}</div>;
}
function CountButtons({ step = 2 }) {
	const [, dispatch] = useCountContext();

	return (
		<div className='btns-group'>
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
			<CountProvider>
				<DisplayCount />
				<CountButtons />
			</CountProvider>
		</div>
	);
}

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
	<React.StrictMode>
		<App />
	</React.StrictMode>
);
