import { useEffect, useState} from 'react';
import axios from 'axios';

const URL = 'http://localhost:3000';
const ShortPolling = (props)=>{
const [message, setMessage] = useState('');
const [messages, setMessages] = useState([]);

// console.log(arrlength);

const handleSubmit = (e) => {
    e.preventDefault();
    axios
    .post(`${URL}/messages`, {message})
    .then(()=> setMessage(''));
};

useEffect(()=>{
    const arrlength = messages.length;
    console.log(arrlength);
    const interval = setInterval(() => {
        axios
        .get(`${URL}/messages`,{params:{arrlength}})
        .then((data)=>{
            console.log(data.data);
            setMessages([...messages,...data.data]);
        }) 
    }, 3000);
    return () => clearInterval(interval);
},[messages]);

if(messages){
    return(
    (<>
    <div>
        <form id='form' className='validate' onSubmit={handleSubmit}>
            <div>
                <label>Message: </label>
                <input type="text"
                name="message"
                id = "message"
                placeholder="message"
                required
                value={message}
                onChange = {(e) => setMessage(e.target.value)}
                />
                
            </div>
        </form>
    </div>
    <section>
        <div>
            <h2>Stored Messages:</h2>
            <ul>
                {
                    messages.map((m,i)=><li key={i}>{m.message}</li>)
                }
            </ul>
        </div>
    </section>
    </>)
    );}
};
export default ShortPolling;