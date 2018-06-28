import axios from 'axios';
import qs from 'qs'

axios.defaults.timeout = 6000;
axios.defaults.baseURL = 'https://webblog.yolostudio.cn';


export default axios;