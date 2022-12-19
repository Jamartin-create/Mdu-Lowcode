import { Request } from "../utils/request";

class UserApi {
    test() { return Request.get('/test') }
}