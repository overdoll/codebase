package command

import (
	"context"
	"overdoll/applications/sting/internal/domain/post"
)

type UpdateAudienceSlug struct {
	AudienceId     string
	Slug           string
	KeepOld        bool
	IgnoreConflict bool
}

type UpdateAudienceSlugHandler struct {
	pr post.Repository
}

func NewUpdateAudienceSlugHandler(pr post.Repository) UpdateAudienceSlugHandler {
	return UpdateAudienceSlugHandler{pr: pr}
}

func (h UpdateAudienceSlugHandler) Handle(ctx context.Context, cmd UpdateAudienceSlug) error {
	return nil
}
