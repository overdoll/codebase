package activities

import (
	"context"
	"github.com/pkg/errors"
)

func (h *Activities) RejectPost(ctx context.Context, postAuditLogId string) (bool, error) {

	postAuditLog, err := h.pr.GetPostAuditLogByIdOperator(ctx, postAuditLogId)

	if err != nil {
		return false, err
	}

	if postAuditLog.IsDeniedWithInfraction() {
		if err := h.sting.DiscardPost(ctx, postAuditLog.PostID()); err != nil {
			return false, errors.Wrap(err, "failed to discard post")
		}
	} else {
		if err := h.sting.RejectPost(ctx, postAuditLog.PostID()); err != nil {
			return false, errors.Wrap(err, "failed to reject post")
		}
	}

	return postAuditLog.RejectionReason().IsInfraction(), nil
}
