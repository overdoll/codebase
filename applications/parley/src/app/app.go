package app

import (
	"overdoll/applications/parley/src/app/command"
	"overdoll/applications/parley/src/app/query"
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
	PostRejectionReasons         query.PostsRejectionReasonsHandler
	PostRejectionReasonById      query.PostRejectionReasonByIdHandler
	PostsAuditLogByModerator     query.PostsAuditLogByModeratorHandler
	AccountInfractionHistory     query.AccountInfractionHistoryByAccountHandler
	AccountInfractionHistoryById query.AccountInfractionHistoryByIdHandler
	ModeratorById                query.ModeratorByIdHandler
	PostAuditLogById             query.PostAuditLogByIdHandler
	PostAuditLogsByPost          query.PostAuditLogsByPostHandler
}
