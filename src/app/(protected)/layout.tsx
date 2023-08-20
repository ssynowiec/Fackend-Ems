import type { ReactNode } from 'react';
import { ProtectedPage } from '@/components/protectedPage';

type ProtectedLayoutProps = {
	children: ReactNode;
};

const ProtectedLayout = ({ children }: ProtectedLayoutProps) => {
	return <ProtectedPage>{children}</ProtectedPage>;
};

export default ProtectedLayout;
