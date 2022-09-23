package command

import (
	"context"
	"overdoll/applications/sting/internal/domain/post"
	"overdoll/libraries/media"
	"overdoll/libraries/principal"
)

type UpdateTopicBanner struct {
	Principal *principal.Principal
	TopicId   string
	Banner    string
}

type UpdateTopicBannerHandler struct {
	pr     post.Repository
	loader LoaderService
}

func NewUpdateTopicBannerHandler(pr post.Repository, loader LoaderService) UpdateTopicBannerHandler {
	return UpdateTopicBannerHandler{pr: pr, loader: loader}
}

func (h UpdateTopicBannerHandler) Handle(ctx context.Context, cmd UpdateTopicBanner) (*post.Topic, error) {

	topic, err := h.pr.UpdateTopicBanner(ctx, cmd.Principal, cmd.TopicId, func(topic *post.Topic) error {

		// create resources from content
		resourceIds, err := h.loader.ProcessMediaFromUploads(ctx, []string{cmd.Banner}, media.NewTopicBannerMediaLink(cmd.TopicId))

		if err != nil {
			return err
		}

		return topic.UpdateBanner(cmd.Principal, resourceIds[0])
	})

	if err != nil {
		return nil, err
	}

	return topic, nil
}
