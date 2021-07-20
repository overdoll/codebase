package query

import (
	"context"
	"errors"

	"go.uber.org/zap"
	"overdoll/applications/parley/src/domain/infraction"
)

type PostAuditLogByIdHandler struct {
	ir infraction.Repository
}

func NewPostAuditLogByIdHandler(ir infraction.Repository) PostAuditLogByIdHandler {
	return PostAuditLogByIdHandler{ir: ir}
}

var (
	ErrFailedPostAuditLogById = errors.New("get pending post audit log failed")
)

func (h PostAuditLogByIdHandler) Handle(ctx context.Context, auditLogId string) (*infraction.PostAuditLog, error) {

	auditLog, err := h.ir.GetPostAuditLog(ctx, auditLogId)

	if err != nil {
		zap.S().Errorf("failed to get infraction history: %s", err)
		return nil, ErrFailedPostAuditLogById
	}

	return auditLog, nil
}
