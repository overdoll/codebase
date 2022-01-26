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

	CreatePostReportReason            command.CreatePostReportReasonHandler
	UpdatePostReportReasonTitle       command.UpdatePostReportReasonTitleHandler
	UpdatePostReportReasonDescription command.UpdatePostReportReasonDescriptionHandler
	UpdatePostReportReasonLink        command.UpdatePostReportReasonLinkHandler
	UpdatePostReportReasonDeprecated  command.UpdatePostReportReasonDeprecatedHandler

	CreatePostRejectionReason                     command.CreatePostRejectionReasonHandler
	UpdatePostRejectionReasonDeprecated           command.UpdatePostRejectionReasonDeprecatedHandler
	UpdatePostRejectionReasonText                 command.UpdatePostRejectionReasonTitleHandler
	UpdatePostRejectionReasonClubInfractionReason command.UpdatePostRejectionReasonClubInfractionReasonHandler

	CreateClubInfractionReason           command.CreateClubInfractionReasonHandler
	UpdateClubInfractionReasonDeprecated command.UpdateClubInfractionReasonDeprecatedHandler
	UpdateClubInfractionReasonText       command.UpdateClubInfractionReasonTitleHandler
	IssueClubInfraction                  command.IssueClubInfractionHandler
	RemoveClubInfractionHistory          command.RemoveClubInfractionHistoryHandler

	AddModeratorToPostQueue      command.AddModeratorToPostQueueHandler
	RemoveModeratorFromPostQueue command.RemoveModeratorFromPostQueueHandler
}

type Queries struct {
	PrincipalById query.PrincipalByIdHandler

	PostRejectionReasons      query.PostsRejectionReasonsHandler
	PostRejectionReasonById   query.PostRejectionReasonByIdHandler
	ClubInfractionHistoryById query.ClubInfractionHistoryByIdHandler
	ClubInfractionReasonById  query.ClubInfractionReasonByIdHandler

	ClubInfractionReasons query.ClubInfractionReasonsHandler

	PostReportReasons    query.PostsReportReasonsHandler
	PostReportReasonById query.PostReportReasonByIdHandler

	SearchPostReports          query.SearchPostReportsHandler
	PostReportById             query.PostReportByIdHandler
	PostReportByAccountAndPost query.PostReportByAccountAndPostHandler

	SearchPostAuditLogs   query.SearchPostAuditLogsHandler
	ClubInfractionHistory query.ClubInfractionHistoryByAccountHandler
	ModeratorById         query.ModeratorByIdHandler
	PostAuditLogById      query.PostAuditLogByIdHandler
}
