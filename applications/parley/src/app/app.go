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
	ModeratePost       command.ModeratePendingPostHandler
	RevertModeratePost command.RevertModeratePendingPostHandler
	ToggleModerator    command.ToggleModeratorHandler
}

type Queries struct {
	PendingPostRejectionReasons     query.PendingPostsRejectionReasonsHandler
	PendingPostsAuditLogByModerator query.PendingPostsAuditLogByModeratorHandler
	AccountInfractionHistory        query.AccountInfractionHistoryHandler
	ModeratorInQueue                query.ModeratorInQueueHandler
	GetPendingPostAuditLogById      query.PendingPostAuditLogsByPostHandler
}
