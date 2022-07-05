package command

import (
	"context"
	"overdoll/applications/sting/internal/domain/event"
	"overdoll/applications/sting/internal/domain/post"
)

type GenerateClubBanner struct {
	PostId string
}

type GenerateClubBannerHandler struct {
	pr    post.Repository
	event event.Repository
}

func NewGenerateClubBannerHandler(pr post.Repository, event event.Repository) GenerateClubBannerHandler {
	return GenerateClubBannerHandler{pr: pr, event: event}
}

func (h GenerateClubBannerHandler) Handle(ctx context.Context, cmd GenerateClubBanner) error {

	pst, err := h.pr.GetPostByIdOperator(ctx, cmd.PostId)

	if err != nil {
		return err
	}

	if err := h.event.GenerateClubBannerFromPost(ctx, pst); err != nil {
		return err
	}

	return nil
}
