package command

import (
	"context"
	"overdoll/applications/sting/internal/domain/event"
	"overdoll/applications/sting/internal/domain/post"
	"time"
)

type GenerateCharacterBanner struct {
	CharacterId string
	PostId      string
	Duration    int64
}

type GenerateCharacterBannerHandler struct {
	pr    post.Repository
	event event.Repository
}

func NewGenerateCharacterBannerHandler(pr post.Repository, event event.Repository) GenerateCharacterBannerHandler {
	return GenerateCharacterBannerHandler{pr: pr, event: event}
}

func (h GenerateCharacterBannerHandler) Handle(ctx context.Context, cmd GenerateCharacterBanner) error {

	character, err := h.pr.GetCharacterById(ctx, cmd.CharacterId)

	if err != nil {
		return err
	}

	var pst *post.Post

	if cmd.PostId != "" {
		pst, err = h.pr.GetPostByIdOperator(ctx, cmd.PostId)

		if err != nil {
			return err
		}
	}

	if err := h.event.GenerateCharacterBanner(ctx, character, pst, time.Duration(cmd.Duration)); err != nil {
		return err
	}

	return nil
}
