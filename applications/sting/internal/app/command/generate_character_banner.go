package command

import (
	"context"
	"overdoll/applications/sting/internal/domain/event"
	"overdoll/applications/sting/internal/domain/post"
	"overdoll/libraries/principal"
	"time"
)

type GenerateCharacterBanner struct {
	Principal *principal.Principal

	CharacterId string
	Duration    int64
}

type GenerateCharacterBannerHandler struct {
	pr    post.Repository
	event event.Repository
}

func NewGenerateCharacterBannerHandler(pr post.Repository, event event.Repository) GenerateCharacterBannerHandler {
	return GenerateCharacterBannerHandler{pr: pr, event: event}
}

func (h GenerateCharacterBannerHandler) Handle(ctx context.Context, cmd GenerateCharacterBanner) (*post.Character, error) {

	character, err := h.pr.GetCharacterById(ctx, cmd.CharacterId)

	if err != nil {
		return nil, err
	}

	if err := h.event.GenerateCharacterBanner(ctx, cmd.Principal, character, time.Duration(cmd.Duration)); err != nil {
		return nil, err
	}

	return character, nil
}
