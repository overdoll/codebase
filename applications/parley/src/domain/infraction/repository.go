package infraction

import (
	"context"
)

type Repository interface {
	GetRejectionReasons(context.Context) ([]*PendingPostRejectionReason, error)
	GetRejectionReason(context.Context, string) (*PendingPostRejectionReason, error)

	GetPendingPostAuditLogByModerator(context.Context, string) ([]*PendingPostAuditLog, error)
	CreatePendingPostAuditLog(context.Context, *PendingPostAuditLog) error
	UpdatePendingPostAuditLog(context.Context, string, func(*PendingPostAuditLog) error) (*PendingPostAuditLog, error)

	CreateUserInfractionHistory(context.Context, *UserInfractionHistory) error
	GetUserInfractionHistory(context.Context, string) ([]*UserInfractionHistory, error)
	GetUserInfractionHistoryById(context.Context, string) (*UserInfractionHistory, error)
	DeleteUserInfractionHistory(context.Context, string) error
}
