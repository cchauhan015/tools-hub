import AppHeader from '../components/AppHeader';
import ToolCard from '../components/ToolCard';

const Home = () => {
    return (
        <>
            <AppHeader />

            <div className="flex flex-column align-items-center mb-5 text-center">
                <div className="colorful-badge inline-flex align-items-center justify-content-center p-2 mb-3" style={{ borderRadius: '50px', fontWeight: 600, fontSize: '0.875rem' }}>
                    <i className="pi pi-sparkles mr-2"></i> Premium Web Tools
                </div>
                <h1 className="m-0 mb-3 text-6xl md:text-7xl">Free Online Tools</h1>
                <p className="m-0 text-xl" style={{ color: 'var(--text)', maxWidth: '600px' }}>
                    A collection of beautifully designed, fast, and secure client-side utilities to help with your daily tasks.
                </p>
            </div>

            <div className="p-2 md:p-4">
                <div className="grid" style={{ gap: '1.5rem', margin: 0 }}>
                    <div className="col-12 md:col-6 lg:col-4 p-0">
                        <ToolCard
                            title="Age Calculator"
                            description="Calculate your exact age in years, months, and days instantly."
                            path="/age-calculator"
                            icon="pi pi-calendar"
                        />
                    </div>
                    <div className="col-12 md:col-6 lg:col-4 p-0">
                        <ToolCard
                            title="Image to PDF"
                            description="Convert images to a PDF file securely in your browser."
                            path="/image-to-pdf"
                            icon="pi pi-images"
                        />
                    </div>
                </div>
            </div>
        </>
    );
};

export default Home;