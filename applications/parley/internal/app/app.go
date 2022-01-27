package app

import (
	"overdoll/applications/parley/internal/app/command"
	"overdoll/applications/parley/internal/app/query"
)

type Application struct {
	Commands Commands
	Queries  Queries
}

type Commands struct {
	GetNextModerator command.GetNextModeratorHandler

	RejectPost  command.RejectPostHandler
	ApprovePost command.ApprovePostHandler
	RemovePost  command.RemovePostHandler

	ReportPost command.ReportPostHandler

	CreateRule            command.CreateRuleHandler
	UpdateRuleTitle       command.UpdateRuleTitleHandler
	UpdateRuleDescription command.UpdateRuleDescriptionHandler
	UpdateRuleDeprecated  command.UpdateRuleDeprecatedHandler
	UpdateRuleInfraction  command.UpdateRuleInfractionHandler

	IssueClubInfraction         command.IssueClubInfractionHandler
	RemoveClubInfractionHistory command.RemoveClubInfractionHistoryHandler

	AddModeratorToPostQueue      command.AddModeratorToPostQueueHandler
	RemoveModeratorFromPostQueue command.RemoveModeratorFromPostQueueHandler
}

type Queries struct {
	PrincipalById query.PrincipalByIdHandler

	ClubInfractionHistoryById query.ClubInfractionHistoryByIdHandler

	RuleById query.RuleByIdHandler
	Rules    query.RulesHandler

	SearchPostReports          query.SearchPostReportsHandler
	PostReportById             query.PostReportByIdHandler
	PostReportByAccountAndPost query.PostReportByAccountAndPostHandler

	SearchPostAuditLogs   query.SearchPostAuditLogsHandler
	ClubInfractionHistory query.ClubInfractionHistoryByAccountHandler
	ModeratorById         query.ModeratorByIdHandler
	PostAuditLogById      query.PostAuditLogByIdHandler
}
