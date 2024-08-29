import type ObjectiveInfo from "Shared/Classes/ObjectiveInfo";
import type { Quest } from "Shared/Classes/Quest";
import type QuestLifeCycle from "Shared/Classes/QuestLifeCycle";
import type { QuestStatus } from "Shared/Enums/QuestStatus";
import type { PlayerQuestData } from "Shared/Structs/PlayerQuestData";
import type Signal from "Vendor/Signal";

/**
 * This is the main Module for the RoQuest server-side. This is the module
 * developers have to access to and can use to interact with the libraries' API
 * from the server-side.
 *
 * Here the developer can feed quests, change their progress, give quests,
 * automatically complete, deliver, cancel and much more!
 *
 * The data isn't automatically saved, so you have to save it yourself, you can
 * find a guide to that in the Docs section!
 */
interface RoQuestServer {
	/**
	 * This function should only get called once in the server-side. It will
	 * initialize our quest system and start listening to player events.
	 *
	 * Initiates our quest system and feeds it all the data about the quests and
	 * life cycles.
	 *
	 * ```ts
	 * import { ReplicatedStorage } from "@rbxts/services";
	 * import { RoQuestServer, LoadDirectory } from "@rbxts/roquest";
	 *
	 * RoQuestServer.Init(LoadDirectory(ReplicatedStorage.Quests));
	 * ```
	 *
	 * @param quests - Array of Quests.
	 * @param lifeCycles - QuestLifeCycle?
	 */
	Init(quests: Array<Quest>, lifeCycles?: QuestLifeCycle): void;

	/** This is a reference to our ObjectiveInfo class. */
	ObjectiveInfo: ObjectiveInfo;

	/**
	 * This gets called whenever the quests that are available changes. Called
	 * when one of the available quests becomes unavailable or when a quest gets
	 * started by the player.
	 *
	 * ```ts
	 * import { Server } from "@rbxts/ro-quest";
	 * import { ReplicatedStorage } from "@rbxts/services";
	 *
	 * RoQuest.OnAvailableQuestChanged.Connect((player: Player) => {
	 * 	print(self.GetAvailableQuests(player));
	 * });
	 * ```
	 */
	OnAvailableQuestChanged: Signal<[Player]>;

	/**
	 * This gets called whenever the quests that are completed changes. This
	 * gets called when either a quest got delivered, a quest just got completed
	 * or somehow the quest got cancelled while completed.
	 *
	 * ```ts
	 * import { Server } from "@rbxts/ro-quest";
	 * import { ReplicatedStorage } from "@rbxts/services";
	 *
	 * RoQuest.OnCompletedQuestChanged.Connect((player: Player) => {
	 * 	print(self.GetCompletedQuests(player));
	 * });
	 * ```
	 */
	OnCompletedQuestChanged: Signal<[Player]>;

	/**
	 * This gets called whenever the quests that are delivered changes. This
	 * gets called when either a quest got delivered or a delivered quest gets
	 * restarted.
	 *
	 * ```ts
	 * import { Server } from "@rbxts/ro-quest";
	 * import { ReplicatedStorage } from "@rbxts/services";
	 *
	 * RoQuest.OnDeliveredQuestChanged.Connect((player: Player) => {
	 * 	print(self.GetDeliveredQuests(player));
	 * });
	 * ```
	 */
	OnDeliveredQuestChanged: Signal<[Player]>;

	/**
	 * This gets called whenever the quests that are in progress change. This
	 * gets called when either a quest got completed or started by the player.
	 *
	 * ```ts
	 * import { Server } from "@rbxts/ro-quest";
	 * import { ReplicatedStorage } from "@rbxts/services";
	 *
	 * RoQuest.OnInProgressQuestChanged.Connect((player: Player) => {
	 * 	print(self.GetInProgressQuests(player));
	 * });
	 * ```
	 */
	OnInProgressQuestChanged: Signal<[Player]>;

	/**
	 * Called whenever the player data gets changed. This should only happen
	 * when we decide to completely overwrite the player data.
	 *
	 * ```ts
	 * import { Server } from "@rbxts/ro-quest";
	 * import { ReplicatedStorage } from "@rbxts/services";
	 *
	 * RoQuest.OnPlayerDataChanged.Connect(
	 * 	(player: Player, playerQuestData: PlayerQuestData) => {
	 * 		self.SetAllScreens(playerQuestData);
	 * 	},
	 * );
	 * ```
	 */
	OnPlayerDataChanged: Signal<[Player, PlayerQuestData]>;

	/**
	 * Called when one of the quest's objective gets changed.
	 *
	 * ```ts
	 * import { Server } from "@rbxts/ro-quest";
	 * import { ReplicatedStorage } from "@rbxts/services";
	 *
	 * RoQuest.OnQuestObjectiveChanged.Connect(
	 * 	(
	 * 		player: Player,
	 * 		questId: string,
	 * 		objectiveId: string,
	 * 		newValue: number,
	 * 	) => {
	 * 		self.UpdateObjective(
	 * 			RoQuest.GetQuest(player, questId),
	 * 			objectiveId,
	 * 			newValue,
	 * 		);
	 * 	},
	 * );
	 * ```
	 */
	OnQuestAvailable: Signal<[Player, string]>;

	/**
	 * Called whenever the player completes a quest!
	 *
	 * ```ts
	 * import { Server } from "@rbxts/ro-quest";
	 * import { ReplicatedStorage } from "@rbxts/services";
	 *
	 * RoQuest.OnQuestCompleted.Connect(
	 * 	(player: Player, questId: string) => {
	 * 		print(
	 * 			"Player has completed the quest: ",
	 * 			RoQuest.GetQuest(player, questId).Name,
	 * 		);
	 * 	},
	 * );
	 * ```
	 */
	OnQuestCancelled: Signal<[Player, string]>;

	/**
	 * Called whenever the player delivers a quest!
	 *
	 * ```ts
	 * import { Server } from "@rbxts/ro-quest";
	 * import { ReplicatedStorage } from "@rbxts/services";
	 *
	 * RoQuest.OnQuestDelivered.Connect(
	 * 	(player: Player, questId: string) => {
	 * 		print(
	 * 			"Player has delivered the quest: ",
	 * 			RoQuest.GetQuest(player, questId).Name,
	 * 		);
	 * 	},
	 * );
	 * ```
	 */
	OnQuestCompleted: Signal<[Player, string]>;

	/**
	 * Called whenever the player delivers a quest!
	 *
	 * ```ts
	 * import { Server } from "@rbxts/ro-quest";
	 * import { ReplicatedStorage } from "@rbxts/services";
	 *
	 * RoQuest.OnQuestDelivered.Connect(
	 * 	(player: Player, questId: string) => {
	 * 		print(
	 * 			"Player has delivered the quest: ",
	 * 			RoQuest.GetQuest(player, questId).Name,
	 * 		);
	 * 	},
	 * );
	 * ```
	 */
	OnQuestDelivered: Signal<[Player, string]>;

	/**
	 * Called whenever the player starts a new quest!
	 *
	 * ```ts
	 * import { Server } from "@rbxts/ro-quest";
	 * import { ReplicatedStorage } from "@rbxts/services";
	 *
	 * RoQuest.OnQuestStarted.Connect((player: Player, questId: string) => {
	 * 	print(
	 * 		"Player has started the quest: ",
	 * 		RoQuest.GetQuest(player, questId).Name,
	 * 	);
	 * });
	 * ```
	 */
	OnQuestObjectiveChanged: Signal<[Player, string, string, number]>;

	/**
	 * Called whenever the player starts a new quest!
	 *
	 * ```ts
	 * import { Server } from "@rbxts/ro-quest";
	 * import { ReplicatedStorage } from "@rbxts/services";
	 *
	 * RoQuest.OnQuestStarted.Connect((player: Player, questId: string) => {
	 * 	print(
	 * 		"Player has started the quest: ",
	 * 		RoQuest.GetQuest(player, questId).Name,
	 * 	);
	 * });
	 * ```
	 */
	OnQuestStarted: Signal<[Player, string]>;

	/**
	 * This gets called when a quest becomes available. This isn't player
	 * specific and instead gets called when per e.g a quest with a starting and
	 * end date becomes available.
	 *
	 * ```ts
	 * import { Server } from "@rbxts/ro-quest";
	 * import { ReplicatedStorage } from "@rbxts/services";
	 *
	 * RoQuest.OnTimeQuestAvailable.Connect((questId: string) => {
	 * 	print(
	 * 		"The following quest just became available: ",
	 * 		RoQuest.GetQuest(player, questId).Name,
	 * 	);
	 * });
	 * ```
	 */
	OnQuestUnavailable: Signal<[Player, string]>;

	/**
	 * This gets called when a quest becomes available. This isn't player
	 * specific and instead gets called when per e.g a quest with a starting and
	 * end date becomes available.
	 *
	 * ```ts
	 * import { Server } from "@rbxts/ro-quest";
	 * import { ReplicatedStorage } from "@rbxts/services";
	 *
	 * RoQuest.OnTimeQuestAvailable.Connect((questId: string) => {
	 * 	print(
	 * 		"The following quest just became available: ",
	 * 		RoQuest.GetQuest(player, questId).Name,
	 * 	);
	 * });
	 * ```
	 */
	OnTimeQuestAvailable: Signal<string>;

	/**
	 * This gets called when a quest becomes unavailable. This isn't player
	 * specific and instead gets called when per e.g a quest with a starting and
	 * end date becomes unavailable.
	 *
	 * ```ts
	 * import { Server } from "@rbxts/ro-quest";
	 * import { ReplicatedStorage } from "@rbxts/services";
	 *
	 * RoQuest.OnTimeQuestUnavailable.Connect((questId: string) => {
	 * 	print(
	 * 		"The following quest just became unavailable: ",
	 * 		RoQuest.GetQuest(player, questId).Name,
	 * 	);
	 * });
	 * ```
	 */
	OnTimeQuestUnavailable: Signal<string>;

	/**
	 * This gets called when a quest becomes available. This usually means that
	 * the player can now accept this quest at a given quest giver.
	 *
	 * ```ts
	 * import { Server } from "@rbxts/ro-quest";
	 * import { ReplicatedStorage } from "@rbxts/services";
	 *
	 * RoQuest.OnQuestAvailable.Connect(
	 * 	(player: Player, questId: string) => {
	 * 		print(
	 * 			"The following quest just became available: ",
	 * 			RoQuest.GetQuest(player, questId).Name,
	 * 		);
	 * 	},
	 * );
	 * ```
	 */
	OnUnAvailableQuestChanged: Signal<[Player]>;

	/** This is a reference to our PlayerQuestData struct. */
	PlayerQuestData: PlayerQuestData;

	/** This is a reference to our Quest class. */
	Quest: Quest;

	/** This is a reference to our QuestLifeCycle class. */
	QuestAcceptType: QuestAcceptType;

	/** This is a reference to our QuestLifeCycle class. */
	QuestDeliverType: QuestDeliverType;

	/** This is a reference to our QuestLifeCycle class. */
	QuestLifeCycle: QuestLifeCycle;

	/** This is a reference to our Signal class. */
	QuestRepeatableType: QuestRepeatableType;

	/** This is a reference to our Signal class. */
	QuestStatus: QuestStatus;
}

declare const RoQuestServer: RoQuestServer;

export = RoQuestServer;
