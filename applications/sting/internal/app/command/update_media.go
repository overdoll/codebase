package command

import (
	"context"
	"github.com/pingcap/errors"
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

	switch cmd.Media.LinkType() {
	case proto.MediaLinkType_AUDIENCE_BANNER:
		_, err := h.pr.UpdateAudienceBannerOperator(ctx, sourceId, func(aud *post.Audience) error {
			return aud.UpdateBannerExisting(cmd.Media)
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
	case proto.MediaLinkType_CHARACTER_BANNER:
		_, err := h.pr.UpdateCharacterBannerOperator(ctx, sourceId, func(aud *post.Character) error {
			return aud.UpdateBannerExisting(cmd.Media)
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
	case proto.MediaLinkType_POST_CONTENT:
		if err := h.pr.UpdatePostContentOperatorMedia(ctx, sourceId, []*media.Media{cmd.Media}); err != nil {

			// ignore not found errors
			if errors.IsNotFound(err) {
				return nil
			}

			return err
		}

		if cmd.Media.IsLinked() {
			// send a callback to say that the pixelated resource generation was complete, so we can proceed with post submission
			if err := h.event.SendCompletedPixelatedResources(ctx, sourceId, cmd.Media); err != nil {
				return err
			}
		} else {
			// send callback to say the processing was completed for this media piece
			if err := h.event.SendPostCompletedProcessing(ctx, sourceId, cmd.Media); err != nil {
				return err
			}
		}

		break
	}

	return nil
}
