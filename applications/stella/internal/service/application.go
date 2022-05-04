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
	stingClient, cleanup3 := clients.NewStingClient(ctx, os.Getenv("STING_SERVICE"))
	carrierClient, cleanup4 := clients.NewCarrierClient(ctx, os.Getenv("CARRIER_SERVICE"))

	return createApplication(ctx,
			adapters.NewEvaGrpc(evaClient),
			adapters.NewLoaderGrpc(loaderClient),
			adapters.NewStingGrpc(stingClient),
			adapters.NewCarrierGrpc(carrierClient),
			clients.NewTemporalClient(ctx)),
		func() {
			cleanup()
			cleanup2()
			cleanup3()
			cleanup4()
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
			StingServiceMock{},
			CarrierServiceMock{},
			temporalClient,
		),
		func() {
			cleanup()
		},
		temporalClient
}

func createApplication(ctx context.Context, eva command.EvaService, loader command.LoaderService, sting activities.StingService, carrier activities.CarrierService, client client.Client) app.Application {

	session := bootstrap.InitializeDatabaseSession()

	esClient := bootstrap.InitializeElasticSearchSession()
	clubRepo := adapters.NewClubCassandraElasticsearchRepository(session, esClient)
	eventRepo := adapters.NewEventTemporalRepository(client)

	return app.Application{
		Commands: app.Commands{
			DeleteAndRecreateClubsIndex:       command.NewDeleteAndRecreateClubsIndex(clubRepo),
			DeleteAndRecreateClubMembersIndex: command.NewDeleteAndRecreateClubMembersIndexHandler(clubRepo),
			CreateClub:                        command.NewCreateClubHandler(clubRepo),
			AddClubSlugAlias:                  command.NewAddClubSlugAliasHandler(clubRepo),
			RemoveClubSlugAlias:               command.NewRemoveClubSlugAliasHandler(clubRepo),
			UpdateClubName:                    command.NewUpdateClubNameHandler(clubRepo),
			PromoteClubSlugAliasToDefault:     command.NewPromoteClubSlugAliasToDefaultHandler(clubRepo),
			JoinClub:                          command.NewJoinClubHandler(clubRepo, eventRepo),
			LeaveClub:                         command.NewLeaveClubHandler(clubRepo, eventRepo),
			UpdateClubThumbnail:               command.NewUpdateClubThumbnailHandler(clubRepo, loader),
			SuspendClubOperator:               command.NewSuspendClubOperatorHandler(clubRepo, eventRepo),
			SuspendClub:                       command.NewSuspendClubHandler(clubRepo, eventRepo),
			UnSuspendClub:                     command.NewUnSuspendClubHandler(clubRepo, eventRepo),
			AddClubSupporter:                  command.NewAddClubSupporterHandler(eventRepo),
			RemoveClubSupporter:               command.NewRemoveClubSupporterHandler(eventRepo),
			DeleteAccountData:                 command.NewDeleteAccountDataHandler(clubRepo),
			NewSupporterPost:                  command.NewNewSupporterPostHandler(eventRepo),

			TerminateClub:   command.NewTerminateClubHandler(clubRepo, eventRepo),
			UnTerminateClub: command.NewUnTerminateClubHandler(clubRepo, eventRepo),
		},
		Queries: app.Queries{
			PrincipalById:               query.NewPrincipalByIdHandler(eva),
			ClubsByIds:                  query.NewClubsByIdsHandler(clubRepo),
			SearchClubs:                 query.NewSearchClubsHandler(clubRepo),
			AccountClubDigest:           query.NewAccountClubDigestHandler(clubRepo),
			ClubBySlug:                  query.NewClubBySlugHandler(clubRepo),
			ClubById:                    query.NewClubByIdHandler(clubRepo),
			AccountClubsCount:           query.NewAccountClubsCountHandler(clubRepo),
			AccountClubsLimit:           query.NewAccountClubsLimitHandler(clubRepo),
			ClubSlugAliasesLimit:        query.NewClubSlugAliasesLimitHandler(clubRepo),
			AccountClubMembershipsLimit: query.NewAccountClubMembershipsLimitHandler(clubRepo),
			AccountClubMembershipsCount: query.NewAccountClubMembershipsCountHandler(clubRepo),
			ClubMemberById:              query.NewClubMemberByIdHandler(clubRepo),
			SearchClubMemberships:       query.NewSearchClubMembershipsHandler(clubRepo),
			ClubSuspensionLogs:          query.NewClubSuspensionLogsHandler(clubRepo),
			CanDeleteAccountData:        query.NewCanDeleteAccountDataHandler(clubRepo),
			HasNonTerminatedClubs:       query.NewHasNonTerminatedClubsHandler(clubRepo),
		},
		Activities: activities.NewActivitiesHandler(clubRepo, sting, carrier),
	}
}
