import React from "react";
import { BrowserRouter as Router} from 'react-router-dom';
import AppRouter from "./components/routes/appRouter";
import Header from "./components/page/header";
function App() {

  return (
    <div>
        <Router>
            <Header  />
             <AppRouter/>
        </Router>
    </div>
  );
}

export default App;
