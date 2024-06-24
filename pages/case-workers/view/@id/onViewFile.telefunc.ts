import type { ContextVariableMap } from "hono";
import { getContext } from "telefunc";

export async function onViewFile(path: string) {
  const context = getContext<ContextVariableMap>()
  return (await context.webdav.getFileContents(path)).toString("base64")
}