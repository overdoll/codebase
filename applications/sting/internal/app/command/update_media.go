package command

import (
	"context"
	"overdoll/applications/sting/internal/domain/club"
	"overdoll/applications/sting/internal/domain/event"
	"overdoll/applications/sting/internal/domain/post"
	"overdoll/libraries/media"
	"overdoll/libraries/media/proto"
)

type UpdateMedia struct {
	Media *media.Media
}

type UpdateMediaHandler struct {
	pr    post.Repository
	cr    club.Repository
	event event.Repository
}

func NewUpdateMediaHandler(pr post.Repository, cr club.Repository, event event.Repository) UpdateMediaHandler {
	return UpdateMediaHandler{pr: pr, cr: cr, event: event}
}

func (h UpdateMediaHandler) Handle(ctx context.Context, cmd UpdateMedia) error {

	sourceId := cmd.Media.LinkedId()

	switch cmd.Media.SourceLinkType() {
	case proto.MediaLinkType_AUDIENCE_BANNER:
		_, err := h.pr.UpdateAudienceBannerOperator(ctx, sourceId, func(aud *post.Audience) error {
			return aud.UpdateBannerExisting(cmd.Media)
		})

		if err != nil {
			return err
		}
		break
	case proto.MediaLinkType_AUDIENCE_THUMBNAIL:
		_, err := h.pr.UpdateAudienceThumbnailOperator(ctx, sourceId, func(aud *post.Audience) error {
			return aud.UpdateThumbnailExisting(cmd.Media)
		})

		if err != nil {
			return err
		}
		break
	case proto.MediaLinkType_CATEGORY_BANNER:
		_, err := h.pr.UpdateCategoryBannerOperator(ctx, sourceId, func(aud *post.Category) error {
			return aud.UpdateBannerExisting(cmd.Media)
		})

		if err != nil {
			return err
		}
		break
	case proto.MediaLinkType_CATEGORY_THUMBNAIL:
		_, err := h.pr.UpdateCategoryThumbnailOperator(ctx, sourceId, func(aud *post.Category) error {
			return aud.UpdateThumbnailExisting(cmd.Media)
		})

		if err != nil {
			return err
		}
		break
	case proto.MediaLinkType_CHARACTER_BANNER:
		_, err := h.pr.UpdateCharacterBannerOperator(ctx, sourceId, func(aud *post.Character) error {
			return aud.UpdateBannerExisting(cmd.Media)
		})

		if err != nil {
			return err
		}
		break
	case proto.MediaLinkType_CHARACTER_THUMBNAIL:
		_, err := h.pr.UpdateCharacterThumbnailOperator(ctx, sourceId, func(aud *post.Character) error {
			return aud.UpdateThumbnailExisting(cmd.Media)
		})

		if err != nil {
			return err
		}
		break
	case proto.MediaLinkType_CLUB_BANNER:
		_, err := h.cr.UpdateClubBanner(ctx, sourceId, func(aud *club.Club) error {
			return aud.UpdateBannerExisting(cmd.Media)
		})

		if err != nil {
			return err
		}
		break
	case proto.MediaLinkType_CLUB_THUMBNAIL:
		_, err := h.cr.UpdateClubThumbnail(ctx, sourceId, func(aud *club.Club) error {
			return aud.UpdateThumbnailExisting(cmd.Media)
		})

		if err != nil {
			return err
		}
		break
	case proto.MediaLinkType_POST_CONTENT:
		pst, err := h.pr.UpdatePostContentOperatorMedia(ctx, sourceId, []*media.Media{cmd.Media})

		if err != nil {
			return err
		}

		if cmd.Media.IsLinked() {
			// send a callback to say that the pixelated resource generation was complete, so we can proceed with post submission
			if err := h.event.SendCompletedPixelatedResources(ctx, pst, cmd.Media); err != nil {
				return err
			}
		} else {
			// send callback to say the processing was completed for this media piece
			if err := h.event.SendPostCompletedProcessing(ctx, pst, cmd.Media); err != nil {
				return err
			}
		}

		break
	case proto.MediaLinkType_TOPIC_BANNER:
		_, err := h.pr.UpdateTopicBannerOperator(ctx, sourceId, func(aud *post.Topic) error {
			return aud.UpdateBannerExisting(cmd.Media)
		})

		if err != nil {
			return err
		}
		break
	case proto.MediaLinkType_SERIES_BANNER:
		_, err := h.pr.UpdateSeriesBannerOperator(ctx, sourceId, func(aud *post.Series) error {
			return aud.UpdateBannerExisting(cmd.Media)
		})

		if err != nil {
			return err
		}
		break
	case proto.MediaLinkType_SERIES_THUMBNAIL:
		_, err := h.pr.UpdateSeriesThumbnailOperator(ctx, sourceId, func(aud *post.Series) error {
			return aud.UpdateThumbnailExisting(cmd.Media)
		})

		if err != nil {
			return err
		}
		break
	}

	return nil
}
