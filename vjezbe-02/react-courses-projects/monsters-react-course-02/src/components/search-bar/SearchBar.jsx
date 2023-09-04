const SearchBar = ({ onchange, value, placeholder, className }) => {
	return (
		<>
			<input
				type='search'
				name='search'
				className={className}
				value={value}
				placeholder={placeholder}
				onChange={onchange}
			/>
		</>
	);
};

export default SearchBar;
