# nectarflower-ts

TypeScript library for updating and managing Hive API nodes from an account's `json_metadata`, inspired by [`nectarflower-js`](https://github.com/TheCrazyGM/nectarflower-js).

---

## 🚀 Features

- Fetches and parses `json_metadata` from Hive accounts
- Filters failing or invalid Hive nodes
- Reinitializes `dhive` client with clean nodes
- Fully typed with TypeScript
- Ready for use in Node or web apps

---

## 📦 Installation

```bash
npm install nectarflower-ts
```

Or link locally during development:

```
npm link # in the library folder
# then in your test app
npm link nectarflower-ts
```

## 🛠️ Usage

```ts
import { NodeUpdater } from "nectarflower-ts";

//Recommended always use the account that holds the metadata as expected.
const accountName = "nectarflower";
const updatedClient = await NodeUpdater.updateNodesFromAccount(accountName);

// Use updatedClient as your dhive client
const props = await updatedClient.database.getDynamicGlobalProperties();
console.log(props);
```

## 📄 API

NodeUpdater.updateNodesFromAccount(accountName?: string, enableLogging?: boolean): Promise<Client>
Fetches the latest node list from the account’s json_metadata, filters invalid/failing nodes, and reinitializes the Hive dhive client.
Important note: as intended, the only account that now holds the RPC reports is @nectarflower

NodeUpdater.getNodesFromAccount(accountName: string, enableLogging: boolean): Promise<NodeData>
Fetches and parses the json_metadata of the account.

NodeUpdater.reinitializeDhive(nodeData: NodeData, enableLogging: boolean): Client
Manually reinitialize the dhive client from a given NodeData object.

NodeUpdater.getClient(): Client
Returns the current instance of the internal dhive client.

## 📁 Project Structure

```
src/
├── node-updater.ts          # Core logic
├── NodeUpdater.class.ts     # Optional class-based version
├── interfaces/
│   ├── hiveJsonMetadata.ts
│   └── node-updater.interfaces.ts
```

## ✅ TODO

- Add fallback node support
- Add retry logic on failure
- Option to persist working node to localStorage (browser) or file (Node)

## 📜 License

MIT
