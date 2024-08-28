import type { QuestProgress } from "./QuestProgress";

export interface PlayerQuestData {
	Completed: Record<string, QuestProgress>;
	Delivered: Record<string, QuestProgress>;
	InProgress: Record<string, QuestProgress>;
}
