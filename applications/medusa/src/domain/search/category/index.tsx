import RootSearchCategory from './RootSearchCategory/RootSearchCategory'
import ResultSearchCategoryQuery from '@//:artifacts/ResultSearchCategoryQuery.graphql'
import getPostSeed from '@//:modules/content/HookedComponents/Post/support/getPostSeed'

RootSearchCategory.getTranslationProps = async (ctx) => ({
  translations: await import(`./__locale__/${ctx.locale as string}/index`)
})

RootSearchCategory.getCookieProps = () => {
  return {
    cookies: {
      postSeed: Date.now().toString()
    }
  }
}

RootSearchCategory.getRelayPreloadProps = (ctx) => {
  const { query } = ctx

  const {
    categorySlug
  } = query

  return {
    queries: {
      searchCategoryQuery: {
        params: ResultSearchCategoryQuery.params,
        variables: {
          categorySlug,
          sortBy: 'ALGORITHM',
          ...getPostSeed(ctx)
        },
        options: {
          fetchPolicy: 'store-or-network'
        }
      }
    }
  }
}

RootSearchCategory.getMiddleware = (ctx, data) => {
  if (data.searchCategoryQuery.response.data.category == null) {
    return {
      notFound: true
    }
  }

  const foundCategorySlug = data.searchCategoryQuery.response.data.category.slug

  if (foundCategorySlug !== ctx.query.categorySlug) {
    return {
      redirect: {
        permanent: true,
        destination: `/search/category/${foundCategorySlug as string}`
      }
    }
  }

  return {}
}

export default RootSearchCategory
