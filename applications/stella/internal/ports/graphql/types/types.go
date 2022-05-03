// Code generated by github.com/99designs/gqlgen, DO NOT EDIT.

package types

import (
	"fmt"
	"io"
	"overdoll/libraries/graphql/relay"
	"strconv"
	"time"
)

type ClubSuspensionLog interface {
	IsClubSuspensionLog()
}

type Account struct {
	// Maximum amount of clubs that you can create.
	ClubsLimit int `json:"clubsLimit"`
	// Current count of the amount of clubs that the account has created.
	ClubsCount int `json:"clubsCount"`
	// Represents the clubs that the account has created.
	Clubs *ClubConnection `json:"clubs"`
	// Maximum amount of clubs that you can join as an account.
	ClubMembershipsLimit int `json:"clubMembershipsLimit"`
	// Current count of club memberships. Should be compared against the limit before joining a club.
	ClubMembershipsCount int `json:"clubMembershipsCount"`
	// Represents the club memberships that the account has.
	ClubMemberships *ClubMemberConnection `json:"clubMemberships"`
	ID              relay.ID              `json:"id"`
}

func (Account) IsEntity() {}

// Add alias slug.
type AddClubSlugAliasInput struct {
	// The club to update
	ID relay.ID `json:"id"`
	// The chosen slug for the club.
	//
	// Validation: Max 25 characters. No spaces allowed. Alphanumeric characters.
	Slug string `json:"slug"`
}

// Payload for a new alt slug
type AddClubSlugAliasPayload struct {
	// The club after update
	Club *Club `json:"club"`
	// Validation for adding a new club
	Validation *AddClubSlugAliasValidation `json:"validation"`
}

type Club struct {
	// An ID pointing to this club.
	ID relay.ID `json:"id"`
	// An internal reference, uniquely identifying the club.
	Reference string `json:"reference"`
	// A url-friendly ID. Should be used when searching
	Slug string `json:"slug"`
	// Maximum amount of slug aliases that can be created for this club.
	SlugAliasesLimit int `json:"slugAliasesLimit"`
	// An alias list of slugs. These are valid, as in, you can find the club using the slug. However, it should always be replaced by the default slug.
	SlugAliases []*ClubSlugAlias `json:"slugAliases"`
	// A URL pointing to the object's thumbnail.
	Thumbnail *Resource `json:"thumbnail"`
	// A name for this club.
	Name string `json:"name"`
	// The account that owns this club.
	Owner *Account `json:"owner"`
	// Whether or not this club is suspended.
	Suspension *ClubSuspension `json:"suspension"`
	// Club Suspension Logs.
	//
	// Can see who a club was suspended by, the reason and who unsuspended a particular club.
	SuspensionLogs *ClubSuspensionLogConnection `json:"suspensionLogs"`
	// Whether or not the viewer is the owner of the club.
	ViewerIsOwner bool `json:"viewerIsOwner"`
	// Whether or not you can become a supporter of this club.
	CanSupport bool `json:"canSupport"`
	// Whether or not the viewer is a member of this club.
	ViewerMember *ClubMember `json:"viewerMember"`
	// The total amount of members in this club.
	MembersCount int `json:"membersCount"`
	// Club members.
	Members *ClubMemberConnection `json:"members"`
}

func (Club) IsNode()   {}
func (Club) IsEntity() {}

type ClubConnection struct {
	Edges    []*ClubEdge     `json:"edges"`
	PageInfo *relay.PageInfo `json:"pageInfo"`
}

type ClubEdge struct {
	Cursor string `json:"cursor"`
	Node   *Club  `json:"node"`
}

type ClubIssuedSuspensionLog struct {
	// The ID linked to this suspension log.
	ID relay.ID `json:"id"`
	// The account that created this suspension.
	//
	// If nil, the suspension was created automatically
	Account *Account `json:"account"`
	// The reason this suspension was issued.
	Reason ClubSuspensionReason `json:"reason"`
	// How long the club was suspended until.
	SuspendedUntil time.Time `json:"suspendedUntil"`
}

func (ClubIssuedSuspensionLog) IsClubSuspensionLog() {}

type ClubMember struct {
	// An ID pointing to this club member.
	ID relay.ID `json:"id"`
	// When the membership was created (when the account originally joined).
	JoinedAt time.Time `json:"joinedAt"`
	// The club that this membership belongs to.
	Club *Club `json:"club"`
	// The account that belongs to this membership.
	Account *Account `json:"account"`
	// Whether or not this member is a supporter.
	IsSupporter bool `json:"isSupporter"`
	// If is a supporter, when they became a supporter.
	SupporterSince *time.Time `json:"supporterSince"`
}

func (ClubMember) IsNode()   {}
func (ClubMember) IsEntity() {}

type ClubMemberConnection struct {
	Edges    []*ClubMemberEdge `json:"edges"`
	PageInfo *relay.PageInfo   `json:"pageInfo"`
}

type ClubMemberEdge struct {
	Cursor string      `json:"cursor"`
	Node   *ClubMember `json:"node"`
}

type ClubRemovedSuspensionLog struct {
	// The ID linked to this suspension log.
	ID relay.ID `json:"id"`
	// The account that removed this suspension.
	Account *Account `json:"account"`
}

func (ClubRemovedSuspensionLog) IsClubSuspensionLog() {}

// The club slug alias
type ClubSlugAlias struct {
	// The slug alias
	Slug string `json:"slug"`
}

type ClubSuspension struct {
	// When the suspension expires. Can call UnSuspendClub when time = now.
	Expires time.Time `json:"expires"`
}

type ClubSuspensionLogConnection struct {
	Edges    []*ClubSuspensionLogEdge `json:"edges"`
	PageInfo *relay.PageInfo          `json:"pageInfo"`
}

type ClubSuspensionLogEdge struct {
	Cursor string            `json:"cursor"`
	Node   ClubSuspensionLog `json:"node"`
}

// Create club.
type CreateClubInput struct {
	// The chosen slug for the club.
	//
	// Validation: Max 25 characters. No spaces allowed. Alphanumeric characters.
	Slug string `json:"slug"`
	// The chosen name for the club.
	//
	// Validation: Max 25 characters.
	Name string `json:"name"`
}

// Payload for a new club
type CreateClubPayload struct {
	// The club after creation
	Club *Club `json:"club"`
	// Validation for creating a new club
	Validation *CreateClubValidation `json:"validation"`
}

// Join a club input.
type JoinClubInput struct {
	// The chosen club ID.
	ClubID relay.ID `json:"clubId"`
}

// Payload for a new club member
type JoinClubPayload struct {
	// The membership after creation
	ClubMember *ClubMember `json:"clubMember"`
}

// Leave a club.
type LeaveClubInput struct {
	// The chosen club ID.
	ClubID relay.ID `json:"clubId"`
}

// Payload for leaving a club
type LeaveClubPayload struct {
	// The club membership that was removed
	ClubMemberID relay.ID `json:"clubMemberId"`
}

// Update alias slug to default.
type PromoteClubSlugAliasToDefaultInput struct {
	// The club to update
	ID relay.ID `json:"id"`
	// The chosen slug for the club.
	Slug string `json:"slug"`
}

// Payload for a new alt slug
type PromoteClubSlugAliasToDefaultPayload struct {
	// The club after update
	Club *Club `json:"club"`
}

// Remove alias slug.
type RemoveClubSlugAliasInput struct {
	// The club to update
	ID relay.ID `json:"id"`
	// The chosen slug for the club.
	Slug string `json:"slug"`
}

// Payload for a new alt slug
type RemoveClubSlugAliasPayload struct {
	// The club after update
	Club *Club `json:"club"`
}

type Resource struct {
	ID relay.ID `json:"id"`
}

func (Resource) IsEntity() {}

// Suspend the club.
type SuspendClubInput struct {
	// The club to suspend.
	ClubID relay.ID `json:"clubId"`
	// When the suspension should end.
	EndTime time.Time `json:"endTime"`
}

// Suspend club payload.
type SuspendClubPayload struct {
	// The new club after it's suspended.
	Club *Club `json:"club"`
}

// Un-Suspend the club.
type UnSuspendClubInput struct {
	// The club to un-suspend.
	ClubID relay.ID `json:"clubId"`
}

// Un suspend club payload.
type UnSuspendClubPayload struct {
	// The new club after it's not suspended anymore.
	Club *Club `json:"club"`
}

// Update club name.
type UpdateClubNameInput struct {
	// The club to update
	ID relay.ID `json:"id"`
	// The chosen name for the club.
	//
	// Validation: Max 25 characters.
	Name string `json:"name"`
}

// Payload for updating the name
type UpdateClubNamePayload struct {
	// The club after update
	Club *Club `json:"club"`
}

// Update club thumbnail.
type UpdateClubThumbnailInput struct {
	// The club to update
	ID relay.ID `json:"id"`
	// The thumbnail for the club.
	Thumbnail string `json:"thumbnail"`
}

// Payload for updating the thumbnail
type UpdateClubThumbnailPayload struct {
	// The club after update
	Club *Club `json:"club"`
}

// Validation for adding a new slug to a club
type AddClubSlugAliasValidation string

const (
	AddClubSlugAliasValidationSlugTaken AddClubSlugAliasValidation = "SLUG_TAKEN"
)

var AllAddClubSlugAliasValidation = []AddClubSlugAliasValidation{
	AddClubSlugAliasValidationSlugTaken,
}

func (e AddClubSlugAliasValidation) IsValid() bool {
	switch e {
	case AddClubSlugAliasValidationSlugTaken:
		return true
	}
	return false
}

func (e AddClubSlugAliasValidation) String() string {
	return string(e)
}

func (e *AddClubSlugAliasValidation) UnmarshalGQL(v interface{}) error {
	str, ok := v.(string)
	if !ok {
		return fmt.Errorf("enums must be strings")
	}

	*e = AddClubSlugAliasValidation(str)
	if !e.IsValid() {
		return fmt.Errorf("%s is not a valid AddClubSlugAliasValidation", str)
	}
	return nil
}

func (e AddClubSlugAliasValidation) MarshalGQL(w io.Writer) {
	fmt.Fprint(w, strconv.Quote(e.String()))
}

// Properties by which club member connections can be sorted.
type ClubMembersSort string

const (
	// By oldest members
	ClubMembersSortNewest ClubMembersSort = "NEWEST"
)

var AllClubMembersSort = []ClubMembersSort{
	ClubMembersSortNewest,
}

func (e ClubMembersSort) IsValid() bool {
	switch e {
	case ClubMembersSortNewest:
		return true
	}
	return false
}

func (e ClubMembersSort) String() string {
	return string(e)
}

func (e *ClubMembersSort) UnmarshalGQL(v interface{}) error {
	str, ok := v.(string)
	if !ok {
		return fmt.Errorf("enums must be strings")
	}

	*e = ClubMembersSort(str)
	if !e.IsValid() {
		return fmt.Errorf("%s is not a valid ClubMembersSort", str)
	}
	return nil
}

func (e ClubMembersSort) MarshalGQL(w io.Writer) {
	fmt.Fprint(w, strconv.Quote(e.String()))
}

// Reasons a club suspension was created.
type ClubSuspensionReason string

const (
	// Suspension was issued from a post moderation queue.
	ClubSuspensionReasonPostModerationQueue ClubSuspensionReason = "POST_MODERATION_QUEUE"
	// Suspension was issued from a post removal.
	ClubSuspensionReasonPostRemoval ClubSuspensionReason = "POST_REMOVAL"
	// Suspension was issued manually.
	ClubSuspensionReasonManual ClubSuspensionReason = "MANUAL"
)

var AllClubSuspensionReason = []ClubSuspensionReason{
	ClubSuspensionReasonPostModerationQueue,
	ClubSuspensionReasonPostRemoval,
	ClubSuspensionReasonManual,
}

func (e ClubSuspensionReason) IsValid() bool {
	switch e {
	case ClubSuspensionReasonPostModerationQueue, ClubSuspensionReasonPostRemoval, ClubSuspensionReasonManual:
		return true
	}
	return false
}

func (e ClubSuspensionReason) String() string {
	return string(e)
}

func (e *ClubSuspensionReason) UnmarshalGQL(v interface{}) error {
	str, ok := v.(string)
	if !ok {
		return fmt.Errorf("enums must be strings")
	}

	*e = ClubSuspensionReason(str)
	if !e.IsValid() {
		return fmt.Errorf("%s is not a valid ClubSuspensionReason", str)
	}
	return nil
}

func (e ClubSuspensionReason) MarshalGQL(w io.Writer) {
	fmt.Fprint(w, strconv.Quote(e.String()))
}

// Properties by which club connections can be sorted.
type ClubsSort string

const (
	// Clubs by popularity
	ClubsSortPopular ClubsSort = "POPULAR"
)

var AllClubsSort = []ClubsSort{
	ClubsSortPopular,
}

func (e ClubsSort) IsValid() bool {
	switch e {
	case ClubsSortPopular:
		return true
	}
	return false
}

func (e ClubsSort) String() string {
	return string(e)
}

func (e *ClubsSort) UnmarshalGQL(v interface{}) error {
	str, ok := v.(string)
	if !ok {
		return fmt.Errorf("enums must be strings")
	}

	*e = ClubsSort(str)
	if !e.IsValid() {
		return fmt.Errorf("%s is not a valid ClubsSort", str)
	}
	return nil
}

func (e ClubsSort) MarshalGQL(w io.Writer) {
	fmt.Fprint(w, strconv.Quote(e.String()))
}

// Validation for creating a new club
type CreateClubValidation string

const (
	CreateClubValidationSlugTaken CreateClubValidation = "SLUG_TAKEN"
)

var AllCreateClubValidation = []CreateClubValidation{
	CreateClubValidationSlugTaken,
}

func (e CreateClubValidation) IsValid() bool {
	switch e {
	case CreateClubValidationSlugTaken:
		return true
	}
	return false
}

func (e CreateClubValidation) String() string {
	return string(e)
}

func (e *CreateClubValidation) UnmarshalGQL(v interface{}) error {
	str, ok := v.(string)
	if !ok {
		return fmt.Errorf("enums must be strings")
	}

	*e = CreateClubValidation(str)
	if !e.IsValid() {
		return fmt.Errorf("%s is not a valid CreateClubValidation", str)
	}
	return nil
}

func (e CreateClubValidation) MarshalGQL(w io.Writer) {
	fmt.Fprint(w, strconv.Quote(e.String()))
}
