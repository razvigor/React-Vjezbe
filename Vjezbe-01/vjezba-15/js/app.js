function CalculateFactorial() {
	const [number, setNumber] = React.useState(1);
	const [inc, setInc] = React.useState(0);
	const ref = React.useRef(0);

	//const factorial = React.useMemo(() => factorialOf(number), [number]);
	const factorial = factorialOf(number);

	const onChange = (event) => {
		setNumber(Number(event.target.value));
	};
	const onClick = () => setInc((i) => i + 1);

	function factorialOf(n) {
		ref.current += 1;
		return n <= 0 ? 1 : n * factorialOf(n - 1);
	}

	return (
		<div>
			Factorial of
			<input type='number' value={number} onChange={onChange} />
			is {factorial} <button onClick={onClick}>Re-render</button>
			<p>factorialOf(n) called: {ref.current} times</p>
		</div>
	);
}

function App() {
	return (
		<div className='App'>
			<h1>App</h1>
			<CalculateFactorial />
		</div>
	);
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
	<React.StrictMode>
		<App />
	</React.StrictMode>
);
