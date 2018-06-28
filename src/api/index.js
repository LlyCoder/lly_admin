import Axios from './httpConfig'
import qs from 'qs'

// export const BaseSrc = './Lly-Admin';
// export const MENU_LIST = BaseSrc + '/menu/list';

export default {
    createToken(grant_type, client_id, client_secret, username, password, scope) {
        return Axios.post('/oauth/token', qs.stringify({ grant_type, client_id, client_secret, username, password, scope}));
    }
}