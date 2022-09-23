package post

import (
	"github.com/go-playground/validator/v10"
	"overdoll/libraries/errors/domainerror"
	"overdoll/libraries/media"
	"overdoll/libraries/principal"
	"overdoll/libraries/uuid"
	"time"

	"overdoll/libraries/localization"
	"overdoll/libraries/paging"
)

var (
	ErrCategorySlugNotUnique = domainerror.NewValidation("category slug is not unique")
)

type Category struct {
	*paging.Node

	id   string
	slug string

	topicId *string

	title             *localization.Translation
	alternativeTitles []*localization.LocalizedDataTag

	thumbnailMedia *media.Media
	bannerMedia    *media.Media

	totalLikes int
	totalPosts int

	createdAt time.Time
	updatedAt time.Time
}

func NewCategory(requester *principal.Principal, slug, title string, topic *Topic) (*Category, error) {

	if !requester.IsStaff() {
		return nil, principal.ErrNotAuthorized
	}

	if requester.IsLocked() {
		return nil, principal.ErrLocked
	}

	lc, err := localization.NewDefaultTranslation(title)

	if err != nil {
		return nil, err
	}

	if err := validateCategoryTitle(title); err != nil {
		return nil, err
	}

	if err := validateSlug(slug); err != nil {
		return nil, err
	}

	var topicId *string

	if topic != nil {
		id := topic.ID()
		topicId = &id
	}

	return &Category{
		id:         uuid.New().String(),
		slug:       slug,
		title:      lc,
		topicId:    topicId,
		totalLikes: 0,
		totalPosts: 0,
		createdAt:  time.Now(),
		updatedAt:  time.Now(),
	}, nil
}

func (c *Category) ID() string {
	return c.id
}

func (c *Category) Slug() string {
	return c.slug
}

func (c *Category) TopicId() *string {
	return c.topicId
}

func (c *Category) Title() *localization.Translation {
	return c.title
}

func (c *Category) AlternativeTitles() []*localization.LocalizedDataTag {
	return c.alternativeTitles
}

func (c *Category) ThumbnailMedia() *media.Media {
	return c.thumbnailMedia
}

func (c *Category) BannerMedia() *media.Media {
	return c.bannerMedia
}

func (c *Category) TotalLikes() int {
	return c.totalLikes
}

func (c *Category) TotalPosts() int {
	return c.totalPosts
}

func (c *Category) CreatedAt() time.Time {
	return c.createdAt
}

func (c *Category) UpdatedAt() time.Time {
	return c.updatedAt
}

func (c *Category) update() {
	c.updatedAt = time.Now()
}

func (c *Category) UpdateTotalPosts(totalPosts int) error {
	c.totalPosts = totalPosts
	c.update()
	return nil
}

func (c *Category) UpdateTotalLikes(totalLikes int) error {
	c.totalLikes = totalLikes
	c.update()
	return nil
}

func (c *Category) UpdateTopic(requester *principal.Principal, topic *Topic) error {

	if err := c.canUpdate(requester); err != nil {
		return err
	}

	id := topic.ID()

	c.topicId = &id
	c.update()

	return nil
}

func (c *Category) AddAlternativeTitle(requester *principal.Principal, title, locale string) error {

	if err := c.canUpdate(requester); err != nil {
		return err
	}

	if err := validateCategoryTitle(title); err != nil {
		return err
	}

	translation, err := localization.NewLocalizedDataTag(title, locale)

	if err != nil {
		return err
	}

	c.alternativeTitles = append(c.alternativeTitles, translation)

	c.update()

	return nil
}

func (c *Category) RemoveAlternativeTitle(requester *principal.Principal, title string) error {

	if err := c.canUpdate(requester); err != nil {
		return err
	}

	var alternativeTitles []*localization.LocalizedDataTag

	for _, titles := range c.alternativeTitles {
		if titles.Data() != title {
			alternativeTitles = append(alternativeTitles, titles)
		}
	}

	c.alternativeTitles = alternativeTitles

	c.update()

	return nil
}

func (c *Category) UpdateTitle(requester *principal.Principal, title, locale string) error {

	if err := c.canUpdate(requester); err != nil {
		return err
	}

	if err := validateCategoryTitle(title); err != nil {
		return err
	}

	if err := c.title.UpdateTranslation(title, locale); err != nil {
		return err
	}
	c.update()

	return nil
}

func (c *Category) UpdateThumbnail(requester *principal.Principal, thumbnail *media.Media) error {

	if err := c.canUpdate(requester); err != nil {
		return err
	}

	c.thumbnailMedia = thumbnail

	return nil
}

func (c *Category) UpdateThumbnailExisting(thumbnail *media.Media) error {

	if err := validateExistingResource(c.thumbnailMedia, thumbnail); err != nil {
		return err
	}

	c.thumbnailMedia = thumbnail
	c.update()

	return nil
}

func (c *Category) UpdateBannerExisting(thumbnail *media.Media) error {

	if err := validateExistingResource(c.bannerMedia, thumbnail); err != nil {
		return err
	}

	c.bannerMedia = thumbnail
	c.update()

	return nil
}

func (c *Category) UpdateBanner(thumbnail *media.Media) error {

	c.bannerMedia = thumbnail
	c.update()

	return nil
}

func (c *Category) canUpdate(requester *principal.Principal) error {

	if !requester.IsStaff() {
		return principal.ErrNotAuthorized
	}

	if requester.IsLocked() {
		return principal.ErrLocked
	}

	return nil
}

func UnmarshalCategoryFromDatabase(id, slug string, title map[string]string, thumbnail, banner *media.Media, totalLikes, totalPosts int, createdAt, updatedAt time.Time, topicId *string, alternativeTitles []map[string]string) *Category {
	return &Category{
		id:                id,
		slug:              slug,
		title:             localization.UnmarshalTranslationFromDatabase(title),
		alternativeTitles: localization.UnmarshalLocalizedDataTagsFromDatabase(alternativeTitles),
		thumbnailMedia:    thumbnail,
		bannerMedia:       banner,
		totalLikes:        totalLikes,
		totalPosts:        totalPosts,
		createdAt:         createdAt,
		updatedAt:         updatedAt,
		topicId:           topicId,
	}
}

func validateCategoryTitle(name string) error {

	err := validator.New().Var(name, "required,max=25")

	if err != nil {
		return domainerror.NewValidation(err.Error())
	}

	return nil
}
