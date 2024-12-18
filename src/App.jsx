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
        <BrowserRouter> {/* BrowserRouter pour l'ensemble de l'application */}
            <Header />  {/* Header pour l'en-tête */}
            <main> {/* Main pour le contenu */}
                <Routes> {/* Routes pour la navigation */}
                    <Route path="/" element={<Home />} /> {/* Route pour la page d'accueil */}
                    <Route path="/add-recipe" element={<AddRecipe />} /> {/* Route pour la page d'ajout de recette */}
                    <Route path="/recipe/:id" element={<Recipe />} />   {/* Route pour la page de détail d'une recette */}
                    <Route path="/favorite" element={<Favorite />} /> {/* Route pour la page de favoris */}
                </Routes>
            </main>
            <Footer />
        </BrowserRouter>
    );
};

export default App;

