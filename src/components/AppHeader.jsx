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

    return (
        <Menubar
            model={items}
            start={<h3 className="m-0">Tools Hub</h3>}
        />
    );
};

export default AppHeader;