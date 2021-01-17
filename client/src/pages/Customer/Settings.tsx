import React from 'react';

import Navbar from '../../components/Navbar';
import SettingsForm from '../../components/Customer/Settings/SettingsForm';

interface SettingsProps {}

const Settings: React.FC<SettingsProps> = () => {
    return (
        <>
            <Navbar />
            <SettingsForm />
        </>
    );
};

export default Settings;
