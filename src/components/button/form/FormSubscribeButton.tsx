import { useFormContext } from "hooks/formContext"

interface IProps {
    label : string;
}

const FormSubscribeButton = (props: IProps) => {
 
    const { label } = props;

    const form = useFormContext();

    return (
        <form.Subscribe selector={(state) => state.isSubmitting}>
            {(isSubmitting) => <button disabled={isSubmitting}>{label}</button>}
        </form.Subscribe>
    )
}

export default FormSubscribeButton;