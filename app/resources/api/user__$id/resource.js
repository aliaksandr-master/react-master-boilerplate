import api from '../../../resources/api/origin';
import UserSchema from '../../../entities/UserSchema';



export default api.resource('/user/:userID', { schema: UserSchema });
