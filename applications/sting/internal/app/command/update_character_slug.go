package command

import (
	"context"
	"overdoll/applications/sting/internal/domain/post"
)

type UpdateCharacterSlug struct {
	CharacterId string
	Slug        string
	KeepOld     bool
}

type UpdateCharacterSlugHandler struct {
	pr post.Repository
}

func NewUpdateCharacterSlugHandler(pr post.Repository) UpdateCharacterSlugHandler {
	return UpdateCharacterSlugHandler{pr: pr}
}

func (h UpdateCharacterSlugHandler) Handle(ctx context.Context, cmd UpdateCharacterSlug) error {
	return nil
}
