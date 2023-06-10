import type { Entity } from "./Entity";
import type { ExerciseDTO } from "./ExerciseDTO";
import type { UserDTO } from "./UserDTO";

export interface ExerciseHistoryDTO extends Omit<Entity, "updated_at"> {
  name: string;
  hour: string;
  group: string;
  user_id: UserDTO["id"];
  exercise_id: ExerciseDTO["id"];
}

export interface ExerciseHistorySectionDTO {
  title: string;
  data: ExerciseHistoryDTO[];
}
