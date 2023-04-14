function Box({ style, size, ...otherProps }) {
	const sizeClassName = size ? `box--${size}` : '';
	return (
		<div
			className={`box ${sizeClassName}`.trim()}
			style={{ fontSize: '25px', ...style }}
			{...otherProps}
		/>
	);
}

function App() {
	return (
		<section className='boxes'>
			<Box size='small' style={{ backgroundColor: 'green' }}>
				Small green box
			</Box>
			<Box size='medium' style={{ backgroundColor: 'orange' }}>
				Middle orange box
			</Box>
			<Box size='large' style={{ backgroundColor: 'blue' }}>
				Big blue box
			</Box>
			<Box>Box without properties</Box>
		</section>
	);
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
