import Hero from '../../components/Hero/Hero';
import PopularRecipes from '../../components/PopularRecipes/PopularRecipes';
import RecipeList  from "../../components/RecipeList/RecipeList.jsx";

const Home = () => {
    return (
        <div className="home-page">
            <Hero/>
            <PopularRecipes/>
            <RecipeList/>
        </div>
    );
};

export default Home;
