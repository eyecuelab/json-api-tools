import type { JsonApiDocument } from "@lib/index"
import type { JsonApiResource } from "@lib/resource"

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

export const articlesDocument: ArticlesDocument = {
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
