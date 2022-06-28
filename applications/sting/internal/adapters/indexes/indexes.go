package indexes

import (
	"context"
	"overdoll/applications/sting/internal/adapters"
	"overdoll/applications/sting/internal/adapters/indexes/schema"
	"overdoll/libraries/bootstrap"
	"overdoll/libraries/cache"
	"overdoll/libraries/resource"
)

func registerIndexes() cache.IndexRegistry {
	var reg = cache.IndexRegistry{}

	serializer := resource.NewSerializer()
	es := bootstrap.InitializeElasticSearchSession()
	session := bootstrap.InitializeDatabaseSession()

	clubRepository := adapters.NewClubCassandraElasticsearchRepository(session, es, bootstrap.InitializeRedisSession(), serializer)

	repository := adapters.NewPostsCassandraRepository(session, es, serializer)

	reg.Add(adapters.PostIndexName, schema.PostsSchema, func(ctx context.Context) error {
		return repository.IndexAllPosts(ctx)
	})

	reg.Add(adapters.SeriesIndexName, schema.SeriesSchema, func(ctx context.Context) error {
		return repository.IndexAllSeries(ctx)
	})

	reg.Add(adapters.ClubsIndexName, schema.ClubsSchema, func(ctx context.Context) error {
		return clubRepository.IndexAllClubs(ctx)
	})

	reg.Add(adapters.ClubMembersIndexName, schema.ClubMembersSchema, func(ctx context.Context) error {
		return clubRepository.IndexAllClubMembers(ctx)
	})

	reg.Add(adapters.CharacterIndexName, schema.CharactersSchema, func(ctx context.Context) error {
		return repository.IndexAllCharacters(ctx)
	})

	reg.Add(adapters.CategoryIndexName, schema.CategoriesSchema, func(ctx context.Context) error {
		return repository.IndexAllCategories(ctx)
	})

	reg.Add(adapters.AudienceIndexName, schema.AudienceSchema, func(ctx context.Context) error {
		return repository.IndexAllAudience(ctx)
	})

	reg.Add(adapters.SearchHistoryIndexName, schema.SearchHistorySchema, func(ctx context.Context) error {
		return nil
	})

	return reg
}

var IndexConfig = cache.IndexConfig{
	Prefix:   "sting",
	Registry: registerIndexes(),
}
