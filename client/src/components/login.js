import React,{useState, useEffect} from 'react';
import {
    Link, 
    Redirect
} from 'react-router-dom';
import {
    Container,
    Form,
    FormGroup,
    Label,
    Input,
    Button,
    Alert
} from 'reactstrap';
import Axios from 'axios';

const Login = () =>{
    const [login, setLogin] = useState(false);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [err, setErr] = useState("");
    const [success, setSuccess] = useState(false);

    const onGetAPI = async () =>{
        try {
            const res = await Axios.post('http://localhost:1881/api/login', {username, password})
            if(res.status === 200){
                localStorage.setItem("token", res.data.token);
                    setSuccess(true)
            }
        } catch (error) {
            setErr(error);
        }
    }

    useEffect(()=>{
        const onDidLogin = () =>{
            if(localStorage.key("token")){
                setLogin(true);
            }
        };
        onDidLogin();
    }, [setLogin])

    if(login){return(<Redirect to='/home' />)}
    if(err !== ""){return(<Alert className='alert alert-danger'>{err.message}</Alert>)}
    if(success === true){return(<Redirect to='/home' />)}
    return(
        <Container className='col-md-5 col-12'>
            <Form>
                <FormGroup>
                    <Label for='username'>Username:</Label>
                    <Input id='username' name='username' type='text' value={username} onChange={e => setUsername(e.target.value)}  />
                </FormGroup>
                <FormGroup>
                    <Label for='password'>Password:</Label>
                    <Input id='password' name='password' type='password' value={password} onChange={e => setPassword(e.target.value)}  />
                </FormGroup>
                <Button type='button' onClick={onGetAPI}>Login</Button>
                <Link to='/register' className='ml-4'>
                    <Label>
                        Are you haven't account?
                    </Label>
                </Link>
            </Form>
        </Container>
    )
}

export default Login;