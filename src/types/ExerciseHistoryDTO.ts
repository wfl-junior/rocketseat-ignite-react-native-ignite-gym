export interface ExerciseHistoryDTO {
  title: string;
  data: Array<{
    name: string;
    hour: string;
    group: string;
  }>;
}
