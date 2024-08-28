import type QuestObjective from "./QuestObjective";

interface ObjectiveInfo {
	/**
	 * A more detailed description of our objective. Can be used by the
	 * developer to display the description.
	 */
	Description: string;
	/**
	 * The name of our objective. Can be used by the player or server to display
	 * the name of the objective that the player must complete.
	 */
	Name: string;
	/**
	 * Extends the Objective Info into a Quest Objective which is what we feed
	 * into our Quests.
	 *
	 * @param target - The target number of the objective.
	 */
	NewObjective: (target: number) => QuestObjective;
	/**
	 * This is an ID to represent the objective. Should be used to identify the
	 * objective in the code.
	 */
	ObjectiveId: string;
}

type ObjectiveInfoConstructor = new () => ObjectiveInfo;

declare const ObjectiveInfo: ObjectiveInfoConstructor;

export = ObjectiveInfo;
