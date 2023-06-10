import type { Entity } from "./Entity";

export interface UserDTO extends Entity {
  name: string;
  email: string;
  avatar: string | null;
}
