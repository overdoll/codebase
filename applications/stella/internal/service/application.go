package service

import (
	"context"
	"os"
	"overdoll/applications/stella/internal/adapters"
	"overdoll/applications/stella/internal/app"
	"overdoll/applications/stella/internal/app/command"
	"overdoll/applications/stella/internal/app/query"

	"overdoll/applications/stella/internal/app/workflows/activities"

	"overdoll/libraries/bootstrap"
	"overdoll/libraries/clients"
)

func NewApplication(ctx context.Context) (app.Application, func()) {

	// bootstrap application
	bootstrap.NewBootstrap(ctx)

	evaClient, cleanup := clients.NewEvaClient(ctx, os.Getenv("EVA_SERVICE"))
	loaderClient, cleanup2 := clients.NewLoaderClient(ctx, os.Getenv("LOADER_SERVICE"))

	return createApplication(ctx,
			adapters.NewEvaGrpc(evaClient),
			adapters.NewLoaderGrpc(loaderClient),
		),
		func() {
			cleanup()
			cleanup2()
		}
}

func NewComponentTestApplication(ctx context.Context) (app.Application, func()) {

	bootstrap.NewBootstrap(ctx)

	evaClient, cleanup := clients.NewEvaClient(ctx, os.Getenv("EVA_SERVICE"))

	return createApplication(ctx,
			// kind of "mock" eva, it will read off a stored database of accounts for testing first before reaching out to eva.
			// this makes testing easier because we can get reproducible tests with each run
			EvaServiceMock{adapter: adapters.NewEvaGrpc(evaClient)},
			LoaderServiceMock{},
		),
		func() {
			cleanup()
		}
}

func createApplication(ctx context.Context, eva command.EvaService, loader command.LoaderService) app.Application {

	session := bootstrap.InitializeDatabaseSession()

	client := bootstrap.InitializeElasticSearchSession()

	clubRepo := adapters.NewClubCassandraRepository(session)
	clubIndexRepo := adapters.NewClubIndexElasticSearchRepository(client, session)

	return app.Application{
		Commands: app.Commands{
			IndexAllClubs:                 command.NewIndexAllClubsHandler(clubRepo, clubIndexRepo),
			CreateClub:                    command.NewCreateClubHandler(clubRepo, clubIndexRepo),
			AddClubSlugAlias:              command.NewAddClubSlugAliasHandler(clubRepo, clubIndexRepo),
			RemoveClubSlugAlias:           command.NewRemoveClubSlugAliasHandler(clubRepo, clubIndexRepo),
			UpdateClubName:                command.NewUpdateClubNameHandler(clubRepo, clubIndexRepo),
			PromoteClubSlugAliasToDefault: command.NewPromoteClubSlugAliasToDefaultHandler(clubRepo, clubIndexRepo),
			BecomeClubMember:              command.NewBecomeClubMemberHandler(clubRepo),
			WithdrawClubMembership:        command.NewWithdrawClubMembershipHandler(clubRepo),
			UpdateClubThumbnail:           command.NewUpdateClubThumbnailHandler(clubRepo, clubIndexRepo, loader),
			SuspendClubOperator:           command.NewSuspendClubOperatorHandler(clubRepo, clubIndexRepo),
			SuspendClub:                   command.NewSuspendClubHandler(clubRepo, clubIndexRepo),
			UnSuspendClub:                 command.NewUnSuspendClubHandler(clubRepo, clubIndexRepo),
		},
		Queries: app.Queries{
			PrincipalById:                  query.NewPrincipalByIdHandler(eva),
			CanAccountCreatePostUnderClub:  query.NewCanAccountCreatePostUnderClubHandler(clubRepo),
			CanAccountViewPostUnderClub:    query.NewCanAccountViewPostUnderClubHandler(clubRepo, eva),
			ClubsByIds:                     query.NewClubsByIdsHandler(clubRepo),
			SearchClubs:                    query.NewSearchClubsHandler(clubIndexRepo),
			SuspendedClubs:                 query.NewSuspendedClubsHandler(clubIndexRepo),
			ClubBySlug:                     query.NewClubBySlugHandler(clubRepo),
			ClubById:                       query.NewClubByIdHandler(clubRepo),
			AccountClubsCount:              query.NewAccountClubsCountHandler(clubRepo),
			AccountClubsLimit:              query.NewAccountClubsLimitHandler(clubRepo),
			ClubSlugAliasesLimit:           query.NewClubSlugAliasesLimitHandler(clubRepo),
			AccountClubMemberships:         query.NewAccountClubMembershipsHandler(clubRepo),
			AccountClubMembershipsLimit:    query.NewAccountClubMembershipsLimitHandler(clubRepo),
			AccountClubMembershipsCount:    query.NewAccountClubMembershipsCountHandler(clubRepo),
			ClubMembersByClub:              query.NewClubMembersByClubHandler(clubRepo),
			ClubMemberById:                 query.NewClubMemberByIdHandler(clubRepo),
			AccountClubMembershipsOperator: query.NewAccountClubMembershipsOperatorHandler(clubRepo),
		},
		Activities: activities.NewActivitiesHandler(clubRepo, clubIndexRepo),
	}
}
