package post

import (
	"errors"
	"github.com/go-playground/validator/v10"
	"overdoll/libraries/principal"
	"overdoll/libraries/uuid"

	"overdoll/libraries/localization"
	"overdoll/libraries/paging"
)

var (
	ErrCharacterNotFound      = errors.New("character not found")
	ErrCharacterSlugNotUnique = errors.New("character slug is not unique")
)

type Character struct {
	*paging.Node

	id                  string
	slug                string
	name                *localization.Translation
	thumbnailResourceId string
	series              *Series

	totalLikes int
	totalPosts int
}

func NewCharacter(requester *principal.Principal, slug, name string, series *Series) (*Character, error) {

	if !requester.IsStaff() {
		return nil, principal.ErrNotAuthorized
	}

	if requester.IsLocked() {
		return nil, principal.ErrLocked
	}

	lc, err := localization.NewDefaultTranslation(name)

	if err != nil {
		return nil, err
	}

	if err := validateCharacterName(name); err != nil {
		return nil, err
	}

	return &Character{
		id:                  uuid.New().String(),
		slug:                slug,
		name:                lc,
		series:              series,
		thumbnailResourceId: "",
		totalLikes:          0,
		totalPosts:          0,
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

func (c *Character) ThumbnailResourceId() string {
	return c.thumbnailResourceId
}

func (c *Character) TotalLikes() int {
	return c.totalLikes
}

func (c *Character) TotalPosts() int {
	return c.totalPosts
}

func (c *Character) UpdateTotalPosts(totalPosts int) error {
	c.totalPosts = totalPosts
	return nil
}

func (c *Character) UpdateTotalLikes(totalLikes int) error {
	c.totalLikes = totalLikes
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

	return nil
}

func (c *Character) UpdateThumbnail(requester *principal.Principal, thumbnail string) error {

	if err := c.canUpdate(requester); err != nil {
		return err
	}

	c.thumbnailResourceId = thumbnail

	return nil
}

func (c *Character) canUpdate(requester *principal.Principal) error {

	if !requester.IsStaff() {
		return principal.ErrNotAuthorized
	}

	if requester.IsLocked() {
		return principal.ErrLocked
	}

	return nil
}

func UnmarshalCharacterFromDatabase(id, slug string, name map[string]string, thumbnail string, totalLikes, totalPosts int, media *Series) *Character {
	return &Character{
		id:                  id,
		slug:                slug,
		name:                localization.UnmarshalTranslationFromDatabase(name),
		thumbnailResourceId: thumbnail,
		series:              media,
		totalLikes:          totalLikes,
		totalPosts:          totalPosts,
	}
}

func validateCharacterName(name string) error {

	err := validator.New().Var(name, "required,max=25")

	if err != nil {
		return err
	}

	return nil
}
