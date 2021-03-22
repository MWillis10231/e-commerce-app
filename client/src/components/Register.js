import { Link } from "react-router-dom";
import RegisterForm from "./RegisterForm";

export default function Register() {
  return (
    <div className="Content">
      <div className="FormContainer">
        <header><h3>Register</h3></header>
        <p>Please fill in the form below to register for your Nile account.</p>
        <RegisterForm />
        <p>Already have an account? Log-in <Link to="/login">here</Link></p>
      </div>
    </div>
  );
}
