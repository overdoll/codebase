package command

import (
	"context"
	"go.uber.org/zap"
	"overdoll/applications/sting/internal/domain/post"
	"overdoll/libraries/media"
)

type ReprocessPostsMedia struct {
	PostId string
	ClubId string
}

type ReprocessPostsMediaHandler struct {
	pr     post.Repository
	loader LoaderService
}

func NewReprocessPostsMediaHandler(pr post.Repository, loader LoaderService) ReprocessPostsMediaHandler {
	return ReprocessPostsMediaHandler{pr: pr, loader: loader}
}

func (h ReprocessPostsMediaHandler) Handle(ctx context.Context, cmd ReprocessPostsMedia) error {

	if cmd.PostId != "" {
		pst, err := h.pr.GetPostByIdOperator(ctx, cmd.PostId)
		if err != nil {
			return err
		}
		var content []*media.Media
		for _, pst := range pst.Content() {
			content = append(content, pst.Media())
			if pst.MediaHidden() != nil {
				content = append(content, pst.MediaHidden())
			}
		}

		if len(content) == 0 {
			return nil
		}

		if err := h.loader.ReprocessMedia(ctx, content); err != nil {
			return nil
		}

		zap.S().Infow("reprocessed post", zap.String("id", cmd.PostId))
	}

	return nil

	return h.pr.ScanPosts(ctx, cmd.ClubId, cmd.PostId, func(post *post.Post) error {

		var content []*media.Media

		for _, pst := range post.Content() {
			if !pst.Media().IsLegacy() && pst.Media().HasAudio() {
				content = append(content, pst.Media())
			}
			if pst.MediaHidden() != nil && !pst.MediaHidden().IsLegacy() && pst.Media().HasAudio() {
				content = append(content, pst.MediaHidden())
			}
		}

		if len(content) == 0 {
			return nil
		}

		if err := h.loader.ReprocessMedia(ctx, content); err != nil {
			return nil
		}

		zap.S().Infow("reprocessed posts", zap.String("id", post.ID()))

		return nil
	})
}
