/** User-facing copy for the build-story / debug-diary section (backend still uses `blogs` table). */
export const BUILD_STORIES = {
  sectionId: "blogs",
  navLabel: "Stories",
  sectionIndex: "05",
  sectionLabel: "Build Logs",
  homeTitle: "Real",
  homeAccent: "Build Stories",
  archiveTitle: "All",
  archiveAccent: "Build Stories",
  homeSubtitle:
    "What broke while I was building, what I tried, and how I actually fixed it — real struggles and wins from production.",
  archiveSubtitle:
    "A log of bugs, blockers, and breakthroughs from shipping real software.",
  storyArc: [
    { step: "01", label: "Challenge", hint: "What broke" },
    { step: "02", label: "Debug", hint: "What I tried" },
    { step: "03", label: "Fix", hint: "What worked" },
    { step: "04", label: "Lesson", hint: "What I kept" },
  ],
  featuredBadge: "Latest incident",
  cardLogFile: "incident.log",
  cardCta: "See how I solved it",
  cardOpen: "Read story",
  homeCta: "All build stories",
  archiveCount: (n: number) =>
    `${n} build stor${n === 1 ? "y" : "ies"} logged`,
  homePrompt: "Pick a story — every one has a bug and a fix",
  archivePrompt: "$ ls ./incidents --resolved",
  articleIntro:
    "A build story — a real challenge in the field, how it broke, and what finally fixed it.",
  articleBodyLabel: "$ cat incident_report.md",
  articleEndTitle: "More build stories?",
  articleEndSubtitle: "More bugs, more fixes, more lessons from the trenches.",
  articleEndCta: "Browse all stories",
  emptyTitle: "No stories logged yet",
  emptySubtitle: "New build stories will appear here once published.",
  admin: {
    consoleTitle: "Build Stories Console",
    consoleCommand: "$ admin --stories",
    loginSubtitle: "Enter your password to manage build stories",
    listTitle: "Build Stories",
    listCount: (n: number) => `${n} stor${n === 1 ? "y" : "ies"} logged`,
    newStory: "Log new story",
    createTitle: "Log a Build Story",
    editTitle: "Edit Build Story",
    backToList: "Back to stories",
    stats: {
      total: "Total stories",
      published: "Live on site",
      drafts: "Drafts",
    },
    emptyListTitle: "No build stories yet",
    emptyListSubtitle: "Log your first bug → fix story to get started.",
    tableStory: "Story",
    viewLive: "View story",
    editStory: "Edit story",
    publishLabel: "Publish story on portfolio",
    publishNow: "Publish immediately",
    saveStory: "Save story",
    saving: "Saving...",
    saveChanges: "Save changes",
    fields: {
      title: "Story title",
      titlePlaceholder: "e.g. My WebSocket worked locally… then production broke",
      slug: "URL slug",
      slugPlaceholder: "my-websocket-production-bug",
      hook: "Hook (card summary)",
      hookHint: "1–2 sentences: what broke + what you learned. Shows on story cards.",
      hookPlaceholder:
        "Everything worked locally — until production silently failed without a single error in the logs.",
      body: "Incident report (markdown)",
      bodyHint: "Follow the 4-part arc: Challenge → Debug → Fix → Lesson",
    },
    insertTemplate: "Insert story template",
    resetTemplate: "Reset to template",
    importLinkedIn: "Import from LinkedIn",
    previewEmpty: "Nothing to preview yet. Write your story in the editor tab.",
  },
} as const;

/** Default markdown skeleton for a new build story */
export const BUILD_STORY_TEMPLATE = `## The challenge
<!-- What broke? What were you building? Why did it matter in production? -->

Describe the problem here...


## What I tried (debug)
<!-- Logs, hypotheses, and dead ends -->

- First thing you checked
- What didn't work and why


## The fix
<!-- What actually solved it — code, config, or architecture change -->

Explain the solution step by step.


\`\`\`bash
# paste relevant commands, config snippets, or code here
\`\`\`


## What I learned
<!-- The takeaway you'd tell another developer -->

- Key lesson 1
- Key lesson 2

---

*#ProductionBug #Debugging #DevOps*
`;
