import anthropic
import json
from dotenv import load_dotenv
from duckduckgo_search import DDGS

load_dotenv()

client = anthropic.Anthropic()

tools = [
    {
        "name": "web_search",
        "description": "Search the web for current information on a topic. Returns real search results.",
        "input_schema": {
            "type": "object",
            "properties": {
                "query": {
                    "type": "string",
                    "description": "The search query"
                },
                "max_results": {
                    "type": "integer",
                    "description": "Number of results to return (default 5)",
                    "default": 5
                }
            },
            "required": ["query"]
        }
    }
]


def web_search(query: str, max_results: int = 5) -> str:
    with DDGS() as ddgs:
        results = list(ddgs.text(query, max_results=max_results))
    if not results:
        return "No results found."
    return "\n\n".join(
        f"{i+1}. {r['title']}\n{r['href']}\n{r['body']}"
        for i, r in enumerate(results)
    )


def run_tool(name: str, inputs: dict) -> str:
    if name == "web_search":
        return web_search(**inputs)
    return f"Unknown tool: {name}"


def run_agent(user_message: str) -> str:
    messages = [{"role": "user", "content": user_message}]

    while True:
        response = client.messages.create(
            model="claude-opus-4-8",
            max_tokens=4096,
            tools=tools,
            messages=messages,
        )

        messages.append({"role": "assistant", "content": response.content})

        if response.stop_reason == "end_turn":
            for block in response.content:
                if block.type == "text":
                    return block.text
            return ""

        if response.stop_reason == "tool_use":
            tool_results = []
            for block in response.content:
                if block.type == "tool_use":
                    result = run_tool(block.name, block.input)
                    print(f"  [search] {block.input.get('query')} → {len(result)} chars returned")
                    tool_results.append({
                        "type": "tool_result",
                        "tool_use_id": block.id,
                        "content": result,
                    })
            messages.append({"role": "user", "content": tool_results})
        else:
            break

    return ""


if __name__ == "__main__":
    queries = [
        "What are the latest news about humanoid robots in 2025?",
    ]

    for prompt in queries:
        print(f"\nUser: {prompt}")
        answer = run_agent(prompt)
        print(f"\nAgent: {answer}")
