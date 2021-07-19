package infraction

import (
	"context"

	"overdoll/libraries/paging"
)

type Repository interface {
	GetPostRejectionReasons(context.Context, *paging.Cursor) ([]*PostRejectionReason, *paging.Info, error)
	GetPostRejectionReason(context.Context, string) (*PostRejectionReason, error)

	GetPostAuditLog(context.Context, string) (*PostAuditLog, error)
	GetPostAuditLogsByPost(context.Context, *paging.Cursor, *PostAuditLogFilters) ([]*PostAuditLog, *paging.Info, error)
	GetPostAuditLogByModerator(context.Context, *paging.Cursor, *PostAuditLogFilters) ([]*PostAuditLog, *paging.Info, error)
	CreatePostAuditLog(context.Context, *PostAuditLog) error
	UpdatePostAuditLog(context.Context, string, func(*PostAuditLog) error) (*PostAuditLog, error)

	CreateUserInfractionHistory(context.Context, *AccountInfractionHistory) error
	GetAccountInfractionHistory(context.Context, *paging.Cursor, string) ([]*AccountInfractionHistory, *paging.Info, error)
	GetAccountInfractionHistoryById(context.Context, string, string) (*AccountInfractionHistory, error)
	DeleteAccountInfractionHistory(context.Context, string, string) error
}
