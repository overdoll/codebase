package service

import (
	"context"
	"go.temporal.io/sdk/client"
	"go.temporal.io/sdk/mocks"
	"os"
	"overdoll/applications/parley/internal/adapters"
	"overdoll/applications/parley/internal/app"
	"overdoll/applications/parley/internal/app/command"
	"overdoll/applications/parley/internal/app/query"
	"overdoll/applications/parley/internal/app/workflows/activities"
	"overdoll/libraries/bootstrap"
	"overdoll/libraries/clients"
)

func NewApplication(ctx context.Context) (app.Application, func()) {

	bootstrap.NewBootstrap(ctx)

	evaClient, cleanup := clients.NewEvaClient(ctx, os.Getenv("EVA_SERVICE"))
	stingClient, cleanup2 := clients.NewStingClient(ctx, os.Getenv("STING_SERVICE"))
	stellaClient, cleanup := clients.NewStellaClient(ctx, os.Getenv("EVA_SERVICE"))

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

func NewComponentTestApplication(ctx context.Context) (app.Application, func(), *mocks.Client) {

	bootstrap.NewBootstrap(ctx)

	evaClient, cleanup := clients.NewEvaClient(ctx, os.Getenv("EVA_SERVICE"))

	temporalClient := &mocks.Client{}

	// mock sting, because it performs destructive operations and we dont want to
	// re-seed data every single time we run this test
	// also, the endpoints are already tested on sting, so we don't worry about potential failures
	return createApplication(ctx,
			EvaServiceMock{adapters.NewEvaGrpc(evaClient)},
			StellaServiceMock{},
			StingServiceMock{},
			temporalClient),
		func() {
			cleanup()
		},
		temporalClient
}

func createApplication(ctx context.Context, eva command.EvaService, stella command.StellaService, sting command.StingService, client client.Client) app.Application {

	session := bootstrap.InitializeDatabaseSession()

	clubInfractionRepo := adapters.NewClubInfractionCassandraRepository(session)
	postAuditLogRepo := adapters.NewPostAuditLogCassandraRepository(session)

	moderatorRepo := adapters.NewModeratorCassandraRepository(session)
	reportRepo := adapters.NewReportCassandraRepository(session)
	eventRepo := adapters.NewEventTemporalRepository(client)

	ruleRepo := adapters.NewRuleCassandraRepository(session)

	return app.Application{
		Commands: app.Commands{
			PutPostIntoModeratorQueueOrPublish: command.NewPutPostIntoModeratorQueueOrPublishHandler(moderatorRepo, eventRepo, sting),
			AddModeratorToPostQueue:            command.NewAddModeratorToPostQueueHandler(moderatorRepo, eva),
			RemoveModeratorFromPostQueue:       command.NewRemoveModeratorFromPostQueue(moderatorRepo, eva),

			RejectPost:  command.NewRejectPostHandler(postAuditLogRepo, ruleRepo, clubInfractionRepo, moderatorRepo, eventRepo, eva, sting, stella),
			ApprovePost: command.NewApprovePostHandler(postAuditLogRepo, moderatorRepo, eventRepo, eva, sting),
			RemovePost:  command.NewRemovePostHandler(postAuditLogRepo, ruleRepo, clubInfractionRepo, moderatorRepo, eventRepo, eva, sting, stella),

			CreateRule:            command.NewCreateRuleHandler(ruleRepo),
			UpdateRuleInfraction:  command.NewUpdateRuleInfractionHandler(ruleRepo),
			UpdateRuleDeprecated:  command.NewUpdateRuleDeprecatedHandler(ruleRepo),
			UpdateRuleTitle:       command.NewUpdateRuleTitleHandler(ruleRepo),
			UpdateRuleDescription: command.NewUpdateRuleDescriptionHandler(ruleRepo),

			DeleteAccountData: command.NewDeleteAccountDataHandler(reportRepo),

			ReportPost: command.NewReportPostHandler(reportRepo, ruleRepo, eva, sting),

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

			PostReportById:             query.NewPostReportByIdHandler(reportRepo),
			PostReportByAccountAndPost: query.NewPostReportByAccountAndPostHandler(reportRepo),
			SearchPostReports:          query.NewSearchPostReportsHandler(reportRepo),
			SearchPostAuditLogs:        query.NewSearchPostAuditLogsHandler(postAuditLogRepo, eva),
			ClubInfractionHistoryById:  query.NewClubInfractionHistoryByIdHandler(clubInfractionRepo),
			PostAuditLogById:           query.NewPostAuditLogByIdHandler(postAuditLogRepo),
			ModeratorById:              query.NewModeratorByIdHandler(moderatorRepo),
		},
		Activities: activities.NewActivitiesHandler(moderatorRepo, postAuditLogRepo, ruleRepo, clubInfractionRepo, sting, stella),
	}
}
