import {FormInputLabel, Input, Group} from "./form-input.styles.jsx";

const FormInput = ({label, forInput,...otherProps}) => {
    return(
        <Group>
            <Input{...otherProps} />
            {label && (
                //falsy , truthy value
                <FormInputLabel shrink={otherProps.value.length} htmlFor={forInput}>{label}</FormInputLabel>
            )}
        </Group>
    );
};



export default FormInput;