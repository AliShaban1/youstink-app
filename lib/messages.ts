export const MESSAGES = {
  funny: [
    { id: "f1", text: "Bro... you smell like a gym bag left in a hot car. For a week.", short: "The Gym Bag" },
    { id: "f2", text: "Someone nearby thinks you and a skunk might be cousins. Just sayin'.", short: "Skunk Cousin" },
    { id: "f3", text: "Your vibe? Immaculate. Your scent? A war crime.", short: "War Crime" },
    { id: "f4", text: "Roses are red, violets are blue, something smells awful, and buddy — it's you.", short: "Poetic Justice" },
    { id: "f5", text: "You walked past someone today and they're still recovering.", short: "Still Recovering" },
    { id: "f6", text: "You're giving... fermented. Please reconsider.", short: "Fermented" },
  ],
  kind: [
    { id: "k1", text: "Hey — someone who cares about you wanted you to know that your body odor has been noticeable lately. No judgment, just a heads up.", short: "Gentle Heads Up" },
    { id: "k2", text: "This is awkward to say out loud, so it's being said here instead: you might want to freshen up your hygiene routine. This comes from someone who cares.", short: "From Someone Who Cares" },
    { id: "k3", text: "Someone noticed you haven't been smelling your freshest. It happens to everyone — just a friendly reminder.", short: "Friendly Reminder" },
    { id: "k4", text: "A person in your life wants you to know your breath has been rough lately. Maybe a dentist visit? They're telling you because they care.", short: "Breath Check" },
    { id: "k5", text: "This comes from a place of love: a little deodorant goes a long way. You're great — just need a freshness boost.", short: "Freshness Boost" },
    { id: "k6", text: "Sometimes we can't smell ourselves. Someone close to you wanted to gently let you know — your scent has been strong lately.", short: "Can't Smell Yourself" },
  ],
} as const;

export type Vibe = "funny" | "kind";
export type Message = (typeof MESSAGES)[Vibe][number];

export function findMessage(id: string): Message | undefined {
  const all = [...MESSAGES.funny, ...MESSAGES.kind];
  return all.find((m) => m.id === id);
}
