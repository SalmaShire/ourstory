import { BrowserRouter as Router, Route, Routes, NavLink } from "react-router-dom";
import Home from "./pages/Home";
import Community from "./pages/Community";
import "./styles/templatemo-comparto.css";

function App() {
  return (
    <Router>
      <header className="tm-header">
        <div className="tm-header-inner">
          <h1 className="tm-site-name">OurStory</h1>
          <nav className="tm-nav-container">
            <ul className="tm-nav">
              <li className="tm-nav-item">
                <NavLink to="/" className="tm-nav-link">📍 Maps</NavLink>
              </li>
              <li className="tm-nav-item">
                <NavLink to="/community" className="tm-nav-link">💬 Community Feed</NavLink>
              </li>
            </ul>
          </nav>
        </div>
      </header>

      {/* Page Content */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/community" element={<Community />} />
      </Routes>
    </Router>
  );
}

export default App;




























// import { BrowserRouter as Router, Route, Routes, NavLink } from "react-router-dom";
// import Home from "./pages/Home";
// import Community from "./pages/Community";
// import "./styles/templatemo-comparto.css";

// function App() {
//   return (
//     <Router>
//       <header className="tm-header">
//         <div className="tm-header-inner">
//           <h1 className="tm-site-name">OurStory</h1>
//           <nav className="tm-nav-container">
//             <ul className="tm-nav">
//               <li className="tm-nav-item">
//                 <NavLink to="/" className="tm-nav-link">📍 Maps</NavLink>
//               </li>
//               <li className="tm-nav-item">
//                 <NavLink to="/community" className="tm-nav-link">💬 Community Feed</NavLink>
//               </li>
//             </ul>
//           </nav>
//         </div>
//       </header>

//       {/* Page Content */}
//       <Routes>
//         <Route path="/" element={<Home />} />
//         <Route path="/community" element={<Community />} />
//       </Routes>
//     </Router>
//   );
// }

// export default App;
