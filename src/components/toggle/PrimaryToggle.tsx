interface IProps {
    value : boolean;
    onChange : (value : boolean);
}

const PrimaryToggle = (props : IProps) => {

    const { value, onChange } = props;

    return (
        <div>Toggle for compress/resize</div>
    )
}

export default PrimaryToggle;