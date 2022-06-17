package post

import (
	"github.com/go-playground/validator/v10"
	"overdoll/libraries/errors/domainerror"
	"overdoll/libraries/principal"
	"overdoll/libraries/resource"
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

	id                string
	slug              string
	title             *localization.Translation
	thumbnailResource *resource.Resource
	totalLikes        int
	totalPosts        int

	createdAt time.Time
	updatedAt time.Time
}

func NewCategory(requester *principal.Principal, slug, title string) (*Category, error) {

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

	return &Category{
		id:                uuid.New().String(),
		slug:              slug,
		title:             lc,
		thumbnailResource: nil,
		totalLikes:        0,
		totalPosts:        0,
		createdAt:         time.Now(),
		updatedAt:         time.Now(),
	}, nil
}

func (c *Category) ID() string {
	return c.id
}

func (c *Category) Slug() string {
	return c.slug
}

func (c *Category) Title() *localization.Translation {
	return c.title
}

func (c *Category) ThumbnailResource() *resource.Resource {
	return c.thumbnailResource
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

func (c *Category) UpdateThumbnail(requester *principal.Principal, thumbnail *resource.Resource) error {

	if err := c.canUpdate(requester); err != nil {
		return err
	}

	c.thumbnailResource = thumbnail

	return nil
}

func (c *Category) UpdateThumbnailExisting(thumbnail *resource.Resource) error {

	if err := validateExistingThumbnail(c.thumbnailResource, thumbnail); err != nil {
		return err
	}

	c.thumbnailResource = thumbnail
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

func UnmarshalCategoryFromDatabase(id, slug string, title map[string]string, thumbnail *resource.Resource, totalLikes, totalPosts int, createdAt, updatedAt time.Time) *Category {
	return &Category{
		id:                id,
		slug:              slug,
		title:             localization.UnmarshalTranslationFromDatabase(title),
		thumbnailResource: thumbnail,
		totalLikes:        totalLikes,
		totalPosts:        totalPosts,
		createdAt:         createdAt,
		updatedAt:         updatedAt,
	}
}

func validateCategoryTitle(name string) error {

	err := validator.New().Var(name, "required,max=25")

	if err != nil {
		return domainerror.NewValidation(err.Error())
	}

	return nil
}
