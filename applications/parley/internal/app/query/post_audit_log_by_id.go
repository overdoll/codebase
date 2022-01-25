package query

import (
	"context"
	"overdoll/applications/parley/internal/domain/post_audit_log"

	"overdoll/applications/parley/internal/domain/club_infraction"
	"overdoll/libraries/principal"
)

type PostAuditLogById struct {
	Principal *principal.Principal

	AuditLogId string
}

type PostAuditLogByIdHandler struct {
	ir club_infraction.Repository
}

func NewPostAuditLogByIdHandler(ir club_infraction.Repository) PostAuditLogByIdHandler {
	return PostAuditLogByIdHandler{ir: ir}
}

func (h PostAuditLogByIdHandler) Handle(ctx context.Context, query PostAuditLogById) (*post_audit_log.PostAuditLog, error) {

	auditLog, err := h.ir.GetPostAuditLog(ctx, query.Principal, query.AuditLogId)

	if err != nil {
		return nil, err
	}

	return auditLog, nil
}
