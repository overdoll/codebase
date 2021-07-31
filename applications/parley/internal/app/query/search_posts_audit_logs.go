package query

import (
	"context"

	"overdoll/applications/parley/internal/domain/infraction"
	"overdoll/libraries/paging"
	"overdoll/libraries/principal"
)

type SearchPostAuditLogs struct {
	Principal *principal.Principal

	Cursor             *paging.Cursor
	ModeratorAccountId *string
	PostId             *string
}

type SearchPostAuditLogsHandler struct {
	ir  infraction.Repository
	eva EvaService
}

func NewSearchPostAuditLogsHandler(ir infraction.Repository, eva EvaService) SearchPostAuditLogsHandler {
	return SearchPostAuditLogsHandler{ir: ir, eva: eva}
}

func (h SearchPostAuditLogsHandler) Handle(ctx context.Context, query SearchPostAuditLogs) ([]*infraction.PostAuditLog, error) {

	filters, err := infraction.NewPostAuditLogFilters(query.ModeratorAccountId, query.PostId, []int{})

	if err != nil {
		return nil, err
	}

	auditLogs, err := h.ir.SearchPostAuditLogs(ctx, query.Principal, query.Cursor, filters)

	if err != nil {
		return nil, err
	}

	return auditLogs, nil
}
