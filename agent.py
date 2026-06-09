import math
import anthropic

client = anthropic.Anthropic()

TOOLS = [
    {
        "name": "calculator",
        "description": "Evaluate a mathematical expression. Supports +, -, *, /, **, and math functions like sqrt, sin, cos, log.",
        "input_schema": {
            "type": "object",
            "properties": {
                "expression": {
                    "type": "string",
                    "description": "The math expression to evaluate, e.g. 'sqrt(144) + 7 * 3'",
                }
            },
            "required": ["expression"],
        },
    },
    {
        "name": "web_search",
        "description": "Search the web for information on a topic. Call this when the user asks about current events, facts, or anything you're uncertain about.",
        "input_schema": {
            "type": "object",
            "properties": {
                "query": {"type": "string", "description": "The search query"}
            },
            "required": ["query"],
        },
    },
]


def calculator(expression: str) -> str:
    try:
        safe_globals = {k: getattr(math, k) for k in dir(math) if not k.startswith("_")}
        safe_globals["__builtins__"] = {}
        result = eval(expression, safe_globals)  # noqa: S307
        return str(result)
    except Exception as e:
        return f"Error: {e}"


def web_search(query: str) -> str:
    # Stub — replace with a real API (e.g. Brave Search, SerpAPI) as needed
    return (
        f"[Stub] Search results for '{query}':\n"
        "1. Example result A — brief description.\n"
        "2. Example result B — brief description.\n"
        "(Connect a real search API to get live results.)"
    )


def run_tool(name: str, inputs: dict) -> str:
    if name == "calculator":
        return calculator(**inputs)
    if name == "web_search":
        return web_search(**inputs)
    return f"Unknown tool: {name}"


def chat(messages: list) -> str:
    """Run one agentic turn and return the final text response."""
    while True:
        response = client.messages.create(
            model="claude-opus-4-8",
            max_tokens=4096,
            thinking={"type": "adaptive"},
            tools=TOOLS,
            messages=messages,
        )

        messages.append({"role": "assistant", "content": response.content})

        if response.stop_reason == "end_turn":
            return next((b.text for b in response.content if b.type == "text"), "")

        if response.stop_reason == "tool_use":
            tool_results = []
            for block in response.content:
                if block.type == "tool_use":
                    result = run_tool(block.name, block.input)
                    print(f"  [tool] {block.name}({block.input}) → {result}")
                    tool_results.append(
                        {"type": "tool_result", "tool_use_id": block.id, "content": result}
                    )
            messages.append({"role": "user", "content": tool_results})
        else:
            break

    return ""


def main():
    print("Simple AI Agent (type 'quit' to exit)\n")
    messages = []

    while True:
        user_input = input("You: ").strip()
        if not user_input:
            continue
        if user_input.lower() in ("quit", "exit", "q"):
            break

        messages.append({"role": "user", "content": user_input})
        reply = chat(messages)
        print(f"\nAgent: {reply}\n")


if __name__ == "__main__":
    main()
