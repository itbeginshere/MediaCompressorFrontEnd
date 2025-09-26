/* eslint-disable tailwindcss/no-custom-classname */

interface IProps {
    loading: boolean;
}

const LinearLoading = (props: IProps) => {

    const { loading } = props;

    if (!loading) return null;

    return (
        <div className="relative h-2 w-full overflow-hidden rounded-full bg-gray-200">
            <div className="absolute inset-0">
                <div className="animate-indeterminate h-2 bg-blue-500" />
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
