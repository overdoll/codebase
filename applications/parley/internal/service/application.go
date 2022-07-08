package service

import (
	"context"
	"go.temporal.io/sdk/client"
	temporalmocks "go.temporal.io/sdk/mocks"
	"os"
	"overdoll/applications/parley/internal/adapters"
	"overdoll/applications/parley/internal/app"
	"overdoll/applications/parley/internal/app/command"
	"overdoll/applications/parley/internal/app/query"
	"overdoll/applications/parley/internal/app/workflows/activities"
	"overdoll/libraries/bootstrap"
	"overdoll/libraries/clients"
	"overdoll/libraries/testing_tools/mocks"
)

func NewApplication(ctx context.Context) (*app.Application, func()) {

	bootstrap.NewBootstrap()

	evaClient, cleanup := clients.NewEvaClient(ctx, os.Getenv("EVA_SERVICE"))
	stingClient, cleanup2 := clients.NewStingClient(ctx, os.Getenv("STING_SERVICE"))
	carrierClient, cleanup3 := clients.NewCarrierClient(ctx, os.Getenv("CARRIER_SERVICE"))

	return createApplication(ctx,
			adapters.NewEvaGrpc(evaClient),
			adapters.NewStingGrpc(stingClient),
			adapters.NewCarrierGrpc(carrierClient),
			clients.NewTemporalClient(ctx)),
		func() {
			cleanup()
			cleanup2()
			cleanup3()
		}
}

type ComponentTestApplication struct {
	App            *app.Application
	TemporalClient *temporalmocks.Client
	EvaClient      *mocks.MockEvaClient
	StingClient    *mocks.MockStingClient
	CarrierClient  *mocks.MockCarrierClient
}

func NewComponentTestApplication(ctx context.Context) *ComponentTestApplication {
	bootstrap.NewBootstrap()

	temporalClient := &temporalmocks.Client{}

	evaClient := &mocks.MockEvaClient{}
	stingClient := &mocks.MockStingClient{}
	carrierClient := &mocks.MockCarrierClient{}

	return &ComponentTestApplication{
		App: createApplication(
			ctx,
			adapters.NewEvaGrpc(evaClient),
			adapters.NewStingGrpc(stingClient),
			adapters.NewCarrierGrpc(carrierClient),
			temporalClient,
		),
		TemporalClient: temporalClient,
		EvaClient:      evaClient,
		StingClient:    stingClient,
		CarrierClient:  carrierClient,
	}
}

func createApplication(ctx context.Context, eva command.EvaService, sting command.StingService, carrier activities.CarrierService, client client.Client) *app.Application {

	session := bootstrap.InitializeDatabaseSession()
	esClient := bootstrap.InitializeElasticSearchSession()
	redis := bootstrap.InitializeRedisSession()

	clubInfractionRepo := adapters.NewClubInfractionCassandraRepository(session)
	postAuditLogRepo := adapters.NewPostAuditLogCassandraRepository(session)

	moderatorRepo := adapters.NewModeratorCassandraRepository(session, redis)
	reportRepo := adapters.NewReportCassandraElasticsearchRepository(session, esClient)
	eventRepo := adapters.NewEventTemporalRepository(client)

	ruleRepo := adapters.NewRuleCassandraRepository(session)

	return &app.Application{
		Commands: app.Commands{
			PutPostIntoModeratorQueueOrPublish: command.NewPutPostIntoModeratorQueueOrPublishHandler(moderatorRepo, eventRepo, sting),
			AddModeratorToPostQueue:            command.NewAddModeratorToPostQueueHandler(moderatorRepo),
			RemoveModeratorFromPostQueue:       command.NewRemoveModeratorFromPostQueue(moderatorRepo, eva),

			RejectPost:  command.NewRejectPostHandler(postAuditLogRepo, ruleRepo, clubInfractionRepo, moderatorRepo, eventRepo, eva, sting),
			ApprovePost: command.NewApprovePostHandler(postAuditLogRepo, moderatorRepo, eventRepo, sting),
			RemovePost:  command.NewRemovePostHandler(postAuditLogRepo, ruleRepo, clubInfractionRepo, moderatorRepo, eventRepo, sting),

			CreateRule:            command.NewCreateRuleHandler(ruleRepo),
			UpdateRuleInfraction:  command.NewUpdateRuleInfractionHandler(ruleRepo),
			UpdateRuleDeprecated:  command.NewUpdateRuleDeprecatedHandler(ruleRepo),
			UpdateRuleTitle:       command.NewUpdateRuleTitleHandler(ruleRepo),
			UpdateRuleDescription: command.NewUpdateRuleDescriptionHandler(ruleRepo),

			DeleteAccountData: command.NewDeleteAccountDataHandler(reportRepo),

			ReportPost: command.NewReportPostHandler(reportRepo, ruleRepo, sting, eventRepo),

			IssueClubInfraction:         command.NewIssueClubInfractionHandler(clubInfractionRepo, ruleRepo, eventRepo, sting),
			RemoveClubInfractionHistory: command.NewRemoveClubInfractionHistoryHandler(clubInfractionRepo),
		},
		Queries: app.Queries{
			ClubInfractionHistory: query.NewClubInfractionHistoryByAccountHandler(clubInfractionRepo),

			PrincipalById: query.NewPrincipalByIdHandler(eva),
			RuleById:      query.NewRuleByIdHandler(ruleRepo),
			Rules:         query.NewRulesHandler(ruleRepo),
			RuleByPostId:  query.NewRuleByPostIdIdHandler(ruleRepo, postAuditLogRepo),

			SearchPostModeratorQueue: query.NewSearchPostModeratorQueueHandler(moderatorRepo),

			PostReportById:            query.NewPostReportByIdHandler(reportRepo),
			SearchPostReports:         query.NewSearchPostReportsHandler(reportRepo),
			SearchPostAuditLogs:       query.NewSearchPostAuditLogsHandler(postAuditLogRepo, eva),
			ClubInfractionHistoryById: query.NewClubInfractionHistoryByIdHandler(clubInfractionRepo),
			PostAuditLogById:          query.NewPostAuditLogByIdHandler(postAuditLogRepo),
			ModeratorById:             query.NewModeratorByIdHandler(moderatorRepo),
		},
		Activities: activities.NewActivitiesHandler(moderatorRepo, reportRepo, postAuditLogRepo, ruleRepo, clubInfractionRepo, sting, carrier),
	}
}
