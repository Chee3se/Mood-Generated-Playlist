import Echo from 'laravel-echo';
import io from 'socket.io-client';
import Pusher from 'pusher-js';

window.Pusher = Pusher;
window.io = io;
window.Echo = new Echo({
    broadcaster: 'socket.io',
    host: window.location.hostname + ':6500',
    extraHeaders: {
        'Access-Control-Allow-Origin': '*',
    },
});
