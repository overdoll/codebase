package post

import (
	"errors"
	"overdoll/applications/sting/internal/domain/resource"
	"overdoll/libraries/localization"
	"overdoll/libraries/paging"
	"overdoll/libraries/principal"
	"overdoll/libraries/uuid"
	"strings"
)

var (
	ErrClubNotFound      = errors.New("club not found")
	ErrClubSlugNotUnique = errors.New("club slug is not unique")
)

type Club struct {
	*paging.Node

	id             string
	slug           string
	name           *localization.Translation
	thumbnail      *resource.Resource
	membersCount   int
	ownerAccountId string
}

func (m *Club) ID() string {
	return m.id
}

func (m *Club) Slug() string {
	return m.slug
}

func (m *Club) Name() *localization.Translation {
	return m.name
}

func (m *Club) Thumbnail() *resource.Resource {
	return m.thumbnail
}

func (m *Club) MembersCount() int {
	return m.membersCount
}

func (m *Club) OwnerAccountId() string {
	return m.ownerAccountId
}

func NewClub(acc *principal.Principal, slug, name string) (*Club, error) {
	id := uuid.New()

	lc, err := localization.NewEnglishTranslation(name)

	if err != nil {
		return nil, err
	}

	return &Club{
		id:             id.String(),
		slug:           strings.ToLower(slug),
		name:           lc,
		thumbnail:      nil,
		membersCount:   0,
		ownerAccountId: acc.AccountId(),
	}, nil
}

func UnmarshalClubFromDatabase(id, slug string, name map[string]string, thumbnail string, membersCount int, ownerAccountId string) *Club {
	return &Club{
		id:             id,
		slug:           slug,
		name:           localization.UnmarshalTranslationFromDatabase(name),
		thumbnail:      resource.UnmarshalResourceFromDatabase(thumbnail),
		ownerAccountId: ownerAccountId,
		membersCount:   membersCount,
	}
}
