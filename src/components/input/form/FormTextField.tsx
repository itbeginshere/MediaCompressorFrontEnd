import { useStore } from '@tanstack/react-form';
import { useFieldContext } from 'hooks/formContext';
import { ChangeEvent } from 'react';

interface IProps {
    label: string;
    type?: 'text' | 'number';
    min?: number;
    max?: number;
}

const FormTextField = (props: IProps) => {

    const { label, type = 'text', min, max } = props;

    const field = useFieldContext<string>();

    const errors = useStore(field.store, (state) => state.meta.errors);

    const onChange = (event: ChangeEvent<HTMLInputElement>) => {
        field.handleChange(event.target.value);
    };

    return (
        <div className="flex flex-col gap-2">
            <label htmlFor={field.name} className="self-center font-medium text-purple-900">{label}</label>
            <input
                className={`rounded-md border-2 p-2 ${errors.length > 0 ? 'border-red-500 focus:border-red-500 focus:bg-red-200 focus:outline-red-500 ' : 'border-purple-200 focus:border-purple-500 focus:bg-purple-200 focus:outline-purple-500'}`}
                name={field.name}
                type={type}
                min={min}
                max={max}
                value={field.state.value}
                onChange={onChange}
                onBlur={field.handleBlur}
            />
            {
                errors.map((error: string) => (
                    <div key={error} style={{ color: 'red' }}>
                        {error}
                    </div>
                ))
            }
        </div>
    )
}

export default FormTextField;