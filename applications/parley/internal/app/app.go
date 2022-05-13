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
	PutPostIntoModeratorQueueOrPublish command.PutPostIntoModeratorQueueOrPublishHandler

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

	DeleteAccountData command.DeleteAccountDataHandler
}

type Queries struct {
	PrincipalById query.PrincipalByIdHandler

	ClubInfractionHistoryById query.ClubInfractionHistoryByIdHandler

	RuleById     query.RuleByIdHandler
	Rules        query.RulesHandler
	RuleByPostId query.RuleByPostIdIdHandler

	SearchPostReports query.SearchPostReportsHandler
	PostReportById    query.PostReportByIdHandler

	SearchPostModeratorQueue query.SearchPostModeratorQueueHandler

	SearchPostAuditLogs   query.SearchPostAuditLogsHandler
	ClubInfractionHistory query.ClubInfractionHistoryByAccountHandler
	ModeratorById         query.ModeratorByIdHandler
	PostAuditLogById      query.PostAuditLogByIdHandler
}
