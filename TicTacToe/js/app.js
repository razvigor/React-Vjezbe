const initialSquares = Array(9).fill(null);

function Square({ value, onSquareClick }) {
	return (
		<button className='square' onClick={onSquareClick}>
			{value}
		</button>
	);
}

function Board() {
	const [squares, setSquares] = React.useState(initialSquares);

	const nextValue = calculateNextvalue(squares);
	const winner = calculateWinner(squares);
	const status = calculateStatus(winner, squares, nextValue);

	function calculateStatus(winner, squares, nextValue) {
		return winner
			? `Winner: ${winner}`
			: squares.every(Boolean)
			? 'A tie'
			: `Next player: ${nextValue}`;
	}
	function calculateNextvalue(squares) {
		const xSquaresCount = squares.filter((x) => x === 'X').length;
		const oSquaresCount = squares.filter((o) => o === 'O').length;
		return oSquaresCount === xSquaresCount ? 'X' : 'O';
	}
	function calculateWinner(squares) {
		const lines = [
			[0, 1, 2],
			[3, 4, 5],
			[6, 7, 8],
			[0, 3, 6],
			[1, 4, 7],
			[2, 5, 8],
			[0, 4, 8],
			[2, 4, 6],
		];
		for (let i = 0; i < lines.length; i++) {
			const [a, b, c] = lines[i];
			if (
				squares[a] &&
				squares[a] === squares[b] &&
				squares[a] === squares[c]
			) {
				return squares[a];
			}
		}
		return null;
	}
	function selectSquare(square) {
		if (winner || squares[square]) {
			return;
		}
		const copy = [...squares];
		copy[square] = nextValue;
		setSquares(copy);
	}

	return (
		<div className='board'>
			<div className='status'>{status}</div>
			<div className='board-table'>
				{squares.map((square, key) => (
					<Square
						key={key}
						value={square}
						onSquareClick={() => selectSquare(key)}
					/>
				))}
			</div>
			<div className='restart'>
				<button type='button' onClick={() => setSquares(initialSquares)}>
					Restart
				</button>
			</div>
		</div>
	);
}

function App() {
	return <Board />;
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
	<React.StrictMode>
		<App />
	</React.StrictMode>
);
