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
	ErrAudienceSlugNotUnique = domainerror.NewValidation("audience slug is not unique")
)

type Audience struct {
	*paging.Node

	id                string
	slug              string
	title             *localization.Translation
	thumbnailResource *resource.Resource

	totalLikes int
	totalPosts int

	standard bool

	createdAt time.Time
	updatedAt time.Time
}

func NewAudience(requester *principal.Principal, slug, title string, standard bool) (*Audience, error) {

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

	if err := validateAudienceTitle(title); err != nil {
		return nil, err
	}

	if err := validateSlug(slug); err != nil {
		return nil, err
	}

	return &Audience{
		id:                uuid.New().String(),
		slug:              slug,
		title:             lc,
		thumbnailResource: nil,
		totalLikes:        0,
		totalPosts:        0,
		standard:          standard,
		createdAt:         time.Now(),
		updatedAt:         time.Now(),
	}, nil
}

func (m *Audience) ID() string {
	return m.id
}

func (m *Audience) Slug() string {
	return m.slug
}

func (m *Audience) Title() *localization.Translation {
	return m.title
}

func (m *Audience) TotalLikes() int {
	return m.totalLikes
}

func (m *Audience) TotalPosts() int {
	return m.totalPosts
}

func (m *Audience) ThumbnailResource() *resource.Resource {
	return m.thumbnailResource
}

// IsStandard a "standard" audience is an audience that the majority will consume
func (m *Audience) IsStandard() bool {
	return m.standard
}

func (m *Audience) CreatedAt() time.Time {
	return m.createdAt
}

func (m *Audience) UpdatedAt() time.Time {
	return m.updatedAt
}

func (m *Audience) UpdateTotalPosts(totalPosts int) error {
	m.totalPosts = totalPosts
	return nil
}

func (m *Audience) UpdateTotalLikes(totalLikes int) error {
	m.totalLikes = totalLikes
	return nil
}

func (m *Audience) UpdateTitle(requester *principal.Principal, title, locale string) error {

	if err := m.canUpdate(requester); err != nil {
		return err
	}

	if err := validateAudienceTitle(title); err != nil {
		return err
	}

	if err := m.title.UpdateTranslation(title, locale); err != nil {
		return err
	}

	return nil
}

func (m *Audience) UpdateThumbnailExisting(thumbnail *resource.Resource) error {

	if err := validateExistingThumbnail(m.thumbnailResource, thumbnail); err != nil {
		return err
	}

	m.thumbnailResource = thumbnail

	return nil
}

func (m *Audience) UpdateThumbnail(requester *principal.Principal, thumbnail *resource.Resource) error {

	if err := m.canUpdate(requester); err != nil {
		return err
	}

	m.thumbnailResource = thumbnail

	return nil
}

func (m *Audience) UpdateIsStandard(requester *principal.Principal, standard bool) error {

	if err := m.canUpdate(requester); err != nil {
		return err
	}

	m.standard = standard

	return nil
}

func (m *Audience) canUpdate(requester *principal.Principal) error {

	if !requester.IsStaff() {
		return principal.ErrNotAuthorized
	}

	if requester.IsLocked() {
		return principal.ErrLocked
	}

	return nil
}

func UnmarshalAudienceFromDatabase(id, slug string, title map[string]string, thumbnail *resource.Resource, standard int, totalLikes, totalPosts int, createdAt, updatedAt time.Time) *Audience {
	return &Audience{
		id:                id,
		slug:              slug,
		totalLikes:        totalLikes,
		totalPosts:        totalPosts,
		title:             localization.UnmarshalTranslationFromDatabase(title),
		thumbnailResource: thumbnail,
		standard:          standard == 1,
		createdAt:         createdAt,
		updatedAt:         updatedAt,
	}
}

func validateAudienceTitle(name string) error {

	err := validator.New().Var(name, "required,max=25")

	if err != nil {
		return domainerror.NewValidation(err.Error())
	}

	return nil
}
