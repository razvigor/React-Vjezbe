function Name({ name, onNameChange }) {
	return (
		<div>
			<label htmlFor='name'>Name: </label>
			<input
				id='name'
				type='text'
				name='name'
				value={name}
				onChange={onNameChange}
			/>
		</div>
	);
}
function Animal({ animal, onAnimalChange }) {
	return (
		<div>
			<label htmlFor='animal'>Favorite Animal: </label>
			<input
				id='animal'
				type='text'
				name='animal'
				value={animal}
				onChange={onAnimalChange}
			/>
		</div>
	);
}

function Display({ name, animal }) {
	return (
		<div>{`My name is: ${name} and my favorite animal is: ${animal}!`}</div>
	);
}

function App() {
	const [name, setName] = React.useState('');
	const [animal, setAnimal] = React.useState('');
	return (
		<div className='App'>
			<form>
				<Name name={name} onNameChange={(e) => setName(e.target.value)} />
				<Animal
					animal={animal}
					onAnimalChange={(e) => setAnimal(e.target.value)}
				/>
			</form>
			<Display name={name} animal={animal} />
		</div>
	);
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
	<React.StrictMode>
		<App />
	</React.StrictMode>
);
