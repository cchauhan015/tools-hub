import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from '../pages/Home';
import AgeCalculator from '../pages/AgeCalculator';

const Router = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/age-calculator" element={<AgeCalculator />} />
            </Routes>
        </BrowserRouter>
    );
};

export default Router;