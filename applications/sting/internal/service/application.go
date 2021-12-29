package service

import (
	"context"
	"os"

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

func createApplication(ctx context.Context, eva command.EvaService, parley command.ParleyService) app.Application {

	session := bootstrap.InitializeDatabaseSession()

	client := bootstrap.InitializeElasticSearchSession()

	awsSession := bootstrap.InitializeAWSSession()

	postRepo := adapters.NewPostsCassandraRepository(session)
	postIndexRepo := adapters.NewPostsIndexElasticSearchRepository(client, session)

	clubRepo := adapters.NewClubCassandraRepository(session)
	clubIndexRepo := adapters.NewClubIndexElasticSearchRepository(client, session)

	resourceRepo := adapters.NewResourceS3Repository(awsSession)

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
			IndexAllClubs:      command.NewIndexAllClubsHandler(postRepo, postIndexRepo),
			IndexAllAudience:   command.NewIndexAllAudienceHandler(postRepo, postIndexRepo),

			UpdatePostCategories: command.NewUpdatePostCategoriesHandler(postRepo, postIndexRepo),
			UpdatePostCharacters: command.NewUpdatePostCharactersHandler(postRepo, postIndexRepo),
			UpdatePostContent:    command.NewUpdatePostContentHandler(postRepo, postIndexRepo, resourceRepo),
			UpdatePostAudience:   command.NewUpdatePostAudienceHandler(postRepo, postIndexRepo),

			CreateClub:                    command.NewCreateClubHandler(clubRepo, clubIndexRepo),
			AddClubSlugAlias:              command.NewAddClubSlugAliasHandler(clubRepo, clubIndexRepo),
			RemoveClubSlugAlias:           command.NewRemoveClubSlugAliasHandler(clubRepo, clubIndexRepo),
			UpdateClubName:                command.NewUpdateClubNameHandler(clubRepo, clubIndexRepo),
			PromoteClubSlugAliasToDefault: command.NewPromoteClubSlugAliasToDefaultHandler(clubRepo, clubIndexRepo),
			BecomeClubMember:              command.NewBecomeClubMemberHandler(clubRepo),
			WithdrawClubMembership:        command.NewWithdrawClubMembershipHandler(clubRepo),
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

			SearchClubs:                 query.NewSearchClubsHandler(clubIndexRepo),
			ClubBySlug:                  query.NewClubBySlugHandler(clubRepo),
			ClubById:                    query.NewClubByIdHandler(clubRepo),
			ClubSlugAliasesLimit:        query.NewClubSlugAliasesLimitHandler(clubRepo),
			AccountClubMembershipsLimit: query.NewAccountClubMembershipsLimitHandler(clubRepo),
			ClubMembersByClub:           query.NewClubMembersByClubHandler(clubRepo),
			ClubMemberById:              query.NewClubMemberByIdHandler(clubRepo),
		},
		Activities: activities.NewActivitiesHandler(postRepo, clubRepo, postIndexRepo, resourceRepo, parley),
	}
}
