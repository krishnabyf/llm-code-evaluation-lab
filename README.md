# LLM Code Evaluation Lab

Portfolio project for Senior Software Engineer - LLM Evaluation work. The repo contains realistic coding prompts, flawed model answers, corrected production-quality solutions, tests, and written evaluation rationales across Python, JavaScript/React, Java, C++, Go, and Rust.

## Why This Project Matches The Role

The role requires evaluating AI-generated code for correctness, scalability, reliability, architecture quality, and test coverage. This lab demonstrates the exact workflow:

1. Convert a prompt into explicit requirements.
2. Identify defects in a model answer.
3. Write or review tests that expose the defects.
4. Produce a corrected solution.
5. Explain the evaluation with clear severity and impact.
6. Verify the solution automatically.

## Repository Structure

```text
python_tasks/             Python correctness and reliability tasks
javascript_react_tasks/   JavaScript and React-style async/state tasks
java_tasks/               Java design and data-structure tasks
cpp_tasks/                C++ algorithm and safety tasks
go_tasks/                 Go reliability and error-handling tasks
rust_tasks/               Rust parsing and Result/error handling tasks
rubrics/                  Shared scoring rubric
evaluations/              Cross-task review notes
scripts/                  Local verification scripts
```

## Run Local Checks

```bash
python3 -m venv .venv
source .venv/bin/activate
pip install -r requirements-dev.txt
bash scripts/run_local_checks.sh
```

Local checks use the tools available in this Ubuntu workspace: Python, Node, C++, and Go. GitHub Actions also validates Java and Rust on hosted runners.

## Evaluation Workflow

For each task, review:

- `prompt.md`: requirements.
- `bad_model_answer.*`: intentionally flawed AI-style answer.
- `fixed_solution.*`: corrected implementation.
- `tests/` or language-native tests: verification.
- `evaluation.md`: senior-level review rationale.

## Interview Explanation

My process is to first translate the prompt into testable requirements, then inspect generated code for correctness, edge cases, scalability, reliability, and maintainability. I write tests that expose model mistakes, fix the implementation, and provide structured evaluation rationale with severity and business impact.

## Author

Krishna Mankali
