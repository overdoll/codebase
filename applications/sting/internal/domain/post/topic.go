package post

import (
	"bytes"
	"github.com/go-playground/validator/v10"
	"github.com/yuin/goldmark"
	"overdoll/libraries/errors/domainerror"
	"overdoll/libraries/principal"
	"overdoll/libraries/resource"
	"overdoll/libraries/uuid"
	"time"

	"overdoll/libraries/localization"
	"overdoll/libraries/paging"
)

var (
	ErrTopicSlugNotUnique = domainerror.NewValidation("topic slug is not unique")
)

type Topic struct {
	*paging.Node

	id             string
	slug           string
	title          *localization.Translation
	description    *localization.Translation
	bannerResource *resource.Resource
	weight         int

	createdAt time.Time
	updatedAt time.Time
}

func NewTopic(requester *principal.Principal, slug, title, description string, weight int) (*Topic, error) {

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

	desc, err := localization.NewDefaultTranslation(description)

	if err != nil {
		return nil, err
	}

	if err := validateTopicTitle(title); err != nil {
		return nil, err
	}

	if err := validateTopicDescription(description); err != nil {
		return nil, err
	}

	if err := validateSlug(slug); err != nil {
		return nil, err
	}

	return &Topic{
		id:             uuid.New().String(),
		slug:           slug,
		title:          lc,
		bannerResource: nil,
		description:    desc,
		weight:         weight,
		createdAt:      time.Now(),
		updatedAt:      time.Now(),
	}, nil
}

func (c *Topic) ID() string {
	return c.id
}

func (c *Topic) Slug() string {
	return c.slug
}

func (c *Topic) Title() *localization.Translation {
	return c.title
}

func (c *Topic) Description() *localization.Translation {
	return c.description
}

func (c *Topic) BannerResource() *resource.Resource {
	return c.bannerResource
}

func (c *Topic) Weight() int {
	return c.weight
}

func (c *Topic) CreatedAt() time.Time {
	return c.createdAt
}

func (c *Topic) UpdatedAt() time.Time {
	return c.updatedAt
}

func (c *Topic) update() {
	c.updatedAt = time.Now()
}

func (c *Topic) canUpdate(requester *principal.Principal) error {

	if !requester.IsStaff() {
		return principal.ErrNotAuthorized
	}

	if requester.IsLocked() {
		return principal.ErrLocked
	}

	return nil
}

func (c *Topic) UpdateWeight(requester *principal.Principal, weight int) error {

	if err := c.canUpdate(requester); err != nil {
		return err
	}

	c.weight = weight
	c.update()

	return nil
}

func (c *Topic) UpdateTitle(requester *principal.Principal, title, locale string) error {

	if err := c.canUpdate(requester); err != nil {
		return err
	}

	if err := validateTopicTitle(title); err != nil {
		return err
	}

	if err := c.title.UpdateTranslation(title, locale); err != nil {
		return err
	}
	c.update()

	return nil
}

func (c *Topic) UpdateDescription(requester *principal.Principal, description, locale string) error {

	if err := c.canUpdate(requester); err != nil {
		return err
	}

	if err := validateTopicDescription(description); err != nil {
		return err
	}

	if err := c.title.UpdateTranslation(description, locale); err != nil {
		return err
	}
	c.update()

	return nil
}

func (c *Topic) UpdateBannerExisting(thumbnail *resource.Resource) error {

	if err := validateExistingResource(c.bannerResource, thumbnail); err != nil {
		return err
	}

	c.bannerResource = thumbnail
	c.update()

	return nil
}

func (c *Topic) UpdateBanner(requester *principal.Principal, thumbnail *resource.Resource) error {

	if err := c.canUpdate(requester); err != nil {
		return err
	}

	c.bannerResource = thumbnail
	c.update()

	return nil
}

func UnmarshalTopicFromDatabase(id, slug string, title map[string]string, description map[string]string, banner *resource.Resource, weight int, createdAt, updatedAt time.Time) *Topic {
	return &Topic{
		id:             id,
		slug:           slug,
		title:          localization.UnmarshalTranslationFromDatabase(title),
		description:    localization.UnmarshalTranslationFromDatabase(description),
		bannerResource: banner,
		weight:         weight,
		createdAt:      createdAt,
		updatedAt:      updatedAt,
	}
}

func validateTopicDescription(description string) error {

	if description == "" {
		return nil
	}

	// attempt markdown conversion
	var buf bytes.Buffer
	if err := goldmark.Convert([]byte(description), &buf); err != nil {
		return domainerror.NewValidation(err.Error())
	}

	return nil
}

func validateTopicTitle(name string) error {

	err := validator.New().Var(name, "required,max=25")

	if err != nil {
		return domainerror.NewValidation(err.Error())
	}

	return nil
}
