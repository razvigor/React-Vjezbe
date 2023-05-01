function Product({
	title,
	description,
	price,
	rating,
	brand,
	category,
	thumbnail,
}) {
	return (
		<article className='product'>
			<div className='image'>
				<img src={thumbnail} alt={title} />
			</div>
			<StarRating rating={Math.round(rating)} />
			<h2>{title}</h2>
			<div className='brand'>
				<span>{brand}</span> / <span>{category}</span>
			</div>
			<div className='price'>
				<p>{price}$</p>
			</div>
			<div className='description'>
				<p>{description}</p>
			</div>
			<button type='button'>Add to Cart</button>
		</article>
	);
}
const StarRating = ({ rating }) => {
	return (
		<div className='star-rating'>
			{[...Array(5)].map((star, index) => {
				index += 1;
				return (
					<button
						type='button'
						key={index}
						className={index <= rating ? 'on' : 'off'}
					>
						<span className='star'>&#9733;</span>
					</button>
				);
			})}
		</div>
	);
};
function Loading() {
	return (
		<div className='loader' style={{ fontSize: '45px' }}>
			Loading...
		</div>
	);
}

function App() {
	const url = 'https://dummyjson.com/';
	const [products, setProducts] = React.useState(null);
	const [error, setError] = React.useState('');
	const [loading, setLoading] = React.useState(true);

	React.useEffect(() => {
		async function fetchProducts() {
			try {
				const res = await fetch(url + 'products');
				const data = await res.json();
				setProducts(data.products);
				setLoading(false);
			} catch (err) {
				setError(err.message);
				setLoading(false);
			}
		}
		fetchProducts();
	}, []);

	if (error) {
		return (
			<div style={{ color: 'red' }}>
				<p>{error}</p>
			</div>
		);
	}

	return (
		<div className='App'>
			<h1>Shop</h1>
			<div className='products'>
				{loading ? (
					<Loading />
				) : products ? (
					products.map((product) => (
						<Product
							key={product.id}
							title={product.title}
							description={product.description}
							price={product.price}
							rating={product.rating}
							brand={product.brand}
							category={product.category}
							thumbnail={product.thumbnail}
						/>
					))
				) : null}
			</div>
		</div>
	);
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
	<React.StrictMode>
		<App />
	</React.StrictMode>
);
