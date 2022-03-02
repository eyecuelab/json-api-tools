/* eslint-disable @typescript-eslint/no-explicit-any */

import type { Json, JsonObj } from "."
import type { ErrorObject } from "./errors"
import type { Links } from "./link"
import type { Resource, ResourceObject, ResourceUpdate } from "./resource"

export type JsonApiObject = {
  version: string
  meta?: Json
}

export type JsonApiDocument_Error<
  ERROR extends ErrorObject | undefined = undefined
> = {
  errors: ERROR extends ErrorObject ? ERROR[] : ErrorObject[]
  meta?: JsonObj
  data?: never
  included?: never
}

export type JsonApiDocument_Happy<
  DATA extends Resource | Resource[],
  META extends Json | undefined = undefined,
  LINKS extends Json | undefined = undefined,
  RESOURCE extends Resource = DATA extends Resource[] ? DATA[number] : DATA
> = {
  data: DATA extends RESOURCE[]
    ? ResourceObject<RESOURCE>[]
    : ResourceObject<RESOURCE>
  meta?: META
  included?: ResourceObject<any>[]
  errors?: never
  links?: LINKS
}

export type JsonApiDocument_Required<
  DATA extends Resource | Resource[],
  META extends Json | undefined = undefined,
  ERROR extends ErrorObject | undefined = undefined,
  LINKS extends Links | undefined = undefined
> = JsonApiDocument_Error<ERROR> | JsonApiDocument_Happy<DATA, META, LINKS>

export type JsonApiDocument_Optional = {
  jsonapi?: JsonApiObject
}

/* prettier-ignore */
export type JsonApiDocument<
  DATA extends Resource | Resource[],
  META extends Json | undefined = undefined,
  ERROR extends ErrorObject | undefined = undefined,
  LINKS extends Links | undefined = undefined,
> 
= JsonApiDocument_Optional 
& JsonApiDocument_Required<
    DATA,
    META,
    ERROR,
    LINKS
  >
/* prettier-ignore-end */

export type JsonApiUpdate<RESOURCE extends Resource> = {
  data: ResourceUpdate<RESOURCE>
}
