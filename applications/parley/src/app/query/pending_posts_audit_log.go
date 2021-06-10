package query

import (
	"context"
	"errors"

	"go.uber.org/zap"
	"overdoll/applications/parley/src/domain/infraction"
	"overdoll/applications/parley/src/domain/moderator"
)

var (
	ErrFailedGetPendingPostsAuditLog = errors.New("get audit log failed")
)

type PendingPostsAuditLogHandler struct {
	ir infraction.Repository
	mr moderator.Repository

	eva EvaService
}

func NewPendingPostsAuditLogHandler(ir infraction.Repository, eva EvaService, mr moderator.Repository) PendingPostsAuditLogHandler {
	return PendingPostsAuditLogHandler{ir: ir, eva: eva, mr: mr}
}

func (h PendingPostsAuditLogHandler) Handle(ctx context.Context, userId string, moderatorId string) ([]*infraction.PendingPostAuditLog, error) {

	// user requesting to see audit log
	usr, err := h.eva.GetUser(ctx, userId)

	if err != nil {
		zap.S().Errorf("failed to get user: %s", err)
		return nil, ErrFailedGetRejectionReasons
	}

	// have to have moderator role
	if !usr.IsModerator() {
		return nil, ErrFailedGetRejectionReasons
	}

	moderatorQuery := userId

	// if staff, allow to query by moderatorID - otherwise we use the currently logged in user's id
	if usr.IsStaff() && moderatorId != "" {
		moderatorQuery = moderatorId
	}

	auditLogs, err := h.ir.GetPendingPostAuditLogByModerator(ctx, moderatorQuery)

	if err != nil {
		zap.S().Errorf("failed to get rejection reasons: %s", err)
		return nil, ErrFailedGetRejectionReasons
	}

	return auditLogs, nil
}
