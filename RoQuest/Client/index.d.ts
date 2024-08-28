import type ObjectiveInfo from "Shared/Classes/ObjectiveInfo";
import type { Quest } from "Shared/Classes/Quest";
import type QuestLifeCycle from "Shared/Classes/QuestLifeCycle";
import type { QuestStatus } from "Shared/Enums/QuestStatus";
import type { PlayerQuestData } from "Shared/Structs/PlayerQuestData";
import type Signal from "Vendor/Signal";

/**
 * This is the main Module for the RoQuest Client-side. This is the module
 * developers have access to and can use to interact with the libraries' API
 * from the client-side.
 *
 * This module gives access to the developer to properly update his quest logs
 * and/or play animations and modify client-sided behavior of our quests!
 *
 * All the quest data is by default replicated from the server-side into this
 * module using the Red library. This means that all the data is up-to-date and
 * can be used to update the player's UI or any other client-sided behavior.
 *
 * ```ts
 * import { Client } from "@rbxts/ro-quest";
 * import { ReplicatedStorage } from "@rbxts/services";
 *
 * RoQuest.Init();
 * ```
 */
interface RoQuestClient {
	/**
	 * This function can and should only be called once. It is used to
	 * initialize the RoQuestClient.
	 *
	 * Feed the life cycles of our quests into the Module and initialize the
	 * RoQuestClient.
	 *
	 * ```ts
	 * import { Client } from "@rbxts/ro-quest";
	 * import { ReplicatedStorage } from "@rbxts/services";
	 *
	 * RoQuest.Init();
	 * ```
	 *
	 * @param lifeCycles - {QuestLifeCycle}?
	 */
	Init: (lifeCycles?: QuestLifeCycle) => void;

	/** Reference to the ObjectiveInfo class. */
	ObjectiveInfo: ObjectiveInfo;

	/**
	 * This gets called whenever the quests that are available changes. Called
	 * when one of the available quests becomes unavailable or when a quest gets
	 * started by the player.
	 *
	 * ```ts
	 * import { Client } from "@rbxts/ro-quest";
	 * import { ReplicatedStorage } from "@rbxts/services";
	 *
	 * RoQuest.OnAvailableQuestChanged.Connect(() => {
	 * 	print(self.GetAvailableQuests());
	 * });
	 * ```
	 */
	OnAvailableQuestChanged: Signal<[]>;

	/**
	 * This gets called whenever the quests that are completed changes. This
	 * gets called when either a quest got delivered, a quest just got completed
	 * or somehow the quest got cancelled while completed.
	 *
	 * ```ts
	 * import { Client } from "@rbxts/ro-quest";
	 * import { ReplicatedStorage } from "@rbxts/services";
	 *
	 * RoQuest.OnCompletedQuestChanged.Connect(() => {
	 * 	print(self.GetCompletedQuests());
	 * });
	 * ```
	 */
	OnCompletedQuestChanged: Signal<[]>;

	/**
	 * This gets called whenever the quests that are delivered changes. This
	 * gets called when either a quest got delivered or a delivered quest gets
	 * restarted.
	 *
	 * ```ts
	 * import { Client } from "@rbxts/ro-quest";
	 * import { ReplicatedStorage } from "@rbxts/services";
	 *
	 * RoQuest.OnDeliveredQuestChanged.Connect(() => {
	 * 	print(self.GetDeliveredQuests());
	 * });
	 * ```
	 */
	OnDeliveredQuestChanged: Signal<[]>;

	/**
	 * This gets called whenever the quests that are in progress change. This
	 * gets called when either a quest got completed or started by the player.
	 *
	 * ```ts
	 * import { Client } from "@rbxts/ro-quest";
	 * import { ReplicatedStorage } from "@rbxts/services";
	 *
	 * RoQuest.OnInProgressQuestChanged.Connect(() => {
	 * 	print(self.GetInProgressQuests());
	 * });
	 * ```
	 */
	OnInProgressQuestChanged: Signal<[]>;

	/**
	 * Called whenever the player data gets changed. This should only happen
	 * when the server decides to completely overwrite the player data. Should
	 * be used to reset data on the UI and/or other client-sided displays.
	 *
	 * ```ts
	 * import { Client } from "@rbxts/ro-quest";
	 * import { ReplicatedStorage } from "@rbxts/services";
	 *
	 * RoQuest.OnPlayerDataChanged.Connect(playerQuestData => {
	 * 	self.SetAllScreens(playerQuestData);
	 * }); // Hard reset our screens
	 * ```
	 */
	OnPlayerDataChanged: Signal<[playerQuestData: PlayerQuestData]>;

	/**
	 * This gets called when a quest becomes available. This usually means that
	 * the player can now accept this quest at a given quest giver.
	 *
	 * ```ts
	 * import { Client } from "@rbxts/ro-quest";
	 * import { ReplicatedStorage } from "@rbxts/services";
	 *
	 * RoQuest.OnQuestAvailable.Connect(questId => {
	 * 	print(
	 * 		"The following quest just became available: ",
	 * 		RoQuest.GetQuest(questId).Name,
	 * 	);
	 * });
	 * ```
	 */
	OnQuestAvailable: Signal<[questId: string]>;

	/**
	 * Called whenever a quest gets cancelled. This might happen when a player
	 * asks to cancel a quest or the developer disables a quest at run-time (per
	 * example when an event finishes).
	 *
	 * ```ts
	 * import { Client } from "@rbxts/ro-quest";
	 * import { ReplicatedStorage } from "@rbxts/services";
	 *
	 * RoQuest.OnQuestCancelled.Connect(questId => {
	 * 	print(
	 * 		"The following quest just got removed: ",
	 * 		RoQuest.GetQuest(questId).Name,
	 * 	);
	 * });
	 * ```
	 */
	OnQuestCancelled: Signal<[questId: string]>;

	/**
	 * Called whenever the player completes a quest!
	 *
	 * ```ts
	 * import { Client } from "@rbxts/ro-quest";
	 * import { ReplicatedStorage } from "@rbxts/services";
	 *
	 * RoQuest.OnQuestCompleted.Connect(questId => {
	 * 	print(
	 * 		"Player has completed the quest: ",
	 * 		RoQuest.GetQuest(questId).Name,
	 * 	);
	 * });
	 * ```
	 */
	OnQuestCompleted: Signal<[questId: string]>;

	/**
	 * Called whenever the player delivers a quest!
	 *
	 * ```ts
	 * import { Client } from "@rbxts/ro-quest";
	 * import { ReplicatedStorage } from "@rbxts/services";
	 *
	 * RoQuest.OnQuestDelivered.Connect(questId => {
	 * 	print(
	 * 		"Player has delivered the quest: ",
	 * 		RoQuest.GetQuest(questId).Name,
	 * 	);
	 * });
	 * ```
	 */
	OnQuestDelivered: Signal<[questId: string]>;

	/**
	 * Called when one of the quest's objective gets changed. Useful to update
	 * UI elements.
	 *
	 * ```ts
	 * import { Client } from "@rbxts/ro-quest";
	 * import { ReplicatedStorage } from "@rbxts/services";
	 *
	 * RoQuest.OnQuestObjectiveChanged.Connect(
	 * 	(questId, objectiveId, updateValue) => {
	 * 		self.UpdateObjective(
	 * 			RoQuest.GetQuest(questId),
	 * 			objectiveId,
	 * 			updateValue,
	 * 		);
	 * 	},
	 * );
	 * ```
	 */
	OnQuestObjectiveChanged: Signal<[questId: string, objectiveId: string, updateValue: number]>;

	/**
	 * Called whenever the player starts a new quest!
	 *
	 * ```ts
	 * import { Client } from "@rbxts/ro-quest";
	 * import { ReplicatedStorage } from "@rbxts/services";
	 *
	 * RoQuest.OnQuestStarted.Connect(questId => {
	 * 	print(
	 * 		"Player has started the quest: ",
	 * 		RoQuest.GetQuest(questId).Name,
	 * 	);
	 * });
	 * ```
	 */
	OnQuestStarted: Signal<[questId: string]>;

	/**
	 * This gets called when a quest becomes unavailable. Usually only happens
	 * when a quest gets disabled at run-time or when the quest's end time has
	 * passed.
	 *
	 * ```ts
	 * import { Client } from "@rbxts/ro-quest";
	 * import { ReplicatedStorage } from "@rbxts/services";
	 *
	 * RoQuest.OnQuestUnavailable.Connect(questId => {
	 * 	print(
	 * 		"The player's quest has just been cancelled: ",
	 * 		RoQuest.GetStaticQuest(questId).Name,
	 * 	);
	 * });
	 * ```
	 */
	OnQuestUnavailable: Signal<[questId: string]>;

	/**
	 * This gets called whenever the quests that are unavailable changes. This
	 * means that either a quest just became available OR that a quest became
	 * unavailable (such as a quest with an end time).
	 *
	 * ```ts
	 * import { Client } from "@rbxts/ro-quest";
	 * import { ReplicatedStorage } from "@rbxts/services";
	 *
	 * RoQuest.OnUnAvailableQuestChanged.Connect(() => {
	 * 	print(self.GetUnAvailableQuests());
	 * });
	 * ```
	 */
	OnUnAvailableQuestChanged: Signal<[]>;

	/** Reference to the Quest class. */
	Quest: Quest;

	/** Reference to the QuestAcceptType enum. */
	QuestAcceptType: QuestAcceptType;

	/** Reference to the QuestDeliverType enum. */
	QuestDeliverType: QuestDeliverType;

	/** Reference to the QuestLifeCycle class. */
	QuestLifeCycle: QuestLifeCycle;

	/** Reference to the QuestRepeatableType enum. */
	QuestRepeatableType: QuestRepeatableType;

	/** Reference to the QuestStatus enum. */
	QuestStatus: QuestStatus;
}

declare const RoQuestClient: RoQuestClient;

export = RoQuestClient;
