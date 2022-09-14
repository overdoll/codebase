package post

import (
	"github.com/go-playground/validator/v10"
	"overdoll/applications/sting/internal/domain/club"
	"overdoll/libraries/errors/domainerror"
	"overdoll/libraries/media"
	"overdoll/libraries/principal"
	"overdoll/libraries/uuid"
	"time"

	"overdoll/libraries/localization"
	"overdoll/libraries/paging"
)

var (
	ErrCharacterSlugNotUnique = domainerror.NewValidation("character slug is not unique")
)

type Character struct {
	*paging.Node

	id             string
	slug           string
	name           *localization.Translation
	thumbnailMedia *media.Media
	bannerMedia    *media.Media
	series         *Series
	clubId         *string

	totalLikes int
	totalPosts int

	createdAt time.Time
	updatedAt time.Time
}

func NewCharacter(requester *principal.Principal, slug, name string, series *Series, club *club.Club) (*Character, error) {

	if requester.IsLocked() {
		return nil, principal.ErrLocked
	}

	if series != nil {
		if !requester.IsStaff() {
			return nil, principal.ErrNotAuthorized
		}
	}

	if club != nil {

		if !club.CharactersEnabled() {
			return nil, domainerror.NewValidation("characters are not enabled for this club")
		}

		if !requester.IsWorker() {
			if err := requester.CheckClubOwner(club.ID()); err != nil {
				return nil, err
			}
		}
	}

	lc, err := localization.NewDefaultTranslation(name)

	if err != nil {
		return nil, err
	}

	if err := validateCharacterName(name); err != nil {
		return nil, err
	}

	if err := validateSlug(slug); err != nil {
		return nil, err
	}

	var clubId *string

	if club != nil {
		id := club.ID()
		clubId = &id
	}

	return &Character{
		id:         uuid.New().String(),
		slug:       slug,
		name:       lc,
		series:     series,
		clubId:     clubId,
		totalLikes: 0,
		totalPosts: 0,
		createdAt:  time.Now(),
		updatedAt:  time.Now(),
	}, nil
}

func (c *Character) ID() string {
	return c.id
}

func (c *Character) Slug() string {
	return c.slug
}

func (c *Character) Name() *localization.Translation {
	return c.name
}

func (c *Character) Series() *Series {
	return c.series
}

func (c *Character) SeriesId() *string {

	if c.series == nil {
		return nil
	}

	id := c.series.ID()
	return &id
}

func (c *Character) ClubId() *string {
	return c.clubId
}

func (c *Character) CreatedAt() time.Time {
	return c.createdAt
}

func (c *Character) UpdatedAt() time.Time {
	return c.updatedAt
}

func (c *Character) update() {
	c.updatedAt = time.Now()
}

func (c *Character) ThumbnailMedia() *media.Media {
	return c.thumbnailMedia
}

func (c *Character) BannerMedia() *media.Media {
	return c.bannerMedia
}

func (c *Character) TotalLikes() int {
	return c.totalLikes
}

func (c *Character) TotalPosts() int {
	return c.totalPosts
}

func (c *Character) UpdateTotalPosts(totalPosts int) error {
	c.totalPosts = totalPosts
	c.update()
	return nil
}

func (c *Character) UpdateTotalLikes(totalLikes int) error {
	c.totalLikes = totalLikes
	c.update()
	return nil
}

func (c *Character) UpdateName(requester *principal.Principal, name, locale string) error {

	if err := c.canUpdate(requester); err != nil {
		return err
	}

	if err := validateCharacterName(name); err != nil {
		return err
	}

	if err := c.name.UpdateTranslation(name, locale); err != nil {
		return err
	}

	c.update()

	return nil
}

func (c *Character) UpdateBannerExisting(thumbnail *media.Media) error {

	if err := validateExistingResource(c.bannerMedia, thumbnail); err != nil {
		return err
	}

	c.bannerMedia = thumbnail

	c.update()

	return nil
}

func (c *Character) UpdateBanner(thumbnail *media.Media) error {

	c.bannerMedia = thumbnail
	c.update()

	return nil
}

func (c *Character) canUpdate(requester *principal.Principal) error {

	if c.clubId != nil {
		if !requester.IsWorker() {
			if err := requester.CheckClubOwner(*c.clubId); err != nil {
				return err
			}
		}
	}

	if c.series != nil {
		if !requester.IsStaff() {
			return principal.ErrNotAuthorized
		}

	}

	if requester.IsLocked() {
		return principal.ErrLocked
	}

	return nil
}

func UnmarshalCharacterFromDatabase(id, slug string, name map[string]string, thumbnail, banner *media.Media, totalLikes, totalPosts int, createdAt, updatedAt time.Time, media *Series, clubId *string) *Character {
	return &Character{
		id:             id,
		slug:           slug,
		name:           localization.UnmarshalTranslationFromDatabase(name),
		thumbnailMedia: thumbnail,
		bannerMedia:    banner,
		series:         media,
		clubId:         clubId,
		totalLikes:     totalLikes,
		totalPosts:     totalPosts,
		createdAt:      createdAt,
		updatedAt:      updatedAt,
	}
}

func validateCharacterName(name string) error {

	err := validator.New().Var(name, "required,max=25")

	if err != nil {
		return domainerror.NewValidation(err.Error())
	}

	return nil
}
