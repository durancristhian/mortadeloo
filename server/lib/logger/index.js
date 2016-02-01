import simpleNodeLogger from "simple-node-logger";

export default simpleNodeLogger.createSimpleLogger({
    logFilePath    : "mortadeloo.log",
    timestampFormat: "YYYY-MM-DD HH:mm:ss"
});
