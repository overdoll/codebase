package query

import (
	"context"
	"overdoll/applications/parley/internal/domain/post_audit_log"

	"overdoll/libraries/principal"
)

type PostRejectionReasonById struct {
	Principal         *principal.Principal
	RejectionReasonId string
}

type PostRejectionReasonByIdHandler struct {
	ar post_audit_log.Repository
}

func NewPostsRejectionReasonByIdHandler(ar post_audit_log.Repository) PostRejectionReasonByIdHandler {
	return PostRejectionReasonByIdHandler{ar: ar}
}

func (h PostRejectionReasonByIdHandler) Handle(ctx context.Context, query PostRejectionReasonById) (*post_audit_log.PostRejectionReason, error) {

	reason, err := h.ar.GetPostRejectionReasonById(ctx, query.Principal, query.RejectionReasonId)

	if err != nil {
		return nil, err
	}

	return reason, nil
}
