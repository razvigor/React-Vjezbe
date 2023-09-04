import { useState, useEffect } from 'react';

const Footer = () => {
	const [year, setYear] = useState('');
	useEffect(() => {
		setYear(() => new Date().getFullYear());
	}, []);
	return (
		<footer className='bg-gray-900 py-8 text-slate-100 flex justify-center items-center'>
			<p>&copy; Copyright - {year}</p>
		</footer>
	);
};

export default Footer;
