import type RoQuestClient from "./Client";
import type RoQuestServer from "./Server";

interface RoQuest {
	RoQuestClient: RoQuestClient;
	RoQuestServer: RoQuestServer;
}

declare const RoQuest: RoQuest;

export { default as RoQuestClient } from "./Client";
export { default as RoQuestServer } from "./Server";
export { Quest } from "Shared/Classes/Quest";
export { default as QuestLifeCycle } from "Shared/Classes/QuestLifeCycle";
export { default as QuestObjective } from "Shared/Classes/QuestObjective";
export { QuestAcceptType } from "Shared/Enums/QuestAcceptType";
export { QuestDeliverType } from "Shared/Enums/QuestDeliverType";
export { QuestRepeatableType } from "Shared/Enums/QuestRepeatableType";
export { QuestStatus } from "Shared/Enums/QuestStatus";
export { PlayerQuestData } from "Shared/Structs/PlayerQuestData";
export { QuestObjectiveProgress } from "Shared/Structs/QuestObjectiveProgress";
export { QuestProgress } from "Shared/Structs/QuestProgress";
