import { onAuthStateChanged, signInWithEmailAndPassword } from "firebase/auth";
import { React, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
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

  const [error, setError] = useState();
  const handleLogIn = async () => {
    try {
      const { email, password } = formValues;
      await signInWithEmailAndPassword(firebaseAuth, email, password);
    } catch (err) {
      console.log(err.message);
      setError(
        "Sorry, we can't find an account with this email address. Please try again or create a new account."
      );
    }
  };

  return (
    <Container>
      <BackgroundImage />
      <div className="content">
        <Header />
        <div className="form-container flex column a-center j-center">
          <div className="form flex column  j-center">
            <div className="title">
              <h1>Sign in</h1>
            </div>
            {error && <div className="error-pop">{error}</div>}
            <div className="container flex column">
              <input
                type="email"
                placeholder="Email Address"
                name="email"
                value={formValues.email}
                onClick={() => {
                  setError("");
                }}
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
                onClick={() => {
                  setError("");
                }}
                onChange={(e) =>
                  setFormValues({
                    ...formValues,
                    [e.target.name]: e.target.value,
                  })
                }
              />
              <button onClick={handleLogIn}>Log in</button>
            </div>
            <div className="flex new_ac">
              <div>New to Netflix? </div>
              <Link to="/"> Sign up now.</Link>
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
}
const Container = styled.div`
  height: 100vh;
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
        width: 100%;
        max-width: 320px;
        gap: 2rem;
        color: white;
        .container {
          gap: 2rem;
          input {
            height: 50px;
            padding: 0.5rem 1rem;
            width: 15rem;
            transition: color 250ms cubic-bezier(0.5, 0, 0.1, 1) 0s;
            width: 100%;
            color: white;
            line-height: 1.5rem;
            padding: 15px;
            border: none;
            border-radius: 3px;
            background-color: #333;
          }
          button {
            height: 50px;
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
    .error-pop {
      background-color: #fc7500;
      border-radius: 4px;
      padding: 10px 20px;
      font-size: 14px;
    }
    .new_ac {
      color: #737373;
      font-size: 16px;
      a {
        margin-left: 4px;
        color: #fff;
        text-decoration: none;
        font-weight: 400;
        &:hover {
          text-decoration: underline;
        }
      }
    }
  }
`;
export default Signup;
