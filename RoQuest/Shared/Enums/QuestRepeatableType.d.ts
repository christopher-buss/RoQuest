/**
 * Sets how often and if it is possible to repeat a quest.
 *
 * - `Custom` - Quest can only be completed when the developer sets it to be.
 * - `Daily` - Quest can be completed everyday.
 * - `Weekly` - Quest can be completed weekly.
 * - `NonRepeatable` - The quest can only be completed once.
 * - `Infinite` - This means the quest can be repeated non-stop without any delay.
 */
export type QuestRepeatableType = "Custom" | "Daily" | "Infinite" | "NonRepeatable" | "Weekly";
