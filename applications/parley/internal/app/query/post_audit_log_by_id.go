package query

import (
	"context"

	"overdoll/applications/parley/internal/domain/infraction"
	"overdoll/libraries/principal"
)

type PostAuditLogById struct {
	Principal *principal.Principal

	AuditLogId string
}

type PostAuditLogByIdHandler struct {
	ir infraction.Repository
}

func NewPostAuditLogByIdHandler(ir infraction.Repository) PostAuditLogByIdHandler {
	return PostAuditLogByIdHandler{ir: ir}
}

func (h PostAuditLogByIdHandler) Handle(ctx context.Context, query PostAuditLogById) (*infraction.PostAuditLog, error) {

	auditLog, err := h.ir.GetPostAuditLog(ctx, query.Principal, query.AuditLogId)

	if err != nil {
		return nil, err
	}

	return auditLog, nil
}
