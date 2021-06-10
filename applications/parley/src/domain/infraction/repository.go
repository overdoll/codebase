package infraction

import (
	"context"
)

type Repository interface {
	GetRejectionReasons(context.Context) ([]*PendingPostRejectionReason, error)
	GetRejectionReason(context.Context, string) (*PendingPostRejectionReason, error)

	GetPendingPostAuditLog(context.Context, string) (*PendingPostAuditLog, error)
	CreatePendingPostAuditLog(context.Context, *PendingPostAuditLog) error

	CreateUserInfractionHistory(context.Context, *UserInfractionHistory) error
	GetUserInfractionHistory(context.Context, string) ([]*UserInfractionHistory, error)
	GetUserInfractionHistoryById(context.Context, string) (*UserInfractionHistory, error)
}
