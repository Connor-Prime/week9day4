import * as _React from "react"
import {useState} from "react"
import {useCreateUserWithEmailAndPassword,useSignInWithGoogle} from "react-firebase-hooks/auth"
import {
    onAuthStateChanged,
    getAuth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword
}
from "firebase/auth"

import { SubmitHandler, useForm } from "react-hook-form"
import { useNavigate } from 'react-router-dom'; 
import {
    Box,
    Button,
    Typography,
    Snackbar, //allow us to have an alert box popup in the corner for signin errors or success alert
    Stack,
    Divider,
    CircularProgress, //Loading symbol
    Dialog,
    DialogContent,
    Alert } from '@mui/material' 

    // internal imports
import { NavBar, InputText, InputPassword } from '../sharedComponents'
import { padding } from "@mui/system"

const authStyles = {

    stack: {
        width: '400px',
        marginTop: '100px',
        marginRight: 'auto', //used a lot to center your div
        marginLeft: 'auto',
        color: 'white'
    },
    button: {
        width: '175px',
        fontSize: '14px'
    }
}

interface Props{
    headerText:string
}

interface ButtonProps {
    open: boolean 
    onClick: () => void
}

interface SubmitProps{
    email:string,
    password:string
}

export type MessageType = "error"|"warning"|"success"|"info"

// Google button comoponent
const GoogleButton = (_props:ButtonProps) =>{

    const [open, setOpen] = useState(false) //sets state of open to open up our signin boxes
    const [message,setMessage] = useState<string>()
    const [ messageType, setMessageType ] = useState<MessageType>()
    const navigate = useNavigate()
    const auth = getAuth()
    const [signInWithGoogle,_user, Loading, error] = useSignInWithGoogle(auth)

    const signIn =async()=>{
        await signInWithGoogle()

        localStorage.setItem('auth','true')

        onAuthStateChanged(auth, (user)=>{
            if(user){
                localStorage.setItem('user',user.email||"")
                localStorage.setItem('uuid',user.uid||"")
                setMessage(`Successfully logged in ${user.email}.`)
                setMessageType("success")
                setOpen(true)

                setTimeout(()=>{
                    navigate('/shop')
                },1500)
            }
        })

        if (error) {
            setMessage(error.message)
            setMessageType('error')
            setOpen(true)
        }

        if (Loading) {
            return <CircularProgress />
        }
    }
    return (
        <Box>
            <Button
                variant = 'contained'
                color = 'info'
                size = 'large'
                sx = { authStyles.button }
                onClick = { signIn }
            >
                Sign In With Google
            </Button>
            <Snackbar
                open = {open}
                autoHideDuration={2000}
                onClose = { () => setOpen(false) }
            >
                <Alert severity = {messageType}>
                    {message}
                </Alert>
            </Snackbar>
        </Box>
    )
}

const SignIn =()=>{
   
    const [open, setOpen] = useState(false) //sets state of open to open up our signin boxes
    const [message,setMessage] = useState<string>()
    const [ messageType, setMessageType ] = useState<MessageType>()
    const navigate = useNavigate()
    const auth = getAuth()
    const {register,handleSubmit}= useForm<SubmitProps>({})

    const onSubmit:SubmitHandler<SubmitProps>= async (data,event) => {
        if(event) event.preventDefault();
            signInWithEmailAndPassword(auth,data.email,data.password)
            .then((_userCredential) => {
                // if it successfully goes into .then then we have successfully logged in with no errors
                localStorage.setItem('auth', 'true') //backup for monitoring if someone is logged in or not
                onAuthStateChanged(auth, (user) => {
                    if (user) {
                        localStorage.setItem('user', user.email || "") //use this on our navbar to show who is currently logged in
                        localStorage.setItem('uuid', user.uid || "") //use this for our cart to make them unique for our users & for our orders
                        setMessage(`Successfully logged in ${user.email}`)
                        setMessageType('success')
                        setOpen(true)
                        // going to use setTimeout to display messagae for a short period & then navigate elsewhere
                        setTimeout(() => {navigate('/shop')}, 2000) //setTimeout takes 2 arguments, the first is function, second is time
                    }
                } )
            }).catch((error)=>{
                setMessage(error)
                setMessageType('error')
                setOpen(true)
            })
    }

    return(

        <Box>
            <Typography variant="h2">
                Sign In / Welcome Back
            </Typography>
            <form onSubmit={handleSubmit(onSubmit)}>
            <Box>
                <label htmlFor='email'></label>
                <InputText {...register('email')} name='email' placeholder='Email Here' />
                <label htmlFor='password'></label>
                <InputPassword {...register('password')} name='password' placeholder='Password must be 6 characters or longer' />
               
            </Box>
                <Button type='submit'>Submit</Button>
            </form>

            <Snackbar
                open = {open}
                autoHideDuration={2000}
                onClose = { () => setOpen(false) }
            >
                <Alert severity = {messageType}>
                    {message}
                </Alert>
            </Snackbar>
        </Box>

    )
}

const SignUp =()=>{
   
    const [open, setOpen] = useState(false) //sets state of open to open up our signin boxes
    const [message,setMessage] = useState<string>()
    const [ messageType, setMessageType ] = useState<MessageType>()
    const navigate = useNavigate()
    const auth = getAuth()
    const {register,handleSubmit}= useForm<SubmitProps>({})

    const onSubmit:SubmitHandler<SubmitProps>= async (data,event) => {
        if(event) event.preventDefault();
            createUserWithEmailAndPassword(auth, data.email, data.password)
            .then((_userCredential) => {
                // if it successfully goes into .then then we have successfully logged in with no errors
                localStorage.setItem('auth', 'true') //backup for monitoring if someone is logged in or not
                onAuthStateChanged(auth, (user) => {
                    if (user) {
                        localStorage.setItem('user', user.email || "") //use this on our navbar to show who is currently logged in
                        localStorage.setItem('uuid', user.uid || "") //use this for our cart to make them unique for our users & for our orders
                        setMessage(`Successfully logged in ${user.email}`)
                        setMessageType('success')
                        setOpen(true)
                        // going to use setTimeout to display messagae for a short period & then navigate elsewhere
                        setTimeout(() => {navigate('/shop')}, 2000) //setTimeout takes 2 arguments, the first is function, second is time
                    }
                } )
            }).catch((error)=>{
                setMessage(error)
                setMessageType('error')
                setOpen(true)
            })
    }

    return(

        <Box>
            <Typography variant="h3">
                Sign Up
            </Typography>
            <form onSubmit={handleSubmit(onSubmit)}>

                <label htmlFor='email'></label>
                <InputText {...register('email')} name='email' placeholder='Email Here' />
                <label htmlFor='password'></label>
                <InputPassword {...register('password')} name='password' placeholder='Password must be 6 characters or longer' />
                <Button type='submit'>Submit</Button>
            </form>

            <Snackbar
                open = {open}
                autoHideDuration={2000}
                onClose = { () => setOpen(false) }
            >
                <Alert severity = {messageType}>
                    {message}
                </Alert>
            </Snackbar>
        </Box>

    )
}

export const Auth = (props:Props) => {
    // setup our Hooks
    const [open, setOpen] = useState(false)
    const [ signType, setSignType ] = useState<string>()



    return (
        <Box>
            <NavBar />
            <Box sx={
                {backgroundColor:"black",
                width:"25%", 
                marginLeft:"auto",
                marginRight:"auto",
                paddingLeft:"15px"
        }}>
                <Stack direction = 'column' alignItems = 'center' textAlign = 'center' sx={authStyles.stack}>
                    <Typography variant='h3' sx={{color: 'white'}}>
                        {props.headerText}
                    </Typography>
                    <br />
                    <Typography variant='h5'>
                        Track your shops items for free!
                    </Typography>
                    <br />
                    <GoogleButton open={open} onClick={() => setOpen(false)} />
                    <Divider variant = 'fullWidth' color = 'white' />
                    <br />
                    <Stack 
                        width = '100%'
                        alignItems = 'center'
                        justifyContent = 'space-between'
                        direction = 'row'
                    >
                        <Button 
                            variant = 'contained'
                            color = 'primary'
                            size = 'large'
                            sx = { authStyles.button}
                            onClick = { () => { setOpen(true); setSignType('signin')}}
                        >
                            Email Login
                        </Button>
                        <Button 
                            variant = 'contained'
                            color = 'primary'
                            size = 'large'
                            sx = { authStyles.button}
                            onClick = { () => { setOpen(true); setSignType('signup')}}
                        >
                            Email Signup
                        </Button>
                    </Stack>
                </Stack>
                <Dialog open={open} onClose = {() => setOpen(false)}>
                    <DialogContent>
                        { signType === 'signin' ? <SignIn /> : <SignUp />}
                    </DialogContent>
                </Dialog>
            </Box>
        </Box>
    )

}