package service

import (
	"context"
	"go.temporal.io/sdk/client"
	temporalmocks "go.temporal.io/sdk/mocks"
	"os"
	"overdoll/applications/stella/internal/adapters"
	"overdoll/applications/stella/internal/app"
	"overdoll/applications/stella/internal/app/command"
	"overdoll/applications/stella/internal/app/query"
	"overdoll/applications/stella/internal/app/workflows/activities"
	"overdoll/libraries/testing_tools/mocks"

	"overdoll/libraries/bootstrap"
	"overdoll/libraries/clients"
)

func NewApplication(ctx context.Context) (*app.Application, func()) {
	bootstrap.NewBootstrap()
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

type ComponentTestApplication struct {
	App            *app.Application
	TemporalClient *temporalmocks.Client
	EvaClient      *mocks.MockEvaClient
	CarrierClient  *mocks.MockCarrierClient
	StingClient    *mocks.MockStingClient
	LoaderClient   *mocks.MockLoaderClient
}

func NewComponentTestApplication(ctx context.Context) *ComponentTestApplication {
	bootstrap.NewBootstrap()
	temporalClient := &temporalmocks.Client{}

	evaClient := &mocks.MockEvaClient{}
	loaderClient := &mocks.MockLoaderClient{}
	stingClient := &mocks.MockStingClient{}
	carrierClient := &mocks.MockCarrierClient{}

	return &ComponentTestApplication{
		App: createApplication(
			ctx,
			adapters.NewEvaGrpc(evaClient),
			adapters.NewLoaderGrpc(loaderClient),
			adapters.NewStingGrpc(stingClient),
			adapters.NewCarrierGrpc(carrierClient),
			temporalClient,
		),
		TemporalClient: temporalClient,
		EvaClient:      evaClient,
		LoaderClient:   loaderClient,
		CarrierClient:  carrierClient,
		StingClient:    stingClient,
	}
}

func createApplication(ctx context.Context, eva command.EvaService, loader command.LoaderService, sting activities.StingService, carrier activities.CarrierService, client client.Client) *app.Application {

	session := bootstrap.InitializeDatabaseSession()
	cache := bootstrap.InitializeRedisSession()

	esClient := bootstrap.InitializeElasticSearchSession()
	clubRepo := adapters.NewClubCassandraElasticsearchRepository(session, esClient, cache)
	eventRepo := adapters.NewEventTemporalRepository(client)

	return &app.Application{
		Commands: app.Commands{
			CreateClub:                    command.NewCreateClubHandler(clubRepo, eventRepo),
			AddClubSlugAlias:              command.NewAddClubSlugAliasHandler(clubRepo),
			RemoveClubSlugAlias:           command.NewRemoveClubSlugAliasHandler(clubRepo),
			UpdateClubName:                command.NewUpdateClubNameHandler(clubRepo),
			PromoteClubSlugAliasToDefault: command.NewPromoteClubSlugAliasToDefaultHandler(clubRepo),
			JoinClub:                      command.NewJoinClubHandler(clubRepo, eventRepo),
			LeaveClub:                     command.NewLeaveClubHandler(clubRepo, eventRepo),
			UpdateClubThumbnail:           command.NewUpdateClubThumbnailHandler(clubRepo, loader),
			SuspendClubOperator:           command.NewSuspendClubOperatorHandler(clubRepo, eventRepo),
			SuspendClub:                   command.NewSuspendClubHandler(clubRepo, eventRepo),
			UnSuspendClub:                 command.NewUnSuspendClubHandler(clubRepo, eventRepo),
			AddClubSupporter:              command.NewAddClubSupporterHandler(eventRepo),
			RemoveClubSupporter:           command.NewRemoveClubSupporterHandler(eventRepo),
			DeleteAccountData:             command.NewDeleteAccountDataHandler(clubRepo),
			NewSupporterPost:              command.NewNewSupporterPostHandler(eventRepo),

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
			ClubSupporterMembersCount:   query.NewClubSupporterMembersCountHandler(clubRepo),
		},
		Activities: activities.NewActivitiesHandler(clubRepo, sting, carrier),
	}
}
