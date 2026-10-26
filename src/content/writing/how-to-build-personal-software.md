---
title: "How to build personal software in the AI era"
hook: "Everything you need to build a PaPP: the core principles, the five questions, the recipe. No code required."
kicker: "the guide"
emphasis: "personal software"
order: 4
---

Have you ever told yourself, "Damn, I wish this app existed - it would have saved me a ton of work," or "If only this app had this feature it would be perfect"? Or maybe you noticed a task that you do again and again that an app could automate?

Well, today, you can build it your self.

To build a proper Personal Application (PaPP), you need to know and understand the core principles of software, but not the nitty-gritty details anymore.

The barrier to entry has dropped by several orders of magnitude, and the learning curve has flattened, the same way my generation never needed to learn Assembly or even C to build effective software.

As a software engineer with 10+ years of experience and countless PaPPs already built, I'll share everything you need to know in the new age to be an effective builder.

This is for the new builders - which is everyone!

The ones who will use AI to build with.
The ones who will not delegate the thinking to the AI.
Those who know the challenges they face, and those who want to solve them.

To build an effective PaPP for yourself, your family, a close group of friends or your co-workers, all you need is to be curious and want to learn.

The first sections of the piece will be dedicated to closing the gap between complete beginners and intermediates. Feel free to skip to the recipe if you are familiar with the core principles of software.

## What is a PaPP?
To understand Personal Apps (PaPPs), we first need to understand what classic software is, and what it is for, because a PaPP is software.

> Good software solves one real problem.

There are three kinds of problems: core, specialized, and hyper-specialized. Core problems are basic problems that everyone faces. For example, communication, storage, presentations, etc.
Specialized problems are ones most of us face at different scales, like money management, diet tracking, entertainment, etc.

And you can imagine their solutions: Email, Google Drive, PowerPoint, your favorite app store apps, and your favorite games.

And then there are your problems, which I call hyper-specialized problems: problems no one else faces exactly the way you do, and that no one will solve for you, because you are the only one facing them.

The apps you wish existed but don't, the automations you prayed for, and the one feature that would have made the difference.

PaPPs can save you a ton of time, completely automate a task you do, give you insights you never knew about yourself. Honestly, the only limit is your imagination. PaPPs can completely transform your life.

Great examples of PaPPs would be a couple of my own hyper-specialized problems and the PaPPs I built to solve them:

**++Writor++**
- The story:
  - I love writing with pen and paper, and I love editing on my laptop, but English is not my native language, so I am learning.
- The problem:
  - Transferring the text from the paper to the editor
  - Integrating AI in a way that it won't edit my text but will point out where my mistakes are
- The solution: a PaPP where:
  - I can edit text with a teacher (AI) integrated. With one click of a button I can take a photo with my phone, and it will appear on my PC, transcribed.
- The data: draft text files

**++TimeLion++**
- The story:
  - I'm trying to keep a routine in my head. I need to allocate time to writing, building, socializing, gym, etc.
- The problem:
  - I love dwelling in one problem longer than I should.
- The solution: a PaPP where:
  - I can clearly define blocks in the day
  - Top visualization. I need to know exactly where I am in the day and what's next.
  - Notifications - I need to hear the end
- The data: Time & text (the task)

And many more. All of them solve a real problem I face that no other app solves, or the solutions offered are subpar.

For a PaPP to be good, it does not need to scale - it should not answer all the problems in the world. It does not need to serve millions of users, it does not need Fort Knox security (unless you plan on storing sensitive stuff, of course), and it does not need to be pretty, although it's always nice. It shouldn't try to be any of that.

A PaPP has one goal and one goal only: solve your problem. And this goal does not require what production-grade apps require.

## Some essential concepts
We need to understand some key concepts about every piece of software out there.
- Shape of software - mobile app, desktop app, script, web app, Excel automation etc.
- Cloud - Literally four walls, and inside them are a bunch of computers that are not yours but are rented to you.
- Server: a computer, that's it. Your laptop is a server, and the computers in the cloud are servers.
- Client - the software interacting with the server. It could be your notes app interacting with your computer, a browser like Google Chrome interacting with the cloud, and it could be your calendar interacting with Google servers.
- Secret - Usually, but not limited to, a piece of text - a key that you paid for, and that grants you access to a server owned by someone else.
- API - A contract between the server and the client on how they can talk to each other.
- Coding agent (or harness) - a piece of software that knows how to read, write, and execute code.

It is important that we understand the role of a server.

You are probably asking yourself: if a server is my computer, why are there clouds?
It is a nuance you must grasp.

Let me ask you a question: when you enter X, do you think you gain access to Elon's personal computer? Nope.
It will not handle, nor should it, the masses who are using X.

You access Elon's servers. This is the server's job. It's a different machine, and its whole job in the world is to let other people access and use X. Servers are computers that are configured very specifically for the task they are assigned. Security-wise & resource-wise.

Another reason we need servers is to bypass software limits. Browsers cannot access your computer by design for security reasons. Imagine you somehow visit x.kp (North Korea) instead of x.com, and all the private data on your computer gets lifted. That's bad, so browsers severely limit access to the computer that runs them.
So if we cannot save data on your machine, where does it go? Servers. A client sends & requests the data to and from a server via the API and the server stores or returns it.

Another limit is your computer itself - it is weak. If you want to serve your own X to millions of people, your personal computer will melt. That's why we delegate this task to a much stronger computer - the server.

And the last reason we need servers is to keep shared secrets safe. You see, everything, and I mean **everything**, that is stored on the client is visible to everyone. A server, however, is protected. There are very few ways to access and communicate with it.
That's why we store the secret in a remote secure server.

## How the code comes alive
It is good to know for yourself what is going on behind the scenes, at a basic level. Most of it a coding agent will handle.

Every piece of software has 2 main ingredients: project & runtime. A project is a collection of folders with files in them.
- Files - can be of any form and shape. They can be images, audio, video, but the most important are the files with the code - simple text files with the extension of the programming language we chose. For example, if we chose JavaScript, they are named ".js" files.
- Folders/directories - contain those files for structure and navigability
- Project - also just a folder. The root folder that contains all files & folders of the software.

Any folder with at least 1 code file is considered a project.

A concept you do need to understand is the folder you are currently working in. The "Current Working Directory" or CWD is where the agent will work. This will be its "scoped environment", from where it will explore and build your PaPP. It will not look outside unless you tell it to.

Once you have a project and you decide to "run it", we ask the runtime (which is a piece of software on its own) to take control.

Every programming language has its own runtime that knows how to read text (the .js files), understand it, and execute it on your computer.

## The Basics
There are 5 core questions a builder must answer for every piece of software before they start building:
1. Where does it run?
2. What does it remember? (the data)
3. How do the parts talk? (how the data moves)
4. How does it decide?
5. How do you keep it alive?

## Where does it run?
Web? Mobile? Desktop? Each has its pros and cons.

Desktop pros:
- Can interact with anything on your computer
- State is dead simple. Just touch a file
Cons:
- Harder to share with others
- Cannot work on mobile
- it only runs while your computer is on.

Web pros:
- Works everywhere. Desktop, mobile, etc. All it needs is a browser.
- Extremely well standardized. AI can build web apps no problem.
- Super versatile. Games, landing pages, image editing - almost anything goes.
Cons:
- For any reliable persistent state you need to set up a server
- It has to be hosted somewhere to be reachable
- Anyone with the link can reach it, so personal data needs protection.

Mobile pros:
- Works on mobile
Cons:
- Hard to set up, even with AI.

Scripts (a program that runs, does one job, and exits, like renaming 500 files.)
pros:
- No UI
Cons:
- No UI

Some rules of thumb to choose your platform to build your PaPPs:
Do you need it only on your phone? Choose mobile
Don't wanna mess with servers? Choose desktop app.
Do you need it to work everywhere? Choose web app

Do not be scared of servers, though - AI will handle them for you.

## What does it remember?
It is all about data.

Your reminders app stores the reminders. When and what. - text
Your fitness app stores sessions, what machines you used, times, etc. - text
Your expenses app stores your expenses, budget, goals and more - text

What is the data your problem needs to remember?

There are many ways to store data. But for PaPPs all you need to know are these:
- Files: txt, images, audio
- Database (db): these are files themselves, but special ones. They are designed to store tabular data, data that can be represented with rows and columns. Like person details: name, age, id etc. They are special because databases expose efficient tools out of the box to aggregate, handle and process tabular data.

A snapshot of your data at a given moment is called "state". State is what your app stores right now - the state of your expense app is the expenses you gave it to store.
Or if you logged in, the state of the app updates to include your credentials.

## How do the parts talk?
Communication has several aspects inside an app. Basically something needs to talk to something else, pass data around, or trigger an action.
- Buttons can trigger some visual change.
- Your profile pic watches your login state.
- X.com requests some new posts to doomscroll through.

There is also the question: who can talk to whom? Not every element in an app needs to interact with another - permissions and gates.
If a user is logged out, we cannot show them the special sauce.

## How does it decide?
How does an app know how to trigger an action?
How does it actually decide to show you your profile pic?
How does it decide how many times it should request a specific resource?

State, conditions, and loops - that's the essence of software. And it's where old-school programmers spent years learning and mastering.

This is where Computer Science begins. If you want to learn (highly recommended), there is infinite knowledge out there, but this is outside the scope of our guide. For our purposes the agent will decide how the software decides.

Still, a key concept to understand is "Deterministic action" vs "Non-deterministic action".

A deterministic action is one you run and expect the same result from, every time. Addition is a deterministic action: 1 + 1 = 2.
Notice the action has 3 parts:
1. The action: the + operation
2. The input: 1, 1
3. The output: 2

As long as we give the '+' operation (the action) 1 & 1, we expect to get 2. Period. End of story.

With a non-deterministic action, on the other hand, you cannot expect the result to be the same. Rolling a die is non-deterministic, and so is AI's output. You can ask it the same question twice and get two different results.

The reason you need to grasp this concept is to know when you need AI to solve your problem, and when a piece of code will do the job. AI is smart; pair it with a harness and it can do almost anything, but AI costs money, can make mistakes, and it is slow.

A piece of code is instant, free & will always execute the same.

## How do you keep it alive?
Ok, you built a proper PaPP that actually solves your hyper-specialized problem. Now you need to verify that it works and make sure you handle the pitfalls.

**Costs**
- Your AI tokens - be aware of those, choose a proper plan.
- Other service providers - if you choose to use them.
- Infrastructure - servers & cloud services. For a PaPP costs can be next to 0. You either run it on your computer, which requires no further infrastructure, or you run it in the cloud, which has VERY generous free tiers, but can start costing money once you outgrow them.

**App secrets**
You need to be aware that they exist. Keys you paid for, sensitive information or proprietary data. Ask AI how to handle them, and it will guide you. Follow its steps carefully.

**Error handling**
Errors will happen - that's just how it is, and it is ok. The key is to make sure the AI sees and handles them. When we create the PaPP for the first time we also tell the AI to make sure that all errors are visible and logged - which happens almost automatically and gets improved over time.

**Version control**
Git - highly recommended. Bugs happen. And sometimes what already worked can suddenly break. We want to know why and what happened since. That's why there are solutions to save versions of your app - ask AI to guide you and set you up.

**Boundaries**
The agent can do almost anything on your computer. That's the point, and that's the danger. Some things stay in your hands:
- Git - the agent can explain it and set it up, but you decide when to save a version. Never let it "clean up" or "stash" your work on its own.
- Money - anything that costs per call, AI models included, runs only after you say yes.
- Live data - your real expenses, your real drafts. When the agent wants to test something, it tests on a copy.
- Secrets - never paste a key into the chat. Ever. The chat is saved in plain text on your computer. Ask the agent where the key should live and put it there yourself.

**How you know it works**
Feedback loop. You ask AI to implement a feature, then to launch the app. Test the feature: does it work as expected? Do you like what you see?
No? Tell the AI what happens or what to change.

For a proper robust production app, you need secure, well-configured servers that take care of scale, and the code itself must be exquisite, because it is not only you and the AI working on it - other people read it as well.

A PaPP needs 10% of it.

It may or may not need a server, depending on the shape you chose, and the AI will operate it for us either way. Only the agent needs to read the code, and the errors. Versions are there so you can recover lost code with the agent's help.

## The recipe
A critical thing you need to understand is that you are not the coder.
You manage one.
The AI is the coder. It knows how to implement, and it knows how to fix.

You need to know what to do.

There are 2 main steps to building a PaPP.
1. Preparations
2. Build

## Preparation step
Preparation is 80% of the work and probably the harder part.
Make sure you prepare for the build - "Train hard, fight easy".

For the preparations you need to make sure you have attacked the problem from all angles.
- Identify it - What is the challenge you are trying to overcome? What's the pain?
- Well-define it - Write it down. Everything in painstaking detail. Step by step.
- Solution picture - What would an ideal solution for you look like?

You can read my article on how exactly to do it [here](https://hammersi.substack.com/p/the-last-human-skill-standing-nobody)*.*
Do not skip this part, I cannot overstate how important it is.

Then to solidify the solution, you need to answer the questions in this order:
1. Where does it run?
2. What does it remember?
3. How do the parts talk?
4. How does it decide?
5. How do you keep it alive?

Let's take Writor as an example.

**What is the problem I faced?**
- I draft on paper. I edit on my laptop.
- There is no easy way to move physical paper into a text file.
- I'm not a native English speaker, so when I edit I need an assistant that will help me with grammar and structure.
- I hate complicated and bloated apps.

There is no solution online that solves all 4 points. The parts? Yes. My process before I created my PaPP was: write on paper, take a photo with my phone, share via Google Drive, move to AI for transcription, copy and paste in a file, edit with Obsidian, ask AI for comments. - 30 minutes, from paper to digital, only to start editing.

**What is the ideal process I imagined:**
1. I draft on paper. I edit on my laptop.
2. I want the digitization of the paper to be seamless. With one click I would take a photo with my phone, have it on my laptop, let AI transcribe it, and have a file ready in my editor.
3. I want an AI teacher to correct me, guide me with proper grammar and structure, and mark exactly where I made a mistake.
4. I want to be able to edit the draft in the same PaPP.

**Where does it run?**
- I do not want to mess with servers, and I do not need a mobile app.
- All I need is to take a picture of a paper and edit text files on my computer.
- The teacher does need a secret for me to be able to use OpenAI, but no one else needs access to this key. Mac has a safe place to store it - I know because I asked AI.
So a desktop PaPP it is. If you are not sure, brainstorm with the AI - it will guide you properly.

**What does it remember?**
Not a lot in fact. The drafts should be in a text file & I would like the teaching sessions to be saved as well. Maybe a good idea is for the teacher to remember my preferences, but we can add it later.

**How do the parts talk? Conceptually.**
- There should be a section in the app for the editor panel where I will edit the drafts
- There should be a button strip row with buttons to style and edit the text, just like in Google Docs.
- I need a button to trigger the teacher
- I need a panel to interact with the teacher perhaps via chat.
- Teacher comments should mark the text.
- I need a file explorer for easy draft navigation
It is important to understand that you do not need to see the full picture or imagine the app before you build it. Just the basic concepts and capabilities. Let AI imagine it, then you iterate.

**How does it decide?**
The nondeterministic part is the teacher. It should receive the draft as an input, do AI magic, and output comments on the draft. Each teaching session can produce different comments but it is ok as long as the comments are correct.
Other than that everything is deterministic.

**How do you keep it alive?**
- Costs: probably just the AI. It lives on my computer and no other infrastructure is needed.
- Secrets: access to AI, but it is only on my computer so Mac has a solution to safely store it.
- Version control: With the help of the AI.
- Error handling: AI will handle any errors that occur.

**Preparations - done.**

## Building step
To start building you need a harness.

A harness is software that allows AI to do things on your computer at your command, like writing, editing and launching code, opening other apps, editing your settings, searching the web, and basically doing anything you want with your computer, via free text. With your permissions.

In other words - a coding agent.

> If you are interested in a deeper dive on harnesses, you can read [this](https://hammersi.substack.com/p/ai-harness)
There are many of them out there: Claude Code, Chapeta, Codex etc. Look them up, see their offering and choose your favorite harness, download it, open it and log in, look for the getting started section for the one you chose.

I suggest Chapeta. I built it for PaPP creators. It's easy to use and not developer-oriented, and you can use any provider you want with any subscription you choose. Unlike the others, it does not limit you to its maker's models.

When you open the harness you need to select its CWD - The folder the agent will focus on and the place where your PaPP code will be stored on your computer. Create it or point to it.

One prompt and a process to achieve a successful and effective PaPP:
1. Scaffold - Prepare your working space - imagine an artist preparing their canvas and colors
2. Skeleton - Base of your app. What are the absolute bare bones for your PaPP
3. Iterations - New capabilities, modifications & fixes

A chef is a great analogy. First the chef prepares the kitchen. The chef scaffolds the knives, the vegetables and the meat. Then the chef does their **mise en place** - makes the preps. The chef cuts the ingredients, the juliennes, the brunoise and makes the sauce.

The chef creates the skeleton of the dish, and only then combines and adds details to each element separately. But the chef always focuses on 1 action at a time.

Forget about one-shots. Those viral posts about crazy apps people say they one-shotted with 1 prompt - they are either lies, or the prompts were already the code itself.

The reason for the separation is context management.

You see, just like you can remember a limited amount of information - so can the AI. Its memory is called "The Context Window". Each new empty chat between you and the AI is called a session, and each turn between you and the AI fills the context window with information in that session. After a certain threshold the results of the AI degrade - that is just their nature.

So you want to make sure that you work with a close-to-empty context window, and have a habit of creating new sessions, even for similar work.

**The sauce**
```
Below is how I work today and my answers about the app I want to build. I build with an AI harness in small steps, one fresh session per step, to keep the context small.

Step 1: Give me a plan only. Don't write any prompts yet.
- Your tech choices, in one short paragraph.
- A list of features, one line each. Each feature must point to one of my problems below. Put your own ideas in a separate "Suggestions" list. Do not include them unless I approve.
- Ask me about anything unclear.
Wait for my approval before step 2.

Step 2: Write the prompts.
1. Scaffold: a hello-world project. Folders, empty files, and an empty window that builds and opens. No logic.
2. Walking skeleton: the real layout with placeholder content, so I can see where everything will go. Buttons may exist but do nothing or show "not yet". It does not solve any of my problems.
3. One prompt per approved feature. Each one is a single change I can test in the app in about 5 minutes. If a feature needs "and" to describe it, split it.

Every prompt after the scaffold has three parts:
- Task: the one change.
- Not included: what to leave for later steps.
- Done when: how I check it by hand.

[your process and answers - your preparations]
```
This prompt will break your PaPP into small units of work to keep the context window small and increase the chances of success. It may, and probably will, ask you further questions to fill gaps. Answer as you see fit.

**Addition & Subtraction**
A tip - many software engineers themselves skip it. This is the key ingredient that will remove slop and enable a proper PaPP build.

AI is trained to add information. You ask a question and it spits out text. Code, prose, recipes, images, whatever. It will add more and more information. Unnecessary information. It may work, but it will be bloated and subpar.

That's why we need the subtraction step. The verification step and the simplification step.

After each significant task ask it to basically:
> "Double check your work, simplify and clean it".

With variations for the type of task as we will see next.

Do it in the same context window (in the same chat session). The AI has its memory full of what it did just now, so we ask it to verify itself. In my experience, 99% of the time it will come back with a better result.

In the subtraction step the AI will go over its work and improve it. You do that for the longevity of the PaPP: if you do not do it, you'll quickly realize that the AI will fail to add features.

Don't overthink it. The AI will know what to do.

**Start.**
Open a new chat session. Copy the first prompt, paste and send. The agent will do its stuff inside the CWD you chose. When it finishes, don't think twice - code subtraction step.

Here is mine for code-related steps, you can copy and paste it.
> Double check, clean and simplify the code pls \[behaviour\]
>
> - Have taste.
> - No defensive programming - trace and use proper types.
> - No 1 line helpers
> - Minimal code - maximum value
> - Inline & Consolidate code
> - No backwards comp nor legacy code
> - In this step we prefer deletion over addition
> - Top down flow - Boring self explanatory code
> - Dups for the sake of readability & simplicity are ok
> - Improve funcs and var names
After it's done with the subtraction step, ask it to launch the app. You are the one to test it manually. Look at it, click everything new and see what happens, see if it satisfies you.

Iterate - in the same session:
- If you dislike something - tell it what to change.
- If something is broken - tell it what.
- Subtract

Again, I emphasize. You do not need to read the code, and you do not need to understand how it works. You are the manager. Manage. Exactly as a manager in a company does. A good manager does not need to know the ins and outs.

They need to lead. Be the leader to the AI.

It's really that simple.

## It works, until it doesn't.
Sometimes the agent will fail. Not once - again and again. You tell it what is broken. It says "fixed". You launch the app, and it is still broken. This is where most people give up, or worse, keep asking "fix it" for an hour.

Don't.

**Stop it early**
You don't have to wait for the agent to finish. Watch what it does. If it goes somewhere you did not ask for, stop it and tell it why. A wrong plan does not get better at the end.

**Two failed fixes, then ask why**
After the second failed fix, stop asking for fixes. Ask for the reason:
> "Don't fix yet. Explain why this happens. Trace the code."
You don't need to understand the code to understand the answer. If the explanation does not make sense to you, it probably does not make sense at all. Say so.

Don't understand what it says? Ask it to explain simply, and tell it your level - it will adjust.

**Do not believe "done"**
The agent will also tell you it fixed something it did not touch, and that it tested something it never ran. It does not lie on purpose - it guesses and sounds sure. Verify yourself, open and look.

**Size is a smell**
You asked for a button and it changed 30 files? Something is off. You can't read the code, but you can ask:
> "How many files did you change and why?"
Small ask, small change. If the answer is long, the change is wrong.

**Fresh start**
And when nothing works - the agent goes in circles and keeps repeating the same mistake - open a new chat. Tell it the problem, what you tried, and what did not work. A clean context window is often all it needs.

**Don't forget to subtract**: tell it to double check, clean and simplify.

Simplicity is king.

## Build it
Do not be fooled! There is a learning curve, but the curve has flattened significantly.

I have already built dozens and dozens of PaPPs. 
A year ago they were unthinkable, because each would have taken at least a weekend and a lot of nerves. Today they take a prompt and a half.

Do yourself a favor and open up to endless possibilities. 
Find your hyper-specialized problem, define the ideal process and build it. Solve your problems. Ease your challenges. Build that automation you always needed. Build the game you fantasized about. Build the feature that closes the loop.

Align the process to you. Do not align yourself to the process.

Pop open an AI harness, make the preparations, and let it cook.

If you'd like help kicking off your PaPP journey, feel free to contact me and I'll do all I can to help.
