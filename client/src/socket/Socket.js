import {io} from 'socket.io-client'

export default function Socket() {
    const socket = io(import.meta.env.VITE_SERVER_URL,{withCredentials: true});
    return socket;
}