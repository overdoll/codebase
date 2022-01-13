// Code generated by github.com/99designs/gqlgen, DO NOT EDIT.

package types

import (
	"fmt"
	"io"
	"overdoll/libraries/graphql/relay"
	"strconv"
	"time"
)

type Account struct {
	// The curation profile linked to this account.
	CurationProfile *CurationProfile `json:"curationProfile"`
	// Posts feed for the clubs that the account currently is a member of.
	ClubMembersPostsFeed *PostConnection `json:"clubMembersPostsFeed"`
	// Posts queue specific to this account (when moderator)
	ModeratorPostsQueue *PostConnection `json:"moderatorPostsQueue"`
	// Contributions specific to this account
	Posts *PostConnection `json:"posts"`
	ID    relay.ID        `json:"id"`
}

func (Account) IsEntity() {}

type Audience struct {
	// An ID pointing to this audience.
	ID relay.ID `json:"id"`
	// A url-friendly ID. Should be used when searching.
	Slug string `json:"slug"`
	// A URL pointing to the object's thumbnail.
	Thumbnail *Resource `json:"thumbnail"`
	// A title for this audience.
	Title string `json:"title"`
	// Total amount of likes.
	TotalLikes int `json:"totalLikes"`
	// Total amount of posts.
	TotalPosts int `json:"totalPosts"`
	// Posts belonging to this audience
	Posts *PostConnection `json:"posts"`
}

func (Audience) IsNode()   {}
func (Audience) IsEntity() {}

type AudienceConnection struct {
	Edges    []*AudienceEdge `json:"edges"`
	PageInfo *relay.PageInfo `json:"pageInfo"`
}

type AudienceCurationProfile struct {
	// Whether or not the audience section was completed.
	Completed bool `json:"completed"`
	// Whether or not the audience section was skipped.
	Skipped bool `json:"skipped"`
	// Audiences selected for this section.
	Audiences []*Audience `json:"audiences"`
}

type AudienceEdge struct {
	Cursor string    `json:"cursor"`
	Node   *Audience `json:"node"`
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
	// Total amount of likes.
	TotalLikes int `json:"totalLikes"`
	// Total amount of posts.
	TotalPosts int `json:"totalPosts"`
	// Posts belonging to this category
	Posts *PostConnection `json:"posts"`
}

func (Category) IsNode()   {}
func (Category) IsEntity() {}

type CategoryConnection struct {
	Edges    []*CategoryEdge `json:"edges"`
	PageInfo *relay.PageInfo `json:"pageInfo"`
}

type CategoryCurationProfile struct {
	// Whether or not the category section was completed.
	Completed bool `json:"completed"`
	// Whether or not the category section was skipped.
	Skipped bool `json:"skipped"`
	// Categories selected for this section.
	Categories []*Category `json:"categories"`
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
	// Total amount of likes.
	TotalLikes int `json:"totalLikes"`
	// Total amount of posts.
	TotalPosts int `json:"totalPosts"`
	// The series linked to this character.
	Series *Series `json:"series"`
	// Posts belonging to this character
	Posts *PostConnection `json:"posts"`
}

func (Character) IsNode()   {}
func (Character) IsEntity() {}

type CharacterConnection struct {
	Edges    []*CharacterEdge `json:"edges"`
	PageInfo *relay.PageInfo  `json:"pageInfo"`
}

type CharacterEdge struct {
	Cursor string     `json:"cursor"`
	Node   *Character `json:"node"`
}

type Club struct {
	// Posts belonging to this club
	Posts *PostConnection `json:"posts"`
	ID    relay.ID        `json:"id"`
}

func (Club) IsEntity() {}

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

type CurationProfile struct {
	// An ID uniquely identifying this profile.
	ID relay.ID `json:"id"`
	// If the whole profile was completed or not.
	Completed bool `json:"completed"`
	// The date of birth profile.
	DateOfBirth *DateOfBirthCurationProfile `json:"dateOfBirth"`
	// The audience profile.
	Audience *AudienceCurationProfile `json:"audience"`
	// The category profile.
	Category *CategoryCurationProfile `json:"category"`
}

type DateOfBirthCurationProfile struct {
	// Whether or not the date of birth section was skipped.
	Skipped bool `json:"skipped"`
	// Whether or not the date of birth section was completed.
	Completed bool `json:"completed"`
	// The date of birth set.
	DateOfBirth *time.Time `json:"dateOfBirth"`
}

// Like a post.
type LikePostInput struct {
	// The post ID that you want to like
	PostID relay.ID `json:"postId"`
}

// Payload for the liked post
type LikePostPayload struct {
	// The new PostLike entry.
	PostLike *PostLike `json:"postLike"`
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
	// The club belonging to the post
	Club *Club `json:"club"`
	// Content belonging to this post
	Content []*Resource `json:"content"`
	// The date and time of when this post was created
	CreatedAt time.Time `json:"createdAt"`
	// The date and time of when this post was posted
	PostedAt *time.Time `json:"postedAt"`
	// The date at which this pending post will be reassigned
	ReassignmentAt *time.Time `json:"reassignmentAt"`
	// Suggested posts for this post.
	SuggestedPosts *PostConnection `json:"suggestedPosts"`
	// Represents the audience that this post belongs to
	Audience *Audience `json:"audience"`
	// Categories that belong to this post
	Categories []*Category `json:"categories"`
	// Characters that belong to this post
	Characters []*Character `json:"characters"`
	// The amount of likes on this post.
	Likes int `json:"likes"`
	// Whether or not the viewer liked this post.
	ViewerLiked *PostLike `json:"viewerLiked"`
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

type PostLike struct {
	// An ID uniquely identifying this like.
	ID relay.ID `json:"id"`
	// The time and date at which the post was liked.
	LikedAt time.Time `json:"likedAt"`
	// The post this like belongs to.
	Post *Post `json:"post"`
	// The account this like belongs to
	Account *Account `json:"account"`
}

func (PostLike) IsNode()   {}
func (PostLike) IsEntity() {}

type Resource struct {
	ID relay.ID `json:"id"`
}

func (Resource) IsEntity() {}

type Series struct {
	// An ID pointing to this series.
	ID relay.ID `json:"id"`
	// A url-friendly ID. Should be used when searching
	Slug string `json:"slug"`
	// A URL pointing to the object's thumbnail.
	Thumbnail *Resource `json:"thumbnail"`
	// A title for this series.
	Title string `json:"title"`
	// Total amount of likes.
	TotalLikes int `json:"totalLikes"`
	// Total amount of posts.
	TotalPosts int `json:"totalPosts"`
	// Posts belonging to this series
	Posts *PostConnection `json:"posts"`
}

func (Series) IsNode()   {}
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

// Undo like on a post.
type UndoLikePostInput struct {
	// The post ID that you want to unlike
	PostID relay.ID `json:"postId"`
}

// Payload for undoing a post like
type UndoLikePostPayload struct {
	// The post like that was deleted.
	PostLikeID *relay.ID `json:"postLikeId"`
}

// Update curation profile audience.
type UpdateCurationProfileAudienceInput struct {
	// The audiences that were selected
	AudienceIds []relay.ID `json:"audienceIds"`
	// Whether or not this section was skipped
	Skipped bool `json:"skipped"`
}

// Payload for updating profile audience
type UpdateCurationProfileAudiencePayload struct {
	// The updated profile.
	CurationProfile *CurationProfile `json:"curationProfile"`
}

// Update curation profile category.
type UpdateCurationProfileCategoryInput struct {
	// The categories that were selected
	CategoryIds []relay.ID `json:"categoryIds"`
	// Whether or not this section was skipped
	Skipped bool `json:"skipped"`
}

// Payload for updating profile category
type UpdateCurationProfileCategoryPayload struct {
	// The updated profile.
	CurationProfile *CurationProfile `json:"curationProfile"`
}

// Update curation profile date of birth.
type UpdateCurationProfileDateOfBirthInput struct {
	// The date of birth that was selected
	DateOfBirth *time.Time `json:"dateOfBirth"`
	// Whether or not this section was skipped
	Skipped bool `json:"skipped"`
}

// Payload for updating profile date of birth
type UpdateCurationProfileDateOfBirthPayload struct {
	// The updated profile.
	CurationProfile *CurationProfile `json:"curationProfile"`
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

// Properties by which audience connections can be sorted.
type AudiencesSort string

const (
	// Audience by newest first
	AudiencesSortNew AudiencesSort = "NEW"
	// Audience by top likes
	AudiencesSortTop AudiencesSort = "TOP"
	// Audience by most posts
	AudiencesSortPopular AudiencesSort = "POPULAR"
)

var AllAudiencesSort = []AudiencesSort{
	AudiencesSortNew,
	AudiencesSortTop,
	AudiencesSortPopular,
}

func (e AudiencesSort) IsValid() bool {
	switch e {
	case AudiencesSortNew, AudiencesSortTop, AudiencesSortPopular:
		return true
	}
	return false
}

func (e AudiencesSort) String() string {
	return string(e)
}

func (e *AudiencesSort) UnmarshalGQL(v interface{}) error {
	str, ok := v.(string)
	if !ok {
		return fmt.Errorf("enums must be strings")
	}

	*e = AudiencesSort(str)
	if !e.IsValid() {
		return fmt.Errorf("%s is not a valid AudiencesSort", str)
	}
	return nil
}

func (e AudiencesSort) MarshalGQL(w io.Writer) {
	fmt.Fprint(w, strconv.Quote(e.String()))
}

// Properties by which categories connections can be sorted.
type CategoriesSort string

const (
	// Categories by newest first
	CategoriesSortNew CategoriesSort = "NEW"
	// Categories by top likes
	CategoriesSortTop CategoriesSort = "TOP"
	// Categories by most posts
	CategoriesSortPopular CategoriesSort = "POPULAR"
)

var AllCategoriesSort = []CategoriesSort{
	CategoriesSortNew,
	CategoriesSortTop,
	CategoriesSortPopular,
}

func (e CategoriesSort) IsValid() bool {
	switch e {
	case CategoriesSortNew, CategoriesSortTop, CategoriesSortPopular:
		return true
	}
	return false
}

func (e CategoriesSort) String() string {
	return string(e)
}

func (e *CategoriesSort) UnmarshalGQL(v interface{}) error {
	str, ok := v.(string)
	if !ok {
		return fmt.Errorf("enums must be strings")
	}

	*e = CategoriesSort(str)
	if !e.IsValid() {
		return fmt.Errorf("%s is not a valid CategoriesSort", str)
	}
	return nil
}

func (e CategoriesSort) MarshalGQL(w io.Writer) {
	fmt.Fprint(w, strconv.Quote(e.String()))
}

// Properties by which character connections can be sorted.
type CharactersSort string

const (
	// Characters by newest first
	CharactersSortNew CharactersSort = "NEW"
	// Characters by top likes
	CharactersSortTop CharactersSort = "TOP"
	// Characters by most posts
	CharactersSortPopular CharactersSort = "POPULAR"
)

var AllCharactersSort = []CharactersSort{
	CharactersSortNew,
	CharactersSortTop,
	CharactersSortPopular,
}

func (e CharactersSort) IsValid() bool {
	switch e {
	case CharactersSortNew, CharactersSortTop, CharactersSortPopular:
		return true
	}
	return false
}

func (e CharactersSort) String() string {
	return string(e)
}

func (e *CharactersSort) UnmarshalGQL(v interface{}) error {
	str, ok := v.(string)
	if !ok {
		return fmt.Errorf("enums must be strings")
	}

	*e = CharactersSort(str)
	if !e.IsValid() {
		return fmt.Errorf("%s is not a valid CharactersSort", str)
	}
	return nil
}

func (e CharactersSort) MarshalGQL(w io.Writer) {
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

// Properties by which posts connections can be sorted.
type PostsSort string

const (
	// Posts by newest first
	PostsSortNew PostsSort = "NEW"
	// Posts by top likes
	PostsSortTop PostsSort = "TOP"
)

var AllPostsSort = []PostsSort{
	PostsSortNew,
	PostsSortTop,
}

func (e PostsSort) IsValid() bool {
	switch e {
	case PostsSortNew, PostsSortTop:
		return true
	}
	return false
}

func (e PostsSort) String() string {
	return string(e)
}

func (e *PostsSort) UnmarshalGQL(v interface{}) error {
	str, ok := v.(string)
	if !ok {
		return fmt.Errorf("enums must be strings")
	}

	*e = PostsSort(str)
	if !e.IsValid() {
		return fmt.Errorf("%s is not a valid PostsSort", str)
	}
	return nil
}

func (e PostsSort) MarshalGQL(w io.Writer) {
	fmt.Fprint(w, strconv.Quote(e.String()))
}

// Properties by which series connections can be sorted.
type SeriesSort string

const (
	// Series by newest first
	SeriesSortNew SeriesSort = "NEW"
	// Series by top likes
	SeriesSortTop SeriesSort = "TOP"
	// Series by most posts
	SeriesSortPopular SeriesSort = "POPULAR"
)

var AllSeriesSort = []SeriesSort{
	SeriesSortNew,
	SeriesSortTop,
	SeriesSortPopular,
}

func (e SeriesSort) IsValid() bool {
	switch e {
	case SeriesSortNew, SeriesSortTop, SeriesSortPopular:
		return true
	}
	return false
}

func (e SeriesSort) String() string {
	return string(e)
}

func (e *SeriesSort) UnmarshalGQL(v interface{}) error {
	str, ok := v.(string)
	if !ok {
		return fmt.Errorf("enums must be strings")
	}

	*e = SeriesSort(str)
	if !e.IsValid() {
		return fmt.Errorf("%s is not a valid SeriesSort", str)
	}
	return nil
}

func (e SeriesSort) MarshalGQL(w io.Writer) {
	fmt.Fprint(w, strconv.Quote(e.String()))
}
