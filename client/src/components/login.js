import React ,{ useState} from 'react';
import Cookies from 'universal-cookie';
import { Redirect } from 'react-router-dom';
 

const API = process.env.REACT_APP_API_URL;

export const Login = () => {  
    const cookies = new Cookies();

    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [userstate, setUserestate] = useState(false);

    const handlerSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch(`${API}/validateuser`,{
            method: 'POST',
            headers: {
                'Content-Type':'application/json'
            },            
            body: JSON.stringify({
                    email:email,
                    phone:phone
            })
        })

        let res = await response.json();
        setUserestate(res['message']);
        if(userstate !== false) {
            cookies.set('user',{key:res['message']}, {path:'/'}); 
        }   
                               
    }

    // const Login = () => {  
    //     const state = cookies.get('user');  
    //     console.log(state);
    //     if(state) {
            
    //     }      
    // }

    // useEffect(() => {
    //     Login();
    // })
    return (
        <div>
        { !userstate ?

        <nav className="card">
            <form onSubmit={handlerSubmit}>
                <div className="form-group mb-3">
                    <input type="text" onChange={e => setEmail(e.target.value)}
                    value={email} className="form-control" placeholder="Email"></input>
                </div>

                <div className="form-group mb-3">
                    <input type="text" onChange={e => setPhone(e.target.value)} 
                    value={phone} className="form-control" placeholder="Phone"></input>
                </div>

                <button className="btn btn-primary btn-block" >
                    Login
                </button>

            </form>            
        </nav>
        :
        <div>
            <Redirect to="/products" />
        </div>
        }
        
        </div>

    )
}