import {io} from 'socket.io-client'

export default function Socket() {
    const socket = io('https://code-colab-7l1m.onrender.com:5000',{withCredentials: true});
    // const socket = io('http://localhost:5000',{withCredentials: true});
    return socket;
}