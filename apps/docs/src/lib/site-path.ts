/** Next Link adds basePath itself; use this only for plain anchors/assets. */
export function sitePath(path: string) {
  return `${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}${path}`;
}
