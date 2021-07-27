package query

import (
	"context"

	"overdoll/applications/parley/internal/domain/infraction"
)

type PostRejectionReasonById struct {
	RejectionReasonId string
}

type PostRejectionReasonByIdHandler struct {
	ir infraction.Repository
}

func NewPendingPostsRejectionReasonByIdHandler(ir infraction.Repository) PostRejectionReasonByIdHandler {
	return PostRejectionReasonByIdHandler{ir: ir}
}

func (h PostRejectionReasonByIdHandler) Handle(ctx context.Context, query PostRejectionReasonById) (*infraction.PostRejectionReason, error) {

	reason, err := h.ir.GetPostRejectionReason(ctx, query.RejectionReasonId)

	if err != nil {
		return nil, err
	}

	return reason, nil
}
