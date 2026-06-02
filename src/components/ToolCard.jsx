import { Card } from 'primereact/card';
import { Button } from 'primereact/button';
import { useNavigate } from 'react-router-dom';

const ToolCard = ({ title, description, path }) => {
    const navigate = useNavigate();

    return (
        <Card title={title}>
            <p>{description}</p>

            <Button
                label="Open Tool"
                icon="pi pi-arrow-right"
                onClick={() => navigate(path)}
            />
        </Card>
    );
};

export default ToolCard;
