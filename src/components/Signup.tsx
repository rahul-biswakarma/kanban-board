import React, { useEffect } from "react";
import { auth, googleAuthProvider } from "../libs/firebase";
import { SignupPropsType } from "../libs/types/Signup";

import { database } from "../libs/firebase";

const Signup: React.FC<SignupPropsType> = (props) => {
	// States
	const { userKey, setUserKey, setUser, setUserSignedIn } = props;

	const signupWithGoogle = async () => {
		const result = await auth.signInWithPopup(googleAuthProvider);
		const user = result.user;
		setUser(user);
		setUserSignedIn(true);
		if (user) {
			const usersRef = database.ref(`users`);
			const userRef = usersRef.orderByChild("email").equalTo(user.email);
			userRef.once("value").then((snapshot) => {
				if (snapshot.exists()) {
					const userKey = Object.keys(snapshot.val())[0];
					setUserKey(userKey);
					let currentUser = database.ref(`users/${userKey}`);
					currentUser.update({
						email: user.email,
						photoURL: user.photoURL,
						displayName: user.displayName,
					});
				} else {
					const newUserRef = usersRef.push();
					newUserRef.set(
						{
							email: user.email,
							photoURL: user.photoURL,
							displayName: user.displayName,
							notifications: [],
							boards: [],
						},
						(error) => {
							if (error) {
								console.log("Error on Create Board Form: ", error);
							} else {
								setUserKey(newUserRef.key);
							}
						}
					);
				}
			});
		}
	};

	return (
		<div className="flex flex-col gap-[3rem] py-[5rem] justify-center items-center w-full h-full overflow-hidden">
			<h1 className="text-6xl font-bold z-10">Kanban Kraft</h1>
			<p className="text-text_2 max-w-[800px] z-10">
				Welcome to Kanban Kraft! To access all the features and tools this
				website has to offer, please login using Google Authentication. If you
				don't have an account yet, you can easily create one by clicking on the
				"Continue" button. Your account will allow you to create and manage your
				personal kanban boards, collaborate with team members, and access all of
				our premium features. With Kanban Kraft, you'll be able to stay
				organized and on track with your tasks and projects. Login now and
				experience the benefits of kanban for yourself!
			</p>
			<button
				className="flex gap-3 bg-blue-300 p-[1rem_2rem] rounded font-semibold uppercase cursor-pointer hover:bg-blue-400 transition-all duration-300 ease-in-out z-10"
				onClick={() => signupWithGoogle()}
			>
				<svg
					className="w-6 h-6"
					xmlns="http://www.w3.org/2000/svg"
					viewBox="0 0 24 24"
				>
					<path
						fill="#4285F4"
						d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
					/>
					<path
						fill="#34A853"
						d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
					/>
					<path
						fill="#FBBC05"
						d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
					/>
					<path
						fill="#EA4335"
						d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
					/>
					<path
						fill="none"
						d="M1 1h22v22H1z"
					/>
				</svg>
				Continue
			</button>
			<div className="w-full max-w-[100vw] h-[100vh] fixed top-[0px] left-[0px] z-[2] bg-ballon bg-no-repeat bg-[top_8rem_left] overflow-hidden">
				<div className="w-full max-w-[100vw] h-[100vh] fixed top-[0px] left-[0px] z-[2] bg-cactus-pattern bg-repeat-x bg-bottom"></div>
			</div>
		</div>
	);
};

export default Signup;
