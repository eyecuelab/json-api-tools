import type { RequireAtLeastOne, Json, JsonObj } from "."
import type { Link, Links } from "./link"
import type { Identifier, Resource } from "./resource"

export type Relationship<
  RESOURCE extends Resource = Resource,
  META extends Json | undefined = undefined,
  LINKS extends RelationshipLinks | undefined = undefined
> = RequireAtLeastOne<{
  links: LINKS
  data: Identifier<RESOURCE>
  meta: META
}>
interface RelationshipMeta extends JsonObj {
  __deleted__: boolean
  type: `belongs-to-many` | `belongs-to` | `has-many` | `has-one`
}

export type RelationshipLinks = Links &
  RequireAtLeastOne<{
    self: Link | string
    related: Link | string
  }>

export type Relationships = Record<
  string,
  {
    data: Resource | Resource[]
    links?: RelationshipLinks
    meta?: RelationshipMeta
  }
>

/* prettier-ignore */
export type Linkages<RELATIONSHIPS extends Relationships> = {
  [K in keyof RELATIONSHIPS]: 
  
      RELATIONSHIPS[K][`data`] extends Resource[]
        ? Relationship<
            RELATIONSHIPS[K][`data`][number],
            RELATIONSHIPS[K][`meta`],
            RELATIONSHIPS[K][`links`]
          >[]

        : 
      RELATIONSHIPS[K][`data`] extends Resource
        ? Relationship<
            RELATIONSHIPS[K][`data`],
            RELATIONSHIPS[K][`meta`],
            RELATIONSHIPS[K][`links`]
          >

        : never
}
/* prettier-ignore-end */

export type RelationshipUpdate<DATA extends Resource | Resource[]> = {
  data: DATA extends Resource[]
    ? Identifier<DATA[number]>[]
    : DATA extends Resource
    ? Identifier<DATA>
    : never
}
