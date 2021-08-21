package query

import (
	"context"

	"overdoll/applications/parley/internal/domain/infraction"
	"overdoll/libraries/principal"
)

type PostRejectionReasonById struct {
	Principal         *principal.Principal
	RejectionReasonId string
}

type PostRejectionReasonByIdHandler struct {
	ir infraction.Repository
}

func NewPostsRejectionReasonByIdHandler(ir infraction.Repository) PostRejectionReasonByIdHandler {
	return PostRejectionReasonByIdHandler{ir: ir}
}

func (h PostRejectionReasonByIdHandler) Handle(ctx context.Context, query PostRejectionReasonById) (*infraction.PostRejectionReason, error) {

	reason, err := h.ir.GetPostRejectionReason(ctx, query.Principal, query.RejectionReasonId)

	if err != nil {
		return nil, err
	}

	return reason, nil
}
