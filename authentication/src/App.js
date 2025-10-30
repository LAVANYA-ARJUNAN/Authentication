import React, { useState } from "react";
import Register from "./Register";
import Login from "./Login";
import ResetPassword from "./Reset";

function App() {
  const [page, setPage] = useState("login"); // default to login

  const goToLogin = () => setPage("login");

  return (
    <>
      {/* Navbar */}
      <nav className="navbar navbar-dark bg-dark mb-5 ">
        <div className="container">
          <img src="/download.jpg" alt="logo" height={50} width={100} ></img>
          {/* <span className="navbar-brand mb-0 h1">My Company</span> */}
          <div>
            <button
              className={`btn btn-sm me-2 ${page === "register" ? "btn-light" : "btn-outline-light"}`}
              onClick={() => setPage("register")}
            >
              Register
            </button>
            <button
              className={`btn btn-sm ${page === "login" ? "btn-light" : "btn-outline-light"}`}
              onClick={() => setPage("login")}
            >
              Login
            </button>
          </div>
        </div>
      </nav>

      {/* Page content */}
      <div className="d-flex justify-content-center">
        <div className="card p-4 shadow" style={{ width: "100%", maxWidth: "400px" }}>
          {page === "register" && <Register onLogin={goToLogin} />}
          {page === "login" && <Login onReset={() => setPage("reset")} onRegister={() => setPage("register")} />}
          {page === "reset" && <ResetPassword onLogin={goToLogin} />}
        </div>
      </div>
    </>
  );
}

export default App;
