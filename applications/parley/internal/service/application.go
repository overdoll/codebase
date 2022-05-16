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

func NewApplication(ctx context.Context) (app.Application, func()) {

	bootstrap.NewBootstrap(ctx)

	evaClient, cleanup := clients.NewEvaClient(ctx, os.Getenv("EVA_SERVICE"))
	stingClient, cleanup2 := clients.NewStingClient(ctx, os.Getenv("STING_SERVICE"))
	stellaClient, cleanup := clients.NewStellaClient(ctx, os.Getenv("STELLA_SERVICE"))

	return createApplication(ctx,
			adapters.NewEvaGrpc(evaClient),
			adapters.NewStellaGrpc(stellaClient),
			adapters.NewStingGrpc(stingClient),
			clients.NewTemporalClient(ctx)),
		func() {
			cleanup()
			cleanup2()
		}
}

type ComponentTestApplication struct {
	App            app.Application
	TemporalClient *temporalmocks.Client
	EvaClient      *mocks.MockEvaClient
	StingClient    *mocks.MockStingClient
	StellaClient   *mocks.MockStellaClient
}

func NewComponentTestApplication(ctx context.Context) *ComponentTestApplication {
	bootstrap.NewBootstrap(ctx)

	temporalClient := &temporalmocks.Client{}

	evaClient := &mocks.MockEvaClient{}
	stingClient := &mocks.MockStingClient{}
	stellaClient := &mocks.MockStellaClient{}

	return &ComponentTestApplication{
		App: createApplication(
			ctx,
			adapters.NewEvaGrpc(evaClient),
			adapters.NewStellaGrpc(stellaClient),
			adapters.NewStingGrpc(stingClient),
			temporalClient,
		),
		TemporalClient: temporalClient,
		EvaClient:      evaClient,
		StingClient:    stingClient,
		StellaClient:   stellaClient,
	}
}

func createApplication(ctx context.Context, eva command.EvaService, stella command.StellaService, sting command.StingService, client client.Client) app.Application {

	session := bootstrap.InitializeDatabaseSession()
	esClient := bootstrap.InitializeElasticSearchSession()

	clubInfractionRepo := adapters.NewClubInfractionCassandraRepository(session)
	postAuditLogRepo := adapters.NewPostAuditLogCassandraRepository(session)

	moderatorRepo := adapters.NewModeratorCassandraRepository(session)
	reportRepo := adapters.NewReportCassandraElasticsearchRepository(session, esClient)
	eventRepo := adapters.NewEventTemporalRepository(client)

	ruleRepo := adapters.NewRuleCassandraRepository(session)

	return app.Application{
		Commands: app.Commands{
			PutPostIntoModeratorQueueOrPublish: command.NewPutPostIntoModeratorQueueOrPublishHandler(moderatorRepo, eventRepo, sting),
			AddModeratorToPostQueue:            command.NewAddModeratorToPostQueueHandler(moderatorRepo),
			RemoveModeratorFromPostQueue:       command.NewRemoveModeratorFromPostQueue(moderatorRepo, eva),

			RejectPost:  command.NewRejectPostHandler(postAuditLogRepo, ruleRepo, clubInfractionRepo, moderatorRepo, eventRepo, eva, sting, stella),
			ApprovePost: command.NewApprovePostHandler(postAuditLogRepo, moderatorRepo, eventRepo, sting),
			RemovePost:  command.NewRemovePostHandler(postAuditLogRepo, ruleRepo, clubInfractionRepo, moderatorRepo, eventRepo, sting),

			CreateRule:            command.NewCreateRuleHandler(ruleRepo),
			UpdateRuleInfraction:  command.NewUpdateRuleInfractionHandler(ruleRepo),
			UpdateRuleDeprecated:  command.NewUpdateRuleDeprecatedHandler(ruleRepo),
			UpdateRuleTitle:       command.NewUpdateRuleTitleHandler(ruleRepo),
			UpdateRuleDescription: command.NewUpdateRuleDescriptionHandler(ruleRepo),

			DeleteAccountData: command.NewDeleteAccountDataHandler(reportRepo),

			ReportPost: command.NewReportPostHandler(reportRepo, ruleRepo, sting),

			IssueClubInfraction:         command.NewIssueClubInfractionHandler(clubInfractionRepo, ruleRepo, eventRepo, stella),
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
		Activities: activities.NewActivitiesHandler(moderatorRepo, reportRepo, postAuditLogRepo, ruleRepo, clubInfractionRepo, sting, stella),
	}
}
