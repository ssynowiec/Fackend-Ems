'use client';

import { SubmitHandler, useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import Image from 'next/image';

type Inputs = {
	login: string;
	password: string;
};

const loginSchema = yup.object({
	login: yup.string().required('Login is required'),
	password: yup.string().required('Password is required'),
});

const LoginPage = () => {
	const {
		register,
		handleSubmit,
		setError,
		formState: { errors },
	} = useForm<Inputs>({
		resolver: yupResolver(loginSchema),
	});
	const onSubmit: SubmitHandler<Inputs> = async data => {
		const response = await fetch(
			`${process.env.NEXT_PUBLIC_API_URL}/users/login`,
			{
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(data),
				credentials: 'include',
			},
		);

		if (response.ok) {
			console.log('logged');
		} else {
			setError('root', { message: 'Invalid login or password' });
		}
	};

	return (
		<div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
			<div className="sm:mx-auto sm:w-full sm:max-w-sm">
				<Image
					className="mx-auto h-10 w-auto"
					src="/favicon.ico"
					alt="Your Company"
					width={40}
					height={40}
				/>
				<h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
					Login to your account
				</h2>
			</div>

			<div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
				<form
					className="space-y-6"
					action="#"
					method="POST"
					onSubmit={handleSubmit(onSubmit)}
				>
					<div>
						<label
							htmlFor="login"
							className="block text-sm font-medium leading-6 text-gray-900"
						>
							Login
						</label>
						<div className="mt-2">
							<input
								id="login"
								type="text"
								autoComplete="login"
								{...register('login', { required: true })}
								required
								className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
							/>
						</div>
						{errors.login && <span>{errors.login.message}</span>}
					</div>

					<div>
						<div className="flex items-center justify-between">
							<label
								htmlFor="password"
								className="block text-sm font-medium leading-6 text-gray-900"
							>
								Password
							</label>
							<div className="text-sm">
								<a
									href="#"
									className="font-semibold text-indigo-600 hover:text-indigo-500"
								>
									Forgot password?
								</a>
							</div>
						</div>
						<div className="mt-2">
							<input
								id="password"
								type="password"
								autoComplete="current-password"
								{...register('password', { required: true })}
								required
								className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
							/>
						</div>
						{errors.password && <span>{errors.password.message}</span>}
					</div>
					{errors.root && <span>{errors.root.message}</span>}
					<div>
						<button
							type="submit"
							className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
						>
							Login
						</button>
					</div>
				</form>
			</div>
		</div>
	);
};

export default LoginPage;
