package service

import (
	"context"
	"go.temporal.io/sdk/client"
	"go.temporal.io/sdk/mocks"
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
			clients.NewTemporalClient(ctx)),
		func() {
			cleanup()
			cleanup2()
		}
}

func NewComponentTestApplication(ctx context.Context) (app.Application, func(), *mocks.Client) {

	bootstrap.NewBootstrap(ctx)

	evaClient, cleanup := clients.NewEvaClient(ctx, os.Getenv("EVA_SERVICE"))

	temporalClient := &mocks.Client{}

	return createApplication(ctx,
			// kind of "mock" eva, it will read off a stored database of accounts for testing first before reaching out to eva.
			// this makes testing easier because we can get reproducible tests with each run
			EvaServiceMock{adapter: adapters.NewEvaGrpc(evaClient)},
			LoaderServiceMock{},
			temporalClient,
		),
		func() {
			cleanup()
		},
		temporalClient
}

func createApplication(ctx context.Context, eva command.EvaService, loader command.LoaderService, client client.Client) app.Application {

	session := bootstrap.InitializeDatabaseSession()

	esClient := bootstrap.InitializeElasticSearchSession()
	clubRepo := adapters.NewClubCassandraElasticsearchRepository(session, esClient)
	eventRepo := adapters.NewEventTemporalRepository(client)

	return app.Application{
		Commands: app.Commands{
			DeleteAndRecreateClubsIndex:   command.NewDeleteAndRecreateClubsIndex(clubRepo),
			CreateClub:                    command.NewCreateClubHandler(clubRepo),
			AddClubSlugAlias:              command.NewAddClubSlugAliasHandler(clubRepo),
			RemoveClubSlugAlias:           command.NewRemoveClubSlugAliasHandler(clubRepo),
			UpdateClubName:                command.NewUpdateClubNameHandler(clubRepo),
			PromoteClubSlugAliasToDefault: command.NewPromoteClubSlugAliasToDefaultHandler(clubRepo),
			JoinClub:                      command.NewJoinClubHandler(clubRepo, eventRepo),
			LeaveClub:                     command.NewLeaveClubHandler(clubRepo, eventRepo),
			UpdateClubThumbnail:           command.NewUpdateClubThumbnailHandler(clubRepo, loader),
			SuspendClubOperator:           command.NewSuspendClubOperatorHandler(clubRepo),
			SuspendClub:                   command.NewSuspendClubHandler(clubRepo),
			UnSuspendClub:                 command.NewUnSuspendClubHandler(clubRepo),
			AddClubSupporter:              command.NewAddClubSupporterHandler(eventRepo),
			RemoveClubSupporter:           command.NewRemoveClubSupporterHandler(eventRepo),
		},
		Queries: app.Queries{
			PrincipalById:                  query.NewPrincipalByIdHandler(eva),
			ClubsByIds:                     query.NewClubsByIdsHandler(clubRepo),
			SearchClubs:                    query.NewSearchClubsHandler(clubRepo),
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
		Activities: activities.NewActivitiesHandler(clubRepo),
	}
}
