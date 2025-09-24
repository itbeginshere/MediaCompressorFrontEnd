
interface IProps {
    loading : boolean;
}

const LinearLoading = (props : IProps) => {

    const { loading } = props;

    if (!loading) return null;

    return (
        <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden relative">
            <div className="absolute inset-0">
                <div className="h-2 bg-blue-500 animate-indeterminate" />
            </div>
            <style>
                {`
                @keyframes indeterminate {
                    0% {
                    left: -40%;
                    width: 40%;
                    }
                    50% {
                    left: 20%;
                    width: 60%;
                    }
                    100% {
                    left: 100%;
                    width: 40%;
                    }
                }
                .animate-indeterminate {
                    position: absolute;
                    animation: indeterminate 1.5s infinite ease-in-out;
                }
                `}
            </style>
        </div>
    );
};

export default LinearLoading;
