package command

import (
	"context"

	"github.com/pkg/errors"
	"overdoll/applications/parley/internal/domain/infraction"
	"overdoll/libraries/principal"
)

type RemovePost struct {
	Principal             *principal.Principal
	PostId                string
	PostRejectionReasonId string
	Notes                 *string
}

type RemovePostHandler struct {
	ir    infraction.Repository
	eva   EvaService
	sting StingService
}

func NewRemovePostHandler(ir infraction.Repository, eva EvaService, sting StingService) RemovePostHandler {
	return RemovePostHandler{sting: sting, eva: eva, ir: ir}
}

func (h RemovePostHandler) Handle(ctx context.Context, cmd RemovePost) (*infraction.PostAuditLog, error) {

	// Get pending post
	_, postContributorId, err := h.sting.GetPost(ctx, cmd.PostId)

	if err != nil {
		return nil, errors.Wrap(err, "failed to get post")
	}

	rejectionReason, err := h.ir.GetPostRejectionReason(ctx, cmd.Principal, cmd.PostRejectionReasonId)

	if err != nil {
		return nil, err
	}

	// remove post
	// post removal doesn't result in any infractions (for now)
	infractionAuditLog, err := infraction.NewRemovePostAuditLog(
		cmd.Principal,
		cmd.PostId,
		postContributorId,
		rejectionReason,
		cmd.Notes,
	)

	if err != nil {
		return nil, err
	}

	if err := h.sting.RemovePost(ctx, cmd.PostId); err != nil {
		return nil, errors.Wrap(err, "failed to remove post")
	}

	// create audit log record
	if err := h.ir.CreatePostAuditLog(ctx, infractionAuditLog); err != nil {
		return nil, err
	}

	return infractionAuditLog, nil
}
