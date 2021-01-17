export interface ICodeforcesProblem {
    title: string;
    timeLimit: string;
    memoryLimit: string;
    inputFile: string;
    outputFile: string;
    statement: {
        text: unknown;
        inputSpec: unknown;
        outputSpec: unknown;
        tests: ICodeforcesTest[];
        notes: unknown;
    };
    url: string;
    submitUrl: string;
}

export interface ICodeforcesTest {
    input: string | undefined;
    output: string | undefined;
}
