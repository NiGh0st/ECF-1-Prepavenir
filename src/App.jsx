import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Header from './components/Header/Header.jsx';
import Footer from './components/Footer/Footer.jsx';
import Home from './Pages/Home/Home';
import AddRecipe from './Pages/AddRecipe/AddRecipe';
import Recipe from './Pages/Recipes/Recipes';
import Favorite from './Pages/Favorite/Favorite';

import './App.css';

const App = () => {
    return (
        <BrowserRouter>
            <Header />
            <main>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/add-recipe" element={<AddRecipe />} />
                    <Route path="/recipe/:id" element={<Recipe />} />
                    <Route path="/favorite" element={<Favorite />} /> {/* Route pour la page de favoris */}
                </Routes>
            </main>
            <Footer />
        </BrowserRouter>
    );
};

export default App;
