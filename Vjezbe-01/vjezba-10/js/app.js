function ExampleOne() {
	const [directCount, setDirectCount] = React.useState(0);
	const [callbackCount, setCallbackCount] = React.useState(0);

	const increaseDirect = () => {
		setDirectCount(directCount + 1);
		console.log('increaseDirect', directCount);
	};
	const increaseCallback = () => {
		setCallbackCount((previousValue) => previousValue + 1);
		console.log('increaseCallback', callbackCount);
	};

	console.log('Re-render log', {
		directCount,
		callbackCount,
	});

	React.useEffect(() => {
		const interval = setInterval(() => {
			increaseDirect();
			increaseCallback();
		}, 3000);

		return () => clearInterval(interval);
	}, []);

	return (
		<div>
			Direct Count: {directCount} / Callback Count: {callbackCount}
		</div>
	);
}

function ExampleTwo() {
	const [directCount, setDirectCount] = React.useState(0);
	const [callbackCount, setCallbackCount] = React.useState(0);

	const increaseDirect = () => {
		setDirectCount(directCount + 1);
	};
	const increaseCallback = () => {
		setCallbackCount((previousValue) => previousValue + 1);
	};

	console.log('Re-render log', {
		directCount,
		callbackCount,
	});

	const handleClick = () => {
		increaseDirect();
		increaseCallback();
	};

	return (
		<div>
			<div>
				<div>direct: {directCount}</div>
				<div>callback: {callbackCount}</div>
			</div>
			<button onClick={handleClick}>click me!</button>
		</div>
	);
}
function ExampleThree() {
	const [isOpen, setIsOpen] = React.useState(true);

	const toggle = () => {
		setIsOpen((prev) => !prev);
	};

	return (
		<div>
			{isOpen && (
				<div
					style={{
						padding: 50,
						background: 'lightgreen',
						marginBottom: 20,
					}}
				>
					I am open!
				</div>
			)}
			<button onClick={toggle}>Close!</button>
		</div>
	);
}
function App() {
	return (
		<React.Fragment>
			{/*<ExampleOne />*/}
			{/*<ExampleTwo />*/}
			<ExampleThree />
		</React.Fragment>
	);
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
	<React.StrictMode>
		<App />
	</React.StrictMode>
);
