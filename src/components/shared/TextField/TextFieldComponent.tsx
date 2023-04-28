import * as React from "react";
import TextField from "@mui/material/TextField";
import { FormControl, InputLabel, OutlinedInput, InputAdornment, IconButton, FormHelperText } from "@mui/material";
import { VisibilityOff, Visibility } from "@mui/icons-material";

import './TextFieldComponent.css';

interface TextFieldProps extends React.HTMLAttributes<Element> {
    className: string;
    isValid: (value: boolean) => void;
    isTouched: boolean;
    id: string;
    label: string;
    type: "text" | "password";
    value: React.Dispatch<React.SetStateAction<any>>;
    isRequired: boolean;
    isRequiredErrMsg: string;
    minLen: number;
    minLenErrMsg: string;
}

export default function TextFieldComponent({ ...props }: TextFieldProps) {
    const [touched, setTouched] = React.useState(false);
    const [text, setText] = React.useState("");
    const [showPassword, setShowPassword] = React.useState(false);
    const [errorMessage, setErrorMessage] = React.useState("");

    React.useEffect(() => {
        if ((props.isTouched || touched) && props.isRequired && text.length === 0) {
            setErrorMessage(props.isRequiredErrMsg);
            props.isValid(false);
        } else if ((props.isTouched || touched) && props.minLen > 0 && text.length < props.minLen) {
            setErrorMessage(props.minLenErrMsg);
            props.isValid(false);
        }
    }, [props, props.isRequired, props.isRequiredErrMsg, props.minLen, props.minLenErrMsg, text, touched]);

    React.useEffect(() => {
        if (((props.isTouched || touched) && props.minLen > 0 && text.length >= props.minLen) || ((props.isTouched || touched) && props.minLen === 0 && text.length > 0)) {
            setErrorMessage("");
            props.isValid(true);
        }
    }, [text, errorMessage, touched, props.minLen, props]);

    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    };

    const handleOnChange = (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
        const value = e.target.value;
        setText(value);
        props.value(value);
        handleOnTouch();
    }

    const handleOnTouch = () => {
        if (!touched && text.length > 0) {
            setTouched(true);
        }
    }

  return (props.type === 'text' ?
        <TextField className={ props.className }
            error={errorMessage.length > 0}
            id={ props.id }
            label={props.label}
            required={props.isRequired}
            helperText={ errorMessage }
            onChange={handleOnChange}
            onBlur={handleOnTouch}
        />
    :
      <FormControl className={ props.className } variant="outlined">
            <InputLabel htmlFor="outlined-adornment-password" className={ errorMessage.length > 0 ? "Mui-error" : "" }>{ props.label }</InputLabel>
                <OutlinedInput
                    error={errorMessage.length > 0}
                    id={props.id}
                    label={props.label}
                    required={props.isRequired}
                    type={showPassword ? 'text' : 'password'}
                    endAdornment={
                        <InputAdornment position="end">
                        <IconButton
                            aria-label="toggle password visibility"
                            onClick={handleClickShowPassword}
                            onMouseDown={handleMouseDownPassword}
                            edge="end"
                        >
                            {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                        </InputAdornment>
                    }
                    onChange={handleOnChange}
                    onBlur={handleOnTouch}
                />
                {errorMessage.length > 0 ?
                    <FormHelperText error>
                        {errorMessage}
                    </FormHelperText>
                    :
                    <></>
                }
    </FormControl>
  );
}