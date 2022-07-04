package command

import (
	"context"
	"overdoll/applications/sting/internal/domain/club"
	"overdoll/applications/sting/internal/domain/post"
	"overdoll/libraries/resource"
)

type UpdateResources struct {
	Resources []*resource.Resource
}

type UpdateResourcesHandler struct {
	pr post.Repository
	cr club.Repository
}

func NewUpdateResourcesHandler(pr post.Repository, cr club.Repository) UpdateResourcesHandler {
	return UpdateResourcesHandler{pr: pr, cr: cr}
}

func (h UpdateResourcesHandler) Handle(ctx context.Context, cmd UpdateResources) error {

	groupedByTokenAndId := make(map[string]map[string][]*resource.Resource)

	for _, res := range cmd.Resources {
		_, ok := groupedByTokenAndId[res.Token()]

		if !ok {
			groupedByTokenAndId[res.Token()] = make(map[string][]*resource.Resource)
			groupedByTokenAndId[res.Token()][res.ItemId()] = []*resource.Resource{res}
		} else {
			value, ok := groupedByTokenAndId[res.Token()][res.ItemId()]

			if !ok {
				groupedByTokenAndId[res.Token()][res.ItemId()] = []*resource.Resource{res}
			} else {
				groupedByTokenAndId[res.Token()][res.ItemId()] = append(value, res)
			}
		}
	}

	for token, value := range groupedByTokenAndId {
		switch token {
		case "POST":
			for itemId, resources := range value {
				_, err := h.pr.UpdatePostContentOperator(ctx, itemId, func(pending *post.Post) error {
					return pending.UpdateContentExisting(resources)
				})

				if err != nil {
					return err
				}
			}
			break
		case "POST_PRIVATE_CONTENT":
			for itemId, resources := range value {
				_, err := h.pr.UpdatePostContentOperator(ctx, itemId, func(pending *post.Post) error {
					return pending.UpdateContentExisting(resources)
				})

				if err != nil {
					return err
				}
			}
			break
		case "AUDIENCE":
			for itemId, resources := range value {
				_, err := h.pr.UpdateAudienceThumbnailOperator(ctx, itemId, func(aud *post.Audience) error {
					return aud.UpdateThumbnailExisting(resources[0])
				})

				if err != nil {
					return err
				}
			}
			break
		case "AUDIENCE_BANNER":
			for itemId, resources := range value {
				_, err := h.pr.UpdateAudienceBannerOperator(ctx, itemId, func(aud *post.Audience) error {
					return aud.UpdateBannerExisting(resources[0])
				})

				if err != nil {
					return err
				}
			}
			break
		case "CATEGORY":
			for itemId, resources := range value {
				_, err := h.pr.UpdateCategoryThumbnailOperator(ctx, itemId, func(aud *post.Category) error {
					return aud.UpdateThumbnailExisting(resources[0])
				})

				if err != nil {
					return err
				}
			}
			break
		case "CATEGORY_BANNER":
			for itemId, resources := range value {
				_, err := h.pr.UpdateCategoryBannerOperator(ctx, itemId, func(aud *post.Category) error {
					return aud.UpdateBannerExisting(resources[0])
				})

				if err != nil {
					return err
				}
			}
			break
		case "SERIES":
			for itemId, resources := range value {
				_, err := h.pr.UpdateSeriesThumbnailOperator(ctx, itemId, func(aud *post.Series) error {
					return aud.UpdateThumbnailExisting(resources[0])
				})

				if err != nil {
					return err
				}
			}
			break
		case "SERIES_BANNER":
			for itemId, resources := range value {
				_, err := h.pr.UpdateSeriesBannerOperator(ctx, itemId, func(aud *post.Series) error {
					return aud.UpdateBannerExisting(resources[0])
				})

				if err != nil {
					return err
				}
			}
			break
		case "CHARACTER":
			for itemId, resources := range value {
				_, err := h.pr.UpdateCharacterThumbnailOperator(ctx, itemId, func(aud *post.Character) error {
					return aud.UpdateThumbnailExisting(resources[0])
				})

				if err != nil {
					return err
				}
			}
			break
		case "CHARACTER_BANNER":
			for itemId, resources := range value {
				_, err := h.pr.UpdateCharacterBannerOperator(ctx, itemId, func(aud *post.Character) error {
					return aud.UpdateBannerExisting(resources[0])
				})

				if err != nil {
					return err
				}
			}
			break
		case "CLUB":
			for itemId, resources := range value {
				_, err := h.cr.UpdateClubThumbnail(ctx, itemId, func(aud *club.Club) error {
					return aud.UpdateThumbnailExisting(resources[0])
				})

				if err != nil {
					return err
				}
			}
			break
		case "CLUB_BANNER":
			for itemId, resources := range value {
				_, err := h.cr.UpdateClubBanner(ctx, itemId, func(aud *club.Club) error {
					return aud.UpdateBannerExisting(resources[0])
				})

				if err != nil {
					return err
				}
			}
			break
		}

	}

	return nil
}
