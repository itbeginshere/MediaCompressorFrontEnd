
export type FormErrors<T> = { fields: Partial<Record<keyof T, string>> };

export default class FormErrorBulider<T> {

    private _errors: FormErrors<T> = {
        fields: {}
    };

    public append = (key: keyof T, value: string): void => {
        this._errors.fields[key] = value;
    }

    get errors() {
        return this._errors;
    }

}