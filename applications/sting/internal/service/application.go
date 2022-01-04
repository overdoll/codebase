package service

import (
	"context"
	"os"
	adapters2 "overdoll/applications/stella/internal/adapters"
	command2 "overdoll/applications/stella/internal/app/command"
	query2 "overdoll/applications/stella/internal/app/query"

	"overdoll/applications/sting/internal/adapters"
	"overdoll/applications/sting/internal/app"
	"overdoll/applications/sting/internal/app/command"
	"overdoll/applications/sting/internal/app/query"
	"overdoll/applications/sting/internal/app/workflows/activities"
	"overdoll/libraries/bootstrap"
	"overdoll/libraries/clients"
)

func NewApplication(ctx context.Context) (app.Application, func()) {

	// bootstrap application
	bootstrap.NewBootstrap(ctx)

	evaClient, cleanup := clients.NewEvaClient(ctx, os.Getenv("EVA_SERVICE"))
	parleyClient, cleanup2 := clients.NewParleyClient(ctx, os.Getenv("PARLEY_SERVICE"))

	return createApplication(ctx, adapters.NewEvaGrpc(evaClient), adapters.NewParleyGrpc(parleyClient)),
		func() {
			cleanup()
			cleanup2()
		}
}

func NewComponentTestApplication(ctx context.Context) (app.Application, func()) {

	bootstrap.NewBootstrap(ctx)

	evaClient, cleanup := clients.NewEvaClient(ctx, os.Getenv("EVA_SERVICE"))
	parleyClient, cleanup2 := clients.NewParleyClient(ctx, os.Getenv("PARLEY_SERVICE"))

	// kind of "mock" eva, it will read off a stored database of accounts for testing first before reaching out to eva.
	// this makes testing easier because we can get reproducible tests with each run
	return createApplication(ctx, EvaServiceMock{adapter: adapters.NewEvaGrpc(evaClient)}, adapters.NewParleyGrpc(parleyClient)),
		func() {
			cleanup()
			cleanup2()
		}
}

func createApplication(ctx context.Context, eva command.EvaService, parley command.ParleyService) app.Application {

	session := bootstrap.InitializeDatabaseSession()

	client := bootstrap.InitializeElasticSearchSession()

	awsSession := bootstrap.InitializeAWSSession()

	postRepo := adapters.NewPostsCassandraRepository(session)
	postIndexRepo := adapters.NewPostsIndexElasticSearchRepository(client, session)

	clubRepo := adapters2.NewClubCassandraRepository(session)
	clubIndexRepo := adapters2.NewClubIndexElasticSearchRepository(client, session)

	resourceRepo := adapters.NewResourceS3CassandraRepository(awsSession, session)

	return app.Application{
		Commands: app.Commands{
			TusComposer: command.NewTusComposerHandler(resourceRepo),

			CreatePost:  command.NewCreatePostHandler(postRepo, clubRepo, postIndexRepo, eva, parley),
			PublishPost: command.NewPublishPostHandler(postRepo, postIndexRepo, eva),
			DiscardPost: command.NewDiscardPostHandler(postRepo, postIndexRepo),
			RejectPost:  command.NewRejectPostHandler(postRepo, postIndexRepo),
			SubmitPost:  command.NewSubmitPostHandler(postRepo, postIndexRepo, parley),
			RemovePost:  command.NewRemovePostHandler(postRepo, postIndexRepo),

			IndexAllPosts:      command.NewIndexAllPostsHandler(postRepo, postIndexRepo),
			IndexAllSeries:     command.NewIndexAllSeriesHandler(postRepo, postIndexRepo),
			IndexAllCharacters: command.NewIndexAllCharactersHandler(postRepo, postIndexRepo),
			IndexAllCategories: command.NewIndexAllCategoriesHandler(postRepo, postIndexRepo),
			IndexAllClubs:      command2.NewIndexAllClubsHandler(clubRepo, clubIndexRepo),
			IndexAllAudience:   command.NewIndexAllAudienceHandler(postRepo, postIndexRepo),

			UpdatePostCategories: command.NewUpdatePostCategoriesHandler(postRepo, postIndexRepo),
			UpdatePostCharacters: command.NewUpdatePostCharactersHandler(postRepo, postIndexRepo),
			UpdatePostContent:    command.NewUpdatePostContentHandler(postRepo, postIndexRepo, resourceRepo),
			UpdatePostAudience:   command.NewUpdatePostAudienceHandler(postRepo, postIndexRepo),

			CreateClub:                    command2.NewCreateClubHandler(clubRepo, clubIndexRepo),
			AddClubSlugAlias:              command2.NewAddClubSlugAliasHandler(clubRepo, clubIndexRepo),
			RemoveClubSlugAlias:           command2.NewRemoveClubSlugAliasHandler(clubRepo, clubIndexRepo),
			UpdateClubName:                command2.NewUpdateClubNameHandler(clubRepo, clubIndexRepo),
			PromoteClubSlugAliasToDefault: command2.NewPromoteClubSlugAliasToDefaultHandler(clubRepo, clubIndexRepo),
			BecomeClubMember:              command2.NewBecomeClubMemberHandler(clubRepo),
			WithdrawClubMembership:        command2.NewWithdrawClubMembershipHandler(clubRepo),
		},
		Queries: app.Queries{
			PrincipalById: query.NewPrincipalByIdHandler(eva),

			SearchCharacters: query.NewSearchCharactersHandler(postIndexRepo),
			CharacterBySlug:  query.NewCharacterBySlugHandler(postRepo),
			CharacterById:    query.NewCharacterByIdHandler(postRepo),

			SearchCategories: query.NewSearchCategoriesHandler(postIndexRepo),
			CategoryBySlug:   query.NewCategoryBySlugHandler(postRepo),
			CategoryById:     query.NewCategoryByIdHandler(postRepo),

			SearchPosts:      query.NewSearchPostsHandler(postIndexRepo),
			PostById:         query.NewPostByIdHandler(postRepo),
			PostByIdOperator: query.NewPostByIdOperatorHandler(postRepo),

			SearchAudience: query.NewSearchAudienceHandler(postIndexRepo),
			AudienceBySlug: query.NewAudienceBySlugHandler(postRepo),
			AudienceById:   query.NewAudienceByIdHandler(postRepo),

			SearchSeries: query.NewSearchSeriesHandler(postIndexRepo),
			SeriesBySlug: query.NewSeriesBySlugHandler(postRepo),
			SeriesById:   query.NewSeriesByIdHandler(postRepo),

			SearchClubs:                 query2.NewSearchClubsHandler(clubIndexRepo),
			ClubBySlug:                  query2.NewClubBySlugHandler(clubRepo),
			ClubById:                    query2.NewClubByIdHandler(clubRepo),
			ClubSlugAliasesLimit:        query2.NewClubSlugAliasesLimitHandler(clubRepo),
			AccountClubMemberships:      query2.NewAccountClubMembershipsHandler(clubRepo),
			AccountClubMembershipsLimit: query2.NewAccountClubMembershipsLimitHandler(clubRepo),
			AccountClubMembershipsCount: query2.NewAccountClubMembershipsCountHandler(clubRepo),
			ClubMembersByClub:           query2.NewClubMembersByClubHandler(clubRepo),
			ClubMemberById:              query2.NewClubMemberByIdHandler(clubRepo),

			ResourceById:   query.NewResourceByIdHandler(resourceRepo),
			ResourcesByIds: query.NewResourcesByIdsHandler(resourceRepo),
		},
		Activities: activities.NewActivitiesHandler(postRepo, clubRepo, clubIndexRepo, postIndexRepo, resourceRepo, parley),
	}
}
