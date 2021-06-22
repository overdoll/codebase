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

type PendingPostsAuditLogByModeratorHandler struct {
	ir infraction.Repository

	eva EvaService
}

func NewPendingPostsAuditLogByModeratorHandler(ir infraction.Repository, eva EvaService) PendingPostsAuditLogByModeratorHandler {
	return PendingPostsAuditLogByModeratorHandler{ir: ir, eva: eva}
}

func (h PendingPostsAuditLogByModeratorHandler) Handle(ctx context.Context, moderatorId, contributorId, postId string, dateRange []int, userId string) ([]*infraction.PendingPostAuditLog, error) {

	// user requesting to see audit log
	usr, err := h.eva.GetUser(ctx, userId)

	if err != nil {
		zap.S().Errorf("failed to get user: %s", err)
		return nil, ErrFailedGetPendingPostsAuditLog
	}

	// have to have moderator role
	if !usr.IsModerator() || usr.IsLocked() {
		return nil, ErrFailedGetPendingPostsAuditLog
	}

	moderatorQuery := userId

	// if staff, allow to query by moderatorID - otherwise we use the currently logged in user's id
	if usr.IsStaff() && moderatorId != "" {
		moderatorQuery = moderatorId
	}

	filters, err := infraction.NewPendingPostAuditLogFilters(moderatorQuery, contributorId, postId, dateRange)

	if err != nil {
		return nil, err
	}

	auditLogs, err := h.ir.GetPendingPostAuditLogByModerator(ctx, filters)

	if err != nil {
		zap.S().Errorf("failed to get audit log: %s", err)
		return nil, ErrFailedGetPendingPostsAuditLog
	}

	return auditLogs, nil
}
