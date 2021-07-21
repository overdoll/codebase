package query

import (
	"context"
	"errors"

	"go.uber.org/zap"
	"overdoll/applications/parley/src/domain/infraction"
	"overdoll/libraries/paging"
)

var (
	errFailedSearchPostAuditLogs = errors.New("get audit log failed")
)

type SearchPostAuditLogsHandler struct {
	ir  infraction.Repository
	eva EvaService
}

func NewSearchPostAuditLogsHandler(ir infraction.Repository, eva EvaService) SearchPostAuditLogsHandler {
	return SearchPostAuditLogsHandler{ir: ir, eva: eva}
}

func (h SearchPostAuditLogsHandler) Handle(ctx context.Context, cursor *paging.Cursor, moderatorId, postId string) ([]*infraction.PostAuditLog, *paging.Info, error) {

	filters, err := infraction.NewPostAuditLogFilters(moderatorId, "", postId, []int{})

	if err != nil {
		return nil, nil, err
	}

	auditLogs, page, err := h.ir.SearchPostAuditLogs(ctx, cursor, filters)

	if err != nil {
		zap.S().Errorf("failed to get audit log: %s", err)
		return nil, nil, errFailedSearchPostAuditLogs
	}

	return auditLogs, page, nil
}
