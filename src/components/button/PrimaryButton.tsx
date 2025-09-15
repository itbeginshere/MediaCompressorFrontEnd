
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
            className="bg-orange-400 hover:bg-purple-400 px-6 py-3 rounded-md text-white font-semibold text-lg"
            onClick={onClick}
        >
            {text}
        </button>
    );
}

export default PrimaryButton;