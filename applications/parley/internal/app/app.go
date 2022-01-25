package app

import (
	"overdoll/applications/parley/internal/app/command"
	"overdoll/applications/parley/internal/app/query"
	"overdoll/applications/parley/internal/app/workflows/activities"
)

type Application struct {
	Commands   Commands
	Queries    Queries
	Activities *activities.Activities
}

type Commands struct {
	GetNextModerator command.GetNextModeratorHandler

	RejectPost  command.RejectPostHandler
	ApprovePost command.ApprovePostHandler
	RemovePost  command.RemovePostHandler

	ReportPost command.ReportPostHandler

	AddModeratorToPostQueue      command.AddModeratorToPostQueueHandler
	RemoveModeratorFromPostQueue command.RemoveModeratorFromPostQueueHandler
}

type Queries struct {
	PrincipalById query.PrincipalByIdHandler

	PostRejectionReasons    query.PostsRejectionReasonsHandler
	PostRejectionReasonById query.PostRejectionReasonByIdHandler

	PostReportReasons    query.PostsReportReasonsHandler
	PostReportReasonById query.PostReportReasonByIdHandler

	SearchPostReports          query.SearchPostReportsHandler
	PostReportById             query.PostReportByIdHandler
	PostReportByAccountAndPost query.PostReportByAccountAndPostHandler

	SearchPostAuditLogs          query.SearchPostAuditLogsHandler
	AccountInfractionHistory     query.AccountInfractionHistoryByAccountHandler
	AccountInfractionHistoryById query.AccountInfractionHistoryByIdHandler
	ModeratorById                query.ModeratorByIdHandler
	PostAuditLogById             query.PostAuditLogByIdHandler
}
