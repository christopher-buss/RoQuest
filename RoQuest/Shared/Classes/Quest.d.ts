import type { QuestStatus } from "Shared/Enums/QuestStatus";
import type { QuestProgress } from "Shared/Structs/QuestProgress";
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
export interface Quest {
	/** Cached value of our quest progress. */
	_QuestProgress: QuestProgress;

	/** Sets the quest progress. */
	_SetQuestProgress(updatedQuestProgress: QuestProgress): void;

	/** Adds to the objective of the quest by the amount specified. */
	AddObjective(objectiveId: string, amount: number): void;

	/** Sets the quest to complete if possible. */
	Complete(): boolean;

	/** Sets the quest to delivered if possible. */
	Deliver(): boolean;

	/** The description of the quest. */
	Description: string;

	/** Cleans up our class. */
	Destroy(): void;

	/**
	 * If the quest is disabled or not. If the quest is disabled it will be
	 * ignored when loaded into the system.
	 */
	Disabled: boolean;

	/** Gets the amount of times that this quest has been completed. */
	GetCompleteCount(): number;

	/** Gets the first UTC time that this quest was completed. */
	GetFirstCompletedTick(): number;

	/** Gets the objective value by its id. */
	GetObjective(objectiveId: number): number;

	/** Gets the UTC time at which this quest should become disabled. */
	GetQuestEnd(): number;

	/** Gets the objective by its id. */
	GetQuestObjective(objectiveId: string): QuestObjective;

	/** Returns an array of quest objectives for this given quest. */
	GetQuestObjectives(): Array<QuestObjective>;

	/** Returns an array of quest objectives for this given quest. */
	GetQuestObjectives(): Record<string, QuestObjective>;

	// Returns a number with the amount of **completed** objectives that exist
	// within this quest.
	GetQuestObjectivesCompletedCount(): number;

	// Returns a number with the amount of objectives that exist within this
	// quest.
	GetQuestObjectivesCount(): number;

	/** Gets the UTC time at which this quest should become available. */
	GetQuestStart(): number;

	/** Gets the current status of the quest. */
	GetQuestStatus(): QuestStatus;

	/** Gets the target objective by the id. */
	GetTargetObjective(objectiveId: string): number;

	/** Gets how long until the quest becomes available. */
	GetTimeForAvailable(): number;

	/** Gets how long until the quest becomes unavailable. */
	GetTimeForUnavailable(): number;

	/** Gets the time since the quest was completed. */
	GetTimeSinceCompleted(): number;

	/**
	 * Checks if the objective with the given objectiveID has already been
	 * completed by the quest owner or not.
	 */
	IsObjectiveCompleted(objectiveId: string): boolean;

	/**
	 * This is an array with all the LifeCycles names that will manage this
	 * quest's behavior.
	 */
	LifeCycles: Array<string>;

	/** The name of the quest. */
	Name: string;

	/** Called when the quest gets cancelled. */
	OnQuestCanceled: Signal<void>;

	/** Called when the quest gets completed. */
	OnQuestCompleted: Signal<void>;

	/** Called when the quest gets delivered. */
	OnQuestDelivered: Signal<void>;

	/** Called whenever one of the quests objective changes the value. */
	OnQuestObjectiveChanged: Signal<[objectiveId: string, updatedAmount: number]>;

	/** Called whenever a quest objective gets completed. */
	OnQuestObjectiveCompleted: Signal<[objectiveId: string]>;

	/**
	 * The type of the quest accepting system. This can be either automatic or
	 * manual.
	 */
	QuestAcceptType: QuestAcceptType;

	/**
	 * The type of the quest delivering system. This can be either automatic or
	 * manual.
	 */
	QuestDeliverType: QuestDeliverType;

	/**
	 * UTC time to define when the quest should no longer be available
	 * (specially useful for event quests).
	 */
	QuestEnd: number;

	/** The quest ID. This must be a unique identifier for the quest. */
	QuestId: string;

	/** An array with all the objectives required to complete this quest. */
	QuestObjectives: Array<QuestObjective>;

	/** How many times can this quest be repeated. */
	QuestRepeatableType: QuestRepeatableType;

	/**
	 * UTC time to define when the quest should become available (specially
	 * useful for event quests).
	 */
	QuestStart: number;

	/** Adds to the objective by the amount specified. */
	RemoveObjective(objectiveId: string, amount: number): void;

	/**
	 * This is an array with all the required quest IDs in order for this quest
	 * to become available.
	 */
	RequiredQuests: Array<string>;

	/** Sets the quest objective to the given new value. */
	SetObjective(objectiveId: string, updatedAmount: number): void;
}
