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
		<div className="flex justify-center items-center w-full h-full">
			Signup <button onClick={() => signupWithGoogle()}>Sign up</button>
		</div>
	);
};

export default Signup;
