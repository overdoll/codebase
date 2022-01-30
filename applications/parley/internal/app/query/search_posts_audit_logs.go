package query

import (
	"context"
	"overdoll/applications/parley/internal/domain/post_audit_log"
	"time"

	"overdoll/libraries/paging"
	"overdoll/libraries/principal"
)

type SearchPostAuditLogs struct {
	Principal *principal.Principal

	Cursor             *paging.Cursor
	ModeratorAccountId *string
	PostId             *string

	From *time.Time
	To   *time.Time
}

type SearchPostAuditLogsHandler struct {
	ar  post_audit_log.Repository
	eva EvaService
}

func NewSearchPostAuditLogsHandler(ar post_audit_log.Repository, eva EvaService) SearchPostAuditLogsHandler {
	return SearchPostAuditLogsHandler{ar: ar, eva: eva}
}

func (h SearchPostAuditLogsHandler) Handle(ctx context.Context, query SearchPostAuditLogs) ([]*post_audit_log.PostAuditLog, error) {

	filters, err := post_audit_log.NewPostAuditLogFilters(query.ModeratorAccountId, query.PostId, query.From, query.To)

	if err != nil {
		return nil, err
	}

	auditLogs, err := h.ar.SearchPostAuditLogs(ctx, query.Principal, query.Cursor, filters)

	if err != nil {
		return nil, err
	}

	return auditLogs, nil
}
