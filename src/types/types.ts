export interface CSVData {
    id: number;
    fullName: string;
    phone: string;
    email: string;
    age: number;
    experience: number;
    yearlyIncome: number;
    hasChildren: boolean;
    licenseStates: string;
    expirationDate: string;
    licenseNumber: string;
    duplicateWith: number | null;
    valid: {
        fullName: boolean;
        phone: boolean;
        email: boolean;
        age: boolean;
        experience: boolean;
        yearlyIncome: boolean;
        hasChildren: boolean;
        licenseStates: boolean;
        expirationDate: boolean;
        licenseNumber: boolean;
    };
}