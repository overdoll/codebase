package command

import (
	"context"

	"github.com/pkg/errors"
	"overdoll/applications/parley/internal/domain/infraction"
	"overdoll/libraries/principal"
)

type ApprovePost struct {
	Principal *principal.Principal
	PostId    string
}

type ApprovePostHandler struct {
	ir    infraction.Repository
	eva   EvaService
	sting StingService
}

func NewApprovePostHandler(ir infraction.Repository, eva EvaService, sting StingService) ApprovePostHandler {
	return ApprovePostHandler{sting: sting, eva: eva, ir: ir}
}

func (h ApprovePostHandler) Handle(ctx context.Context, cmd ApprovePost) (*infraction.PostAuditLog, error) {

	// Get pending post
	postModeratorId, postContributorId, err := h.sting.GetPost(ctx, cmd.PostId)

	if err != nil {
		return nil, errors.Wrap(err, "failed to get post")
	}

	// create new audit log - all necessary permission checks will be performed
	infractionAuditLog, err := infraction.NewApprovePostAuditLog(
		cmd.Principal,
		cmd.PostId,
		postModeratorId,
		postContributorId,
	)

	if err != nil {
		return nil, err
	}

	// post approved
	if err := h.sting.PublishPost(ctx, cmd.PostId); err != nil {
		return nil, errors.Wrap(err, "failed to publish post")
	}

	// create audit log record
	if err := h.ir.CreatePostAuditLog(ctx, infractionAuditLog); err != nil {
		return nil, err
	}

	return infractionAuditLog, nil
}
