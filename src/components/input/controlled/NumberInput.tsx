
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
            <label htmlFor={name} className="font-medium self-center text-purple-900">{labelName}</label>
            <input 
                type="number"  
                name={name}
                className="border-2 border-purple-200 focus:border-purple-500 focus:outline-purple-500 p-2 rounded-md focus:bg-purple-200"
                value={value}
                onChange={onChange}
            />
        </div>
    )
}

export default NumberInput;