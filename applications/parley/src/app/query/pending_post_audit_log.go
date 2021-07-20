package query

import (
	"context"
	"errors"

	"go.uber.org/zap"
	"overdoll/applications/parley/src/domain/infraction"
)

var (
	errFailedPostAuditLogById = errors.New("get pending post audit log failed")
)

type PostAuditLogByIdHandler struct {
	ir infraction.Repository
}

func NewPostAuditLogByIdHandler(ir infraction.Repository) PostAuditLogByIdHandler {
	return PostAuditLogByIdHandler{ir: ir}
}

func (h PostAuditLogByIdHandler) Handle(ctx context.Context, auditLogId string) (*infraction.PostAuditLog, error) {

	auditLog, err := h.ir.GetPostAuditLog(ctx, auditLogId)

	if err != nil {
		zap.S().Errorf("failed to get infraction history: %s", err)
		return nil, errFailedPostAuditLogById
	}

	return auditLog, nil
}
