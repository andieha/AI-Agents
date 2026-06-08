import anthropic
import json
import math
from dotenv import load_dotenv

load_dotenv()

client = anthropic.Anthropic()

tools = [
    {
        "name": "calculator",
        "description": "Evaluate a mathematical expression. Supports +, -, *, /, **, sqrt, and standard math operations.",
        "input_schema": {
            "type": "object",
            "properties": {
                "expression": {
                    "type": "string",
                    "description": "The math expression to evaluate, e.g. '2 + 2' or 'sqrt(16)'"
                }
            },
            "required": ["expression"]
        }
    },
    {
        "name": "web_search",
        "description": "Search the web for information on a topic. Returns a summary of relevant results.",
        "input_schema": {
            "type": "object",
            "properties": {
                "query": {
                    "type": "string",
                    "description": "The search query"
                }
            },
            "required": ["query"]
        }
    }
]


def calculator(expression: str) -> str:
    try:
        # Allow safe math operations
        allowed = {k: getattr(math, k) for k in dir(math) if not k.startswith("_")}
        allowed["__builtins__"] = {}
        result = eval(expression, allowed)  # noqa: S307
        return str(result)
    except Exception as e:
        return f"Error: {e}"


def web_search(query: str) -> str:
    # Stub — replace with a real search API (e.g. Brave, SerpAPI) as needed
    return (
        f"[Stub] Search results for '{query}':\n"
        "1. Example result A — brief description.\n"
        "2. Example result B — brief description.\n"
        "3. Example result C — brief description."
    )


def run_tool(name: str, inputs: dict) -> str:
    if name == "calculator":
        return calculator(**inputs)
    if name == "web_search":
        return web_search(**inputs)
    return f"Unknown tool: {name}"


def run_agent(user_message: str) -> str:
    messages = [{"role": "user", "content": user_message}]

    while True:
        response = client.messages.create(
            model="claude-opus-4-8",
            max_tokens=4096,
            thinking={"type": "adaptive"},
            tools=tools,
            messages=messages,
        )

        # Append assistant turn (preserve all content blocks including thinking)
        messages.append({"role": "assistant", "content": response.content})

        if response.stop_reason == "end_turn":
            # Extract final text response
            for block in response.content:
                if block.type == "text":
                    return block.text
            return ""

        if response.stop_reason == "tool_use":
            tool_results = []
            for block in response.content:
                if block.type == "tool_use":
                    result = run_tool(block.name, block.input)
                    print(f"  [tool] {block.name}({json.dumps(block.input)}) → {result}")
                    tool_results.append({
                        "type": "tool_result",
                        "tool_use_id": block.id,
                        "content": result,
                    })

            messages.append({"role": "user", "content": tool_results})
        else:
            # Unexpected stop reason
            break

    return ""


if __name__ == "__main__":
    examples = [
        "What is sqrt(144) + 7 * 3?",
        "Search for the latest news on large language models and summarise what you find.",
        "Calculate (2**10) - 1, then search for what that number is known as in computing.",
    ]

    for prompt in examples:
        print(f"\nUser: {prompt}")
        answer = run_agent(prompt)
        print(f"Agent: {answer}")
