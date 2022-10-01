package command

import (
	"context"
	"go.uber.org/zap"
	"overdoll/applications/sting/internal/domain/post"
	"overdoll/libraries/media"
)

type MigratePostsResources struct {
	PostId string
	ClubId string
}

type MigratePostsResourcesHandler struct {
	pr     post.Repository
	loader LoaderService
}

func NewMigratePostsResourcesHandler(pr post.Repository, loader LoaderService) MigratePostsResourcesHandler {
	return MigratePostsResourcesHandler{pr: pr, loader: loader}
}

func (h MigratePostsResourcesHandler) Handle(ctx context.Context, cmd MigratePostsResources) error {
	return h.pr.ScanPosts(ctx, cmd.ClubId, cmd.PostId, func(post *post.Post) error {

		var content []*media.Media

		for _, pst := range post.Content() {
			if pst.Media().IsLegacy() {
				content = append(content, pst.Media())
			}

			// only convert hidden media if it's not legacy
			if pst.MediaHidden() != nil && !pst.Media().IsLegacy() {
				content = append(content, pst.MediaHidden())
			}
		}

		newMedia, err := h.loader.ConvertResourcesToMedia(ctx, post.ID(), content)

		if err != nil {
			return err
		}

		err = h.pr.UpdatePostContentOperatorMedia(ctx, post.ID(), newMedia)

		if err != nil {
			return err
		}

		zap.S().Infow("migrated posts banner", zap.String("id", post.ID()))

		return nil
	})
}
