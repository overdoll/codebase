package post

import (
	"errors"
	"overdoll/libraries/principal"
	"overdoll/libraries/uuid"

	"overdoll/libraries/localization"
	"overdoll/libraries/paging"
)

var (
	ErrCategoryNotFound      = errors.New("category not found")
	ErrCategorySlugNotUnique = errors.New("category slug is not unique")
)

type Category struct {
	*paging.Node

	id                  string
	slug                string
	title               *localization.Translation
	thumbnailResourceId string
	totalLikes          int
	totalPosts          int
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

	return &Category{
		id:                  uuid.New().String(),
		slug:                slug,
		title:               lc,
		thumbnailResourceId: "",
		totalLikes:          0,
		totalPosts:          0,
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

func (c *Category) ThumbnailResourceId() string {
	return c.thumbnailResourceId
}

func (c *Category) TotalLikes() int {
	return c.totalLikes
}

func (c *Category) TotalPosts() int {
	return c.totalPosts
}

func (c *Category) UpdateTotalPosts(totalPosts int) error {
	c.totalPosts = totalPosts
	return nil
}

func (c *Category) UpdateTotalLikes(totalLikes int) error {
	c.totalLikes = totalLikes
	return nil
}

func (c *Category) UpdateTitle(requester *principal.Principal, title, locale string) error {

	if err := c.canUpdate(requester); err != nil {
		return err
	}

	if err := c.title.UpdateTranslation(title, locale); err != nil {
		return err
	}

	return nil
}

func (c *Category) UpdateThumbnail(requester *principal.Principal, thumbnail string) error {

	if err := c.canUpdate(requester); err != nil {
		return err
	}

	c.thumbnailResourceId = thumbnail

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

func UnmarshalCategoryFromDatabase(id, slug string, title map[string]string, thumbnail string, totalLikes, totalPosts int) *Category {
	return &Category{
		id:                  id,
		slug:                slug,
		title:               localization.UnmarshalTranslationFromDatabase(title),
		thumbnailResourceId: thumbnail,
		totalLikes:          totalLikes,
		totalPosts:          totalPosts,
	}
}
