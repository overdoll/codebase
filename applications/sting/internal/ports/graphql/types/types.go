// Code generated by github.com/99designs/gqlgen, DO NOT EDIT.

package types

import (
	"fmt"
	"io"
	graphql1 "overdoll/libraries/graphql"
	"overdoll/libraries/graphql/relay"
	"strconv"
	"time"
)

// Represents an account
type Object interface {
	IsObject()
}

type Account struct {
	// Maximum amount of clubs that you can join as an account.
	ClubMembershipLimit int `json:"clubMembershipLimit"`
	// Current count of club memberships. Should be compared against the limit before joining a club.
	ClubMembershipsCount int `json:"clubMembershipsCount"`
	// Represents the clubs that the account has write access to.
	Clubs *ClubConnection `json:"clubs"`
	// Represents the club memberships that the account has.
	ClubMemberships *ClubMemberConnection `json:"clubMemberships"`
	// Posts queue specific to this account (when moderator)
	ModeratorPostsQueue *PostConnection `json:"moderatorPostsQueue"`
	// Contributions specific to this account
	Posts *PostConnection `json:"posts"`
	ID    relay.ID        `json:"id"`
}

func (Account) IsEntity() {}

// Add alias slug.
type AddClubSlugAliasInput struct {
	// The club to update
	ID relay.ID `json:"id"`
	// The chosen slug for the club.
	Slug string `json:"slug"`
}

// Payload for a new alt slug
type AddClubSlugAliasPayload struct {
	// The club after update
	Club *Club `json:"club"`
}

type Audience struct {
	// An ID pointing to this audience.
	ID relay.ID `json:"id"`
	// A url-friendly ID. Should be used when searching
	Slug string `json:"slug"`
	// A URL pointing to the object's thumbnail.
	Thumbnail *Resource `json:"thumbnail"`
	// A title for this audience.
	Title string `json:"title"`
	// Posts belonging to this audience
	Posts *PostConnection `json:"posts"`
}

func (Audience) IsNode()   {}
func (Audience) IsObject() {}
func (Audience) IsEntity() {}

type AudienceConnection struct {
	Edges    []*AudienceEdge `json:"edges"`
	PageInfo *relay.PageInfo `json:"pageInfo"`
}

type AudienceEdge struct {
	Cursor string    `json:"cursor"`
	Node   *Audience `json:"node"`
}

// Ordering options for audiences
type AudiencesOrder struct {
	// The field to order audiences by.
	Field AudiencesOrderField `json:"field"`
}

// Become a club member.
type BecomeClubMemberInput struct {
	// The chosen club ID.
	ClubID relay.ID `json:"clubId"`
}

// Payload for a new club member
type BecomeClubMemberPayload struct {
	// The membership after creation
	ClubMember *ClubMember `json:"clubMember"`
}

// Ordering options for categories
type CategoriesOrder struct {
	// The field to order categories by.
	Field CategoriesOrderField `json:"field"`
}

type Category struct {
	// An ID pointing to this category.
	ID relay.ID `json:"id"`
	// A url-friendly ID. Should be used when searching
	Slug string `json:"slug"`
	// A URL pointing to the object's thumbnail.
	Thumbnail *Resource `json:"thumbnail"`
	// A title for this category.
	Title string `json:"title"`
	// Posts belonging to this category
	Posts *PostConnection `json:"posts"`
}

func (Category) IsNode()   {}
func (Category) IsObject() {}
func (Category) IsEntity() {}

type CategoryConnection struct {
	Edges    []*CategoryEdge `json:"edges"`
	PageInfo *relay.PageInfo `json:"pageInfo"`
}

type CategoryEdge struct {
	Cursor string    `json:"cursor"`
	Node   *Category `json:"node"`
}

type Character struct {
	// An ID pointing to this character.
	ID relay.ID `json:"id"`
	// A url-friendly ID. Should be used when searching
	Slug string `json:"slug"`
	// A URL pointing to the object's thumbnail.
	Thumbnail *Resource `json:"thumbnail"`
	// A name for this character.
	Name string `json:"name"`
	// The series linked to this character.
	Series *Series `json:"series"`
	// Posts belonging to this character
	Posts *PostConnection `json:"posts"`
}

func (Character) IsNode()   {}
func (Character) IsObject() {}
func (Character) IsEntity() {}

type CharacterConnection struct {
	Edges    []*CharacterEdge `json:"edges"`
	PageInfo *relay.PageInfo  `json:"pageInfo"`
}

type CharacterEdge struct {
	Cursor string     `json:"cursor"`
	Node   *Character `json:"node"`
}

// Ordering options for characters
type CharactersOrder struct {
	// The field to order characters by.
	Field CharactersOrderField `json:"field"`
}

type Club struct {
	// An ID pointing to this club.
	ID relay.ID `json:"id"`
	// A url-friendly ID. Should be used when searching
	Slug string `json:"slug"`
	// An alias list of slugs. These are valid, as in, you can find the club using the slug. However, it should always be replaced by the default slug.
	SlugAliases []*ClubSlugAlias `json:"slugAliases"`
	// Maximum amount of slug aliases that can be created for this club.
	SlugAliasesLimit int `json:"slugAliasesLimit"`
	// A URL pointing to the object's thumbnail.
	Thumbnail *Resource `json:"thumbnail"`
	// A name for this club.
	Name string `json:"name"`
	// The account that owns this club.
	Owner *Account `json:"owner"`
	// The total amount of members in this club.
	MembersCount int `json:"membersCount"`
	// Whether or not the viewer is a member of this club.
	ViewerMember *ClubMember `json:"viewerMember"`
	// Club members.
	Members *ClubMemberConnection `json:"members"`
	// Posts belonging to this club
	Posts *PostConnection `json:"posts"`
}

func (Club) IsNode()   {}
func (Club) IsObject() {}
func (Club) IsEntity() {}

type ClubConnection struct {
	Edges    []*ClubEdge     `json:"edges"`
	PageInfo *relay.PageInfo `json:"pageInfo"`
}

type ClubEdge struct {
	Cursor string `json:"cursor"`
	Node   *Club  `json:"node"`
}

type ClubMember struct {
	// An ID pointing to this club member.
	ID relay.ID `json:"id"`
	// When the membership was created (when the account originally joined).
	JoinedAt time.Time `json:"joinedAt"`
	// The club that this membership belongs to.
	Club *Club `json:"club"`
	// The account that belongs to this membership.
	Account *Account `json:"account"`
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

// Ordering options for club members
type ClubMembersOrder struct {
	// The field to order clubs by.
	Field ClubMembersOrderField `json:"field"`
}

// The club slug alias
type ClubSlugAlias struct {
	// The slug alias
	Slug string `json:"slug"`
}

// Ordering options for clubs
type ClubsOrder struct {
	// The field to order clubs by.
	Field ClubsOrderField `json:"field"`
}

// Create club.
type CreateClubInput struct {
	// The chosen slug for the club.
	Slug string `json:"slug"`
	// The chosen name for the club.
	Name string `json:"name"`
}

// Payload for a new club
type CreateClubPayload struct {
	// The club after creation
	Club *Club `json:"club"`
}

// Create a new post. A club ID is required.
type CreatePostInput struct {
	// The club ID that this post will belong to
	ClubID relay.ID `json:"clubId"`
}

// Payload for a created pending post
type CreatePostPayload struct {
	// The pending post after the creation
	Post *Post `json:"post"`
}

type Post struct {
	ID relay.ID `json:"id"`
	// The reference of this post. Should always be used to reference this post.
	Reference string `json:"reference"`
	// The state of the post
	State PostState `json:"state"`
	// The moderator to whom this pending post was assigned
	Moderator *Account `json:"moderator"`
	// The contributor who contributed this post
	Contributor *Account `json:"contributor"`
	// DraggableContent belonging to this post
	Content []*Resource `json:"content"`
	// The date and time of when this post was created
	CreatedAt time.Time `json:"createdAt"`
	// The date and time of when this post was posted
	PostedAt *time.Time `json:"postedAt"`
	// The date at which this pending post will be reassigned
	ReassignmentAt *time.Time `json:"reassignmentAt"`
	// Represents the audience that this post belongs to
	Audience *Audience `json:"audience"`
	// Categories that belong to this post
	Categories []*Category `json:"categories"`
	// Characters that belong to this post
	Characters []*Character `json:"characters"`
	// Represents the club that this post belongs to
	Club *Club `json:"club"`
}

func (Post) IsNode()   {}
func (Post) IsEntity() {}

type PostConnection struct {
	Edges    []*PostEdge     `json:"edges"`
	PageInfo *relay.PageInfo `json:"pageInfo"`
}

type PostEdge struct {
	Cursor string `json:"cursor"`
	Node   *Post  `json:"node"`
}

// Ordering options for posts
type PostsOrder struct {
	// The field to order security advisories by.
	Field PostsOrderField `json:"field"`
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

// A resource represents an image or a video format that contains an ID to uniquely identify it,
// and urls to access the resources. We have many urls in order to provide a fallback for older browsers
//
// We also identify the type of resource (image or video) to make it easy to distinguish them
type Resource struct {
	ID   string         `json:"id"`
	Type ResourceType   `json:"type"`
	Urls []*ResourceURL `json:"urls"`
}

// A type representing a url to the resource and the mimetype
type ResourceURL struct {
	URL      graphql1.URI `json:"url"`
	MimeType string       `json:"mimeType"`
}

type Series struct {
	// An ID pointing to this series.
	ID relay.ID `json:"id"`
	// A url-friendly ID. Should be used when searching
	Slug string `json:"slug"`
	// A URL pointing to the object's thumbnail.
	Thumbnail *Resource `json:"thumbnail"`
	// A title for this series.
	Title string `json:"title"`
	// Posts belonging to this series
	Posts *PostConnection `json:"posts"`
}

func (Series) IsNode()   {}
func (Series) IsObject() {}
func (Series) IsEntity() {}

type SeriesConnection struct {
	Edges    []*SeriesEdge   `json:"edges"`
	PageInfo *relay.PageInfo `json:"pageInfo"`
}

type SeriesEdge struct {
	Cursor string  `json:"cursor"`
	Node   *Series `json:"node"`
}

// Ordering options for series
type SeriesOrder struct {
	// The field to order series by.
	Field SeriesOrderField `json:"field"`
}

// Publish post.
type SubmitPostInput struct {
	// The post to publish
	ID relay.ID `json:"id"`
}

// Payload for submitting a post
type SubmitPostPayload struct {
	// The post after being submitted
	Post *Post `json:"post"`
	// Whether or not the submitted post is going in review
	InReview *bool `json:"inReview"`
}

// Update club name.
type UpdateClubNameInput struct {
	// The club to update
	ID relay.ID `json:"id"`
	// The chosen name for the club.
	Name string `json:"name"`
}

// Payload for updating the name
type UpdateClubNamePayload struct {
	// The club after update
	Club *Club `json:"club"`
}

// Update post audience.
type UpdatePostAudienceInput struct {
	// The post to update
	ID relay.ID `json:"id"`
	// The audience that this post belongs to
	AudienceID relay.ID `json:"audienceId"`
}

// Payload for updating a post
type UpdatePostAudiencePayload struct {
	// The post after the update
	Post *Post `json:"post"`
}

// Update post audience.
type UpdatePostCategoriesInput struct {
	// The post to update
	ID relay.ID `json:"id"`
	// Category IDs for this post
	CategoryIds []relay.ID `json:"categoryIds"`
}

// Payload for updating a post
type UpdatePostCategoriesPayload struct {
	// The post after the update
	Post *Post `json:"post"`
}

// Update post characters.
type UpdatePostCharactersInput struct {
	// The post to update
	ID relay.ID `json:"id"`
	// Ids for all the characters
	CharacterIds []relay.ID `json:"characterIds"`
}

// Payload for updating a post
type UpdatePostCharactersPayload struct {
	// The post after the update
	Post *Post `json:"post"`
}

// Payload for updating a post
type UpdatePostClubPayload struct {
	// The post after the update
	Post *Post `json:"post"`
}

// Update post audience.
type UpdatePostContentInput struct {
	// The post to update
	ID relay.ID `json:"id"`
	// Image IDs for the content
	Content []string `json:"content"`
}

// Payload for updating a post
type UpdatePostContentPayload struct {
	// The post after the update
	Post *Post `json:"post"`
}

// Withdraw club membership.
type WithdrawClubMembershipInput struct {
	// The chosen club ID.
	ClubID relay.ID `json:"clubId"`
}

// Payload for withdrawing club membership
type WithdrawClubMembershipPayload struct {
	// The club membership that was removed
	ClubMemberID relay.ID `json:"clubMemberId"`
}

// Properties by which audience connections can be ordered.
type AudiencesOrderField string

const (
	// Audience by created time
	AudiencesOrderFieldCreatedAt AudiencesOrderField = "CREATED_AT"
)

var AllAudiencesOrderField = []AudiencesOrderField{
	AudiencesOrderFieldCreatedAt,
}

func (e AudiencesOrderField) IsValid() bool {
	switch e {
	case AudiencesOrderFieldCreatedAt:
		return true
	}
	return false
}

func (e AudiencesOrderField) String() string {
	return string(e)
}

func (e *AudiencesOrderField) UnmarshalGQL(v interface{}) error {
	str, ok := v.(string)
	if !ok {
		return fmt.Errorf("enums must be strings")
	}

	*e = AudiencesOrderField(str)
	if !e.IsValid() {
		return fmt.Errorf("%s is not a valid AudiencesOrderField", str)
	}
	return nil
}

func (e AudiencesOrderField) MarshalGQL(w io.Writer) {
	fmt.Fprint(w, strconv.Quote(e.String()))
}

// Properties by which category connections can be ordered.
type CategoriesOrderField string

const (
	// Category by created time
	CategoriesOrderFieldCreatedAt CategoriesOrderField = "CREATED_AT"
)

var AllCategoriesOrderField = []CategoriesOrderField{
	CategoriesOrderFieldCreatedAt,
}

func (e CategoriesOrderField) IsValid() bool {
	switch e {
	case CategoriesOrderFieldCreatedAt:
		return true
	}
	return false
}

func (e CategoriesOrderField) String() string {
	return string(e)
}

func (e *CategoriesOrderField) UnmarshalGQL(v interface{}) error {
	str, ok := v.(string)
	if !ok {
		return fmt.Errorf("enums must be strings")
	}

	*e = CategoriesOrderField(str)
	if !e.IsValid() {
		return fmt.Errorf("%s is not a valid CategoriesOrderField", str)
	}
	return nil
}

func (e CategoriesOrderField) MarshalGQL(w io.Writer) {
	fmt.Fprint(w, strconv.Quote(e.String()))
}

// Properties by which character connections can be ordered.
type CharactersOrderField string

const (
	// Character by created time
	CharactersOrderFieldCreatedAt CharactersOrderField = "CREATED_AT"
)

var AllCharactersOrderField = []CharactersOrderField{
	CharactersOrderFieldCreatedAt,
}

func (e CharactersOrderField) IsValid() bool {
	switch e {
	case CharactersOrderFieldCreatedAt:
		return true
	}
	return false
}

func (e CharactersOrderField) String() string {
	return string(e)
}

func (e *CharactersOrderField) UnmarshalGQL(v interface{}) error {
	str, ok := v.(string)
	if !ok {
		return fmt.Errorf("enums must be strings")
	}

	*e = CharactersOrderField(str)
	if !e.IsValid() {
		return fmt.Errorf("%s is not a valid CharactersOrderField", str)
	}
	return nil
}

func (e CharactersOrderField) MarshalGQL(w io.Writer) {
	fmt.Fprint(w, strconv.Quote(e.String()))
}

// Properties by which club member connections can be ordered.
type ClubMembersOrderField string

const (
	// By joined at
	ClubMembersOrderFieldJoinedAt ClubMembersOrderField = "JOINED_AT"
)

var AllClubMembersOrderField = []ClubMembersOrderField{
	ClubMembersOrderFieldJoinedAt,
}

func (e ClubMembersOrderField) IsValid() bool {
	switch e {
	case ClubMembersOrderFieldJoinedAt:
		return true
	}
	return false
}

func (e ClubMembersOrderField) String() string {
	return string(e)
}

func (e *ClubMembersOrderField) UnmarshalGQL(v interface{}) error {
	str, ok := v.(string)
	if !ok {
		return fmt.Errorf("enums must be strings")
	}

	*e = ClubMembersOrderField(str)
	if !e.IsValid() {
		return fmt.Errorf("%s is not a valid ClubMembersOrderField", str)
	}
	return nil
}

func (e ClubMembersOrderField) MarshalGQL(w io.Writer) {
	fmt.Fprint(w, strconv.Quote(e.String()))
}

// Properties by which club connections can be ordered.
type ClubsOrderField string

const (
	// Club by created time
	ClubsOrderFieldCreatedAt ClubsOrderField = "CREATED_AT"
)

var AllClubsOrderField = []ClubsOrderField{
	ClubsOrderFieldCreatedAt,
}

func (e ClubsOrderField) IsValid() bool {
	switch e {
	case ClubsOrderFieldCreatedAt:
		return true
	}
	return false
}

func (e ClubsOrderField) String() string {
	return string(e)
}

func (e *ClubsOrderField) UnmarshalGQL(v interface{}) error {
	str, ok := v.(string)
	if !ok {
		return fmt.Errorf("enums must be strings")
	}

	*e = ClubsOrderField(str)
	if !e.IsValid() {
		return fmt.Errorf("%s is not a valid ClubsOrderField", str)
	}
	return nil
}

func (e ClubsOrderField) MarshalGQL(w io.Writer) {
	fmt.Fprint(w, strconv.Quote(e.String()))
}

type PostState string

const (
	PostStateDraft      PostState = "DRAFT"
	PostStatePublishing PostState = "PUBLISHING"
	PostStateReview     PostState = "REVIEW"
	PostStatePublished  PostState = "PUBLISHED"
	PostStateDiscarding PostState = "DISCARDING"
	PostStateDiscarded  PostState = "DISCARDED"
	PostStateRejected   PostState = "REJECTED"
	PostStateProcessing PostState = "PROCESSING"
	PostStateRemoving   PostState = "REMOVING"
	PostStateRemoved    PostState = "REMOVED"
)

var AllPostState = []PostState{
	PostStateDraft,
	PostStatePublishing,
	PostStateReview,
	PostStatePublished,
	PostStateDiscarding,
	PostStateDiscarded,
	PostStateRejected,
	PostStateProcessing,
	PostStateRemoving,
	PostStateRemoved,
}

func (e PostState) IsValid() bool {
	switch e {
	case PostStateDraft, PostStatePublishing, PostStateReview, PostStatePublished, PostStateDiscarding, PostStateDiscarded, PostStateRejected, PostStateProcessing, PostStateRemoving, PostStateRemoved:
		return true
	}
	return false
}

func (e PostState) String() string {
	return string(e)
}

func (e *PostState) UnmarshalGQL(v interface{}) error {
	str, ok := v.(string)
	if !ok {
		return fmt.Errorf("enums must be strings")
	}

	*e = PostState(str)
	if !e.IsValid() {
		return fmt.Errorf("%s is not a valid PostState", str)
	}
	return nil
}

func (e PostState) MarshalGQL(w io.Writer) {
	fmt.Fprint(w, strconv.Quote(e.String()))
}

// Properties by which posts connections can be ordered.
type PostsOrderField string

const (
	// Posts by update time
	PostsOrderFieldCreatedAt PostsOrderField = "CREATED_AT"
)

var AllPostsOrderField = []PostsOrderField{
	PostsOrderFieldCreatedAt,
}

func (e PostsOrderField) IsValid() bool {
	switch e {
	case PostsOrderFieldCreatedAt:
		return true
	}
	return false
}

func (e PostsOrderField) String() string {
	return string(e)
}

func (e *PostsOrderField) UnmarshalGQL(v interface{}) error {
	str, ok := v.(string)
	if !ok {
		return fmt.Errorf("enums must be strings")
	}

	*e = PostsOrderField(str)
	if !e.IsValid() {
		return fmt.Errorf("%s is not a valid PostsOrderField", str)
	}
	return nil
}

func (e PostsOrderField) MarshalGQL(w io.Writer) {
	fmt.Fprint(w, strconv.Quote(e.String()))
}

// Identifies the type of resource
type ResourceType string

const (
	ResourceTypeImage ResourceType = "IMAGE"
	ResourceTypeVideo ResourceType = "VIDEO"
)

var AllResourceType = []ResourceType{
	ResourceTypeImage,
	ResourceTypeVideo,
}

func (e ResourceType) IsValid() bool {
	switch e {
	case ResourceTypeImage, ResourceTypeVideo:
		return true
	}
	return false
}

func (e ResourceType) String() string {
	return string(e)
}

func (e *ResourceType) UnmarshalGQL(v interface{}) error {
	str, ok := v.(string)
	if !ok {
		return fmt.Errorf("enums must be strings")
	}

	*e = ResourceType(str)
	if !e.IsValid() {
		return fmt.Errorf("%s is not a valid ResourceType", str)
	}
	return nil
}

func (e ResourceType) MarshalGQL(w io.Writer) {
	fmt.Fprint(w, strconv.Quote(e.String()))
}

// Properties by which series connections can be ordered.
type SeriesOrderField string

const (
	// Series by created time
	SeriesOrderFieldCreatedAt SeriesOrderField = "CREATED_AT"
)

var AllSeriesOrderField = []SeriesOrderField{
	SeriesOrderFieldCreatedAt,
}

func (e SeriesOrderField) IsValid() bool {
	switch e {
	case SeriesOrderFieldCreatedAt:
		return true
	}
	return false
}

func (e SeriesOrderField) String() string {
	return string(e)
}

func (e *SeriesOrderField) UnmarshalGQL(v interface{}) error {
	str, ok := v.(string)
	if !ok {
		return fmt.Errorf("enums must be strings")
	}

	*e = SeriesOrderField(str)
	if !e.IsValid() {
		return fmt.Errorf("%s is not a valid SeriesOrderField", str)
	}
	return nil
}

func (e SeriesOrderField) MarshalGQL(w io.Writer) {
	fmt.Fprint(w, strconv.Quote(e.String()))
}
