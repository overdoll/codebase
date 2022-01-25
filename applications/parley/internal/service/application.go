package service

import (
	"context"
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

	return createApplication(ctx, adapters.NewEvaGrpc(evaClient), adapters.NewStellaGrpc(stellaClient), adapters.NewStingGrpc(stingClient)),
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
	return createApplication(ctx, adapters.NewEvaGrpc(evaClient), StellaServiceMock{}, StingServiceMock{}),
		func() {
			cleanup()
		}
}

func createApplication(ctx context.Context, eva command.EvaService, stella command.StellaService, sting activities.StingService) app.Application {

	session := bootstrap.InitializeDatabaseSession()

	clubInfractionRepo := adapters.NewClubInfractionCassandraRepository(session)
	postAuditLogRepo := adapters.NewPostAuditLogCassandraRepository(session)

	moderatorRepo := adapters.NewModeratorCassandraRepository(session)
	reportRepo := adapters.NewReportCassandraRepository(session)

	return app.Application{
		Commands: app.Commands{
			GetNextModerator:             command.NewGetNextModeratorHandler(moderatorRepo),
			AddModeratorToPostQueue:      command.NewAddModeratorToPostQueueHandler(moderatorRepo, eva),
			RemoveModeratorFromPostQueue: command.NewRemoveModeratorFromPostQueue(moderatorRepo, eva),

			RejectPost:  command.NewRejectPostHandler(postAuditLogRepo, eva, sting),
			ApprovePost: command.NewApprovePostHandler(postAuditLogRepo, eva, sting),
			RemovePost:  command.NewRemovePostHandler(postAuditLogRepo, eva, sting),

			CreatePostRejectionReason:                     command.NewCreatePostRejectionReasonHandler(postAuditLogRepo, clubInfractionRepo),
			UpdatePostRejectionReasonClubInfractionReason: command.NewUpdatePostRejectionReasonClubInfractionReasonHandler(postAuditLogRepo, clubInfractionRepo),
			UpdatePostRejectionReasonDeprecated:           command.NewUpdatePostRejectionReasonDeprecatedHandler(postAuditLogRepo),
			UpdatePostRejectionReasonText:                 command.NewUpdatePostRejectionReasonTextHandler(postAuditLogRepo),

			ReportPost: command.NewReportPostHandler(reportRepo, eva, sting),

			UpdateClubInfractionReasonDeprecated: command.NewUpdateClubInfractionReasonDeprecatedHandler(clubInfractionRepo),
			UpdateClubInfractionReasonText:       command.NewUpdateClubInfractionReasonTextHandler(clubInfractionRepo),
			CreateClubInfractionReason:           command.NewCreateClubInfractionReasonHandler(clubInfractionRepo),
			IssueClubInfraction:                  command.NewIssueClubInfractionHandler(clubInfractionRepo, stella),
			RemoveClubInfractionHistory:          command.NewRemoveClubInfractionHistoryHandler(clubInfractionRepo),
		},
		Queries: app.Queries{
			ClubInfractionReasons:    query.NewClubInfractionReasonsHandler(clubInfractionRepo),
			ClubInfractionHistory:    query.NewClubInfractionHistoryByAccountHandler(clubInfractionRepo),
			ClubInfractionReasonById: query.NewClubInfractionReasonByIdHandler(clubInfractionRepo),

			PrincipalById:              query.NewPrincipalByIdHandler(eva),
			PostReportReasonById:       query.NewPostsReportReasonByIdHandler(reportRepo),
			PostReportReasons:          query.NewPostReportReasonsHandler(reportRepo),
			PostReportById:             query.NewPostReportByIdHandler(reportRepo),
			PostReportByAccountAndPost: query.NewPostReportByAccountAndPostHandler(reportRepo),
			SearchPostReports:          query.NewSearchPostReportsHandler(reportRepo),
			PostRejectionReasons:       query.NewPostsRejectionReasonsHandler(postAuditLogRepo, eva),
			SearchPostAuditLogs:        query.NewSearchPostAuditLogsHandler(postAuditLogRepo, eva),
			PostRejectionReasonById:    query.NewPostsRejectionReasonByIdHandler(postAuditLogRepo),
			ClubInfractionHistoryById:  query.NewClubInfractionHistoryByIdHandler(clubInfractionRepo),
			PostAuditLogById:           query.NewPostAuditLogByIdHandler(postAuditLogRepo),
			ModeratorById:              query.NewModeratorByIdHandler(moderatorRepo),
		},
		Activities: activities.NewActivitiesHandler(postAuditLogRepo, clubInfractionRepo, sting),
	}
}
