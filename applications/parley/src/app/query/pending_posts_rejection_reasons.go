package query

import (
	"context"
	"errors"

	"go.uber.org/zap"
	"overdoll/applications/parley/src/domain/infraction"
)

var (
	ErrFailedGetRejectionReasons = errors.New("get rejection reasons failed")
)

type PendingPostsRejectionReasonsHandler struct {
	ir infraction.Repository
}

func NewPendingPostsRejectionReasonsHandler(ir infraction.Repository) PendingPostsRejectionReasonsHandler {
	return PendingPostsRejectionReasonsHandler{ir: ir}
}

func (h PendingPostsRejectionReasonsHandler) Handle(ctx context.Context) ([]*infraction.PendingPostRejectionReason, error) {

	reasons, err := h.ir.GetRejectionReasons(ctx)

	if err != nil {
		zap.S().Errorf("failed to get rejection reasons: %s", err)
		return nil, ErrFailedGetRejectionReasons
	}

	return reasons, nil
}
