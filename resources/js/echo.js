import Echo from 'laravel-echo';
import io from 'socket.io-client';

window.io = io;

window.Echo = new Echo({
    broadcaster: 'socket.io',
    host: window.location.protocol + '//' + window.location.hostname + ':6500',
    transports: ['websocket'],
});
