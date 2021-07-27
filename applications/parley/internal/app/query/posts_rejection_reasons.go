package query

import (
	"context"

	"github.com/pkg/errors"
	"overdoll/applications/parley/internal/domain/infraction"
	"overdoll/libraries/paging"
)

type PostsRejectionReasons struct {
	AccountId string
	Cursor    *paging.Cursor
}

type PostsRejectionReasonsHandler struct {
	ir  infraction.Repository
	eva EvaService
}

func NewPendingPostsRejectionReasonsHandler(ir infraction.Repository, eva EvaService) PostsRejectionReasonsHandler {
	return PostsRejectionReasonsHandler{ir: ir, eva: eva}
}

func (h PostsRejectionReasonsHandler) Handle(ctx context.Context, query PostsRejectionReasons) ([]*infraction.PostRejectionReason, error) {
	// Get account to perform permission checks
	acc, err := h.eva.GetAccount(ctx, query.AccountId)

	if err != nil {
		return nil, errors.Wrap(err, "failed to get account")
	}

	if !acc.IsModerator() {
		return nil, errors.New("not moderator")
	}

	reasons, err := h.ir.GetPostRejectionReasons(ctx, query.Cursor)

	if err != nil {
		return nil, err
	}

	return reasons, nil
}
