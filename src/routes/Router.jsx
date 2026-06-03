import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from '../pages/Home';
import AgeCalculator from '../pages/AgeCalculator';
import ImageToPdf from '../pages/ImageToPdf';

const Router = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/age-calculator" element={<AgeCalculator />} />
                <Route path="/image-to-pdf" element={<ImageToPdf />} />
            </Routes>
        </BrowserRouter>
    );
};

export default Router;