
interface IProps {
    value : string;
    name : string;
    onChange : (event : React.ChangeEvent<HTMLInputElement>) => void;
}

const NumberInput = (props : IProps) => {
    
    const { value, onChange } = props;
    
    return (
        <input 
            type="number"  
            value={value}
            onChange={onChange}
        />
    )
}

export default NumberInput;