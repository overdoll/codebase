package query

import (
	"context"
	"errors"

	"go.uber.org/zap"
	"overdoll/applications/parley/src/domain/infraction"
)

var (
	errFailedGetRejectionReasonById = errors.New("get rejection reason failed")
)

type PostRejectionReasonByIdHandler struct {
	ir infraction.Repository
}

func NewPendingPostsRejectionReasonByIdHandler(ir infraction.Repository) PostRejectionReasonByIdHandler {
	return PostRejectionReasonByIdHandler{ir: ir}
}

func (h PostRejectionReasonByIdHandler) Handle(ctx context.Context, id string) (*infraction.PostRejectionReason, error) {

	reason, err := h.ir.GetPostRejectionReason(ctx, id)

	if err != nil {
		zap.S().Errorf("failed to get rejection reasons: %s", err)
		return nil, errFailedGetRejectionReasonById
	}

	return reason, nil
}
