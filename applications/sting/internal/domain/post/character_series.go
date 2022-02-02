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
	ErrSeriesNotFound      = errors.New("series not found")
	ErrSeriesSlugNotUnique = errors.New("series slug is not unique")
)

type Series struct {
	*paging.Node

	id                  string
	slug                string
	title               *localization.Translation
	thumbnailResourceId string

	totalLikes int
	totalPosts int
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

	return &Series{
		id:                  uuid.New().String(),
		slug:                slug,
		title:               lc,
		thumbnailResourceId: "",
		totalLikes:          0,
		totalPosts:          0,
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

func (m *Series) ThumbnailResourceId() string {
	return m.thumbnailResourceId
}

func (m *Series) TotalLikes() int {
	return m.totalLikes
}

func (m *Series) TotalPosts() int {
	return m.totalPosts
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

func (m *Series) UpdateThumbnail(requester *principal.Principal, thumbnail string) error {

	if err := m.canUpdate(requester); err != nil {
		return err
	}

	m.thumbnailResourceId = thumbnail

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

func UnmarshalSeriesFromDatabase(id, slug string, title map[string]string, thumbnail string, totalLikes, totalPosts int) *Series {
	return &Series{
		id:                  id,
		slug:                slug,
		title:               localization.UnmarshalTranslationFromDatabase(title),
		thumbnailResourceId: thumbnail,
		totalLikes:          totalLikes,
		totalPosts:          totalPosts,
	}
}

func validateSeriesTitle(title string) error {

	err := validator.New().Var(title, "required,max=25")

	if err != nil {
		return err
	}

	return nil
}
