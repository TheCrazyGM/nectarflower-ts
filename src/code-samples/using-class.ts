import { NodeUpdaterClass } from "../NodeUpdater.class";

const nodeUpdater = new NodeUpdaterClass(["https://api.hive.blog"]);

const updateClient = async () => {
  try {
    const updatedClient = await nodeUpdater.updateNodesFromAccount(
      "nectarflower",
      true
    );
    console.log("Updated client:", updatedClient);
  } catch (error) {
    console.error("Error updating nodes:", error);
  }
};

updateClient();
