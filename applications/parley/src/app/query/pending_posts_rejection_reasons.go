package query

import (
	"context"
	"errors"

	"go.uber.org/zap"
	"overdoll/applications/parley/src/domain/infraction"
	"overdoll/libraries/paging"
)

type PendingPostsRejectionReasonsHandler struct {
	ir  infraction.Repository
	eva EvaService
}

func NewPendingPostsRejectionReasonsHandler(ir infraction.Repository, eva EvaService) PendingPostsRejectionReasonsHandler {
	return PendingPostsRejectionReasonsHandler{ir: ir, eva: eva}
}

var (
	ErrFailedGetRejectionReasons = errors.New("get rejection reasons failed")
)

func (h PendingPostsRejectionReasonsHandler) Handle(ctx context.Context, cursor *paging.Cursor, accountId string) ([]*infraction.PendingPostRejectionReason, *paging.Info, error) {
	// Get account to perform permission checks
	acc, err := h.eva.GetAccount(ctx, accountId)

	if err != nil {
		zap.S().Errorf("failed to get user: %s", err)
		return nil, nil, ErrFailedGetRejectionReasons
	}

	if !acc.IsModerator() {
		return nil, nil, ErrFailedGetRejectionReasons
	}

	reasons, page, err := h.ir.GetRejectionReasons(ctx, cursor)

	if err != nil {
		zap.S().Errorf("failed to get rejection reasons: %s", err)
		return nil, nil, ErrFailedGetRejectionReasons
	}

	return reasons, page, nil
}
