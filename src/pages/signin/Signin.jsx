import "./Signin.css";
import Header from "../../components/Header";
import { useContext, useState } from "react";
import { handlerError, notification } from "../../utils/notification";
import { signin } from "../../api/auth";
import { saveDataToLocalStorage } from "../../utils/localStorage";
import Spinner from "../../components/Suspense/Loading";
import { AppContext } from "../../context/AppContext";
import { Link, useNavigate } from "react-router-dom";

const Signin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const { loggedIn } = useContext(AppContext);
  const navigate = useNavigate();
  const handleSignIn = async (e) => {
    e.preventDefault();
    const data = {
      email: email,
      password: password,
    };
    setLoading(true);
    try {
      const res = await signin(data);
      saveDataToLocalStorage(res);
      notification("success", res?.message);
      loggedIn(res);
      navigate("/dashboard");
    } catch (err) {
      handlerError(err);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="signup-container">
      <Header />
      <div className="signup-form__center">
        <div className="form-group col col-lg-3 col-md-6 col-sm-8">
          <label htmlFor="email">Email</label>
          <input
            type="text"
            name="email"
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
            className="form-control"
          />
        </div>
        <div className="form-group col col-lg-3 col-md-6 col-sm-8">
          <label htmlFor="password">Password</label>
          <div className="row">
            <div className="col-12">
              <input
                type="password"
                name="password"
                placeholder="Password"
                onChange={(e) => setPassword(e.target.value)}
                className="form-control"
              />
            </div>
          </div>
        </div>
        <div className="signup-form__buttons col col-lg-3 col-md-6 col-sm-8 ">
          <button
            className="btn btn-primary col btn-custom"
            onClick={(e) => handleSignIn(e)}
          >
            {loading && <Spinner type="sm" />}
            Sign in
          </button>
          <div className="col mt-3 center">
            <span>
              Don't have an account?{" "}
              <Link to="/signup" style={{ color: "blue" }}>
                Signup
              </Link>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signin;
