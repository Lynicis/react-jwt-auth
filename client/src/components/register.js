import React,{useEffect, useState} from 'react';
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

const Register = () =>{
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [err, setErr] = useState("");
    const [success, setSuccess] = useState(false);

    const onPostAPI = async () =>{
        try {
            const res = await Axios.post('http://localhost:1881/api/register', {email, username, password});
            setSuccess(true);
        } catch (error) {
            setErr(error);
        }
    }

    if(err !== ""){return(<Alert className='alert alert-danger'>{err.message}</Alert>)}
    if(success){return(<Alert className='alert alert-success'>Created your account</Alert>)}
    return(
        <Container className='col-md-5 col-12'>
            <Form>
                <FormGroup>
                    <Label for='email'>E-mail:</Label>
                    <Input id='email' name='email' type='email' value={email} onChange={e => setEmail(e.target.value)} />
                </FormGroup>
                <FormGroup>
                    <Label for='username'>Username:</Label>
                    <Input id='username' name='username' type='text' value={username} onChange={e => setUsername(e.target.value)}  />
                </FormGroup>
                <FormGroup>
                    <Label for='password'>Password:</Label>
                    <Input id='password' name='password' type='password' value={password} onChange={e => setPassword(e.target.value)}  />
                </FormGroup>
                <Button type='button' onClick={onPostAPI}>Register</Button>
            </Form>
        </Container>
    )
}

export default Register;