package indexes

import (
	"context"
	"overdoll/applications/sting/internal/adapters"
	"overdoll/applications/sting/internal/adapters/indexes/schema"
	"overdoll/libraries/bootstrap"
	"overdoll/libraries/cache"
	"overdoll/libraries/resource"
)

func getPostRepository() adapters.PostsCassandraElasticsearchRepository {
	serializer := resource.NewSerializer()
	es := bootstrap.InitializeElasticSearchSession()
	session := bootstrap.InitializeDatabaseSession()

	return adapters.NewPostsCassandraRepository(session, es, serializer)
}

func getClubRepository() adapters.ClubCassandraElasticsearchRepository {
	serializer := resource.NewSerializer()
	es := bootstrap.InitializeElasticSearchSession()
	session := bootstrap.InitializeDatabaseSession()

	return adapters.NewClubCassandraElasticsearchRepository(session, es, bootstrap.InitializeRedisSession(), serializer)
}

func registerIndexes() cache.IndexRegistry {
	var reg = cache.NewIndexRegistry()

	reg.Add(adapters.PostIndexName, schema.PostsSchema, func(ctx context.Context) error {
		return getPostRepository().IndexAllPosts(ctx)
	})

	reg.Add(adapters.SeriesIndexName, schema.SeriesSchema, func(ctx context.Context) error {
		return getPostRepository().IndexAllSeries(ctx)
	})

	reg.Add(adapters.ClubsIndexName, schema.ClubsSchema, func(ctx context.Context) error {
		return getClubRepository().IndexAllClubs(ctx)
	})

	reg.Add(adapters.ClubMembersIndexName, schema.ClubMembersSchema, func(ctx context.Context) error {
		return getClubRepository().IndexAllClubMembers(ctx)
	})

	reg.Add(adapters.CharacterIndexName, schema.CharactersSchema, func(ctx context.Context) error {
		return getPostRepository().IndexAllCharacters(ctx)
	})

	reg.Add(adapters.CategoryIndexName, schema.CategoriesSchema, func(ctx context.Context) error {
		return getPostRepository().IndexAllCategories(ctx)
	})

	reg.Add(adapters.AudienceIndexName, schema.AudienceSchema, func(ctx context.Context) error {
		return getPostRepository().IndexAllAudience(ctx)
	})

	reg.Add(adapters.SearchHistoryIndexName, schema.SearchHistorySchema, func(ctx context.Context) error {
		return nil
	})

	return reg
}

var IndexConfig = cache.IndexConfig{
	Prefix:   adapters.CachePrefix,
	Registry: registerIndexes(),
}
