import type { JsonApiDocument } from "@lib/index"
import type { JsonApiResource } from "@lib/resource"

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

type Article = {
  title: string
  body?: string
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

export type ArticleDocument = JsonApiDocument<ArticleResource>

export const articleDocument: ArticleDocument = {
  data: {
    type: `article`,
    id: `1`,
    attributes: {
      title: `Advanced TypeScript`,
      body: `It's more powerful than you ever knew.`,
    },
  },
}
//¯¯¯¯¯¯¯¯¯//
// RELATIONSHIPS are optional, but their keys are not
// articleDocument relationships will error you if you
// don't include an author
//_________//
articleDocument.data.relationships = {
  author: {
    data: { type: `person`, id: `9` },
    links: {
      self: `/articles/1/relationships/author`,
      related: `/articles/1/author`,
    },
  },
}
//¯¯¯¯¯¯¯¯¯//
// INCLUDED is optional and can hold any resource
// this flexibility is useful both for getting and object
// with its related entities in one bundle
// as well as for preloading things you will need later
//_________//
articleDocument.included = [
  {
    type: `person`,
    id: `9`,
    attributes: {
      name: `Jeremy Banka`,
    },
  },
]

articleDocument.data.attributes.body = `Strong typing gives you a better perspective within your code.`
