import React, { useState, useEffect } from "react";
import { ConnectButton, useAccounts } from "@mysten/dapp-kit";
import { useWallet } from "@suiet/wallet-kit";
import { getFullnodeUrl, SuiClient } from "@mysten/sui.js/client";
import { useWallets } from "@mysten/dapp-kit";
import { TransactionBlock } from "@mysten/sui.js/transactions";
import { useSuiClient } from "@mysten/dapp-kit";
import Image from "next/image";
import bg from '../styles/assets/hero2.svg'
import Navbar from "./Nav";


const CountdownTimer: any = () => {
	const PACKAGE_OBJECT_ID = "Oxk1213244jkelbclw";
	const wallets = useWallets();
	const client = useSuiClient();
	console.log(client);
	const isConnected = useWallet();
	const accounts = useAccounts();
	console.log(wallets);
	const suiClient = new SuiClient({ url: getFullnodeUrl("devnet") });
	const [MyAdress, setMyAddress] = useState("");
	const [countdownTime, setCountdownTime] = useState(
		1000 * 60 * 60 * 24 * 14 +
			1000 * 60 * 60 * 10 +
			1000 * 60 * 13 +
			1000 * 50
	); // Set your initial countdown time in milliseconds

	useEffect(() => {
		if (accounts.length > 0) {
			setMyAddress(accounts[0].address);
			console.log(accounts);
		}
	}, [accounts]);

	    useEffect(() => {
			// Set up the interval to update the countdown time every second
			const interval = setInterval(() => {
				setCountdownTime((prevTime) =>
					prevTime > 0 ? prevTime - 1000 : 0
				);
			}, 1000);
			// Clean up the interval when the component unmounts
			return () => clearInterval(interval);
		}, []);

		 const formatTime = (time:any) => {
				const days = Math.floor(time / (1000 * 60 * 60 * 24));
				const hours = Math.floor(
					(time % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
				);
				const minutes = Math.floor(
					(time % (1000 * 60 * 60)) / (1000 * 60)
				);
				const seconds = Math.floor((time % (1000 * 60)) / 1000);

				return { days, hours, minutes, seconds };
			};

			const { days, hours, minutes, seconds } = formatTime(countdownTime);



	async function fetchBalance() {
		try {
			const suiAfter = await suiClient.getBalance({
				owner: MyAdress,
			});
			console.log("Balance:", suiAfter);
			return suiAfter;
		} catch (error) {
			console.error("Failed to fetch balance:", error);
			return null;
		}
	}

	return (
		<>
			<div>
				<Image
					src={bg}
					alt='bg'
					className='absolute left-[13%] z-[-10] h-[800px]'
				/>
				<button className='absolute ml-[22%] w-[200px] text-white font-bold py-2 px-4 rounded  mt-8'>
					<ConnectButton />
				</button>
			</div>
				<Navbar/>
			<div className='bg-gradient-to-r from-gray-900 via-gray-700 to-gray-900 w-[400px] h-auto mx-auto text-white p-8 rounded-[20px]'>
				<h2 className='text-lg font-bold mb-4 text-center'>
					BUY IN BEFORE PRICE INCREASES!
				</h2>
				<div className='flex justify-center items-center mb-8'>
					<div className='mr-4'>
						<div className='text-6xl font-bold'>{days}</div>
						<div className='text-center'>DAY</div>
					</div>
					<div className='mr-4'>
						<div className='text-6xl font-bold'>{hours}</div>
						<div className='text-center'>HRS</div>
					</div>
					<div className='mr-4'>
						<div className='text-6xl font-bold'>{minutes}</div>
						<div className='text-center'>MIN</div>
					</div>
					<div>
						<div className='text-6xl font-bold'>{seconds}</div>
						<div className='text-center'>SEC</div>
					</div>
				</div>
				<div className=' justify-center items-center mb-4'>
					<div className='mr-4 flex justify-between px-4 mb-4'>
						<div>$0</div>
						<div>$1,025,000</div>
						<div>$5,000,000</div>
					</div>
					<div className=' block mx-auto text-center'>
						<div className='text-sm mb-1'>YOUR PURCHASED EVOX</div>
						<div className='text-sm mb-1'>YOUR STAKEABLE EVOX</div>
						<div className='text-sm mb-1'>1 EVOX = $0.0145</div>
					</div>
					{/* <div className="flex">
				</div> */}
				</div>
				<div className='flex justify-center items-center mb-4'>
					<button className='border rounded-3xl hover:bg-blue-700 text-white font-bold py-2 px-4 w-[150px] mr-4 flex'>
						<svg
							width='20'
							height='20'
							viewBox='0 0 20 20'
							className='z-10'
							fill='none'
							xmlns='http://www.w3.org/2000/svg'
							xmlnsXlink='http://www.w3.org/1999/xlink'>
							<rect
								width='20'
								height='20'
								fill='url(#pattern0_743_151)'
							/>
							<defs>
								<pattern
									id='pattern0_743_151'
									patternContentUnits='objectBoundingBox'
									width='1'
									height='1'>
									<use
										xlinkHref='#image0_743_151'
										transform='scale(0.00125)'
									/>
								</pattern>
								<image
									id='image0_743_151'
									width='800'
									height='800'
								/>
							</defs>
						</svg>
						ETH
					</button>
					<button className='border rounded-3xl hover:bg-yellow-700 text-white font-bold py-2 px-4 w-[150px] mr-4'>
						BNB
					</button>
					<button className='border rounded-3xl hover:bg-green-700 text-white font-bold py-2 px-4 w-[150px]'>
						USDT
					</button>
				</div>
				<div className='flex justify-between items-center '>
					<input
						type='text'
						placeholder='pay with Eth'
						className='bg-white px-3 text-xs text-gray-500 border-[1px] rounded-3xl py-2'
					/>
					<input
						type='text'
						placeholder='pay with Eth'
						className='bg-white px-3 text-xs text-gray-500 border-[1px] rounded-3xl py-2'
					/>
				</div>

				<button
					className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-full mt-8'
					onClick={fetchBalance}>
					Balance
				</button>
			</div>
		</>
	);
};

export default CountdownTimer;
