import type { Json, JsonObj } from "."
import type { Links } from "./link"
import type { Relationships, Linkages } from "./relationship"

export type JsonApiResource = Resource
export type Resource = {
  id: string
  type: string
  attributes: JsonObj
  relationships: Relationships
}

//¯¯¯¯¯¯¯¯¯¯¯¯¯//
// Why is [attributes] optional in a resource object?
// because sometimes your data is just the id itself
//_____________//
export type ResourceObject<RESOURCE extends Resource> = RO<RESOURCE>
export type RO<RESOURCE extends Resource> = {
  id: RESOURCE[`id`]
  type: RESOURCE[`type`]
  attributes: Omit<RESOURCE[`attributes`], `id` | `type`> // it's non-optional in this implementation for now
  relationships?: Linkages<RESOURCE[`relationships`]>
  links?: Links
}

export type ResourceUpdate<RESOURCE extends Resource> = {
  id: RESOURCE[`id`]
  type: RESOURCE[`type`]
  attributes?: Partial<Omit<RESOURCE[`attributes`], `id` | `type`>>
  relationships?: Partial<Linkages<RESOURCE[`relationships`]>>
}

export type ResourceIdentifierObject<
  RESOURCE extends Resource = Resource,
  META extends Json | undefined = undefined
> = Identifier<RESOURCE, META>
export type Identifier<
  RESOURCE extends Resource = Resource,
  META extends Json | undefined = undefined
> = {
  id: RESOURCE[`id`]
  type: RESOURCE[`type`]
  meta?: META
}

export type ResourceFlat<RESOURCE extends Resource> = Omit<
  RESOURCE[`attributes`],
  `id` | `type`
> &
  Pick<RESOURCE, `id` | `type`> &
  RESOURCE[`relationships`]
