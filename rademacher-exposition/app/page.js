import fs from "node:fs";
import path from "node:path";
import Explorer from "./Explorer";

function loadLeanSource() {
  const candidates = [
    path.join(process.cwd(), "..", "RandomMatrices", "IndependentRademacher", "IndependentRademacher.lean"),
    path.join(process.cwd(), "source", "IndependentRademacher.lean")
  ];
  const sourcePath = candidates.find((candidate) => fs.existsSync(candidate));
  if (!sourcePath) throw new Error("IndependentRademacher.lean was not found.");
  return fs.readFileSync(sourcePath, "utf8");
}

export default function Home() {
  return <Explorer source={loadLeanSource()} />;
}
