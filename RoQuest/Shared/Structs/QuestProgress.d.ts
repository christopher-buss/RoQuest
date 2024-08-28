import type { QuestStatus } from "Shared/Enums/QuestStatus";

import type { QuestObjectiveProgress } from "./QuestObjectiveProgress";

export interface QuestProgress {
	CompletedCount: number;
	FirstCompletedTick: number;
	LastCompletedTick: number;
	QuestObjectiveProgresses: Record<string, QuestObjectiveProgress>;
	QuestStatus: QuestStatus;
}
