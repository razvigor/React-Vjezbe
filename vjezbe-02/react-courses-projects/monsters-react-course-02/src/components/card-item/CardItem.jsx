const CardItem = ({ monster }) => {
	const { id, name, email } = monster;
	return (
		<div className='card-container' key={id}>
			<img
				src={`https://robohash.org/${id}?set=set6&size=180x180`}
				alt={`monster ${name}`}
			/>
			<h2>{name}</h2>
			<p>{email}</p>
		</div>
	);
};
export default CardItem;
