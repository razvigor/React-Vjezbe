import CardItem from '../card-item/CardItem';

const CardListComponet = ({ monsters }) => {
	return (
		<div className='card-list'>
			{monsters.map((monster) => {
				return <CardItem monster={monster} />;
			})}
		</div>
	);
};
export default CardListComponet;
