import { RedirectUrl } from "./Router.js";
import {removeSessionData} from "../utils/session.js";

const Logout = () => {
  removeSessionData();
  RedirectUrl("/");
};

export default Logout;
