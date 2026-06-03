import { Menubar } from 'primereact/menubar';
import { useNavigate } from 'react-router-dom';

const AppHeader = () => {
    const navigate = useNavigate();

    const items = [
        {
            label: 'Home',
            icon: 'pi pi-home',
            command: () => navigate('/')
        }
    ];

    const start = (
        <div className="flex align-items-center gap-2 cursor-pointer" onClick={() => navigate('/')}>
            <i className="pi pi-box text-2xl" style={{ color: 'var(--accent)' }}></i>
            <h3 className="m-0 font-bold text-xl" style={{ color: 'var(--text-h)' }}>Tools Hub</h3>
        </div>
    );

    return (
        <div style={{
            position: 'sticky',
            top: '1rem',
            zIndex: 1000,
            marginBottom: '2rem'
        }}>
            <Menubar
                model={items}
                start={start}
                style={{
                    background: 'var(--glass-bg)',
                    backdropFilter: 'blur(12px)',
                    WebkitBackdropFilter: 'blur(12px)',
                    border: '1px solid var(--glass-border)',
                    boxShadow: 'var(--glass-shadow)',
                    borderRadius: '16px',
                    padding: '0.5rem 1.5rem'
                }}
            />
        </div>
    );
};

export default AppHeader;