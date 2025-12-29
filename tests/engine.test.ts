import { describe, expect, it } from "vitest";
import { generateReply } from "../lib/assistant/engine";
import { Message, Memory } from "../lib/types";
import { now } from "../lib/utils/time";

describe("generateReply", () => {
  it("returns an assistant message with plan and modules", () => {
    const history: Message[] = [
      {
        id: "msg-1",
        role: "user",
        content: "Help me plan a study session for systems programming. Remember that I only have 2 hours.",
        createdAt: now()
      }
    ];
    const memories: Memory[] = [];

    const { message, plan, moduleResults } = generateReply({
      history,
      memories,
      enabledModuleIds: ["mentor-core", "planner-steps", "guardian-safety"]
    });

    expect(message.role).toBe("assistant");
    expect(message.content).toContain("Jarvis Online");
    expect(plan.actions.length).toBeGreaterThan(0);
    expect(moduleResults.length).toBeGreaterThan(0);
  });
});
