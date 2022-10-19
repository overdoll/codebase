package club

import (
	"github.com/go-playground/validator/v10"
	"overdoll/libraries/errors/domainerror"
	"overdoll/libraries/localization"
	"overdoll/libraries/media"
	"overdoll/libraries/paging"
	"overdoll/libraries/principal"
	"overdoll/libraries/uuid"
	"time"
)

var (
	ErrClubSlugNotUnique           = domainerror.NewValidation("club slug is not unique")
	ErrClubSlugMax                 = domainerror.NewValidation("maximum slugs reached for club")
	ErrAccountTooManyClubs         = domainerror.NewValidation("account has created too many clubs")
	ErrClubSlugDoesNotBelongToClub = domainerror.NewValidation("club slug does not belong to club")
)

const (
	maxClubSlugLimit     = 5
	maxAccountClubsLimit = 1
)

type Club struct {
	*paging.Node

	id          string
	slug        string
	slugAliases []string
	links       []string
	name        *localization.Translation

	thumbnailMedia *media.Media
	bannerMedia    *media.Media

	suspended      bool
	suspendedUntil *time.Time

	terminated            bool
	terminatedByAccountId *string

	nextSupporterPostTime       *time.Time
	hasCreatedSupporterOnlyPost bool

	supporterOnlyPostsDisabled bool

	newClubMembers []string

	charactersEnabled bool
	charactersLimit   int

	totalLikes int
	totalPosts int

	membersCount   int
	ownerAccountId string

	createdAt time.Time
	updatedAt time.Time
}

func NewMustClub(id, slug string, name string, ownerAccountId string) *Club {

	lc, _ := localization.NewDefaultTranslation(name)

	return &Club{
		id:                          id,
		slug:                        slug,
		name:                        lc,
		slugAliases:                 []string{},
		thumbnailMedia:              nil,
		bannerMedia:                 nil,
		membersCount:                1,
		ownerAccountId:              ownerAccountId,
		hasCreatedSupporterOnlyPost: false,
		terminated:                  false,
		supporterOnlyPostsDisabled:  false,
		createdAt:                   time.Now(),
		updatedAt:                   time.Now(),
	}
}

func NewClub(requester *principal.Principal, slug, name string, currentClubCount int) (*Club, error) {

	if requester.IsLocked() {
		return nil, principal.ErrLocked
	}

	if !requester.IsStaff() && !requester.IsArtist() {
		return nil, domainerror.NewAuthorization("must be artist or staff in order to create a club")
	}

	res, err := IsAccountClubsLimitReached(requester, requester.AccountId(), currentClubCount)

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

	if err := validateName(name); err != nil {
		return nil, err
	}

	if err := validateSlug(slug); err != nil {
		return nil, err
	}

	return &Club{
		id:                          id.String(),
		slug:                        slug,
		name:                        lc,
		slugAliases:                 []string{},
		thumbnailMedia:              nil,
		membersCount:                1,
		ownerAccountId:              requester.AccountId(),
		hasCreatedSupporterOnlyPost: false,
		terminated:                  false,
		supporterOnlyPostsDisabled:  false,
		createdAt:                   time.Now(),
		updatedAt:                   time.Now(),
		charactersEnabled:           true,
		charactersLimit:             5,
	}, nil
}

func UnmarshalClubFromDatabase(id, slug string, alternativeSlugs []string, name map[string]string, thumbnail *media.Media, banner *media.Media, membersCount int, ownerAccountId string, suspended bool, suspendedUntil, nextSupporterPostTime *time.Time, hasCreatedSupporterOnlyPost bool, terminated bool, terminatedByAccountId *string, supporterOnlyPostsDisabled bool, createdAt, updatedAt time.Time, charactersEnabled bool, charactersLimit, totalLikes, totalPosts int, links []string) *Club {
	return &Club{
		id:                          id,
		slug:                        slug,
		slugAliases:                 alternativeSlugs,
		name:                        localization.UnmarshalTranslationFromDatabase(name),
		thumbnailMedia:              thumbnail,
		bannerMedia:                 banner,
		ownerAccountId:              ownerAccountId,
		membersCount:                membersCount,
		suspended:                   suspended,
		suspendedUntil:              suspendedUntil,
		nextSupporterPostTime:       nextSupporterPostTime,
		hasCreatedSupporterOnlyPost: hasCreatedSupporterOnlyPost,
		terminated:                  terminated,
		terminatedByAccountId:       terminatedByAccountId,
		createdAt:                   createdAt,
		updatedAt:                   updatedAt,
		supporterOnlyPostsDisabled:  supporterOnlyPostsDisabled,
		charactersEnabled:           charactersEnabled,
		charactersLimit:             charactersLimit,
		totalLikes:                  totalLikes,
		totalPosts:                  totalPosts,
		links:                       links,
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

func (m *Club) Links() []string {
	return m.links
}

func (m *Club) Name() *localization.Translation {
	return m.name
}

func (m *Club) ThumbnailMedia() *media.Media {
	return m.thumbnailMedia
}

func (m *Club) BannerMedia() *media.Media {
	return m.bannerMedia
}

func (m *Club) MembersCount() int {
	return m.membersCount
}

func (m *Club) CharactersEnabled() bool {
	return m.charactersEnabled
}

func (m *Club) CharactersLimit() int {
	return m.charactersLimit
}

func (m *Club) UpdateTotalPosts(totalPosts int) error {
	m.totalPosts = totalPosts
	m.update()
	return nil
}

func (m *Club) UpdateTotalLikes(totalLikes int) error {
	m.totalLikes = totalLikes
	m.update()
	return nil
}

func (m *Club) TotalLikes() int {
	return m.totalLikes
}

func (m *Club) TotalPosts() int {
	return m.totalPosts
}

func (m *Club) SlugAliasLimit() int {
	return maxClubSlugLimit
}

func (m *Club) NewClubMembers() []string {
	return m.newClubMembers
}

func (m *Club) OwnerAccountId() string {
	return m.ownerAccountId
}

func (m *Club) IsSuspended() bool {
	// this is also true when terminated to prevent posting
	return m.suspended || m.terminated
}

func (m *Club) CanCreateSupporterOnlyPosts() bool {
	return !m.supporterOnlyPostsDisabled
}

func (m *Club) SupporterOnlyPostsDisabled() bool {
	return m.supporterOnlyPostsDisabled
}

func (m *Club) Suspended() bool {
	return m.suspended
}

func (m *Club) Terminated() bool {
	return m.terminated
}

func (m *Club) TerminatedByAccountId() *string {
	return m.terminatedByAccountId
}

func (m *Club) SuspendedUntil() *time.Time {
	return m.suspendedUntil
}

func (m *Club) CreatedAt() time.Time {
	return m.createdAt
}

func (m *Club) UpdatedAt() time.Time {
	return m.updatedAt
}

func (m *Club) update() {
	m.updatedAt = time.Now()
}

func (m *Club) NextSupporterPostTime() *time.Time {
	return m.nextSupporterPostTime
}

func (m *Club) HasCreatedSupporterOnlyPost() bool {
	return m.hasCreatedSupporterOnlyPost
}

func (m *Club) CanUnSuspend(requester *principal.Principal) error {

	if !requester.IsStaff() {

		if err := m.canUpdate(requester); err != nil {
			return err
		}

		if !time.Now().After(*m.suspendedUntil) {
			return domainerror.NewValidation("cannot un suspend yet")
		}

		return nil
	}

	return nil
}

func (m *Club) CanSupport() bool {
	return !m.suspended && m.hasCreatedSupporterOnlyPost && !m.terminated
}

func (m *Club) CanTransferClubOwnership(requester, target *principal.Principal) error {

	if !requester.IsStaff() {
		return principal.ErrNotAuthorized
	}

	if !target.IsArtist() {
		return domainerror.NewValidation("can only transfer club ownership to artists")
	}

	return nil
}

func (m *Club) CanViewSupporterCount(requester *principal.Principal) error {

	if requester.IsStaff() {
		return nil
	}

	return requester.BelongsToAccount(m.ownerAccountId)
}

func (m *Club) UpdateEnableSupporterOnlyPosts(requester *principal.Principal) error {

	if !requester.IsStaff() {
		return principal.ErrNotAuthorized
	}
	m.supporterOnlyPostsDisabled = false

	return nil
}

func (m *Club) UpdateClubCharactersLimit(requester *principal.Principal, limit int) error {

	if !requester.IsStaff() {
		return principal.ErrNotAuthorized
	}

	if limit > 200 {
		return domainerror.NewValidation("club characters limit too large")
	}

	m.charactersLimit = limit

	return nil
}

func (m *Club) UpdateEnableClubCharacters(requester *principal.Principal, limit int) error {

	if !requester.IsStaff() {
		return principal.ErrNotAuthorized
	}

	if limit > 200 {
		return domainerror.NewValidation("club characters limit too large")
	}

	m.charactersEnabled = true
	m.charactersLimit = limit

	return nil
}

func (m *Club) UpdateDisableClubCharacters(requester *principal.Principal) error {

	if !requester.IsStaff() {
		return principal.ErrNotAuthorized
	}

	m.charactersEnabled = false
	m.charactersLimit = 0

	return nil
}

func (m *Club) UpdateDisableSupporterOnlyPosts(requester *principal.Principal) error {

	if !requester.IsStaff() {
		return principal.ErrNotAuthorized
	}

	m.supporterOnlyPostsDisabled = true
	m.hasCreatedSupporterOnlyPost = false
	m.nextSupporterPostTime = nil

	return nil
}

func (m *Club) CanSuspend(requester *principal.Principal, endTime time.Time) error {

	if !requester.IsStaff() {
		return principal.ErrNotAuthorized
	}

	return m.Suspend(endTime)
}

func (m *Club) CanTerminate(requester *principal.Principal) error {

	if !requester.IsStaff() {
		return principal.ErrNotAuthorized
	}

	return m.Terminate(requester.AccountId())
}

func (m *Club) CanUnTerminate(requester *principal.Principal) error {

	if !requester.IsStaff() {
		return principal.ErrNotAuthorized
	}

	return nil
}

func (m *Club) Suspend(endTime time.Time) error {

	m.suspended = true
	m.suspendedUntil = &endTime

	m.update()

	return nil
}

func (m *Club) Terminate(accountId string) error {

	m.terminatedByAccountId = &accountId
	m.terminated = true

	m.update()

	return nil
}

func (m *Club) UnTerminate() error {
	m.terminatedByAccountId = nil
	m.terminated = false

	m.update()

	return nil
}

func (m *Club) UpdateNextSupporterPostTime(timestamp time.Time) error {
	ts := timestamp.Add(time.Hour * 24 * 30)
	m.nextSupporterPostTime = &ts
	m.hasCreatedSupporterOnlyPost = true

	m.update()

	return nil
}

func (m *Club) UnSuspend() error {
	m.suspended = false
	m.suspendedUntil = nil

	m.update()

	return nil
}

func (m *Club) AddSlugAlias(requester *principal.Principal, slug string) error {

	if err := m.canUpdate(requester); err != nil {
		return err
	}
	if len(m.slugAliases) >= maxClubSlugLimit {
		return ErrClubSlugMax
	}

	if err := validateSlug(slug); err != nil {
		return err
	}

	m.slugAliases = append(m.slugAliases, slug)

	m.update()

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
	m.update()

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

	m.update()

	return nil
}

func (m *Club) UpdateThumbnail(requester *principal.Principal, thumbnail *media.Media) error {

	if err := m.canUpdate(requester); err != nil {
		return err
	}

	m.thumbnailMedia = thumbnail

	m.update()

	return nil
}

func (m *Club) UpdateBanner(thumbnail *media.Media) error {

	m.bannerMedia = thumbnail

	m.update()

	return nil
}

func (m *Club) UpdateBannerExisting(thumbnail *media.Media) error {

	if m.bannerMedia == nil {
		return media.ErrMediaNotPresent
	}

	if m.bannerMedia.ID() != thumbnail.ID() {
		return media.ErrMediaNotPresent
	}

	m.bannerMedia = thumbnail

	m.update()

	return nil
}

func (m *Club) UpdateThumbnailExisting(thumbnail *media.Media) error {

	if m.thumbnailMedia == nil {
		return media.ErrMediaNotPresent

	}

	if m.thumbnailMedia.ID() != thumbnail.ID() {
		return media.ErrMediaNotPresent
	}

	m.thumbnailMedia = thumbnail

	m.update()

	return nil
}

func (m *Club) AddMember() error {
	m.update()
	m.membersCount += 1
	return nil
}

func (m *Club) SubtractMember() error {
	m.update()
	m.membersCount -= 1
	return nil
}

func (m *Club) UpdateName(requester *principal.Principal, name string) error {

	if err := m.canUpdate(requester); err != nil {
		return err
	}

	if err := validateName(name); err != nil {
		return err
	}

	if err := m.name.UpdateDefaultTranslation(name); err != nil {
		return err
	}

	m.update()

	return nil
}

func (m *Club) canUpdate(requester *principal.Principal) error {

	if requester.IsStaff() {
		return nil
	}

	if err := requester.BelongsToAccount(m.ownerAccountId); err != nil {
		return err
	}

	if requester.IsLocked() {
		return principal.ErrLocked
	}

	return nil
}

func (m *Club) AccountIdCanCreatePost(accountId string) bool {
	return m.ownerAccountId == accountId
}

func (m *Club) CanView(requester *principal.Principal) bool {

	if m.terminated {
		if requester == nil {
			return false
		}

		if requester.IsStaff() {
			return true
		}

		if err := requester.BelongsToAccount(m.ownerAccountId); err != nil {
			return false
		}

		return true
	}

	return true
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

func ViewClubCharactersCount(requester *principal.Principal, clubId string) error {

	if requester.IsStaff() || requester.IsWorker() {
		return nil
	}

	if err := requester.CheckClubOwner(clubId); err != nil {
		return err
	}

	return nil
}

func ViewAccountClubsLimit(requester *principal.Principal, accountId string) (int, error) {

	if err := requester.BelongsToAccount(accountId); err != nil {
		return 0, err
	}

	if requester.IsStaff() {
		return 9999, nil
	}

	return maxAccountClubsLimit, nil
}

func CanViewAccountClubs(requester *principal.Principal, accountId string) error {
	if err := requester.BelongsToAccount(accountId); err != nil {
		return err
	}

	return nil
}

func CanViewClubSuspensionLogs(requester *principal.Principal, club *Club) error {

	if requester.IsStaff() {
		return nil
	}

	if err := requester.BelongsToAccount(club.ownerAccountId); err != nil {
		return err
	}

	return nil
}

func validateName(name string) error {

	err := validator.New().Var(name, "required,max=25")

	if err != nil {
		return domainerror.NewValidation(err.Error())
	}

	return nil
}

func validateSlug(slug string) error {

	err := validator.New().Var(slug, "required,max=25,excludesall= ,alphanum")

	if err != nil {
		return domainerror.NewValidation(err.Error())
	}

	return nil
}
