import type { Json } from "."

export type Link = {
  href: string
  meta: Json
}

export type Links = Record<string, Link | string>
