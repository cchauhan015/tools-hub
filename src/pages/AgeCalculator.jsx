import { useState } from 'react';
import { Calendar } from 'primereact/calendar';
import { Button } from 'primereact/button';
import { Card } from 'primereact/card';
import { differenceInYears } from 'date-fns';
import AppHeader from '../components/AppHeader';

const AgeCalculator = () => {
    const [birthDate, setBirthDate] = useState(null);
    const [age, setAge] = useState(null);

    const calculateAge = () => {
        if (!birthDate) return;

        const years = differenceInYears(
            new Date(),
            new Date(birthDate)
        );

        setAge(years);
    };

    return (
        <>
            <AppHeader />

            <div className="p-4">
                <Card title="Age Calculator">
                    <div className="flex flex-column gap-3">
                        <Calendar
                            value={birthDate}
                            onChange={(e) => setBirthDate(e.value)}
                            showIcon
                            dateFormat="dd/mm/yy"
                            placeholder="Select Birth Date"
                        />

                        <Button
                            label="Calculate"
                            icon="pi pi-calculator"
                            onClick={calculateAge}
                        />

                        {age !== null && (
                            <div>
                                <h2>Your Age: {age} Years</h2>
                            </div>
                        )}
                    </div>
                </Card>
            </div>
        </>
    );
};

export default AgeCalculator;