
interface IProps {
    text: string;
    type?: 'button' | 'submit' | 'reset';
    onClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

const PrimaryButton = (props: IProps) => {

    const { text, type = 'button', onClick } = props;

    return (
        <button
            type={type}
            className="rounded-md bg-orange-400 px-6 py-3 text-lg font-semibold text-white hover:bg-purple-400"
            onClick={onClick}
        >
            {text}
        </button>
    );
}

export default PrimaryButton;