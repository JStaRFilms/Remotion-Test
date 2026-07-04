import { Config } from "@remotion/cli/config";
import fs from "fs";

Config.setVideoImageFormat("jpeg");
Config.setOverwriteOutput(true);

// Auto-detect system browser on Windows if available to guarantee reliable rendering
if (process.platform === "win32") {
  const chromePath = "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe";
  const edgePath = "C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe";
  if (fs.existsSync(chromePath)) {
    Config.setBrowserExecutable(chromePath);
  } else if (fs.existsSync(edgePath)) {
    Config.setBrowserExecutable(edgePath);
  }
}
