---
title: "How does that damn AI control your computer?"
hook: "A text-spitting machine moving your mouse. The trick is a piece of software called a harness, and you can understand it in ten minutes."
kicker: "harnesses"
emphasis: "your computer"
order: 4
---

Have you ever wondered how AI, a text-spitting machine, can control physical items, like your computer? I have. It does it with a piece of software called a "harness".

As a software engineer with 10+ years of experience, I had to learn the ins and outs of harnesses, so I read everything about them, and I've made my own (several of them).

You do not need to build a harness like I did to understand how it works. But I firmly believe that in order to use something effectively, you need to understand how it works, and to use AI effectively you need to understand harnesses. What they are, and how they work at a basic level. Knowing how something works allows you to use it more effectively and to build it yourself if you want.

Let's jump headfirst into what a harness is, and how a text-spitting machine can control physical items.

A good harness can control you computer. if it cant doo something now, it means there is a missing tool.

## Iron Man to the rescue
A harness is software that reads the output of an AI, acts upon it and returns the result to the AI for further analysis. 

I bet this doesn't tell you much...

I think a harness is a poor analogy for what "AI harnesses" actually are. It is true that you put a harness on an AI, but then what? What do you do with that harness, and what is it pulling? How does that harness thing allow you to control the computer?

This word "harness" does not answer those questions. Instead, I like to imagine the Iron Man suit.
To use Iron Man's suit, Tony Stark needs 3 elements: the suit, Jarvis \[the AI\], and himself orchestrating it all.

There are two ways Tony controls his suit:
1. Quick-action buttons to start flying and shooting missiles
2. Asking Jarvis to fill the gaps. For example, an enemy is behind Tony, so Jarvis automatically controls the suit and shoots a missile at the enemy, or when the suit is disassembled Jarvis controls the flight of the parts towards Tony.

In this picture, the harness is the software operating the suit, and Tony uses it with buttons, and Jarvis (the AI) has access to the suit as well, covering what Tony can't see or wants to automate.
In our case, a harness is software, such as Claude Code, Codex or Chapeta. You use the software by interacting with it via buttons and text messages to your favorite AI (Jarvis).

> A quick bit of context about AI. AI is a very broad term for the concept of "machines mimicking humans". Inside this concept lives a particular kind of model - the LLM. All the big names you are familiar with, "GPT", "Claude", "DeepSeek", "Gemini" and friends, are LLMs or Large Language Models. So from now on I'll use the term LLM.

There is a catch, though. An LLM is a fancy text-in, text-out machine (a small understatement, but it is the gist) - that's it, nothing more, nothing less.

So text cannot shoot missiles, can it? Well, an LLM can output text, telling something else to shoot a missile, something that understands it - the suit.

## Controlling the uncontrollable
Let's dive a bit deeper and understand how plain text is able to control a suit.

The suit is a computer, and the computer runs software, and software is code. Code is rigid, literal, a stupid set of long instructions for the computer to follow, to perform an action when "something" happens.

Every "something" needs to be written. **Every**-**single**-**something**.

And something needs to be simple: if this is equal to that then do addition, else if this is greater than that then do subtraction, else panic. Over and over again.

You see, theoretically, a programmer could write a rule for every variation: "4+7", "Add 4 and 7", "what's four plus seven", etc. But actually, they can't, because no one can list every rule. What about "Ad 4 and 7"? Yes, misspellings happen.

We need a way to reduce the infinite number of possibilities to something predictable and small.

Enter the "tool call".

The communication between the software and the LLM happens via what is called a "tool call". A "tool call" is just a predictable way to represent information following a protocol. The LLM literally asks to call a tool.

A tool has three ingredients:
- The name of the tool
- The information the tool needs to run - what is called the "input" to the tool
- The description of the tool: what it does and when to call it

For example, imagine the following tool:
- Name: "add"
- Input: two numbers
- Description: accepts two numbers and returns the sum

The software then calls the LLM with the tool list, and the request of the user - the prompt. Something like:
```
Available tools:
- add: x, y - accepts two numbers and returns the sum
______
user: Please add the numbers 4 & 7
```
If we use a good LLM (but, for the sake of argument, one that does not know how to do addition!), the result should be something like:
```
add|4|7
```
Or, if the user sends "Please add the numbers 432 & 7", the output will be:
```
Available tools:
- add: x, y - accepts two numbers and returns the sum
______
user: Please add the numbers 432 & 7
LLM: add|432|7
```
Notice something special about the information the LLM has returned.
Its shape is predictable: Tool name \| number 1\| number 2

This is what is called "structured information" - a predictable, simple container for information. Forms are a good example of structured information. Each field in a form has a label and a value. The user's prompt is "unstructured information", because you cannot predict how the information will arrive. Hence you cannot put it in a form automatically.

The entire field of AI is dedicated to handling unstructured information, and LLMs in particular can structure unstructured information.
- "4+7"                             -\> add\|4\|7
- "Add 4 and 7"                 -\> add\|4\|7
- "what's four plus seven" -\> add\|4\|7
- "Ad 4 and 7"                  -\> add\|4\|7

Classic software loves structured information. This is its bread and butter.
A good piece of code can:
1. Take the text add\|4\|7
2. Split the text by the character '\|' - getting its parts
3. Know that the name is the first part, and the second and third parts are the numbers
4. Find another piece of code that knows how to do addition, named (surprise) - "add"
5. Run that piece of code, providing it with its input, the other parts of the split: 4 and 7
6. Return the result 11

Now, let's take it a step further. Imagine the user requested something a bit different:
```
Available tools:
- add: x, y - accepts two numbers and returns the sum
______
user: Please multiply 4 by 3
```
A conundrum, right? Or is it? What would you have done? As a human with a brain?

I would have added 4 to itself once, getting 8, and then 4 to 8, getting 12. Well, so would the LLM.
```
Available tools:
- add: x, y - accepts two numbers and returns the sum
______
user: Please multiply 4 by 3
______
LLM: add|4|4
CODE RESULT: 8
LLM: add|8|4
CODE RESULT: 12
LLM: Final result is 12
```
Each time the LLM outputs a tool call, the code intercepts it, runs the steps, and returns the actual result to the LLM for it to decide whether further tools are needed or it can conclude and answer with the final result, creating a "feedback loop".

**And there you go: this exact process, the feedback loop, is the core idea of a harness.**

This is also exactly what the Iron Man suit does.
Tony asks Jarvis to deal with a particular enemy, so Jarvis confirms and returns a tool call - "Fire missile" \| the enemy position. The suit software interprets the command and fires the missile, feeding it its target position. After the missile explodes, the suit tracks the enemy's state via video, and Jarvis analyzes the result and decides whether to fire another missile, until the goal is met - the enemy is "dealt with".

A harness is software that reads the output of an LLM, acts upon it and returns the result to the LLM for further analysis.

## Different harnesses, different suits
Even our dead-simple addition example is considered a complete harness. You see, there are many types of harnesses, each dedicated to solving a particular problem.
Just like Tony's many suits, each harness has a specific goal, capabilities, and limits.

Another example of a completely different harness is the Writor app.
Writor is a text editor similar to "Microsoft Word", but it has its own harness called "the teacher". Its goal is to teach the user proper English writing, structure and storytelling. "The teacher" has the following tools:
- List files
- Read file
- Edit memory
- Raise comment
- Close comment

The process triggering the LLM feedback loop: a user writes an article / essay / letter to a loved one / email / any piece of text, and asks the teacher (the harness) to review the piece.

Imagine you are asking your friend to go over your piece, but they know nothing about it, and neither does the LLM. You first need to give it context. It knows only what you hand it.

Unlike your friend, the LLM can find the text by calling the harness, so the first thing it does is explore to gather context by asking the harness to list all of the files in a folder. It calls the "list files" tool, and the harness intercepts the call and handles the actual action.

Then the LLM needs to know the content of the files, so it requests a read of several relevant files. Once it finds the text, the LLM continues with its magic and calls tools to raise comments for the writer and update its memory files with the mistakes and the writer's style. The harness catches those tool calls and starts marking the text in the editor.

Once the LLM decides that all comments have been raised, the writer fixes their piece and asks "the teacher" to recheck it, so the LLM works again, closing and raising comments, and so on, in a loop, until the user or "the teacher" decides that the piece is good enough.

But this is still considered a simple harness. It has one job and is quite limited: teach the user how to write proper English prose.

## The beasts
However, a real harness you see in the wild, like Codex, Claude Code, or Chapeta, has more tools, and they are a bit more sophisticated. You can sort them into four major pillars: read, write, web, and do.

Read tools, just like in Writor, allow the LLM to list files and read file contents.

Write tools allow the LLM to write completely new files or edit any file on the computer, unlike Writor's edit tool, which is limited to the memory alone.

Web tools allow the LLM to extend its knowledge via the web. It can search and fetch web pages, just like you do with Google.

And the most capable of them all is the "do" tool, or technically, "the shell".
The shell is special. This is the software those hackers in the movies use when you see the falling green screen of characters (no joke).

It allows complete control over the computer via scripts, and scripts are - text!
Remember, an LLM is a giant text-output machine, so it is a perfect fit for a tool whose input is text!

In fact, it is so powerful that some harnesses opt out of using the other tools, since the shell can do their jobs by itself.

So why keep them? Two reasons:
1. Limits. You can code protections and limits on the dedicated tools, and ask the LLM nicely not to use the shell when other tools are available. The shell is way too hard to limit. The best we can do here is what's called "sandboxing" the execution - run code in a "safe" and restricted environment, and, as you may have heard, LLMs like escaping those boxes if possible.
2. Transformed, predictable, and structured output. In "read file", for example, you can redact sensitive information so the LLM won't see it.

Via those tools, a complete feedback loop can be achieved. By complete, I mean anything you want to do can be done on the computer, with a simple unstructured text request - your prompt.

So, if those harnesses can do everything, why not use them for everything?

Different suit. Different controls.

Take Writor as an example again. Can you learn proper English prose using Claude Code? Of course you can, but will you like the experience? Imagine a 2000-word essay with a grammar mistake on line 71 - good luck finding it.

With a different harness (different suit/software), one can take the LLM result and physically mark the text itself, helping the user navigate to the exact location. Not to mention the fact that the harness of Writor simply cannot edit the text - unlike Claude Code, which can hallucinate and change your entire essay only to say "Oops, sorry, I misunderstood".

## Try some suits, or build one that fits you
Jarvis (the LLM) never fires anything. It only writes text, and the software does the firing. The suit checks the result and reports back to Jarvis, who then decides what the next step is.

When no suit fits, or the one you have does a subpar job, create one yourself. I bet you are using plenty of uncomfortable ones - just look around you and the apps you use. Are there apps you use repeatedly but hate? Or have you noticed the pain of an inefficient process while working towards a goal? "There is a better way to do that!" you told yourself. Where did you adjust to the process instead of adjusting the process to fit you?

You know how one works now, and trust me, you do not need to know how to code to create a personal suit.

If you have never used a beast, such as Codex, Chapeta, or Claude Code, use one to create your own special suit. It is dead simple - you just talk to it, and it does what you ask.

Describe what you are trying to achieve, tell the beast about your pain, about the bad process, exactly what you are doing now and what you think you can do better. Let the LLM guide you.

That's exactly what I do. I built Writor because no other process was good enough for me. Another example of a suit I've built is TimeLion: I follow a strict daily routine, and no routine app gave me the ease of use and the exact knowledge of where I am in my day, because I tend to focus so hard on a task that I lose track of time.

Do not overthink it. Try. I'm here if you need help.
