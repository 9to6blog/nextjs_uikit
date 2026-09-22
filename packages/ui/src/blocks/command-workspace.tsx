"use client";
import {
  Command,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem,
} from "../command.js";
import { Icon } from "../icons.js";
import { BlockShell, type BlockProps } from "./shared.js";
export type CommandWorkspaceProps = BlockProps & {
  commands: {
    id: string;
    label: string;
    description: string;
    group: string;
    onSelect: () => void;
  }[];
};
export function CommandWorkspace({
  commands,
  ...props
}: CommandWorkspaceProps) {
  return (
    <BlockShell {...props}>
      <Command label="작업 검색">
        <CommandInput placeholder="작업 검색…" aria-label="작업 검색" />
        <CommandList>
          <CommandEmpty>찾는 작업이 없습니다.</CommandEmpty>
          {[...new Set(commands.map((c) => c.group))].map((g) => (
            <CommandGroup heading={g} key={g}>
              {commands
                .filter((c) => c.group === g)
                .map((c) => (
                  <CommandItem
                    key={c.id}
                    value={c.label}
                    keywords={[c.description]}
                    onSelect={c.onSelect}
                  >
                    <Icon name="document" />
                    <div className="n-block-grow">
                      <strong>{c.label}</strong>
                      <p className="n-block-muted">{c.description}</p>
                    </div>
                    <Icon name="arrow-right" />
                  </CommandItem>
                ))}
            </CommandGroup>
          ))}
        </CommandList>
      </Command>
    </BlockShell>
  );
}
