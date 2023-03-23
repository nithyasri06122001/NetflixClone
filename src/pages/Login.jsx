import { onAuthStateChanged, signInWithEmailAndPassword } from "firebase/auth";
import { React, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import BackgroundImage from "../components/BackgroundImage";
import Header from "../components/Header";
import { firebaseAuth } from "../utils/firebase_config";

function Signup() {
  const navigate = useNavigate();
  const [formValues, setFormValues] = useState({
    email: "",
    password: "",
  });
  onAuthStateChanged(firebaseAuth, (currentUser) => {
    if (currentUser) navigate("/home");
  });
  
  const [error,setError]=useState();
  const handleLogIn = async () => {
    try {
      const { email, password } = formValues;
      await signInWithEmailAndPassword(firebaseAuth, email, password);
    } catch (err) {
      console.log(err.message)
         setError("Enter Valid Credentials");
    }
  };

  return (
    <Container>
      <BackgroundImage />
      <div className="content">
        <Header />
        <div className="form-container flex column a-center j-center">
          <div className="form flex column a-center j-center">
            <div className="title">
              <h1>Sign in</h1>
            </div>
            <div className="container flex column">
              <input
                type="email"
                placeholder="Email Address"
                name="email"
                value={formValues.email}
                onClick={()=>{setError("")}}
                onChange={(e) =>
                  setFormValues({
                    ...formValues,
                    [e.target.name]: e.target.value,
                  })
                 
                }
              />

              <input
                type="password"
                placeholder="Password"
                name="password"
                value={formValues.password}
                onClick={()=>{setError("")}}
                onChange={(e) =>
                  setFormValues({
                    ...formValues,
                    [e.target.name]: e.target.value,
                  })
                }
              />
              <button onClick={handleLogIn}>Log in</button>
            </div>
          </div>
              {error && <h1>{error}</h1>}
        </div>
      </div>
    </Container>
  );
}
const Container = styled.div`
height:100vh;
  position: fixed;
  .content {
    position: absolute;
    top: 0;
    left: 0;
    background: rgb(0 0 0 / 40%);
    background-image: linear-gradient(
      to top,
      rgba(0, 0, 0, 0.8) 0,
      rgba(0, 0, 0, 0) 60%,
      rgba(0, 0, 0, 0.8) 100%
    );
    height: 100vh;
    width: 100vw;
    display: grid;
    grid-template-rows: 15vh 85vh;
    .form-container {
      gap: 2rem;
      height: 85vh;
      .form {
        padding: 2rem;
        background-color: #000000b0;
        width: 25vw;
        gap: 2rem;
        color: white;
        .container {
          gap: 2rem;
          input {
            padding: 0.5rem 1rem;
            width: 15rem;
            transition: color 250ms cubic-bezier(0.5, 0, 0.1, 1) 0s;
            width: 100%;
            color: transparent;
            line-height: 1.5rem;
            height: 56px;
            padding: 15px;
            border-radius: 3px;
          }
          button {
            padding: 0.5rem 1rem;
            background-color: #e50914;
            border: none;
            color: white;
            cursor: pointer;
            border-radius: 0.2rem;
            font-weight: bolder;
            font-size: 1.05rem;
          }
        }
      }
    }
  }
`;
export default Signup;
