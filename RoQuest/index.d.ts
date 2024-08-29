import type RoQuestClient from "./Client";
import type RoQuestServer from "./Server";

export interface RoQuest {
	RoQuestClient: RoQuestClient;
	RoQuestServer: RoQuestServer;
}
