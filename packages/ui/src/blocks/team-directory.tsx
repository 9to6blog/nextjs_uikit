"use client";
import { useId, useState } from "react";
import { Input } from "../input.js";
import { Avatar, AvatarFallback } from "../avatar.js";
import { Badge } from "../badge.js";
import { BlockShell, type BlockProps } from "./shared.js";
export type TeamDirectoryProps = BlockProps & {
  members: {
    id: string;
    name: string;
    role: string;
    email: string;
    initials: string;
  }[];
};
export function TeamDirectory({ members, ...props }: TeamDirectoryProps) {
  const id = useId();
  const [query, setQuery] = useState("");
  const list = members.filter((m) =>
    `${m.name} ${m.role} ${m.email}`
      .toLowerCase()
      .includes(query.toLowerCase()),
  );
  return (
    <BlockShell {...props}>
      <label className="n-sr-only" htmlFor={id}>
        팀원 검색
      </label>
      <Input
        id={id}
        placeholder="이름, 역할 또는 이메일"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <ul className="n-block-list">
        {list.map((m) => (
          <li key={m.id}>
            <Avatar>
              <AvatarFallback>{m.initials}</AvatarFallback>
            </Avatar>
            <div className="n-block-grow">
              <strong>{m.name}</strong>
              <p>
                <a href={`mailto:${m.email}`}>{m.email}</a>
              </p>
            </div>
            <Badge>{m.role}</Badge>
          </li>
        ))}
      </ul>
      <p className="n-block-muted" role="status">
        {list.length}명의 팀원
      </p>
    </BlockShell>
  );
}
