export * from "./node-updater.js";
export * from "./NodeUpdater.class.js";

//Notes to remove later
//By using the actual choice in tsconfig: "module": "ESNext",
//we must be explicit and write the extension final file
//another choice would be using "module": "CommonJS" (which imply not having "type": "module" in package.json)
//but we could see later on
