/* eslint-disable @typescript-eslint/no-explicit-any */

import type { Json } from "."
import type { ErrorObject } from "./errors"
import type {
  JsonApiResource,
  Resource,
  ResourceObject,
  ResourceUpdate,
} from "./resource"

export type JsonApiObject = {
  version: string
  meta?: Json
}

export type Link = {
  href: string
  meta: Json
}

export type Links = Record<string, Link | string>

export type JsonApiDocument_Error<
  ERROR extends ErrorObject | undefined = undefined,
  META extends Json | undefined = undefined
> = {
  errors: ERROR extends ErrorObject ? ERROR[] : ErrorObject[]
  meta?: META
  data?: never
  included?: never
}

export type JsonApiDocument_Happy<
  RESOURCE extends Resource,
  META extends Json | undefined = undefined,
  DATA extends Resource | Resource[] = RESOURCE
> = {
  data: DATA extends RESOURCE[]
    ? ResourceObject<RESOURCE>[]
    : ResourceObject<RESOURCE>
  meta?: META
  included?: ResourceObject<any>[]
  errors?: never
}

export type JsonApiDocument_Required<
  DATA extends Resource | Resource[],
  META extends Json | undefined = undefined,
  ERROR extends ErrorObject | undefined = undefined,
  RESOURCE extends Resource = DATA extends Resource[] ? DATA[number] : DATA
> =
  | JsonApiDocument_Error<ERROR, META>
  | JsonApiDocument_Happy<RESOURCE, META, DATA>

export type JsonApiDocument_Optional = {
  jsonapi?: JsonApiObject
  links?: Links
}

/* prettier-ignore */
export type JsonApiDocument<
  DATA extends Resource | Resource[],
  META extends Json | undefined = undefined,
  ERROR extends ErrorObject | undefined = undefined,
> 
= JsonApiDocument_Optional 
& JsonApiDocument_Required<
    DATA,
    META,
    ERROR
  >
/* prettier-ignore-end */

export type JsonApiUpdate<RESOURCE extends Resource> = {
  data: ResourceUpdate<RESOURCE>
}

// EXAMPLE

type Article = {
  title: string
  body: string
}

type Person = {
  name: string
}

interface PersonResource extends JsonApiResource {
  type: `person`
  attributes: Person
  relationships: {
    articles: {
      data: ArticleResource[]
    }
  }
}
interface ArticleResource extends JsonApiResource {
  type: `article`
  attributes: Article
  relationships: {
    author: {
      data: PersonResource
      links: {
        self: string
        related: string
      }
    }
  }
}

type ArticlesDocument = JsonApiDocument<ArticleResource[]>

// @ts-expect-error this is purely for demonstration purposes
const articlesDocument: ArticlesDocument = {
  data: [
    {
      type: `article`,
      id: `1`,
      attributes: {
        title: `Advanced TypeScript`,
        body: `It's more powerful than you ever knew.`,
      },
      relationships: {
        author: {
          data: { type: `person`, id: `9` },
          links: {
            self: `/articles/1/relationships/author`,
            related: `/articles/1/author`,
          },
        },
      },
    },
  ],
  included: [
    {
      type: `person`,
      id: `9`,
      attributes: {
        name: `Jeremy Banka`,
      },
    },
  ],
}
