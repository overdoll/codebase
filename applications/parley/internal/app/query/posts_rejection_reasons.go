package query

import (
	"context"

	"overdoll/applications/parley/internal/domain/infraction"
	"overdoll/libraries/paging"
	"overdoll/libraries/principal"
)

type PostsRejectionReasons struct {
	Principal *principal.Principal
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

	reasons, err := h.ir.GetPostRejectionReasons(ctx, query.Principal, query.Cursor)

	if err != nil {
		return nil, err
	}

	return reasons, nil
}
