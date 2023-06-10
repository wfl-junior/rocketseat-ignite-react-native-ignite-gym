import type { Entity } from "./Entity";

export interface ExerciseDTO extends Entity {
  name: string;
  demo: string;
  group: string;
  thumb: string;
  series: number;
  repetitions: number;
}
