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
	ErrSeriesSlugNotUnique = domainerror.NewValidation("series slug is not unique")
)

type Series struct {
	*paging.Node

	id    string
	slug  string
	title *localization.Translation

	thumbnailMedia *media.Media
	bannerMedia    *media.Media

	totalLikes int
	totalPosts int

	createdAt time.Time
	updatedAt time.Time
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
		id:         uuid.New().String(),
		slug:       slug,
		title:      lc,
		totalLikes: 0,
		totalPosts: 0,
		createdAt:  time.Now(),
		updatedAt:  time.Now(),
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

func (m *Series) ThumbnailMedia() *media.Media {
	return m.thumbnailMedia
}

func (m *Series) BannerMedia() *media.Media {
	return m.bannerMedia
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

func (m *Series) UpdatedAt() time.Time {
	return m.updatedAt
}

func (m *Series) update() {
	m.updatedAt = time.Now()
}

func (m *Series) UpdateTotalPosts(totalPosts int) error {
	m.totalPosts = totalPosts
	m.update()
	return nil
}

func (m *Series) UpdateTotalLikes(totalLikes int) error {
	m.totalLikes = totalLikes
	m.update()
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

	m.update()

	return nil
}

func (m *Series) UpdateThumbnail(requester *principal.Principal, thumbnail *media.Media) error {

	if err := m.canUpdate(requester); err != nil {
		return err
	}

	m.thumbnailMedia = thumbnail

	return nil
}

func (m *Series) UpdateThumbnailExisting(thumbnail *media.Media) error {

	if err := validateExistingResource(m.thumbnailMedia, thumbnail); err != nil {
		return err
	}

	m.thumbnailMedia = thumbnail

	m.update()

	return nil
}

func (m *Series) UpdateBannerExisting(thumbnail *media.Media) error {

	if err := validateExistingResource(m.bannerMedia, thumbnail); err != nil {
		return err
	}

	m.bannerMedia = thumbnail

	m.update()

	return nil
}

func (m *Series) UpdateBanner(thumbnail *media.Media) error {

	m.bannerMedia = thumbnail
	m.update()

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

func UnmarshalSeriesFromDatabase(id, slug string, title map[string]string, thumbnail, banner *media.Media, totalLikes, totalPosts int, createdAt, updatedAt time.Time) *Series {
	return &Series{
		id:             id,
		slug:           slug,
		title:          localization.UnmarshalTranslationFromDatabase(title),
		thumbnailMedia: thumbnail,
		bannerMedia:    banner,
		totalLikes:     totalLikes,
		totalPosts:     totalPosts,
		createdAt:      createdAt,
		updatedAt:      updatedAt,
	}
}

func validateSeriesTitle(title string) error {

	err := validator.New().Var(title, "required,max=25")

	if err != nil {
		return domainerror.NewValidation(err.Error())
	}

	return nil
}
