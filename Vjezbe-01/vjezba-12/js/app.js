function Tilt({ children }) {
	const tiltRef = React.useRef();

	React.useEffect(() => {
		const tiltNode = tiltRef.current;
		VanillaTilt.init(tiltNode, {
			max: 25,
			speed: 400,
			glare: true,
			'max-glare': 0.5,
		});
		return function cleanup() {
			tiltNode.vanillaTilt.destroy();
		};
	}, []);

	const containerStyle = {
		width: '400px',
		height: '200px',
		margin: '75px auto 0',
		background: 'linear-gradient(135deg, #fc00ff , #00dbde)',
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
		transformStyle: 'preserve-3d',
		perspective: '1000px',
	};

	const itemStyle = {
		background: 'white',
		padding: '15px 25px',
		transform: 'translateZ(20px)',
	};

	return (
		<div ref={tiltRef} className='tilt-container' style={containerStyle}>
			<div className='tilt-item' style={itemStyle}>
				{children}
			</div>
		</div>
	);
}

function App() {
	return (
		<div className='App'>
			<Tilt>
				<p>vanilla-tilt.js</p>
			</Tilt>
		</div>
	);
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
	<React.StrictMode>
		<App />
	</React.StrictMode>
);
