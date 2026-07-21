name: [YOUR AGENT NAME]

description: [One sentence describing what this agent does.]

model: claude-sonnet-5

system: |-

  [Describe the agent's role in one sentence.]

  Input: [Where does the agent read from? A Google Doc, a Drive folder, a URL?]

  1. [First step — what the agent does first]

  2. [Second step]

  3. [Third step]

  4. Save the result as a Google Doc to this folder:
     [YOUR GOOGLE DRIVE FOLDER URL]
     (folder ID: [YOUR_FOLDER_ID])
     Title: "[YOUR TITLE FORMAT – e.g. Report – Month DD, YYYY]"

tools:
  - type: agent_toolset_20260401

metadata:
  template: deep-research
  input_doc: [YOUR_INPUT_DOC_ID]
  output_folder: [YOUR_OUTPUT_FOLDER_ID]
