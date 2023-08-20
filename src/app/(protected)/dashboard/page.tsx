import Link from 'next/link';

const Dashboard = () => {
	return (
		<>
			<h1>Dashboard</h1>
			<Link href="/logout">Logout</Link>
		</>
	);
};

export default Dashboard;
