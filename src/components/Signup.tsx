import React from "react";
import { auth, googleAuthProvider } from "../libs/firebase";
import { SignupPropsType } from "../libs/types/Signup";

const Signup: React.FC<SignupPropsType> = (props) => {
	const signupWithGoogle = async () => {
		await auth.signInWithPopup(googleAuthProvider);
		props.setUser(auth.currentUser);
		props.setUserSignedIn(true);
	};

	return (
		<div className="flex justify-center items-center w-full h-full">
			Signup <button onClick={() => signupWithGoogle()}>Sign up</button>
		</div>
	);
};

export default Signup;
