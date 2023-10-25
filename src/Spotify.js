import axios from 'axios';

const authEndpoint = 'https://accounts.spotify.com/authorize?';
const clientId = process.env.REACT_APP_SPOTIFY_CLIENT_ID;
const redirectUri = 'https://echo-ggr6.onrender.com';
const scopes = ['streaming','user-read-email','user-read-private','user-library-read','user-library-modify','user-read-playback-state','user-modify-playback-state','user-read-currently-playing','playlist-read-private','app-remote-control','user-read-playback-position','user-top-read','user-read-recently-played'];

export const loginEndoint = `${authEndpoint}client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scopes.join("%20")}&response_type=token&show_dialog=true`;

const apiClient = axios.create({
    baseURL: 'https://api.spotify.com/v1/'
})

export const setClientToken = (token) => {
    apiClient.interceptors.request.use(async function(config) {
        config.headers.Authorization = 'Bearer ' + token;
        return config;
    })
} 

export default apiClient;
git remote add origin https://github.com/saintfortjohnb/capstone.git
git branch -M main
git push -u origin main