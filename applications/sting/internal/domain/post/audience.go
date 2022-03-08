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
	ErrAudienceNotFound      = errors.New("audience not found")
	ErrAudienceSlugNotUnique = errors.New("audience slug is not unique")
)

type Audience struct {
	*paging.Node

	id                  string
	slug                string
	title               *localization.Translation
	thumbnailResourceId *string

	totalLikes int
	totalPosts int

	standard bool
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

	return &Audience{
		id:                  uuid.New().String(),
		slug:                slug,
		title:               lc,
		thumbnailResourceId: nil,
		totalLikes:          0,
		totalPosts:          0,
		standard:            standard,
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

func (m *Audience) ThumbnailResourceId() *string {
	return m.thumbnailResourceId
}

// IsStandard a "standard" audience is an audience that the majority will consume
func (m *Audience) IsStandard() bool {
	return m.standard
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

func (m *Audience) UpdateThumbnail(requester *principal.Principal, thumbnail string) error {

	if err := m.canUpdate(requester); err != nil {
		return err
	}

	m.thumbnailResourceId = &thumbnail

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

func UnmarshalAudienceFromDatabase(id, slug string, title map[string]string, thumbnail *string, standard int, totalLikes, totalPosts int) *Audience {
	return &Audience{
		id:                  id,
		slug:                slug,
		totalLikes:          totalLikes,
		totalPosts:          totalPosts,
		title:               localization.UnmarshalTranslationFromDatabase(title),
		thumbnailResourceId: thumbnail,
		standard:            standard == 1,
	}
}

func validateAudienceTitle(name string) error {

	err := validator.New().Var(name, "required,max=25")

	if err != nil {
		return err
	}

	return nil
}
