import { UserDTO } from "./user-activation/UserDTO";

export interface DeclineDTO{
  msg: String;
  name: String;
  surname: String;
  id: number;
  email: String;
  isActivated: boolean;
}
