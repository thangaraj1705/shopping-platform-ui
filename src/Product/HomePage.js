
import Advertisements from './Advertisements';
import Offers from './Offers';

const HomePage = () => {
    return (

        <div className="homepage">
       <Advertisements />
       <h1>Product Offers</h1>
       <Offers />
        </div>

    );
};

export default HomePage;
