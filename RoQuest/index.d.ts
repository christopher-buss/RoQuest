import type RoQuestClient from "./Client";
import type RoQuestServer from "./Server";

interface RoQuest {
	RoQuestClient: RoQuestClient;
	RoQuestServer: RoQuestServer;
}

declare const RoQuest: RoQuest;

export = RoQuest;
