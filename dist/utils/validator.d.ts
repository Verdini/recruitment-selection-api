export declare class Validator {
    errors: any[];
    constructor(errors?: any[]);
    isRequired(value: any, message: any): void;
    hasMinLen: (value: any, min: any, message: any) => void;
    hasMaxLen: (value: any, max: any, message: any) => void;
    isFixedLen: (value: any, len: any, message: any) => void;
    isEmail: (value: any, message: any) => void;
    isNotNull: (value: any, message: any) => void;
    isGreaterThan: (valuea: any, valueb: any, message: any) => void;
    clear(): void;
    isValid(): boolean;
}
