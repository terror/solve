import React from 'react';

import Navbar from '../../components/Navbar';
import Editor from '../../components/Customer/Editor';
import Problem from '../../components/Customer/Problem';
import EditorProvider from '../../providers/EditorProvider';
import ProblemProvider from '../../providers/ProblemProvider';
import SplitPane from 'react-split-pane';
import WorkspaceSave from '../../components/Customer/Dashboard/WorkspaceSave';

interface DashboardProps {}

const Dashboard: React.FC<DashboardProps> = () => {
    return (
        <div>
            <Navbar />
            <SplitPane
                style={{ position: 'relative' }}
                split="vertical"
                primary="second"
                defaultSize={parseInt(localStorage.getItem('splitpos')!) || '50%'}
                onChange={(size: any) => localStorage.setItem('splitpos', size)}
            >
                <ProblemProvider>
                    <Problem />
                </ProblemProvider>
                <EditorProvider>
                    <Editor />
                </EditorProvider>
            </SplitPane>
            <WorkspaceSave />
        </div>
    );
};

export default Dashboard;
