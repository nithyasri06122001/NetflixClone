import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
} from "firebase/auth";
import { React, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import BackgroundImage from "../components/BackgroundImage";
import Header from "../components/Header";
import { firebaseAuth } from "../utils/firebase_config";

function Signup() {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const [formValues, setFormValues] = useState({
    email: "",
    password: "",
  });
  onAuthStateChanged(firebaseAuth, (currentUser) => {
    if (currentUser) navigate("/");
  });

  const handleSignIn = async () => {
    try {
      const { email, password } = formValues;
      await createUserWithEmailAndPassword(firebaseAuth, email, password);
      navigate("/home");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Container showPassword={showPassword}>
      <BackgroundImage />
      <div className="content">
        <Header login />
        <div className="body flex column a-center j-center">
          <div className="text flex column">
            <h1>Unlimited movies, TV shows and more.</h1>
            <p className="mt-1">Watch anywhere. Cancel anytime.</p>
            <p className="para-caption">
              Ready to watch? Enter your email to create or restart your
              membership.
            </p>
          </div>
          <div className="form">
            <input
              required
              type="email"
              placeholder="Email Address"
              name="email"
              value={formValues.email}
              onChange={(e) =>
                setFormValues({
                  ...formValues,
                  [e.target.name]: e.target.value,
                })
              }
            />
            {showPassword && (
              <input
                type="password"
                placeholder="Password"
                name="password"
                value={formValues.password}
                onChange={(e) =>
                  setFormValues({
                    ...formValues,
                    [e.target.name]: e.target.value,
                  })
                }
              />
            )}
            {!showPassword && (
              <button onClick={() => setShowPassword(true)}>Get started</button>
            )}
          </div>
          <button className="sign__up"onClick={handleSignIn}>Sign Up</button>
        </div>
      </div>
    </Container>
  );
}
const Container = styled.div`
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
    .para-caption {
      margin: 0 auto;
      margin-bottom:10px;
      font-weight: 400;
      font-size: 1.25rem;
      line-height: 1.875rem;
    }
    .body {
      .text {
        gap: 1rem;
        text-align: center;
        padding: 0 26px;
        h1 {
          font-size: 3rem;
          font-weight: 900;
        }
      }
      .form {
        display: grid;
        grid-template-columns: ${({ showPassword }) =>
          showPassword ? "1fr 1fr" : "2fr 1fr"};
        width: 60%;
        input {
          color: black;
          border: none;
          padding: 24px 16px;
          font-size: 1.2rem;
          border: 1px solid #605f5f;
          transition: color 250ms cubic-bezier(0.5, 0, 0.1, 1) 0s;
          width: 100%;
          color: white;
          line-height: 1.5rem;
          background: rgba(0,0,0,.75);
          &:focus {
            outline: none;
          }
        }
        button {
          padding:24px 16px ;
          background-color: #e50914;
          border: none;
          color: white;
          cursor: pointer;
          font-weight: bolder;
          font-size: 1.05rem;
        }
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
      .sign__up{
        margin-top:10px;
        padding: 16px 50px;
      }
    }
  }
`;
export default Signup;
