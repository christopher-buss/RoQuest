/**
 * Tracks the current status of the player's quest.
 *
 * - `Completed` - The quest objectives have been fulfilled and the quest is now
 *   completed.
 * - `Delivered` - Means the quest has been delivered and closed.
 * - `InProgress` - The quest is still in progress.
 * - `NotStarted` - The quest hasn't been initiated by the player.
 */
export type QuestStatus = "Completed" | "Delivered" | "InProgress" | "NotStarted";
