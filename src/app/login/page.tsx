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
	login: yup.string().required(),
	password: yup.string().required(),
});

const LoginPage = () => {
	const {
		register,
		handleSubmit,
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
		console.log(response);
		fetch(`${process.env.NEXT_PUBLIC_API_URL}/users`, {
			method: 'GET',
			credentials: 'same-origin',
		})
			.then(response => response.json())
			.then(users => console.log(users));
	};

	return (
		/* "handleSubmit" will validate your inputs before invoking "onSubmit" */
		// <form onSubmit={handleSubmit(onSubmit)}>
		// 	{/* register your input into the hook by invoking the "register" function */}
		// 	<input {...register('login', { required: true })} />
		// 	{errors.login && <span>This field is required</span>}
		//
		// 	{/* include validation with required or other standard HTML validation rules */}
		// 	<input {...register('password', { required: true })} />
		// 	{/* errors will return when field validation fails  */}
		// 	{errors.password && <span>This field is required</span>}
		//
		// 	<input type="submit" />
		// </form>
		<div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
			<div className="sm:mx-auto sm:w-full sm:max-w-sm">
				<Image
					className="mx-auto h-10 w-auto"
					src=""
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
					</div>

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
