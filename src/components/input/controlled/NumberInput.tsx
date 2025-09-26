
interface IProps {
    value : string;
    name : string;
    onChange : (event : React.ChangeEvent<HTMLInputElement>) => void;
}

const NumberInput = (props : IProps) => {
    
    const { value, name, onChange } = props;
    
    const labelName = name.substring(0,1).toUpperCase() + name.substring(1);

    return (
        <div className="flex flex-col gap-2">
            <label htmlFor={name} className="self-center font-medium text-purple-900">{labelName}</label>
            <input 
                type="number"  
                name={name}
                className="rounded-md border-2 border-purple-200 p-2 focus:border-purple-500 focus:bg-purple-200 focus:outline-purple-500"
                value={value}
                onChange={onChange}
            />
        </div>
    )
}

export default NumberInput;