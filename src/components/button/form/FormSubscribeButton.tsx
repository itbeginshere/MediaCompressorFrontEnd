import CircularLoading from "components/indicators/loading/CircularLoading";
import { useFormContext } from "hooks/formContext"

interface IProps {
    label : string;
}

const FormSubscribeButton = (props: IProps) => {
 
    const { label } = props;

    const form = useFormContext();

    return (
        <form.Subscribe selector={(state) => state.isSubmitting}>
            {(isSubmitting) => 
                <button 
                    disabled={isSubmitting}
                    className="flex flex-row gap-2 bg-orange-400 hover:bg-purple-400 px-6 py-3 rounded-md text-white font-semibold text-lg"
                >
                    <CircularLoading isLoading={isSubmitting} />
                    {isSubmitting ? 'Processing' : label}
                </button>
            }
        </form.Subscribe>
    )
}

export default FormSubscribeButton;