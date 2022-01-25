package query

import (
	"context"
	"overdoll/applications/parley/internal/domain/post_audit_log"

	"overdoll/applications/parley/internal/domain/club_infraction"
	"overdoll/libraries/principal"
)

type PostRejectionReasonById struct {
	Principal         *principal.Principal
	RejectionReasonId string
}

type PostRejectionReasonByIdHandler struct {
	ir club_infraction.Repository
}

func NewPostsRejectionReasonByIdHandler(ir club_infraction.Repository) PostRejectionReasonByIdHandler {
	return PostRejectionReasonByIdHandler{ir: ir}
}

func (h PostRejectionReasonByIdHandler) Handle(ctx context.Context, query PostRejectionReasonById) (*post_audit_log.PostRejectionReason, error) {

	reason, err := h.ir.GetPostRejectionReason(ctx, query.Principal, query.RejectionReasonId)

	if err != nil {
		return nil, err
	}

	return reason, nil
}
