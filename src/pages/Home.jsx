import AppHeader from '../components/AppHeader';
import ToolCard from '../components/ToolCard';

const Home = () => {
    return (
        <>
            <AppHeader />

            <div className="p-4">
                <h1>Free Online Tools</h1>

                <div className="grid">
                    <div className="col-12 md:col-4">
                        <ToolCard
                            title="Age Calculator"
                            description="Calculate your exact age."
                            path="/age-calculator"
                        />
                    </div>
                    <div className="col-12 md:col-4">
                        <ToolCard
                            title="Image to PDF"
                            description="Convert images to a PDF file."
                            path="/image-to-pdf"
                        />
                    </div>
                </div>
            </div>
        </>
    );
};

export default Home;