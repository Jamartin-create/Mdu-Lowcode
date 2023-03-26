import { Router } from "express";
import GroupService from "../service/group";

const routes = Router();

routes.get("/group/:groupId", GroupService.getGroupById);
routes.route("/group")
    .post(GroupService.saveOne)
    .put(GroupService.editOne);

export default routes;