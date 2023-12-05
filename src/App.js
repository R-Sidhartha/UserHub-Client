import React from "react";
import { Route,BrowserRouter as Router, Routes } from "react-router-dom";
import Header from "./Components/Header";
import Main from "./Components/UserList/Main";
import TeamList from "./Components/Team/TeamList";


function App() {
  return (
    <div className="App">
       <Router>
        <Header/>
        <Routes>
          <Route exact path="/" element={<Main/>} />
          <Route exact path="/teams" element={<TeamList/>} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
