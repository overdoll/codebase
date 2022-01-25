package command

import (
	"context"
	"overdoll/applications/parley/internal/domain/post_audit_log"

	"github.com/pkg/errors"
	"overdoll/libraries/principal"
)

type ApprovePost struct {
	Principal *principal.Principal
	PostId    string
}

type ApprovePostHandler struct {
	pr    post_audit_log.Repository
	eva   EvaService
	sting StingService
}

func NewApprovePostHandler(pr post_audit_log.Repository, eva EvaService, sting StingService) ApprovePostHandler {
	return ApprovePostHandler{sting: sting, eva: eva, pr: pr}
}

func (h ApprovePostHandler) Handle(ctx context.Context, cmd ApprovePost) (*post_audit_log.PostAuditLog, error) {

	postModeratorId, _, err := h.sting.GetPost(ctx, cmd.PostId)

	if err != nil {
		return nil, errors.Wrap(err, "failed to get post")
	}

	// create new audit log - all necessary permission checks will be performed
	postAuditLog, err := post_audit_log.NewApprovePostAuditLog(
		cmd.Principal,
		cmd.PostId,
		postModeratorId,
	)

	if err != nil {
		return nil, err
	}

	// create audit log record
	if err := h.pr.CreatePostAuditLog(ctx, postAuditLog); err != nil {
		return nil, err
	}

	return postAuditLog, nil
}
