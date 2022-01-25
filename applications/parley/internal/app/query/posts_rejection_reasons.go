package query

import (
	"context"
	"overdoll/applications/parley/internal/domain/post_audit_log"

	"overdoll/libraries/paging"
	"overdoll/libraries/principal"
)

type PostsRejectionReasons struct {
	Principal  *principal.Principal
	Cursor     *paging.Cursor
	Deprecated bool
}

type PostsRejectionReasonsHandler struct {
	ar  post_audit_log.Repository
	eva EvaService
}

func NewPostsRejectionReasonsHandler(ar post_audit_log.Repository, eva EvaService) PostsRejectionReasonsHandler {
	return PostsRejectionReasonsHandler{ar: ar, eva: eva}
}

func (h PostsRejectionReasonsHandler) Handle(ctx context.Context, query PostsRejectionReasons) ([]*post_audit_log.PostRejectionReason, error) {
	// Get account to perform permission checks

	reasons, err := h.ar.GetPostRejectionReasons(ctx, query.Principal, query.Cursor, query.Deprecated)

	if err != nil {
		return nil, err
	}

	return reasons, nil
}
