import type { StorySections } from "@/lib/story-form";

export const STORY_STEPS: {
  key: keyof StorySections;
  step: string;
  title: string;
  description: string;
  placeholder: string;
  rows: number;
  optional?: boolean;
}[] = [
  {
    key: "challenge",
    step: "01",
    title: "What went wrong?",
    description: "Set the scene — what you were building and what broke in production.",
    placeholder:
      "I shipped a WebSocket feature that worked perfectly on localhost. In production, connections dropped silently with no errors in the app logs...",
    rows: 5,
  },
  {
    key: "debug",
    step: "02",
    title: "What did you try?",
    description: "List the things you checked, tested, or ruled out (bullets are fine).",
    placeholder:
      "- Checked browser console — nothing\n- Verified env variables — looked correct\n- Tested with curl — worked on the server directly",
    rows: 5,
  },
  {
    key: "fix",
    step: "03",
    title: "What fixed it?",
    description: "Explain the solution in plain language. Add a code/config snippet below if helpful.",
    placeholder:
      "The issue was NGINX not proxying the /socket.io path correctly. I updated the location block to pass WebSocket upgrade headers...",
    rows: 5,
  },
  {
    key: "lesson",
    step: "04",
    title: "What did you learn?",
    description: "The takeaway you'd tell another developer on your team.",
    placeholder:
      "- Always test WebSockets through the same reverse proxy as production\n- Silent failures often mean the request never reached your app",
    rows: 4,
  },
];
