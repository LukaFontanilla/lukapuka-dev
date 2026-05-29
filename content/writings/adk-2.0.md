---
title: "ADK 2.0 is 👌🏾"
description: "Experimenting with the ADK 2.0 Beta Release - Graphs, Dynamic Workflows.."
date: "MAY 1, 2026"
tags: ["ADK", "Google", "Agents", "Python"]
---

Took some time to deep dive into the ADK 2.0 Beta Release and here are a few of my favorites.

## Graph-based Workflows

In 2.0, the big move is to a **Graph-based workflow**. I personally find it both more intuitive and powerful because it lets you mix AI reasoning with deterministic code logic in a way that actually scales.

Logically, you organize the system using a Workflow graph. The edges array determines the execution path — it’s essentially a roadmap for your data. A simple sequential example:

```python
Workflow(
  name="sequential_workflow",
  edges=[("START", task_A_node, task_B_node)],
)
```

In my experience, the benefits really show up when the system gets “messy.” For a recent client project, I built an **autonomous data research agent**. A user asks to investigate a KPI (like CAC), and the graph handles the “dirty work”:

1.  Identifies the Looker data models.
2.  Generates a dynamic list of research questions.
3.  **Fans out**: Spawns an agent for _each_ question to query and analyze in parallel.
4.  **Fans in**: Synthesizes everything into a cloud-stored executive summary.

With the graph-based workflow, this was straightforward and — crucially — **readable**.

```python
Workflow(
  name="data_research_pipeline",
  edges=[
    ("start-research", generate_questions_node),
    (generate_questions_node, execute_workers_node),
    (execute_workers_node, synthesize_results_node),
  ]
)
```

## Nodes: Stop burning tokens

Nodes in ADK 2.0 can be Agents, Tools, or just pure Python functions. In the past, you often ended up wrapping simple code in an Agent just to get it into the flow, creating a custom Agent runner, or hijacking callbacks.

Now, if you want a code-only step, you just use the @node decorator:

```python
@node(name="hello_node")
def my_function_node(node_input: Any):
  # No LLM, no tokens, just code.
  return "Hello world"
```

## Dynamic Workflows (The real “Pro” feature)

If a static graph is too rigid for you, **Dynamic Workflows** give you full programmatic control. You can use loops, if statements, and async/await just like standard Python.

The secret sauce here is the **ctx** (Context) object. You use **ctx.run_node()** to trigger other nodes. What’s cool is that ADK handles the checkpointing for you — if your loop fails halfway through, it knows where to pick back up.

Here’s how I handled that “parallel fan-out” for the research questions:

```python
@node(rerun_on_resume=True)
async def execute_workers_node(ctx: Context, node_input: dict):
  questions = node_input["questions"]
  # We create a list of tasks using run_node
  tasks = [ctx.run_node(run_worker, node_input={"q": q}) for q in questions]
  # Standard asyncio to run them all at once
  results = await asyncio.gather(*tasks)
  return {"results": results}
```

I’ve found this pattern — dynamic fan-out to **N** workers and a clean fan-in — to be incredibly robust in 2.0. It feels very ergonomic.

Check out the [2.0 docs](https://adk.dev/2.0/) release— it’s well worth the read. Happy dev’ing!
