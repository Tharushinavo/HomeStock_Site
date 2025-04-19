
import './App.css';
import CategoryList from './components/CategoryList';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Footer from './components/Footer'; 
import Header from './components/Header';
import AddFruits from './components/AddFruits';
import ProductCharts from './components/ProductCharts';


function App() {
  return (
    <Router>
    <div className="App" style={{ backgroundImage: `url('/images/background2.jpg')`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
      <Header/> 
      <Routes>
          <Route path="/cate" element={<CategoryList/>} />
          <Route path="/add" element={<AddFruits/>} />
          <Route path="/charts" element={<ProductCharts/>} />
          

        </Routes>
        <Footer/>
    </div>
    </Router>
  );
}

export default App;
