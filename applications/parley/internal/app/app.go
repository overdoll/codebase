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
	GetNextModerator   command.GetNextModeratorHandler
	ModeratePost       command.ModeratePostHandler
	RevertModeratePost command.RevertModeratePostHandler
	ToggleModerator    command.ToggleModeratorHandler
}

type Queries struct {
	PrincipalById                query.PrincipalByIdHandler
	PostRejectionReasons         query.PostsRejectionReasonsHandler
	PostRejectionReasonById      query.PostRejectionReasonByIdHandler
	SearchPostAuditLogs          query.SearchPostAuditLogsHandler
	AccountInfractionHistory     query.AccountInfractionHistoryByAccountHandler
	AccountInfractionHistoryById query.AccountInfractionHistoryByIdHandler
	ModeratorById                query.ModeratorByIdHandler
	PostAuditLogById             query.PostAuditLogByIdHandler
}
