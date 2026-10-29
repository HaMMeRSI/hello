export const era = [
  {
    title: 'AI writes the code now',
    body: [
      'Until a year ago, solving a problem with software meant years of learning to program. Now an AI agent writes the code, runs it and fixes it.',
      'The hard part moved. It is no longer how to build. It is knowing exactly what problem you are solving.',
    ],
  },
  {
    title: 'Your problems are yours',
    body: [
      'Apps are built for problems many people share. They fit everyone a little, and nobody exactly.',
      'The problems only you have never got software. Now you can give it to them yourself.',
    ],
  },
  {
    title: 'A PaPP needs 10% of a product',
    body: [
      'A PaPP is a personal app. Software that solves your problem, for you, your family or a few co-workers.',
      "It doesn't need to serve millions, scale, or be pretty. It needs about 10% of what a production app needs, and the AI handles most of that 10%. The rest is the problem, and that part is yours.",
    ],
  },
];

export const problems = [
  {
    problem: '"I tried five apps. None of them fit."',
    solution: 'A PaPP fits exactly one person. Only the features you need, working the way you think.',
  },
  {
    problem: '"I do the same task every week, by hand."',
    solution: 'Automate it once. Copying between apps, filling the same sheet, renaming the same files.',
  },
  {
    problem: '"My workaround is a spreadsheet I hate."',
    solution: 'Turn it into an app built for the job, instead of fighting a grid every day.',
  },
  {
    problem: '"If only this app had one more feature."',
    solution: "Stop waiting on someone else's roadmap. Add the feature yourself.",
  },
  {
    problem: '"I have the data. I can\'t see anything in it."',
    solution: 'Get the insights about yourself that no generic app shows. Where the money goes, what your week actually looks like.',
  },
];

export const steps = [
  {
    title: 'Spot the problem',
    body: 'Watch your week. What do you repeat, work around or complain about? Pick one problem that bugs you often enough to care.',
  },
  {
    title: 'Define it',
    body: 'Write it down in painful detail. What happens today, what hurts, what the ideal solution looks like for you. This is 80% of the work, and the part no AI can do for you.',
  },
  {
    title: 'Install Apargon',
    body: "Apargon runs PaPPs. A PaPP is one file on your computer: no server, no hosting, no setup. On first open, say yes to the papp skill so your AI knows how to write them. It's free and open source, for macOS and Linux.",
    link: { href: 'https://apargon.com/#download', label: 'Download Apargon' },
  },
  {
    title: 'Get a coding agent',
    body: 'A coding agent is an app that lets AI write code on your computer. Claude Code, Codex, or Chapeta, which I built for PaPP creators. Pick a folder, and your PaPP lives there.',
  },
  {
    title: 'Build it in small parts',
    body: 'Tell the agent what you need, not how. It writes the .papp file, and the open window reloads every time it saves. Start with the bare bones, then add one feature at a time, each in a fresh chat, because the AI gets worse as a chat gets long.',
  },
  {
    title: 'Check it solves the problem',
    body: "Double-click the .papp. Before any of its code runs, Apargon shows what it wants to touch: read it, then click Allow. Use it. Tell the AI what's broken, what's missing and what you don't like. Go back to your definition. Done means the problem is gone.",
  },
];
