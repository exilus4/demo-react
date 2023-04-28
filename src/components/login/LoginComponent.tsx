import './LoginComponent.css';

import Logo from '../../assets/image/logo.svg'
import { Avatar, Button, CircularProgress, Dialog, DialogActions, DialogContent, DialogTitle, List, ListItemAvatar, ListItemIcon, ListItemText, Slide, Stack } from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import ValidationTextField from '../shared/TextField/TextFieldComponent';
import React from 'react';

import LoginComponentModel from './LoginComponentModel';
import ReCaptchaComponent from '../reCAPTCHA/ReCaptchaComponent';
import axios from 'axios';
import { TransitionProps } from '@mui/material/transitions';

export default function LoginComponent() {
    const [valid, setValid] = React.useState(false);
    const [touched, setTouched] = React.useState(false);
    const [loading, setLoading] = React.useState(false);
    const [list, setList] = React.useState<UserInfo[]>([]);
    const [open, setOpen] = React.useState(false);

    const model = LoginComponentModel();
    
    const reCAPTCHA = ReCaptchaComponent();

    const isValid = (value: boolean) => {
        setValid(value);
    };
    
    const handleSubmit = async (event: React.SyntheticEvent) => {
        event.preventDefault();
        if (!touched) {
            setTouched(true);
        }
        if (valid) {
            const reCAPTCHAKEY = await reCAPTCHA.handleReCaptchaVerify();
            const api = sessionStorage.getItem("SERVER_API") as string;
            setLoading(true);
            axios
                .post(api + 'Authentications', { ...model })
                .then(res => res.data)
                .then((res) => {
                    sessionStorage.setItem("CLIENT_TOKEN", res.token);
                    const token = sessionStorage.getItem("CLIENT_TOKEN") as string;
                    setLoading(false);
                    const config = {
                        headers: { Authorization: `Bearer ${token}` }
                    };
                    axios
                        .get(api + 'Authentications', config)
                        .then(res => res.data)
                        .then((list) => {
                            setList(list);
                            handleClickOpen();
                        })
                })
                .catch(error => {
                    setLoading(false);
                    console.log(error);
                });
        }
    };
    
    interface UserInfo {
        uuid: string;
        username: string;
        password: string;
    }

    const Transition = React.forwardRef(function Transition(
        props: TransitionProps & {
            children: React.ReactElement<any, any>;
        },
        ref: React.Ref<unknown>,
        ) {
        return <Slide direction="up" ref={ref} {...props} />;
    });
    
    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        setList([]);
    };

    return (
        <form onSubmit={handleSubmit} noValidate>
            <img className='logo' src={Logo} alt='' />
            <h1 className='header'>Sign in</h1>
            <ValidationTextField className='text_input' isValid={isValid} isTouched={touched} id="username" label="Email or phone" value={ model.setUsername} type="text" isRequired={true} isRequiredErrMsg={"This input is required"} minLen={ 0 } minLenErrMsg={""} />
            <ValidationTextField className='text_input' isValid={ isValid } isTouched={ touched } id="password" label="Password" value={ model.setPassword } type="password" isRequired={true} isRequiredErrMsg={"This input is required"} minLen={ 0 } minLenErrMsg={""}/>
            {/* <Button className='forget_email' variant="text" disableRipple sx={{ '&.MuiButton-root:hover': { bgcolor: 'transparent' } }}>Forget Password?</Button> */}
            {
                !loading ? <Button className='signin_button' variant="contained" type="submit">Sign In</Button> : <Stack alignItems="center"><CircularProgress /></Stack>
            }
            {
                list.length > 0 ?  <Dialog
                                        open={open}
                                        TransitionComponent={Transition}
                                        keepMounted
                                        onClose={handleClose}
                                        aria-describedby="alert-dialog-slide-description"
                                    >
                                    <DialogTitle>{"User List"}</DialogTitle>
                                    <DialogContent>
                                        <List sx={{ width: '100%', maxWidth: 350, bgcolor: 'background.paper' }}>
                                            {list.map((item, i) =>
                                                <ListItemIcon>
                                                    <ListItemAvatar>
                                                    <Avatar>
                                                        <PersonIcon />
                                                    </Avatar>
                                                    </ListItemAvatar>
                                                    <ListItemText primary={ item.username } secondary={ item.uuid } />
                                                </ListItemIcon>)
                                            } 
                                        </List>
                                    </DialogContent>
                                    <DialogActions>
                                    <Button onClick={handleClose}>Close</Button>
                                    </DialogActions>
                                </Dialog> : <></>
            }
        </form>
    )
}