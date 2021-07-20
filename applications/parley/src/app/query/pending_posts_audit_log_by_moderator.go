package query

import (
	"context"
	"errors"

	"go.uber.org/zap"
	"overdoll/applications/parley/src/domain/infraction"
	"overdoll/libraries/paging"
)

var (
	errFailedGetPendingPostsAuditLog = errors.New("get audit log failed")
)

type PostsAuditLogByModeratorHandler struct {
	ir  infraction.Repository
	eva EvaService
}

func NewPendingPostsAuditLogByModeratorHandler(ir infraction.Repository, eva EvaService) PostsAuditLogByModeratorHandler {
	return PostsAuditLogByModeratorHandler{ir: ir, eva: eva}
}

func (h PostsAuditLogByModeratorHandler) Handle(ctx context.Context, cursor *paging.Cursor, moderatorId string) ([]*infraction.PostAuditLog, *paging.Info, error) {

	filters, err := infraction.NewPostAuditLogFilters(moderatorId, "", "", []int{})

	if err != nil {
		return nil, nil, err
	}

	auditLogs, page, err := h.ir.SearchPostAuditLogs(ctx, cursor, filters)

	if err != nil {
		zap.S().Errorf("failed to get audit log: %s", err)
		return nil, nil, errFailedGetPendingPostsAuditLog
	}

	return auditLogs, page, nil
}
