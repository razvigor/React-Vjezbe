function Box({ style, className = '', ...otherProps }) {
	return (
		<div
			className={`box ${className}`}
			style={{ fontSize: '25px', ...style }}
			{...otherProps}
		/>
	);
}

function App() {
	return (
		<section className='boxes'>
			<Box className='box--small' style={{ backgroundColor: 'green' }}>
				Small green box
			</Box>
			<Box className='box--medium' style={{ backgroundColor: 'orange' }}>
				Middle orange box
			</Box>
			<Box className='box--large' style={{ backgroundColor: 'blue' }}>
				Big blue box
			</Box>
			<Box>Box without properties</Box>
		</section>
	);
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
