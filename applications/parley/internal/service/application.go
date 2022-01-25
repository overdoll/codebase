package service

import (
	"context"
	"os"
	"overdoll/applications/parley/internal/app/workflows/activities"

	"overdoll/applications/parley/internal/adapters"
	"overdoll/applications/parley/internal/app"
	"overdoll/applications/parley/internal/app/command"
	"overdoll/applications/parley/internal/app/query"
	"overdoll/libraries/bootstrap"
	"overdoll/libraries/clients"
)

func NewApplication(ctx context.Context) (app.Application, func()) {

	bootstrap.NewBootstrap(ctx)

	evaClient, cleanup := clients.NewEvaClient(ctx, os.Getenv("EVA_SERVICE"))
	stingClient, cleanup2 := clients.NewStingClient(ctx, os.Getenv("STING_SERVICE"))

	return createApplication(ctx, adapters.NewEvaGrpc(evaClient), adapters.NewStingGrpc(stingClient)),
		func() {
			cleanup()
			cleanup2()
		}
}

func NewComponentTestApplication(ctx context.Context) (app.Application, func()) {

	bootstrap.NewBootstrap(ctx)

	evaClient, cleanup := clients.NewEvaClient(ctx, os.Getenv("EVA_SERVICE"))

	// mock sting, because it performs destructive operations and we dont want to
	// re-seed data every single time we run this test
	// also, the endpoints are already tested on sting, so we don't worry about potential failures
	return createApplication(ctx, adapters.NewEvaGrpc(evaClient), StingServiceMock{}),
		func() {
			cleanup()
		}
}

func createApplication(ctx context.Context, eva command.EvaService, sting activities.StingService) app.Application {

	session := bootstrap.InitializeDatabaseSession()

	clubInfractionRepo := adapters.NewClubInfractionCassandraRepository(session)
	postAuditLogRepo := adapters.NewPostAuditLogCassandraRepository(session)

	moderatorRepo := adapters.NewModeratorCassandraRepository(session)
	reportRepo := adapters.NewReportCassandraRepository(session)

	return app.Application{
		Commands: app.Commands{
			GetNextModerator:             command.NewGetNextModeratorHandler(moderatorRepo),
			RejectPost:                   command.NewRejectPostHandler(postAuditLogRepo, eva, sting),
			ApprovePost:                  command.NewApprovePostHandler(postAuditLogRepo, eva, sting),
			RemovePost:                   command.NewRemovePostHandler(postAuditLogRepo, eva, sting),
			ReportPost:                   command.NewReportPostHandler(reportRepo, eva, sting),
			AddModeratorToPostQueue:      command.NewAddModeratorToPostQueueHandler(moderatorRepo, eva),
			RemoveModeratorFromPostQueue: command.NewRemoveModeratorFromPostQueue(moderatorRepo, eva),
		},
		Queries: app.Queries{
			PrincipalById:                query.NewPrincipalByIdHandler(eva),
			PostReportReasonById:         query.NewPostsReportReasonByIdHandler(reportRepo),
			PostReportReasons:            query.NewPostReportReasonsHandler(reportRepo),
			PostReportById:               query.NewPostReportByIdHandler(reportRepo),
			PostReportByAccountAndPost:   query.NewPostReportByAccountAndPostHandler(reportRepo),
			SearchPostReports:            query.NewSearchPostReportsHandler(reportRepo),
			PostRejectionReasons:         query.NewPostsRejectionReasonsHandler(infractionRepo, eva),
			SearchPostAuditLogs:          query.NewSearchPostAuditLogsHandler(infractionRepo, eva),
			PostRejectionReasonById:      query.NewPostsRejectionReasonByIdHandler(infractionRepo),
			AccountInfractionHistory:     query.NewAccountInfractionHistoryByAccountHandler(infractionRepo),
			AccountInfractionHistoryById: query.NewAccountInfractionHistoryByIdHandler(infractionRepo),
			PostAuditLogById:             query.NewPostAuditLogByIdHandler(infractionRepo),
			ModeratorById:                query.NewModeratorByIdHandler(moderatorRepo),
		},
		Activities: activities.NewActivitiesHandler(postAuditLogRepo, clubInfractionRepo, sting),
	}
}
