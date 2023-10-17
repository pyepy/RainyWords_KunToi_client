import { io } from 'socket.io-client';

export const socket = io.connect("http://localhost:3001/");

export const playSocket = io('http://localhost:3001/play')