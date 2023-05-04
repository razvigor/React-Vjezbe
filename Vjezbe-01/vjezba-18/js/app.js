const ProductsContext = React.createContext();

const productsInitialState = {
	products: null,
	cart: [],
	showCart: false,
	loading: true,
	error: '',
};

function productsReducer(state, action) {
	switch (action.type) {
		case 'SET-PRODUCTS': {
			return {
				...state,
				products: action.data,
				loading: false,
			};
		}

		case 'SET-ERROR': {
			return {
				...state,
				error: action.error,
				loading: false,
			};
		}
		case 'ADD-TO-CART': {
			const cartItem = state.products.find(
				(product) => product.id === action.id
			);
			return {
				...state,
				cart: [cartItem, ...state.cart],
			};
		}
		case 'SHOW-CART': {
			return {
				...state,
				showCart: true,
			};
		}
		case 'HIDE-CART': {
			return {
				...state,
				showCart: false,
			};
		}

		default: {
			throw new Error(`Unhandled action type: ${action.type}`);
		}
	}
}

function useProductsContext() {
	const context = React.useContext(ProductsContext);
	if (!context) {
		throw new Error('useProductsContext must be used within ProductsProvider');
	}
	return context;
}

function ProductsProvider({ children }) {
	const [state, dispatch] = React.useReducer(
		productsReducer,
		productsInitialState
	);
	const value = [state, dispatch];
	return (
		<ProductsContext.Provider value={value}>
			{children}
		</ProductsContext.Provider>
	);
}

function Loading() {
	return (
		<div className='loader' style={{ fontSize: '45px' }}>
			Loading...
		</div>
	);
}
function Product({
	title,
	description,
	price,
	rating,
	brand,
	category,
	thumbnail,
	onclick,
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
			<button type='button' onClick={onclick}>
				Add to Cart
			</button>
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

function Products() {
	const [state, dispatch] = useProductsContext();
	const url = 'https://dummyjson.com/';

	React.useEffect(() => {
		async function fetchProducts() {
			try {
				const res = await fetch(url + 'products');
				const data = await res.json();

				dispatch({ type: 'SET-PRODUCTS', data: data.products });
			} catch (error) {
				dispatch({ type: 'SET-ERROR', error: error.message });
			}
		}
		fetchProducts();
	}, []);
	return (
		<div className='products'>
			{state.loading ? (
				<Loading />
			) : state.products.length ? (
				state.products.map((product) => (
					<Product
						key={product.id}
						title={product.title}
						description={product.description}
						price={product.price}
						rating={product.rating}
						brand={product.brand}
						category={product.category}
						thumbnail={product.thumbnail}
						onclick={() => dispatch({ type: 'ADD-TO-CART', id: product.id })}
					/>
				))
			) : null}
		</div>
	);
}

function CartButton() {
	const [state, dispatch] = useProductsContext();
	return (
		<button type='button' onClick={() => dispatch({ type: 'SHOW-CART' })}>
			Products in Cart: <strong>{state.cart.length}</strong>
		</button>
	);
}

function Cart() {
	const [state, dispatch] = useProductsContext();
	return (
		<div className='cart'>
			<button type='button' onClick={() => dispatch({ type: 'HIDE-CART' })}>
				X
			</button>
			<ul>
				{state.cart.length ? (
					state.cart.map((item) => (
						<li key={item.id}>
							<img src={item.thumbnail} alt={item.title} width={75} />
							<span>{item.title}</span>
							<span>${item.price}</span>
						</li>
					))
				) : (
					<li>No items in cart</li>
				)}
			</ul>
		</div>
	);
}

function App() {
	const [state] = useProductsContext();
	return (
		<div className='App'>
			<h1>App</h1>

			<CartButton />
			<Products />
			{state.showCart && <Cart />}
		</div>
	);
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
	<React.StrictMode>
		<ProductsProvider>
			<App />
		</ProductsProvider>
	</React.StrictMode>
);
