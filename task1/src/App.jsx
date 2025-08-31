import gsap from 'gsap';
import { ScrollTrigger, SplitText } from "gsap/all";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Navbar from '../src/front/components/landingPage/Navbar.jsx';
import Hero from '../src/front/components/landingPage/Hero.jsx'
import BestSellingShoes from '../src/front/components/landingPage/BestSellingShoes.jsx'
import About from '../src/front/components/landingPage/About.jsx'
import Menu from '../src/front/components/landingPage/Menu.jsx'
import Contact from '../src/front/components/landingPage/Contact.jsx'
import Jordan from '../src/front/components/landingPage/Jordan.jsx'
import SignIn from '../src/front/pages/Sign/SignIn.jsx'
import SignUp from '../src/front/pages/Sign/SignUp.jsx'
import Store from '../src/front/pages/Store/Store.jsx'; 
import Orders from '../src/front/pages/Store/Orders.jsx';
import TopStor from './front/pages/Store/TopStor.jsx';  
gsap.registerPlugin(ScrollTrigger, SplitText);

const App = () => {
  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <main>
              <Navbar />
              <Hero />
              <BestSellingShoes />
              <About />
              <Jordan />
              <Menu />
              <Contact />
            </main>
          }
        />
        <Route path="/signIn" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/store/*" element={<Store />} />
        <Route path="/topstor" element={<TopStor />} />
        <Route path="/orders" element={<Orders />} />

      </Routes>
    </Router>
  )
}

export default App;
