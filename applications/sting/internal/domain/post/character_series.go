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
	ErrSeriesSlugNotUnique = domainerror.NewValidation("series slug is not unique")
)

type Series struct {
	*paging.Node

	id                string
	slug              string
	title             *localization.Translation
	thumbnailResource *resource.Resource

	totalLikes int
	totalPosts int

	createdAt time.Time
}

func NewSeries(requester *principal.Principal, slug, title string) (*Series, error) {

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

	if err := validateSeriesTitle(title); err != nil {
		return nil, err
	}

	if err := validateSlug(slug); err != nil {
		return nil, err
	}

	return &Series{
		id:                uuid.New().String(),
		slug:              slug,
		title:             lc,
		thumbnailResource: nil,
		totalLikes:        0,
		totalPosts:        0,
		createdAt:         time.Now(),
	}, nil
}

func (m *Series) ID() string {
	return m.id
}

func (m *Series) Slug() string {
	return m.slug
}

func (m *Series) Title() *localization.Translation {
	return m.title
}

func (m *Series) ThumbnailResource() *resource.Resource {
	return m.thumbnailResource
}

func (m *Series) TotalLikes() int {
	return m.totalLikes
}

func (m *Series) TotalPosts() int {
	return m.totalPosts
}

func (m *Series) CreatedAt() time.Time {
	return m.createdAt
}

func (m *Series) UpdateTotalPosts(totalPosts int) error {
	m.totalPosts = totalPosts
	return nil
}

func (m *Series) UpdateTotalLikes(totalLikes int) error {
	m.totalLikes = totalLikes
	return nil
}

func (m *Series) UpdateTitle(requester *principal.Principal, title, locale string) error {

	if err := m.canUpdate(requester); err != nil {
		return err
	}

	if err := validateSeriesTitle(title); err != nil {
		return err
	}

	if err := m.title.UpdateTranslation(title, locale); err != nil {
		return err
	}

	return nil
}

func (m *Series) UpdateThumbnail(requester *principal.Principal, thumbnail *resource.Resource) error {

	if err := m.canUpdate(requester); err != nil {
		return err
	}

	m.thumbnailResource = thumbnail

	return nil
}

func (m *Series) UpdateThumbnailExisting(thumbnail *resource.Resource) error {

	if err := validateExistingThumbnail(m.thumbnailResource, thumbnail); err != nil {
		return err
	}

	m.thumbnailResource = thumbnail

	return nil
}

func (m *Series) canUpdate(requester *principal.Principal) error {

	if !requester.IsStaff() {
		return principal.ErrNotAuthorized
	}

	if requester.IsLocked() {
		return principal.ErrLocked
	}

	return nil
}

func UnmarshalSeriesFromDatabase(id, slug string, title map[string]string, thumbnail *resource.Resource, totalLikes, totalPosts int, createdAt time.Time) *Series {
	return &Series{
		id:                id,
		slug:              slug,
		title:             localization.UnmarshalTranslationFromDatabase(title),
		thumbnailResource: thumbnail,
		totalLikes:        totalLikes,
		totalPosts:        totalPosts,
		createdAt:         createdAt,
	}
}

func validateSeriesTitle(title string) error {

	err := validator.New().Var(title, "required,max=25")

	if err != nil {
		return domainerror.NewValidation(err.Error())
	}

	return nil
}
