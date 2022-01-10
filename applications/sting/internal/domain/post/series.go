package post

import (
	"errors"

	"overdoll/libraries/localization"
	"overdoll/libraries/paging"
)

var (
	ErrSeriesNotFound = errors.New("series not found")
)

type Series struct {
	*paging.Node

	id                  string
	slug                string
	title               *localization.Translation
	thumbnailResourceId string

	totalLikes int
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

func (m *Series) IncrementTotalLikes() error {
	m.totalLikes += 1
	return nil
}

func (m *Series) DecrementTotalLikes() error {
	m.totalLikes -= 1
	return nil
}

func UnmarshalSeriesFromDatabase(id, slug string, title map[string]string, thumbnail string, totalLikes int) *Series {
	return &Series{
		id:                  id,
		slug:                slug,
		title:               localization.UnmarshalTranslationFromDatabase(title),
		thumbnailResourceId: thumbnail,
		totalLikes:          totalLikes,
	}
}
