package query

import (
	"context"
	"errors"

	"go.uber.org/zap"
	"overdoll/applications/parley/src/domain/infraction"
	"overdoll/libraries/paging"
)

var (
	errFailedGetRejectionReasons = errors.New("get rejection reasons failed")
)

type PostsRejectionReasonsHandler struct {
	ir  infraction.Repository
	eva EvaService
}

func NewPendingPostsRejectionReasonsHandler(ir infraction.Repository, eva EvaService) PostsRejectionReasonsHandler {
	return PostsRejectionReasonsHandler{ir: ir, eva: eva}
}

func (h PostsRejectionReasonsHandler) Handle(ctx context.Context, cursor *paging.Cursor, accountId string) ([]*infraction.PostRejectionReason, *paging.Info, error) {
	// Get account to perform permission checks
	acc, err := h.eva.GetAccount(ctx, accountId)

	if err != nil {
		zap.S().Errorf("failed to get user: %s", err)
		return nil, nil, errFailedGetRejectionReasons
	}

	if !acc.IsModerator() {
		return nil, nil, errFailedGetRejectionReasons
	}

	reasons, page, err := h.ir.GetPostRejectionReasons(ctx, cursor)

	if err != nil {
		zap.S().Errorf("failed to get rejection reasons: %s", err)
		return nil, nil, errFailedGetRejectionReasons
	}

	return reasons, page, nil
}
