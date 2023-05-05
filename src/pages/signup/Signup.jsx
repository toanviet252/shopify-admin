import { useNavigate } from "react-router-dom";
import Header from "../../components/Header";
import "./Signup.css";
import { signUp } from "../../api/auth";
import { handlerError, notification } from "../../utils/notification";
import { useState } from "react";
import Spinner from "../../components/Suspense/Loading";

const Signup = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const onSubmitForm = async (e) => {
    e.preventDefault();
    const data = {};
    const formdata = new FormData(e.target);
    for (const [key, value] of formdata.entries()) {
      data[key] = value;
    }
    setLoading(true);
    try {
      const res = await signUp(data);
      notification("success", res.message);
      navigate("/signin");
    } catch (err) {
      handlerError(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="signup-container">
      <Header />
      <div className="signup-form">
        <form className="form-container" onSubmit={onSubmitForm}>
          <div className="form-group  col col-lg-3 col-md-6 col-sm-8 ">
            <label htmlFor="fullname">Fullname</label>
            <input
              type="text"
              name="fullName"
              placeholder="Fullname"
              className="form-control"
            />
          </div>
          <div className="form-group col col-lg-3 col-md-6 col-sm-8 ">
            <label htmlFor="email">Email</label>
            <input
              type="text"
              name="email"
              placeholder="Email"
              className="form-control"
            />
          </div>
          <div className="form-group col col-lg-3 col-md-6 col-sm-8 ">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              name="password"
              placeholder="Password"
              className="form-control"
            />
          </div>
          <div className="form-group col col-lg-3 col-md-6 col-sm-8 ">
            <label htmlFor="password">Confirm Password</label>
            <input
              type="password"
              name="confirmPassword"
              placeholder="Password"
              className="form-control"
            />
          </div>
          <div className="form-group col col-lg-3 col-md-6 col-sm-8 ">
            <label htmlFor="phone">Phone Number</label>
            <input
              type="phone"
              name="phoneNumber"
              placeholder="Phone"
              className="form-control"
            />
          </div>
          <div className="form-group col col-lg-3 col-md-6 col-sm-8 ">
            <label htmlFor="phone">Role</label>
            <select className="custom-select" name="role">
              <option value="admin">Admin</option>
              <option value="moderator">Moderator</option>
            </select>
          </div>
          <div className="singup-form__buttons col col-lg-3 col-md-6 col-sm-8 ">
            <button
              className="btn btn-primary btn-block btn-custom"
              type="submit"
            >
              {loading && <Spinner type="sm" />}
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signup;
