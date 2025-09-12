
interface IProps {
    text : string;
    type ?: 'button' | 'submit' | 'reset';
    onClick : (event : React.MouseEvent<HTMLButtonElement>) => void;
}

const PrimaryButton = (props : IProps) => {
    
    const { text, type = 'button', onClick } = props;
    
    return (
        <button 
            type={type}
            onClick={onClick}
        >
            {text}
        </button>
    );
}

export default PrimaryButton;