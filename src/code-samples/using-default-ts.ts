import { NodeUpdater } from "../node-updater";

async function testNodeUpdater() {
  const accountName = "nectarflower";
  const enableLogging = true;

  try {
    const client = await NodeUpdater.updateNodesFromAccount(
      accountName,
      enableLogging
    );
    console.log("Client successfully updated:", client);
  } catch (error) {
    console.error("Error updating client:", error);
  }
}

testNodeUpdater();
