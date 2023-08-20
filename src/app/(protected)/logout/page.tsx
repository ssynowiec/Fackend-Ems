'use client';

import { redirect } from 'next/navigation';

const LogoutPage = () => {
	try {
		fetch(`${process.env.NEXT_PUBLIC_API_URL}/users/logout`, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
			},
			credentials: 'include',
		}).then(response => {
			if (response.ok) {
				console.log('logged out');
			}
		});
	} catch (error) {
		console.log(error);
	} finally {
		redirect('/login');
	}

	return (
		<div>
			<h1>Logout</h1>
		</div>
	);
};

export default LogoutPage;
