import React from "react";

const Navbar = () => {
	return (
		<nav className='flex items-center w-[80%] justify-between  py-4 px-6'>
			<div className='flex items-center'>
				<a href='#' className='text-white text-xs mr-4'>
					Home
				</a>
				<a href='#' className='text-white text-xs mr-4'>
					My Staking Details
				</a>
				<a href='#' className='text-white text-xs'>
					My Vesting Details
				</a>
			</div>
			{/* <div>
				<a href='#' className='text-white text-xs'>
					Login
				</a>
			</div> */}
		</nav>
	);
};

export default Navbar;
