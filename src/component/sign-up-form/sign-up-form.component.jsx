import { useState } from "react";
import {
  createAuthUserWithEmailAndPassword,
  createUserDocFromAuth,
} from "../../utils/firebase/firebase.utils";

import "./sign-up-form.styles.scss";

import FormInput from "../form-input/form-input.component";

import Button from "../button/button.component";

const defaultFormFields = {
  displayName: "",
  email: "",
  password: "",
  confirmPassword: "",
};

const SignUp = () => {
  const [formFields, setFormFields] = useState(defaultFormFields);

  const { displayName, email, password, confirmPassword } = formFields;

  const resetFormFields = () => {
    setFormFields(defaultFormFields);
  };

  const handelChange = (event) => {
    const { name, value } = event.target;
    setFormFields({ ...formFields, [name]: value });
  };

  const handelSubmit = async (event) => {
    event.preventDefault();
    if (password !== confirmPassword) {
      alert("Password do not match");
      return;
    }

    try {
      const { user } = await createAuthUserWithEmailAndPassword(
        email,
        password
      );
      const userDocRef = await createUserDocFromAuth(user, {
        displayName: displayName,
      });
      resetFormFields();
    } catch (error) {
      if (error.code === "auth/email-already-in-use") {
        alert("Cannot create user email already in use");
      } else {
        alert(`User creation encountered an error: ${error.message}`);
      }
    }
  };

  return (
    <div className="sign-up-container">
      <h2>Dont have an account?</h2>
      <span>sign up with your email and password</span>

      <form onSubmit={handelSubmit}>
        <FormInput
          label={"Display Name"}
          name={"displayName"}
          type={"text"}
          onChange={handelChange}
          value={displayName}
        />
        <FormInput
          label={"Email"}
          type="email"
          name="email"
          required
          onChange={handelChange}
          value={email}
        />
        <FormInput
          label={"Password"}
          type="password"
          name="password"
          required
          onChange={handelChange}
          value={password}
        />
        <FormInput
          label={"Confirm Password"}
          type="password"
          name="confirmPassword"
          required
          onChange={handelChange}
          value={confirmPassword}
        />
        {/* <button type="submit">Sign Up</button> */}
        <Button>Sign Up</Button>
      </form>
    </div>
  );
};

export default SignUp;
