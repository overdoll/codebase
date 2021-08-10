package command

import (
	"context"

	"overdoll/applications/sting/internal/domain/post"
	"overdoll/libraries/principal"
)

type UpdatePostBrand struct {
	Principal *principal.Principal

	PostId  string
	BrandId string
}

type UpdatePostBrandHandler struct {
	pr post.Repository
	pi post.IndexRepository
}

func NewUpdatePostBrandHandler(pr post.Repository, pi post.IndexRepository) UpdatePostBrandHandler {
	return UpdatePostBrandHandler{pr: pr, pi: pi}
}

func (h UpdatePostBrandHandler) Handle(ctx context.Context, cmd UpdatePostBrand) (*post.Post, error) {

	pendingPost, err := h.pr.UpdatePostBrand(ctx, cmd.Principal, cmd.PostId, func(post *post.Post) error {

		brand, err := h.pr.GetBrandById(ctx, cmd.BrandId)

		if err != nil {
			return err
		}

		return post.UpdateBrandRequest(cmd.Principal, brand)
	})

	if err != nil {
		return nil, err
	}

	// index the post
	if err := h.pi.IndexPost(ctx, pendingPost); err != nil {
		return nil, err
	}

	return pendingPost, nil
}
