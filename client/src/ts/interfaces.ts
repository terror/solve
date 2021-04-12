// Code editor settings
export interface IEditorSettings {
  width: string;
  mode: string;
  theme: string;
  fontSize: string;
  keyboardHandler: string;
  value: string;
  name: string;
  options: object;
}

// Contest problem from a problem website
export interface IProblem {
  platform: string;
  id: string;
  title: string;
  timeLimit: string;
  memoryLimit: string;
  inputFile: string;
  outputFile: string;
  statement: {
    text: string[];
    inputSpec: string[];
    outputSpec: string[];
    tests: Test[];
    notes: string[];
  };
  url: string;
  submitUrl: string;
}

export interface Test {
  input: string;
  output: string;
}

// Upcoming contest information
export interface IKontest {
  name: string;
  url: string;
  start_time: string;
  end_time: string;
  duration: string;
  site: string;
  in_24_hours: string;
  status: string;
}

export interface Submission {
  language_id: number;
  source_code: string;
  stdin: string;
  expected_output: string;
}

export interface WorkspaceState {
  problem: IProblem;
  editor: IEditorSettings;
  userId: string;
  id: string;
}

export interface FormikProps {
  field: any;
  errors: any;
  touched: any;
  name: string;
}

export interface ITemplate {
  name: string;
  id: string;
  userId: string;
  body: string;
  lang: string;
}
