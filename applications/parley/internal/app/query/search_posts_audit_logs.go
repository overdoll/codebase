package query

import (
	"context"
	"overdoll/applications/parley/internal/domain/post_audit_log"
	"time"

	"overdoll/applications/parley/internal/domain/club_infraction"
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
	ir  club_infraction.Repository
	eva EvaService
}

func NewSearchPostAuditLogsHandler(ir club_infraction.Repository, eva EvaService) SearchPostAuditLogsHandler {
	return SearchPostAuditLogsHandler{ir: ir, eva: eva}
}

func (h SearchPostAuditLogsHandler) Handle(ctx context.Context, query SearchPostAuditLogs) ([]*post_audit_log.PostAuditLog, error) {

	filters, err := post_audit_log.NewPostAuditLogFilters(query.ModeratorAccountId, query.PostId, query.From, query.To)

	if err != nil {
		return nil, err
	}

	auditLogs, err := h.ir.SearchPostAuditLogs(ctx, query.Principal, query.Cursor, filters)

	if err != nil {
		return nil, err
	}

	return auditLogs, nil
}
