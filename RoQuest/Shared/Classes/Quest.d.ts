import type { QuestAcceptType } from "Shared/Enums/QuestAcceptType";
import type { QuestDeliverType } from "Shared/Enums/QuestDeliverType";
import type { QuestRepeatableType } from "Shared/Enums/QuestRepeatableType";
import type { QuestStatus } from "Shared/Enums/QuestStatus";
import type Signal from "Vendor/Signal";

import type QuestObjective from "./QuestObjective";

/**
 * This is the main class of our quest system. Quest objects define exactly the
 * kind of quest and how can a player complete it. When declaring a quest there
 * are multiple properties that should be taken into consideration. On the
 * following example we can see how could we, per example, make a quest to
 * collect 5 apples.
 *
 * ```ts
 * const appleQuest = new ObjectiveInfo({
 * 	ObjectiveId: "CollectApples",
 * 	Name: "Collect Apples",
 * 	Description: "Collect %s apples",
 * });
 *
 * const quest = new Quest({
 * 	Name: "Collect Apples",
 * 	Description: "Collect %s apples",
 * 	QuestId: "AppleCollection",
 * 	QuestAcceptType: QuestAcceptType.Automatic,
 * 	QuestDeliverType: QuestDeliverType.Automatic,
 * 	QuestRepeatableType: QuestRepeatableType.NonRepeatable,
 * 	QuestStart: 0,
 * 	QuestEnd: 0,
 * 	RequiredQuests: [],
 * 	LifeCycles: ["AppleQuest"],
 * 	QuestObjectives: [appleQuest.NewObjective(5)],
 * });
 * ```
 */
export class Quest {
	constructor(
		properties: Partial<
			Pick<
				Quest,
				| "Description"
				| "LifeCycles"
				| "Name"
				| "QuestAcceptType"
				| "QuestDeliverType"
				| "QuestEnd"
				| "QuestId"
				| "QuestObjectives"
				| "QuestRepeatableType"
				| "QuestStart"
				| "RequiredQuests"
			>
		>,
	);

	/** Adds to the objective of the quest by the amount specified. */
	public AddObjective(objectiveId: string, amount: number): void;

	/** Sets the quest to complete if possible. */
	public Complete(): boolean;

	/** Sets the quest to delivered if possible. */
	public Deliver(): boolean;

	/** The description of the quest. */
	public Description: string;

	/** Cleans up our class. */
	public Destroy(): void;

	/**
	 * If the quest is disabled or not. If the quest is disabled it will be
	 * ignored when loaded into the system.
	 */
	public Disabled: boolean;

	/** Gets the amount of times that this quest has been completed. */
	public GetCompleteCount(): number;

	/** Gets the first UTC time that this quest was completed. */
	public GetFirstCompletedTick(): number;

	/** Gets the objective value by its id. */
	public GetObjective(objectiveId: number): number;

	/** Gets the UTC time at which this quest should become disabled. */
	public GetQuestEnd(): number;

	/** Gets the objective by its id. */
	public GetQuestObjective(objectiveId: string): QuestObjective;

	/** Returns an array of quest objectives for this given quest. */
	public GetQuestObjectives(): Array<QuestObjective>;

	/** Returns an array of quest objectives for this given quest. */
	public GetQuestObjectives(): Record<string, QuestObjective>;

	/**
	 * Returns a number with the amount of **completed** objectives that exist
	 * within this quest.
	 */
	public GetQuestObjectivesCompletedCount(): number;

	/**
	 * Returns a number with the amount of objectives that exist within this
	 * quest.
	 */
	public GetQuestObjectivesCount(): number;

	/** Gets the UTC time at which this quest should become available. */
	public GetQuestStart(): number;

	/** Gets the current status of the quest. */
	public GetQuestStatus(): QuestStatus;

	/** Gets the target objective by the id. */
	public GetTargetObjective(objectiveId: string): number;

	/** Gets how long until the quest becomes available. */
	public GetTimeForAvailable(): number;

	/** Gets how long until the quest becomes unavailable. */
	public GetTimeForUnavailable(): number;

	/** Gets the time since the quest was completed. */
	public GetTimeSinceCompleted(): number;

	/**
	 * Checks if the objective with the given objectiveID has already been
	 * completed by the quest owner or not.
	 */
	public IsObjectiveCompleted(objectiveId: string): boolean;

	/**
	 * This is an array with all the LifeCycles names that will manage this
	 * quest's behavior.
	 */
	public LifeCycles: Array<string>;

	/** The name of the quest. */
	public Name: string;

	/** Called when the quest gets cancelled. */
	public OnQuestCanceled: Signal<void>;

	/** Called when the quest gets completed. */
	public OnQuestCompleted: Signal<void>;

	/** Called when the quest gets delivered. */
	public OnQuestDelivered: Signal<void>;

	/** Called whenever one of the quests objective changes the value. */
	public OnQuestObjectiveChanged: Signal<[objectiveId: string, updatedAmount: number]>;

	/** Called whenever a quest objective gets completed. */
	public OnQuestObjectiveCompleted: Signal<[objectiveId: string]>;

	/**
	 * The type of the quest accepting system. This can be either automatic or
	 * manual.
	 */
	public QuestAcceptType: QuestAcceptType;

	/**
	 * The type of the quest delivering system. This can be either automatic or
	 * manual.
	 */
	public QuestDeliverType: QuestDeliverType;

	/**
	 * UTC time to define when the quest should no longer be available
	 * (specially useful for event quests).
	 */
	public QuestEnd: number;

	/** The quest ID. This must be a unique identifier for the quest. */
	public QuestId: string;

	/** An array with all the objectives required to complete this quest. */
	public QuestObjectives: Array<QuestObjective>;

	/** How many times can this quest be repeated. */
	public QuestRepeatableType: QuestRepeatableType;

	/**
	 * UTC time to define when the quest should become available (specially
	 * useful for event quests).
	 */
	public QuestStart: number;

	/** Adds to the objective by the amount specified. */
	public RemoveObjective(objectiveId: string, amount: number): void;

	/**
	 * This is an array with all the required quest IDs in order for this quest
	 * to become available.
	 */
	public RequiredQuests: Array<string>;

	/** Sets the quest objective to the given new value. */
	public SetObjective(objectiveId: string, updatedAmount: number): void;
}
