package query

import (
	"context"
	"errors"

	"go.uber.org/zap"
	"overdoll/applications/parley/src/domain/infraction"
	"overdoll/libraries/paging"
)

type PostAuditLogsByPostHandler struct {
	ir infraction.Repository
}

func NewPostAuditLogsByPostHandler(ir infraction.Repository) PostAuditLogsByPostHandler {
	return PostAuditLogsByPostHandler{ir: ir}
}

var (
	ErrFailedGetPendingPostAuditLogById = errors.New("get pending post audit log failed")
)

func (h PostAuditLogsByPostHandler) Handle(ctx context.Context, cursor *paging.Cursor, postId string) ([]*infraction.PostAuditLog, *paging.Info, error) {

	filters, err := infraction.NewPostAuditLogFilters("", "", postId, []int{})

	if err != nil {
		return nil, nil, err
	}

	auditLogs, _, err := h.ir.GetPostAuditLogsByPost(ctx, cursor, filters)

	if err != nil {
		zap.S().Errorf("failed to get infraction history: %s", err)
		return nil, nil, ErrFailedGetPendingPostAuditLogById
	}

	return auditLogs, nil, nil
}
