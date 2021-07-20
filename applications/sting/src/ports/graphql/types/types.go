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
	// Artist status for this account
	Artist *Artist `json:"artist"`
	// Posts queue specific to this account (when moderator)
	ModeratorPostsQueue *PostConnection `json:"moderatorPostsQueue"`
	// Posts specific to this account
	Posts *PostConnection `json:"posts"`
	// Contributions specific to this account
	Contributions *PostConnection `json:"contributions"`
	ID            relay.ID        `json:"id"`
}

func (Account) IsEntity() {}

type Artist struct {
	ID              relay.ID `json:"id"`
	DoNotPostReason *string  `json:"doNotPostReason"`
}

func (Artist) IsNode()   {}
func (Artist) IsEntity() {}

type Category struct {
	// An ID pointing to this category.
	ID relay.ID `json:"id"`
	// A URL pointing to the object's thumbnail.
	Thumbnail graphql1.URI `json:"thumbnail"`
	// A title for this category.
	Title string `json:"title"`
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
	// A URL pointing to the object's thumbnail.
	Thumbnail graphql1.URI `json:"thumbnail"`
	// A name for this character.
	Name string `json:"name"`
	// The media linked to this character.
	Media *Media `json:"media"`
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

type CharacterRequest struct {
	Name  string `json:"name"`
	Media string `json:"media"`
}

type CharacterRequestType struct {
	Name  string `json:"name"`
	Media string `json:"media"`
}

type Content struct {
	URL graphql1.URI `json:"url"`
}

// Create pending post.
type CreatePostInput struct {
	// Image IDs for the content
	Content []string `json:"content"`
	// Category IDs for this post
	CategoryIds []string `json:"categoryIds"`
	// Ids for all the characters
	CharacterIds []string `json:"characterIds"`
	// Requests (custom)
	MediaRequests     []string            `json:"mediaRequests"`
	CharacterRequests []*CharacterRequest `json:"characterRequests"`
	// Existing artist's ID
	ExistingArtist *relay.ID `json:"existingArtist"`
	// Custom Artist's username
	CustomArtistUsername *string `json:"customArtistUsername"`
	// The author of this post is the artist, as well as contributor
	PosterIsArtist *bool `json:"posterIsArtist"`
}

// Payload for a created pending post
type CreatePostPayload struct {
	// The pending post after the creation
	Post *Post `json:"post"`
	// If this pending post will be in review or not
	Review *bool `json:"review"`
}

type Media struct {
	// An ID pointing to this media.
	ID relay.ID `json:"id"`
	// A URL pointing to the object's thumbnail.
	Thumbnail graphql1.URI `json:"thumbnail"`
	// A title for this media.
	Title string `json:"title"`
}

func (Media) IsNode()   {}
func (Media) IsObject() {}
func (Media) IsEntity() {}

type MediaConnection struct {
	Edges    []*MediaEdge    `json:"edges"`
	PageInfo *relay.PageInfo `json:"pageInfo"`
}

type MediaEdge struct {
	Cursor string `json:"cursor"`
	Node   *Media `json:"node"`
}

type Post struct {
	ID relay.ID `json:"id"`
	// The reference of this post. Should always be used to reference this post.
	Reference string `json:"reference"`
	// The state of the post
	State PostState `json:"state"`
	// Represents the account that this post belongs to
	Artist *Account `json:"artist"`
	// The moderator to whom this pending post was assigned
	Moderator *Account `json:"moderator"`
	// The contributor who contributed this post
	Contributor *Account `json:"contributor"`
	// Content belonging to this post
	Content []*Content `json:"content"`
	// The media that was requested.
	MediaRequests []string `json:"mediaRequests"`
	// The characters that were requested
	CharacterRequests []*CharacterRequestType `json:"characterRequests"`
	// The date and time of when this post was created
	PostedAt time.Time `json:"postedAt"`
	// The date at which this pending post will be reassigned
	ReassignmentAt time.Time `json:"reassignmentAt"`
	// Categories that belong to this post
	Categories []*Category `json:"categories"`
	// Characters that belong to this post
	Characters []*Character `json:"characters"`
}

func (Post) IsNode()   {}
func (Post) IsEntity() {}

type PostAuditLog struct {
	ID   relay.ID `json:"id"`
	Post *Post    `json:"post"`
}

func (PostAuditLog) IsEntity() {}

type PostConnection struct {
	Edges    []*PostEdge     `json:"edges"`
	PageInfo *relay.PageInfo `json:"pageInfo"`
}

type PostEdge struct {
	Cursor string `json:"cursor"`
	Node   *Post  `json:"node"`
}

type PostState string

const (
	PostStatePublishing PostState = "Publishing"
	PostStateReview     PostState = "Review"
	PostStatePublished  PostState = "Published"
	PostStateDiscarding PostState = "Discarding"
	PostStateDiscarded  PostState = "Discarded"
	PostStateRejected   PostState = "Rejected"
	PostStateProcessing PostState = "Processing"
)

var AllPostState = []PostState{
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
	case PostStatePublishing, PostStateReview, PostStatePublished, PostStateDiscarding, PostStateDiscarded, PostStateRejected, PostStateProcessing:
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
