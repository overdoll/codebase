package query

import (
	"context"
	"errors"

	"go.uber.org/zap"
	"overdoll/applications/parley/src/domain/infraction"
	"overdoll/libraries/paging"
)

var (
	ErrFailedGetPendingPostsAuditLog = errors.New("get audit log failed")
)

type PendingPostsAuditLogByModeratorHandler struct {
	ir infraction.Repository

	eva EvaService
}

func NewPendingPostsAuditLogByModeratorHandler(ir infraction.Repository, eva EvaService) PendingPostsAuditLogByModeratorHandler {
	return PendingPostsAuditLogByModeratorHandler{ir: ir, eva: eva}
}

func (h PendingPostsAuditLogByModeratorHandler) Handle(ctx context.Context, cursor *paging.Cursor, moderatorId string) ([]*infraction.PostAuditLog, *paging.Info, error) {

	filters, err := infraction.NewPostAuditLogFilters(moderatorId, "", "", []int{})

	if err != nil {
		return nil, nil, err
	}

	auditLogs, page, err := h.ir.GetPostAuditLogByModerator(ctx, cursor, filters)

	if err != nil {
		zap.S().Errorf("failed to get audit log: %s", err)
		return nil, nil, ErrFailedGetPendingPostsAuditLog
	}

	return auditLogs, page, nil
}
