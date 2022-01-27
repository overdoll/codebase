package query

import (
	"context"
	"overdoll/applications/parley/internal/domain/post_audit_log"

	"overdoll/libraries/principal"
)

type PostAuditLogById struct {
	Principal  *principal.Principal
	AuditLogId string
}

type PostAuditLogByIdHandler struct {
	ar post_audit_log.Repository
}

func NewPostAuditLogByIdHandler(ar post_audit_log.Repository) PostAuditLogByIdHandler {
	return PostAuditLogByIdHandler{ar: ar}
}

func (h PostAuditLogByIdHandler) Handle(ctx context.Context, query PostAuditLogById) (*post_audit_log.PostAuditLog, error) {

	auditLog, err := h.ar.GetPostAuditLogById(ctx, query.Principal, query.AuditLogId)

	if err != nil {
		return nil, err
	}

	return auditLog, nil
}
