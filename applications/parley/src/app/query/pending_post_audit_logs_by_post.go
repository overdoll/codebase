package query

import (
	"context"
	"errors"

	"go.uber.org/zap"
	"overdoll/applications/parley/src/domain/infraction"
)

type PendingPostAuditLogsByPostHandler struct {
	ir infraction.Repository
}

func NewPendingPostAuditLogsByPostHandler(ir infraction.Repository) PendingPostAuditLogsByPostHandler {
	return PendingPostAuditLogsByPostHandler{ir: ir}
}

var (
	ErrFailedGetPendingPostAuditLogById = errors.New("get pending post audit log failed")
)

func (h PendingPostAuditLogsByPostHandler) Handle(ctx context.Context, auditLogId string) (*infraction.PostAuditLog, error) {

	auditLog, err := h.ir.GetPostAuditLog(ctx, auditLogId)

	if err != nil {
		zap.S().Errorf("failed to get infraction history: %s", err)
		return nil, ErrFailedGetPendingPostAuditLogById
	}

	return auditLog, nil
}
