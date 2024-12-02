import { User } from "./User.ts";

export interface Feedback {
  id: number;
  user_id: string;
  content: string;
  user: User;
}
