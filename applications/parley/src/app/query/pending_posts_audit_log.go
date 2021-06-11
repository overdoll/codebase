package query

import (
	"context"
	"errors"

	"go.uber.org/zap"
	"overdoll/applications/parley/src/domain/infraction"
)

var (
	ErrFailedGetPendingPostsAuditLog = errors.New("get audit log failed")
)

type PendingPostsAuditLogHandler struct {
	ir infraction.Repository

	eva EvaService
}

func NewPendingPostsAuditLogHandler(ir infraction.Repository, eva EvaService) PendingPostsAuditLogHandler {
	return PendingPostsAuditLogHandler{ir: ir, eva: eva}
}

func (h PendingPostsAuditLogHandler) Handle(ctx context.Context, userId string, moderatorId string) ([]*infraction.PendingPostAuditLog, error) {

	// user requesting to see audit log
	usr, err := h.eva.GetUser(ctx, userId)

	if err != nil {
		zap.S().Errorf("failed to get user: %s", err)
		return nil, ErrFailedGetPendingPostsAuditLog
	}

	// have to have moderator role
	if !usr.IsModerator() {
		return nil, ErrFailedGetPendingPostsAuditLog
	}

	moderatorQuery := userId

	// if staff, allow to query by moderatorID - otherwise we use the currently logged in user's id
	if usr.IsStaff() && moderatorId != "" {
		moderatorQuery = moderatorId
	}

	auditLogs, err := h.ir.GetPendingPostAuditLogByModerator(ctx, moderatorQuery)

	if err != nil {
		zap.S().Errorf("failed to get audit log: %s", err)
		return nil, ErrFailedGetPendingPostsAuditLog
	}

	return auditLogs, nil
}
