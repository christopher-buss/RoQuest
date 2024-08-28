import type Signal from "Vendor/Signal";

import type ObjectiveInfo from "./ObjectiveInfo";

/**
 * A quest objective is one of the steps that a player must complete in order to
 * finish a quest.
 *
 * It contains the data for the objective as well as some utility functions to
 * allow us to manipulate the objective.
 *
 * This class shouldn't be created directly by the developer. Instead they
 * should use the Objective info object and extend it with the NewObjective
 * function.
 *
 * ```ts
 * const appleQuest = ObjectiveInfo.New({
 * 	ObjectiveId: "CollectApples",
 * 	Name: "Collect Apples",
 * 	Description: "Collect %s apples",
 * });
 *
 * const objective1 = appleQuest.NewObjective(5); // Created an objective to collect 5 apples
 * const objective2 = appleQuest.NewObjective(3); // Created an objective to collect 3 apples
 * const objective3 = appleQuest.NewObjective(7); // Created an objective to collect 7 apples
 * ```
 */
interface QuestObjective {
	/** Adds an amount to the current progress of the objective. */
	Add(amount: number): boolean;

	/** A Signal that fires whenever the quest objective is marked as completed. */
	Completed: Signal<void>;

	/** Destroys the QuestObjective and clears up the object. */
	Destroy(): void;

	/** Gets the current progress of our objective. */
	Get(): number;

	/** Gets a description of the objective. */
	GetDescription(): string;

	/** Gets an id with the objective ID of the QuestObjective. */
	GetObjectiveId(): string;

	/** Gets the current target progress of our objective. */
	GetTargetProgress(): number;

	/** Checks if the quest has already been completed or not. */
	IsCompleted(): boolean;

	/**
	 * A reference to the ObjectiveInfo object that this QuestObjective is based
	 * on.
	 */
	ObjectiveInfo: ObjectiveInfo;

	/** Removes an amount to the current progress of the objective. */
	Remove(amount: number): boolean;

	/** Sets the current progress amount of our objective. */
	Set(updatedAmount: number): boolean;

	/** The target progress required for the player complete this objective. */
	TargetProgress: number;
}

type QuestObjectiveConstructor = new () => QuestObjective;

declare const QuestObjective: QuestObjectiveConstructor;

export = QuestObjective;
