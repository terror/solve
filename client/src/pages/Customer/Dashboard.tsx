import React from 'react';

import Editor from '../../components/Customer/Dashboard/Editor';
import Problem from '../../components/Customer/Dashboard/Problem';
import EditorProvider from '../../providers/EditorProvider';
import ProblemProvider from '../../providers/ProblemProvider';
import SplitPane from 'react-split-pane';

interface DashboardProps {}

const Dashboard: React.FC<DashboardProps> = () => {
  return (
    <div>
      <SplitPane
        style={{ position: 'relative' }}
        split='vertical'
        primary='second'
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
    </div>
  );
};

export default Dashboard;
