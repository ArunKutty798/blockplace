import React, { useEffect, useState } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { Profile } from "./components";
import { useEagerConnect } from "./hooks/useEagerConnect";
import { CompletedProject, PendingProject, SignIn, SignUp } from "./pages";
import { CreateProject } from "./pages";

const App: React.FC = () => {
  const [isUser, setIsUser] = useState<"user" | "guest" | null>(null);

  useEagerConnect();

  useEffect(() => {
    const data = localStorage.getItem("token");

    if (data) setIsUser("user");
    else setIsUser("guest");
  }, []);

  return (
    <div>
      <Routes>
        <Route path="/login" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
      </Routes>
      {isUser === "guest" && (
        <Routes>
          <Route path="/" element={<Navigate to="/login" />} />
        </Routes>
      )}
      {isUser === "user" && (
        <div className="app">
          <Profile />
          <div className="profile_route_wrapper">
            <Routes>
              <Route path="/" element={<CreateProject />} />
              <Route path="/completed-project" element={<CompletedProject />} />
              <Route path="/pending-project" element={<PendingProject />} />
            </Routes>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
