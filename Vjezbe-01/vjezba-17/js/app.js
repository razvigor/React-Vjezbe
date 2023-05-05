const CountContext = React.createContext();

function CountProvider({ children }) {
	const [count, setCount] = React.useState(0);
	const value = [count, setCount];
	return (
		<CountContext.Provider value={value}>{children}</CountContext.Provider>
	);
}

function useCountContext() {
	const context = React.useContext(CountContext);
	if (!context) {
		throw new Error('useCount must be used within the CountProvider');
	}
	return context;
}

function CounterDisplay() {
	const [count] = useCountContext();
	return <div>{`The current count is ${count}`}</div>;
}

function Counter() {
	const [, setCount] = useCountContext();
	return (
		<button type='button' onClick={() => setCount((prev) => prev + 1)}>
			Increment
		</button>
	);
}

function App() {
	return (
		<div className='App'>
			<h1>App</h1>
			<CountProvider>
				<CounterDisplay />
				<Counter />
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
