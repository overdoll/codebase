package activities

import (
	"context"
	"github.com/pkg/errors"
)

func (h *Activities) RemovePost(ctx context.Context, postAuditLogId string) (bool, error) {

	postAuditLog, err := h.pr.GetPostAuditLogByIdOperator(ctx, postAuditLogId)

	if err != nil {
		return false, err
	}

	if err := h.sting.RemovePost(ctx, postAuditLog.PostID()); err != nil {
		return false, errors.Wrap(err, "failed to remove post")
	}

	return postAuditLog.RejectionReason().IsInfraction(), nil
}
