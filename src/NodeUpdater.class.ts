import { Account, Client } from "@hiveio/dhive";
import { NectarflowerJsonMetadata } from "./interfaces/hiveJsonMetadata";
import { NodeData } from "./interfaces/node-updater.interfaces";

/**
 * Note: this is just as proposal in case you may like more a class.
 */
export class NodeUpdaterClass {
  private client: Client;

  constructor(initialNodeUrls: string[]) {
    this.client = new Client(initialNodeUrls);
  }

  private isValidNectarMetadata(obj: any): obj is NectarflowerJsonMetadata {
    return typeof obj === "object" && obj !== null && Array.isArray(obj.nodes);
  }

  public async getNodesFromAccount(
    accountName: string,
    enableLogging: boolean
  ): Promise<NodeData> {
    if (enableLogging) {
      console.log(`Fetching account metadata for ${accountName}...`);
    }

    const accounts: Account[] = await this.client.database.getAccounts([
      accountName,
    ]);

    if (accounts.length === 0) {
      throw new Error(`Account '${accountName}' not found`);
    }

    const account = accounts[0];
    const jsonMetadata = account.json_metadata;

    let parsedMetadata: any;
    try {
      parsedMetadata = JSON.parse(jsonMetadata);
      if (enableLogging) {
        console.log("Successfully parsed account JSON metadata");
      }
    } catch (parseError: unknown) {
      if (parseError instanceof Error) {
        throw new Error(`Failed to parse JSON metadata: ${parseError.message}`);
      } else {
        throw new Error(
          "Failed to parse JSON metadata: Unknown error occurred"
        );
      }
    }

    if (!this.isValidNectarMetadata(parsedMetadata)) {
      throw new Error(
        `Expected node metadata structure not found for account '${accountName}'. Make sure the account's json_metadata contains a 'nodes' array.`
      );
    }

    const metadataObj: NectarflowerJsonMetadata = parsedMetadata;

    const result: NodeData = {
      nodes: metadataObj.nodes,
      failing_nodes: metadataObj.failing_nodes ?? {},
    };

    if (enableLogging) {
      console.log(`Found ${result.nodes.length} nodes in account metadata`);
      const failingNodeCount = Object.keys(result.failing_nodes || {}).length;
      if (failingNodeCount > 0) {
        console.log(`Found ${failingNodeCount} failing nodes`);
      }
    }

    return result;
  }

  public reinitializeDhive(nodeData: NodeData, enableLogging: boolean): Client {
    if (!nodeData.nodes || nodeData.nodes.length === 0) {
      if (enableLogging) {
        console.warn("No nodes provided in nodeData, keeping current client");
      }
      return this.client;
    }

    const failingNodeUrls = Object.keys(nodeData.failing_nodes ?? {});

    const validNodes = nodeData.nodes.filter((node) => {
      if (failingNodeUrls.includes(node)) {
        if (enableLogging) {
          console.warn(
            `Skipping failing node: ${node} - Reason: ${
              nodeData.failing_nodes?.[node] || "No reason provided"
            }`
          );
        }
        return false;
      }

      try {
        new URL(node);
        return true;
      } catch (_) {
        if (enableLogging) {
          console.warn(`Invalid node URL format: ${node}`);
        }
        return false;
      }
    });

    if (validNodes.length === 0) {
      if (enableLogging) {
        console.warn(
          "No valid nodes found after filtering, keeping current client"
        );
      }
      return this.client;
    }

    if (enableLogging) {
      console.log(`Reinitializing dhive with ${validNodes.length} nodes`);
    }
    this.client = new Client(validNodes);
    return this.client;
  }

  public async updateNodesFromAccount(
    accountName: string = "nectarflower",
    enableLogging: boolean = true
  ): Promise<Client> {
    try {
      const nodeData = await this.getNodesFromAccount(
        accountName,
        enableLogging
      );
      const updatedClient = this.reinitializeDhive(nodeData, enableLogging);
      if (enableLogging) {
        console.log("Successfully updated dhive client with new nodes");
      }
      return updatedClient;
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error(`Failed to update nodes: ${error.message}`);
      } else {
        console.error(`Failed to update nodes: Unknown error occurred`, {
          error,
        });
      }
      return this.client;
    }
  }

  public getClient(): Client {
    return this.client;
  }
}
