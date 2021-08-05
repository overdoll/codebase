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
	// Posts queue specific to this account (when moderator)
	ModeratorPostsQueue *PostConnection `json:"moderatorPostsQueue"`
	// Contributions specific to this account
	Contributions *PostConnection `json:"contributions"`
	ID            relay.ID        `json:"id"`
}

func (Account) IsEntity() {}

type Audience struct {
	// An ID pointing to this audience.
	ID relay.ID `json:"id"`
	// A url-friendly ID. Should be used when searching
	Slug string `json:"slug"`
	// A URL pointing to the object's thumbnail.
	Thumbnail graphql1.URI `json:"thumbnail"`
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
	Cursor string `json:"cursor"`
	Node   *Brand `json:"node"`
}

type Brand struct {
	// An ID pointing to this brand.
	ID relay.ID `json:"id"`
	// A url-friendly ID. Should be used when searching
	Slug string `json:"slug"`
	// A URL pointing to the object's thumbnail.
	Thumbnail graphql1.URI `json:"thumbnail"`
	// A name for this brand.
	Name string `json:"name"`
	// Posts belonging to this brand
	Posts *PostConnection `json:"posts"`
}

func (Brand) IsNode()   {}
func (Brand) IsObject() {}
func (Brand) IsEntity() {}

type BrandConnection struct {
	Edges    []*BrandEdge    `json:"edges"`
	PageInfo *relay.PageInfo `json:"pageInfo"`
}

type BrandEdge struct {
	Cursor string `json:"cursor"`
	Node   *Brand `json:"node"`
}

type Category struct {
	// An ID pointing to this category.
	ID relay.ID `json:"id"`
	// A url-friendly ID. Should be used when searching
	Slug string `json:"slug"`
	// A URL pointing to the object's thumbnail.
	Thumbnail graphql1.URI `json:"thumbnail"`
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
	Thumbnail graphql1.URI `json:"thumbnail"`
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

type Content struct {
	URL graphql1.URI `json:"url"`
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
	// Content belonging to this post
	Content []*Content `json:"content"`
	// The date and time of when this post was created
	CreatedAt time.Time `json:"createdAt"`
	// The date and time of when this post was posted
	PostedAt time.Time `json:"postedAt"`
	// The date at which this pending post will be reassigned
	ReassignmentAt time.Time `json:"reassignmentAt"`
	// Represents the audience that this post belongs to
	Audience *Audience `json:"audience"`
	// Represents the brand that this post belongs to
	Brand *Brand `json:"brand"`
	// Categories that belong to this post
	Categories []*Category `json:"categories"`
	// Characters that belong to this post
	Characters []*Character `json:"characters"`
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

type Series struct {
	// An ID pointing to this media.
	ID relay.ID `json:"id"`
	// A url-friendly ID. Should be used when searching
	Slug string `json:"slug"`
	// A URL pointing to the object's thumbnail.
	Thumbnail graphql1.URI `json:"thumbnail"`
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

// Update post brand.
type UpdatePostBrandInput struct {
	// The post to update
	ID relay.ID `json:"id"`
	// The brand that this post belongs to
	BrandID relay.ID `json:"brandId"`
}

// Payload for updating a post
type UpdatePostBrandPayload struct {
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

type PostState string

const (
	PostStateDraft      PostState = "Draft"
	PostStatePublishing PostState = "Publishing"
	PostStateReview     PostState = "Review"
	PostStatePublished  PostState = "Published"
	PostStateDiscarding PostState = "Discarding"
	PostStateDiscarded  PostState = "Discarded"
	PostStateRejected   PostState = "Rejected"
	PostStateProcessing PostState = "Processing"
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
}

func (e PostState) IsValid() bool {
	switch e {
	case PostStateDraft, PostStatePublishing, PostStateReview, PostStatePublished, PostStateDiscarding, PostStateDiscarded, PostStateRejected, PostStateProcessing:
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
