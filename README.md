# Biconomy MEE + Fluent Testnet Example

This repository demonstrates how to use the [Biconomy Modular Execution Environment (MEE)](https://docs.biconomy.io/) infrastructure with the Fluent Testnet chain.

## Prerequisites

- [Bun](https://bun.sh/) (tested with version 1.2.5)
- [Node.js](https://nodejs.org/) (tested with version 23.10.0)

## Getting Started

1. **Clone the repository:**

   ```sh
   git clone https://github.com/bcnmy/fluent-quickstart.git
   cd fluent-quickstart
   ```

2. **Install dependencies:**

   ```sh
   bun i
   ```

3. **Run the example:**

   ```sh
   bun run index.ts
   ```

## Notes

- This example uses the Nexus smart account derived from the EOA.
- **Sponsorship:** This example demonstrates the use of MEE supertransaction sponsorship (gasless transactions).

---

For more information, visit the [Biconomy Documentation](https://docs.biconomy.io/).
