import { Button } from 'primereact/button';
import { useNavigate } from 'react-router-dom';

const ToolCard = ({ title, description, path, icon }) => {
    const navigate = useNavigate();

    return (
        <div 
            className="tool-card flex flex-column p-4" 
            onClick={() => navigate(path)}
        >
            <div className="flex align-items-center mb-3">
                <div 
                    className="flex align-items-center justify-content-center border-circle" 
                    style={{ width: '48px', height: '48px', background: 'var(--accent-bg)', color: 'var(--accent)' }}
                >
                    <i className={`${icon || 'pi pi-cog'} text-xl`}></i>
                </div>
            </div>
            
            <h3 className="m-0 mb-2 font-bold text-xl" style={{ color: 'var(--text-h)' }}>{title}</h3>
            
            <p className="m-0 flex-grow-1" style={{ color: 'var(--text)', lineHeight: '1.5' }}>
                {description}
            </p>

            <div className="mt-4 pt-3 flex align-items-center justify-content-between" style={{ borderTop: '1px solid var(--border)' }}>
                <span style={{ fontSize: '0.875rem', fontWeight: 600, color: 'var(--accent)' }}>Open Tool</span>
                <Button
                    icon="pi pi-arrow-right"
                    rounded
                    text
                    severity="secondary"
                    aria-label={`Open ${title}`}
                    style={{ width: '2rem', height: '2rem' }}
                />
            </div>
        </div>
    );
};

export default ToolCard;
