import { ReactNode } from 'react';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

type ProtectedPageProps = {
	children: ReactNode;
};

export const ProtectedPage = ({ children }: ProtectedPageProps) => {
	const cookiesStore = cookies();
	const token = cookiesStore.get('token');

	if (!token) {
		redirect('/login');
	}

	return <>{children}</>;
};
