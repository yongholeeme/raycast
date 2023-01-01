import { ActionPanel, Action, List, open, Icon, getPreferenceValues } from "@raycast/api";
import fs from "fs";
import os from "os";

interface Preferences {
  ROOT_DIRECTORY: string;
}

const { ROOT_DIRECTORY = os.homedir() } = getPreferenceValues<Preferences>();
const IGNORE_DIRECTORIES = [".DS_Store"];

const directories = fs.readdirSync(ROOT_DIRECTORY);

export default function Command() {
  return (
    <List>
      {directories
        .filter((directory) => !IGNORE_DIRECTORIES.includes(directory))
        .map((item, index) => (
          <List.Item
            key={index}
            icon={Icon.ArrowRightCircleFilled}
            title={item}
            actions={
              <ActionPanel>
                <Action
                  title="Open VS Code"
                  onAction={() => open(`${ROOT_DIRECTORY}/${item}`, "/Applications/Visual Studio Code.app")}
                />
              </ActionPanel>
            }
          />
        ))}
    </List>
  );
}
