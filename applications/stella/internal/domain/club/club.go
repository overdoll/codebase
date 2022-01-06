package club

import (
	"errors"
	"overdoll/libraries/localization"
	"overdoll/libraries/paging"
	"overdoll/libraries/principal"
	"overdoll/libraries/uuid"
)

var (
	ErrClubNotFound                = errors.New("club not found")
	ErrClubSlugNotUnique           = errors.New("club slug is not unique")
	ErrClubSlugMax                 = errors.New("maximum slugs reached for club")
	ErrAccountTooManyClubs         = errors.New("account has created too many clubs")
	ErrClubSlugDoesNotBelongToClub = errors.New("club slug does not belong to club")
)

const (
	maxClubSlugLimit     = 5
	maxAccountClubsLimit = 1
)

type Club struct {
	*paging.Node

	id                  string
	slug                string
	slugAliases         []string
	name                *localization.Translation
	thumbnailResourceId string

	newClubMembers []string

	membersCount   int
	ownerAccountId string
}

func NewClub(acc *principal.Principal, slug, name string, currentClubCount int) (*Club, error) {

	res, err := IsAccountClubsLimitReached(acc, acc.AccountId(), currentClubCount)

	if err != nil {
		return nil, err
	}

	if res {
		return nil, ErrAccountTooManyClubs
	}

	id := uuid.New()

	lc, err := localization.NewDefaultTranslation(name)

	if err != nil {
		return nil, err
	}

	return &Club{
		id:                  id.String(),
		slug:                slug,
		name:                lc,
		slugAliases:         []string{},
		thumbnailResourceId: "",
		membersCount:        0,
		ownerAccountId:      acc.AccountId(),
	}, nil
}

func UnmarshalClubFromDatabase(id, slug string, alternativeSlugs []string, name map[string]string, thumbnail string, membersCount int, ownerAccountId string) *Club {
	return &Club{
		id:                  id,
		slug:                slug,
		slugAliases:         alternativeSlugs,
		name:                localization.UnmarshalTranslationFromDatabase(name),
		thumbnailResourceId: thumbnail,
		ownerAccountId:      ownerAccountId,
		membersCount:        membersCount,
	}
}

func (m *Club) ID() string {
	return m.id
}

func (m *Club) Slug() string {
	return m.slug
}

func (m *Club) SlugAliases() []string {
	return m.slugAliases
}

func (m *Club) Name() *localization.Translation {
	return m.name
}

func (m *Club) ThumbnailResourceId() string {
	return m.thumbnailResourceId
}

func (m *Club) MembersCount() int {
	return m.membersCount
}

func (m *Club) NewClubMembers() []string {
	return m.newClubMembers
}

func (m *Club) OwnerAccountId() string {
	return m.ownerAccountId
}

func (m *Club) AddSlugAlias(requester *principal.Principal, slug string) error {

	if err := m.canUpdate(requester); err != nil {
		return err
	}

	if len(m.slugAliases) >= maxClubSlugLimit {
		return ErrClubSlugMax
	}

	m.slugAliases = append(m.slugAliases, slug)

	return nil
}

func (m *Club) MakeSlugAliasDefault(requester *principal.Principal, slug string) error {

	if err := m.canUpdate(requester); err != nil {
		return err
	}

	pos := -1

	for i, v := range m.slugAliases {
		if v == slug {
			pos = i
			break
		}
	}

	if pos == -1 {
		return ErrClubSlugDoesNotBelongToClub
	}

	// remove slug from alt slugs since its the default slug now
	m.slugAliases = append(m.slugAliases[:pos], m.slugAliases[pos+1:]...)

	// add old slug back to alternative slugs
	m.slugAliases = append(m.slugAliases, m.slug)

	// make default slug
	m.slug = slug

	return nil
}

func (m *Club) RemoveSlugAlias(requester *principal.Principal, slug string) error {

	if err := m.canUpdate(requester); err != nil {
		return err
	}

	pos := -1

	for i, v := range m.slugAliases {
		if v == slug {
			pos = i
			break
		}
	}

	if pos == -1 {
		return ErrClubSlugDoesNotBelongToClub
	}

	m.slugAliases = append(m.slugAliases[:pos], m.slugAliases[pos+1:]...)

	return nil
}

func (m *Club) UpdateThumbnail(requester *principal.Principal, thumbnail string) error {

	if err := m.canUpdate(requester); err != nil {
		return err
	}

	m.thumbnailResourceId = thumbnail

	return nil
}

func (m *Club) UpdateName(requester *principal.Principal, name string) error {

	if err := m.canUpdate(requester); err != nil {
		return err
	}

	if err := m.name.UpdateDefaultTranslation(name); err != nil {
		return err
	}

	return nil
}

func (m *Club) canUpdate(requester *principal.Principal) error {

	if err := requester.BelongsToAccount(m.ownerAccountId); err != nil {
		return err
	}

	return nil
}

func (m *Club) AccountIdCanPost(accountId string) bool {
	return m.ownerAccountId == accountId
}

func IsAccountClubsLimitReached(requester *principal.Principal, accountId string, currentClubCount int) (bool, error) {

	lim, err := ViewAccountClubsLimit(requester, accountId)

	if err != nil {
		return false, err
	}

	if currentClubCount >= lim {
		return true, nil
	}

	return false, nil
}

func ViewClubSlugLimit(requester *principal.Principal, accountId string) (int, error) {
	if err := requester.BelongsToAccount(accountId); err != nil {
		return 0, err
	}

	return maxClubSlugLimit, nil
}

func ViewAccountClubsLimit(requester *principal.Principal, accountId string) (int, error) {
	if err := requester.BelongsToAccount(accountId); err != nil {
		return 0, err
	}

	return maxAccountClubsLimit, nil
}

func CanViewAccountClubs(requester *principal.Principal, accountId string) error {
	if err := requester.BelongsToAccount(accountId); err != nil {
		return err
	}

	return nil
}
