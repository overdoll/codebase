package activities

import (
	"context"
	"github.com/pkg/errors"
)

func (h *Activities) PublishPost(ctx context.Context, postAuditLogId string) error {

	postAuditLog, err := h.pr.GetPostAuditLogByIdOperator(ctx, postAuditLogId)

	if err != nil {
		return err
	}

	// post approved
	if err := h.sting.PublishPost(ctx, postAuditLog.PostId()); err != nil {
		return errors.Wrap(err, "failed to publish post")
	}

	return nil
}
