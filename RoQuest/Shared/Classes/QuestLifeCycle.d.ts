/**
 * QuestLifeCycles are classes that are used to give behavior to our quests.
 * They get associated to a quest when it gets declared and will allow the
 * developer to update world instances and other things when the quest is
 * available, started, completed or delivered.
 *
 * The lifecycle runs on the side where you injected it meaning that if you load
 * a lifecycle in the server-side it will be managed by the server while if you
 * inject it in the client it will be managed by the client.
 *
 * ```ts
 * const appleQuest = new QuestLifeCycle({
 * 	Name: "AppleQuest",
 * });
 *
 * appleQuest.OnInit = () => {
 * 	print("AppleQuest OnInit");
 * };
 *
 * appleQuest.OnStart = () => {
 * 	print("AppleQuest has been started!");
 * };
 *
 * appleQuest.OnComplete = () => {
 * 	print("AppleQuest has been completed!");
 * };
 *
 * appleQuest.OnDeliver = () => {
 * 	print("AppleQuest has been delivered!");
 * };
 *
 * appleQuest.OnObjectiveChange = (objectiveId, newAmount) => {
 * 	print(`Objective ${objectiveId} has been updated to ${newAmount}`);
 * };
 *
 * appleQuest.OnDestroy = () => {
 * 	print("AppleQuest has been destroyed!");
 * };
 * ```
 */
interface QuestLifeCycle {
	/** Called when the quest gets completed . */
	OnComplete(): void;
	/**
	 * Called when the quest gets delivered. Doesn't get called if the player
	 * joined the game and the quest was already delivered.
	 */
	OnDeliver(): void;
	/**
	 * Called when the quest object gets destroyed. This happens when the player
	 * leaves the game or the quest gets removed.
	 */
	OnDestroy(): void;
	/**
	 * Called when the quest object gets created.
	 *
	 * If the player just joined the game and the quest is already in progress
	 * it will still call OnInit!
	 */
	OnInit(): void;
	/**
	 * Called when an objective of the quest gets updated.
	 *
	 * @param objectiveId
	 * @param updatedAmount
	 */
	OnObjectiveChange(objectiveId: string, updatedAmount: number): void;

	/** Called when the player quest starts the quest. */
	OnStart(): void;
}

type QuestLifeCycleConstructor = new (properties: Record<string, unknown>) => QuestLifeCycle;

declare const QuestLifeCycle: QuestLifeCycleConstructor;

export = QuestLifeCycle;
