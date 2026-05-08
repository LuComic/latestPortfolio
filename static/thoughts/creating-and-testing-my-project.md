# Creating and testing my project (failed project)

## Prologue

This "thought" is quite different. It mostly captures my process of vibe coding an idea I had and then, the most interesting part, testing it.

I didn't expect the process of testing an idea to be so interesting to me and, like the title says, the project did end up as a "failure", but it was fun nevertheless.

## Idea

I heard somewhere that these days it's better to create a supply chain product or a so-called *building block* if you want to succeed. Because of this I've been trying to think of something and one day, after I started using <Pi>, I thought, why not create a CLI? With AI, a known struggle is context management and there are different solutions to it.

My original idea was a CLI that goes through your whole repo and adds a small comment to the top of each file. This comment would contain a small summary of the file, the key functions, and some "tags". This way the agent wouldn't have to read the whole file and could get the most important information from the start, saving context and token usage. Then there would also be a file at the root, which would link all of these together and help find similar files, e.g. by a tag. A simple example:

AuthLogin.svelte -> tags: [auth, component]; functions: [login, verify]; purpose: 'verifies and signs the user in; used as a component in login/page.svelte

After talking to gipidy I realised that changing every file would not be optimal and that there are projects that already do "repo mapping/indexing". But adding this AI summary or a small snippet would be an interesting touch. Result: a CLI named Repoty that creates a .repoty/ file at the root and contains the project map, files, etc., that would, *in theory*, give context to agents later in the repo. Flow:

Some bug -> agent -> agent looks .repoty/ -> finds relevant files -> goes quickly to those files and fixes the bug

## Implementation

This section won't be long. I basically let the same gipidy session create a prompt for my pi instance, gpt 5.5, and it did its own thing. First time I've actually vibe coded something without writing ANY code. I did do some research though and went for <Commander> for the CLI commands and <Codex CLI> for the model doing the conclusions and stuff. There are also other packages, of course, but I won't go too deep into them.

## Test 1

After the code was done and was passing all the tests, I wanted to try out if the project is actually useful or not - does it save tokens, use fewer tool calls, and is it therefore cheaper.

I let gipidy create some basic files: 2 pairs; one pair was a bug, the second pair was a feature implementation; in each pair, one is control, the second is with Repoty.

Two runs for both; after that, all tests had just one run. I accidentally left the pi CLI (which I used for testing) on my *gpt 5.5* setting, which I realised later.

**Bug**
  - Control — avg tokens: 12,740.5 · tool calls: 10.0 · price: $0.051986
  - Repoty — avg tokens: 18,250.0 · tool calls: 10.5 · price: $0.050304
**Feature**
  - Control — avg tokens: 11,607.5 · tool calls: 9.0 · price: $0.044204
  - Repoty — avg tokens: 14,511.5 · tool calls: 9.5 · price: $0.058030

Emmmm, these numbers aren't good at all, but the price IS slightly smaller with Repoty for the bug case. Repoty being cheaper could be because it used a lot more cached tokens, something to note with the tests.

The first test's results were understandable, since the test cases were really small. The logical conclusion was that since the project is so small, having extra .repoty/ that the model has to process is just excess, bloat, context.

## Test 2

The second test was really similar to the first one. The only change was that the test cases were now bigger. I was testing the hypothesis that Repoty is better with medium-bigger projects.

**Medium bug**
  - Control — avg tokens: 30,609 · tool calls: 12 · price: $0.073989
  - Repoty — avg tokens: 31,025 · tool calls: 12 · price: $0.063670
**Medium feature**
  - Control — avg tokens: 13,670 · tool calls: 9 · price: $0.045307
  - Repoty — avg tokens: 26,340 · tool calls: 12 · price: $0.070681

Again. Repoty is not performing well at all, besides being cheaper with the bug task thanks to caching. After this project I let gipidy make some changes to the code, optimise the instructions, mapping, etc. to reduce excess context and keep only the necessary parts. I also ran out of tokens for the first time after that! I guess having gpt 5.5 create, run, and analyze A/B tests, and the A/B tests themselves use gpt 5.5, isn't the most token-efficient task.

## Test 3

The next day, I had gipidy look over the project again and find places to improve AND FINALLY, changed the testing model from 5.5 to 5.2. I then had a new hypothesis to test:

Since Repoty maps the current project and finds links, etc., it's better for bigger projects and tasks like finding a bug or diagnosing something. It'll be worse for smaller projects and for implementing something from scratch, because in these cases Repoty will be just extra steps the model has to take unnecessarily.

For the test, gipidy created three cases - positive (something Repoty would be good at), negative (bad), and neutral. I was really hoping for something better, but the results were still disappointing:

**Positive**
  - Control — avg tokens: 14,446 · tool calls: 11 · price: $0.006282
  - Repoty — avg tokens: 20,711 · tool calls: 9 · price: $0.008216
**Negative**
  - Control — avg tokens: 11,462 · tool calls: 7 · price: $0.005123
  - Repoty — avg tokens: 14,114 · tool calls: 8 · price: $0.005830
**Neutral**
  - Control — avg tokens: 15,509 · tool calls: 11 · price: $0.006557
  - Repoty — avg tokens: 27,422 · tool calls: 17 · price: $0.010519

It's surprising that 'neutral' was the worst. Besides that, I was quite disappointed with Repoty using so many tokens, BUT I still had something up my sleeve. Since these haven't been 'big' projects, I wanted to test it again on my <Pageboard> project, which is, according to *git ls-files -z | xargs -0 wc -l*, 69 126 lines long.

## Test 4

My hopes were gone. I basically didn't have any tokens left. I wanted Repoty to succeed. Since I had about 20% 5h usage left before doing anything with Pageboard, I pivoted to only the 'Positive' case. Good call, since just as the test concluded, my usage ran to 0%. The results, however, are weird.

**Positive**
  - Control — avg tokens: 74,561 · tool calls: 10 · price: $0.075131
  - Repoty — avg tokens: 68,336 · tool calls: 9 · price: $0.076250

Repoty does use fewer tokens and does 1 fewer tool call. Very cool. But the price is still slightly higher. I finished testing here, with 0 tokens left and a blind eye to what 'Negative' and 'Neutral' would show.

## Conclusion

The reason I'm writing all of this and did so much testing is because it's fun. The project may have been a failure, but at least being so invested in it and enjoying the progress was worth it. It also reminded me that in the world of AI you can do basically anything. You have an idea? Go ahead, try it, test it out. I'm sure that if I actually invested my time and learned the code myself, I could make Repoty better, but I'll leave it here. For me, this was a positive test and I'm happy I did all of that, no matter the end result.

If you're interested, <the project's repo is under Links>

## Links
[Pi, a minimal terminal coding harness](https://pi.dev/0)
[Commander.js](https://github.com/tj/commander.js/)
[Codex CLI](https://developers.openai.com/codex/cli)
[Pageboard](https://www.pageboard.app/)
[Repoty - Project repo](https://github.com/LuComic/repoty)
