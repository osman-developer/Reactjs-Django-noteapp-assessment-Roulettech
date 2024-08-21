import { useState } from "react";
import api from "../api";
import { useNavigate } from "react-router-dom";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../constants";
import "../styles/Form.css";
import LoadingIndicator from "./LoadingIndicator";

//dynamic props so for login or register
function Form({ route, method }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const textName = method === "login" ? "Login" : "Register";
  const secondBtnTextName = method === "login" ? "Register" : "Login";

  const handleSubmit = async (e) => {
    setLoading(true);
    //bcz we don;t want to reload the page, so we call this func
    e.preventDefault();
    try {
      const res = await api.post(route, { username, password });
      if (method === "login") {
        localStorage.setItem(ACCESS_TOKEN, res.data.access);
        localStorage.setItem(REFRESH_TOKEN, res.data.refresh);
        navigate("/");
      } else {
        navigate("/login");
      }
    } catch (err) {
      alert(err);
    } finally {
      setLoading(false);
    }
  };

  const navigateToPage = () => {
    if (method === "login") {
      navigate("/register");
    } else {
      navigate("/login");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="form-container">
      <h1>{textName}</h1>
      <input
        className="form-input"
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder="Username"
      />
      <input
        className="form-input"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
      />
      {loading && <LoadingIndicator />}
      <button className="form-button" type="submit">
        {textName}
      </button>
      <button
        className="form-register-button"
        onClick={() => navigateToPage()}
        type="submit"
      >
        {secondBtnTextName}
      </button>
    </form>
  );
}

export default Form;
