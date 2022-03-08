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
	// Contributions specific to this account
	Posts *PostConnection `json:"posts"`
	ID    relay.ID        `json:"id"`
}

func (Account) IsEntity() {}

// Add post content.
type AddPostContentInput struct {
	// The post to update
	ID relay.ID `json:"id"`
	// Image IDs for the content
	Content []string `json:"content"`
}

// Payload for updating a post
type AddPostContentPayload struct {
	// The post after the update
	Post *Post `json:"post"`
}

// Archive post.
type ArchivePostInput struct {
	// The post to archive
	ID relay.ID `json:"id"`
}

// Payload for archiving a post
type ArchivePostPayload struct {
	// The archived post.
	Post *Post `json:"post"`
}

type Audience struct {
	// An ID pointing to this audience.
	ID relay.ID `json:"id"`
	// A url-friendly ID. Should be used when searching.
	Slug string `json:"slug"`
	// A URL pointing to the object's thumbnail.
	Thumbnail *Resource `json:"thumbnail"`
	// A title for this audience.
	Title string `json:"title"`
	// If this audience is standard or not.
	Standard bool `json:"standard"`
	// All translations for this title.
	TitleTranslations []*Translation `json:"titleTranslations"`
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
	// All translations for this title.
	TitleTranslations []*Translation `json:"titleTranslations"`
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
	// All translations for this name.
	NameTranslations []*Translation `json:"nameTranslations"`
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

// Create a new audience.
type CreateAudienceInput struct {
	// The chosen slug for the audience.
	Slug string `json:"slug"`
	// The chosen title for the audience.
	Title string `json:"title"`
	// If the audience is standard or not.
	Standard bool `json:"standard"`
}

// Payload for a new audience
type CreateAudiencePayload struct {
	// The audience after creation
	Audience *Audience `json:"audience"`
	// Validation for creating a new audience
	Validation *CreateAudienceValidation `json:"validation"`
}

// Create a new category.
type CreateCategoryInput struct {
	// The chosen slug for the category.
	Slug string `json:"slug"`
	// The chosen title for the category.
	Title string `json:"title"`
}

// Payload for a new category
type CreateCategoryPayload struct {
	// The category after creation
	Category *Category `json:"category"`
	// Validation for creating a new category
	Validation *CreateCategoryValidation `json:"validation"`
}

// Create a new character.
type CreateCharacterInput struct {
	// The chosen series for the character.
	SeriesID relay.ID `json:"seriesId"`
	// The chosen slug for the character.
	Slug string `json:"slug"`
	// The chosen name for the character.
	Name string `json:"name"`
}

// Payload for a new character
type CreateCharacterPayload struct {
	// The character after creation
	Character *Character `json:"character"`
	// Validation for creating a new character
	Validation *CreateCharacterValidation `json:"validation"`
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

// Create a new series.
type CreateSeriesInput struct {
	// The chosen slug for the series.
	Slug string `json:"slug"`
	// The chosen title for the series.
	Title string `json:"title"`
}

// Payload for a new series
type CreateSeriesPayload struct {
	// The series after creation
	Series *Series `json:"series"`
	// Validation for creating a new series
	Validation *CreateSeriesValidation `json:"validation"`
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

// Delete post.
type DeletePostInput struct {
	// The post to delete
	ID relay.ID `json:"id"`
}

// Payload for deleting a post
type DeletePostPayload struct {
	// The deleted post.
	PostID *relay.ID `json:"postId"`
}

type Language struct {
	// BCP47 locale
	Locale string `json:"locale"`
	// Fully qualified name
	Name string `json:"name"`
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
	// The state of the post.
	State PostState `json:"state"`
	// The supporter-only status.
	SupporterOnlyStatus SupporterOnlyStatus `json:"supporterOnlyStatus"`
	// The contributor who contributed this post
	Contributor *Account `json:"contributor"`
	// The club belonging to the post
	Club *Club `json:"club"`
	// Content belonging to this post
	Content []*PostContent `json:"content"`
	// The date and time of when this post was created
	CreatedAt time.Time `json:"createdAt"`
	// The date and time of when this post was posted
	PostedAt *time.Time `json:"postedAt"`
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

// Represents content for a post.
type PostContent struct {
	// The ID of this content.
	ID relay.ID `json:"id"`
	// The resource belonging to this content.
	Resource *Resource `json:"resource"`
	// Whether or not this content is supporter only.
	IsSupporterOnly bool `json:"isSupporterOnly"`
	// Whether or not the viewer is able to see this content.
	ViewerCanViewSupporterOnlyContent bool `json:"viewerCanViewSupporterOnlyContent"`
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

// Remove post content.
type RemovePostContentInput struct {
	// The post to update
	ID relay.ID `json:"id"`
	// Content IDs for the content
	ContentIds []relay.ID `json:"contentIds"`
}

// Payload for updating a post
type RemovePostContentPayload struct {
	// The post after the update
	Post *Post `json:"post"`
}

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
	// All translations for this title.
	TitleTranslations []*Translation `json:"titleTranslations"`
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
}

type Translation struct {
	// The language linked to this translation.
	Language *Language `json:"language"`
	// The translation text.
	Text string `json:"text"`
}

// Un-Archive post.
type UnArchivePostInput struct {
	// The post to un-archive
	ID relay.ID `json:"id"`
}

// Payload for un-archiving a post
type UnArchivePostPayload struct {
	// The un-archived post.
	Post *Post `json:"post"`
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

// Update audience.
type UpdateAudienceIsStandardInput struct {
	// The audience to update
	ID relay.ID `json:"id"`
	// Standard
	Standard bool `json:"standard"`
}

// Payload for updating audience
type UpdateAudienceIsStandardPayload struct {
	// The audience after update
	Audience *Audience `json:"audience"`
}

// Update audience.
type UpdateAudienceThumbnailInput struct {
	// The audience to update
	ID relay.ID `json:"id"`
	// The thumbnail
	Thumbnail string `json:"thumbnail"`
}

// Payload for updating audience
type UpdateAudienceThumbnailPayload struct {
	// The audience after update
	Audience *Audience `json:"audience"`
}

// Update audience.
type UpdateAudienceTitleInput struct {
	// The audience to update
	ID relay.ID `json:"id"`
	// The title to update
	Title string `json:"title"`
	// The localization for this title
	Locale string `json:"locale"`
}

// Payload for updating audience
type UpdateAudienceTitlePayload struct {
	// The audience after update
	Audience *Audience `json:"audience"`
}

// Update category.
type UpdateCategoryThumbnailInput struct {
	// The category to update
	ID relay.ID `json:"id"`
	// The thumbnail
	Thumbnail string `json:"thumbnail"`
}

// Payload for updating category
type UpdateCategoryThumbnailPayload struct {
	// The category after update
	Category *Category `json:"category"`
}

// Update category.
type UpdateCategoryTitleInput struct {
	// The category to update
	ID relay.ID `json:"id"`
	// The title to update
	Title string `json:"title"`
	// The localization for this title
	Locale string `json:"locale"`
}

// Payload for updating category
type UpdateCategoryTitlePayload struct {
	// The category after update
	Category *Category `json:"category"`
}

// Update character.
type UpdateCharacterNameInput struct {
	// The character to update
	ID relay.ID `json:"id"`
	// The name to update
	Name string `json:"name"`
	// The localization for this name
	Locale string `json:"locale"`
}

// Payload for updating character
type UpdateCharacterNamePayload struct {
	// The character after update
	Character *Character `json:"character"`
}

// Update character.
type UpdateCharacterThumbnailInput struct {
	// The character to update
	ID relay.ID `json:"id"`
	// The thumbnail
	Thumbnail string `json:"thumbnail"`
}

// Payload for updating character
type UpdateCharacterThumbnailPayload struct {
	// The character after update
	Character *Character `json:"character"`
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

// Update post content is supporter only.
type UpdatePostContentIsSupporterOnlyInput struct {
	// The post to update
	ID relay.ID `json:"id"`
	// Content IDs to update
	ContentIds []relay.ID `json:"contentIds"`
	// The change to make
	IsSupporterOnly bool `json:"isSupporterOnly"`
}

// Payload for updating a post
type UpdatePostContentIsSupporterOnlyPayload struct {
	// The post after the update
	Post *Post `json:"post"`
}

// Update post content order.
type UpdatePostContentOrderInput struct {
	// The post to update
	ID relay.ID `json:"id"`
	// Content IDs for the content
	ContentIds []relay.ID `json:"contentIds"`
}

// Payload for updating a post
type UpdatePostContentOrderPayload struct {
	// The post after the update
	Post *Post `json:"post"`
}

// Update series.
type UpdateSeriesThumbnailInput struct {
	// The series to update
	ID relay.ID `json:"id"`
	// The thumbnail
	Thumbnail string `json:"thumbnail"`
}

// Payload for updating series
type UpdateSeriesThumbnailPayload struct {
	// The category after update
	Series *Series `json:"series"`
}

// Update series.
type UpdateSeriesTitleInput struct {
	// The series to update
	ID relay.ID `json:"id"`
	// The title to update
	Title string `json:"title"`
	// The localization for this title
	Locale string `json:"locale"`
}

// Payload for updating series
type UpdateSeriesTitlePayload struct {
	// The series after update
	Series *Series `json:"series"`
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

// Validation for creating a new audience
type CreateAudienceValidation string

const (
	CreateAudienceValidationSlugTaken CreateAudienceValidation = "SLUG_TAKEN"
)

var AllCreateAudienceValidation = []CreateAudienceValidation{
	CreateAudienceValidationSlugTaken,
}

func (e CreateAudienceValidation) IsValid() bool {
	switch e {
	case CreateAudienceValidationSlugTaken:
		return true
	}
	return false
}

func (e CreateAudienceValidation) String() string {
	return string(e)
}

func (e *CreateAudienceValidation) UnmarshalGQL(v interface{}) error {
	str, ok := v.(string)
	if !ok {
		return fmt.Errorf("enums must be strings")
	}

	*e = CreateAudienceValidation(str)
	if !e.IsValid() {
		return fmt.Errorf("%s is not a valid CreateAudienceValidation", str)
	}
	return nil
}

func (e CreateAudienceValidation) MarshalGQL(w io.Writer) {
	fmt.Fprint(w, strconv.Quote(e.String()))
}

// Validation for creating a new category
type CreateCategoryValidation string

const (
	CreateCategoryValidationSlugTaken CreateCategoryValidation = "SLUG_TAKEN"
)

var AllCreateCategoryValidation = []CreateCategoryValidation{
	CreateCategoryValidationSlugTaken,
}

func (e CreateCategoryValidation) IsValid() bool {
	switch e {
	case CreateCategoryValidationSlugTaken:
		return true
	}
	return false
}

func (e CreateCategoryValidation) String() string {
	return string(e)
}

func (e *CreateCategoryValidation) UnmarshalGQL(v interface{}) error {
	str, ok := v.(string)
	if !ok {
		return fmt.Errorf("enums must be strings")
	}

	*e = CreateCategoryValidation(str)
	if !e.IsValid() {
		return fmt.Errorf("%s is not a valid CreateCategoryValidation", str)
	}
	return nil
}

func (e CreateCategoryValidation) MarshalGQL(w io.Writer) {
	fmt.Fprint(w, strconv.Quote(e.String()))
}

// Validation for creating a new character
type CreateCharacterValidation string

const (
	CreateCharacterValidationSlugTaken CreateCharacterValidation = "SLUG_TAKEN"
)

var AllCreateCharacterValidation = []CreateCharacterValidation{
	CreateCharacterValidationSlugTaken,
}

func (e CreateCharacterValidation) IsValid() bool {
	switch e {
	case CreateCharacterValidationSlugTaken:
		return true
	}
	return false
}

func (e CreateCharacterValidation) String() string {
	return string(e)
}

func (e *CreateCharacterValidation) UnmarshalGQL(v interface{}) error {
	str, ok := v.(string)
	if !ok {
		return fmt.Errorf("enums must be strings")
	}

	*e = CreateCharacterValidation(str)
	if !e.IsValid() {
		return fmt.Errorf("%s is not a valid CreateCharacterValidation", str)
	}
	return nil
}

func (e CreateCharacterValidation) MarshalGQL(w io.Writer) {
	fmt.Fprint(w, strconv.Quote(e.String()))
}

// Validation for creating a new series
type CreateSeriesValidation string

const (
	CreateSeriesValidationSlugTaken CreateSeriesValidation = "SLUG_TAKEN"
)

var AllCreateSeriesValidation = []CreateSeriesValidation{
	CreateSeriesValidationSlugTaken,
}

func (e CreateSeriesValidation) IsValid() bool {
	switch e {
	case CreateSeriesValidationSlugTaken:
		return true
	}
	return false
}

func (e CreateSeriesValidation) String() string {
	return string(e)
}

func (e *CreateSeriesValidation) UnmarshalGQL(v interface{}) error {
	str, ok := v.(string)
	if !ok {
		return fmt.Errorf("enums must be strings")
	}

	*e = CreateSeriesValidation(str)
	if !e.IsValid() {
		return fmt.Errorf("%s is not a valid CreateSeriesValidation", str)
	}
	return nil
}

func (e CreateSeriesValidation) MarshalGQL(w io.Writer) {
	fmt.Fprint(w, strconv.Quote(e.String()))
}

type PostState string

const (
	PostStateDraft     PostState = "DRAFT"
	PostStateReview    PostState = "REVIEW"
	PostStatePublished PostState = "PUBLISHED"
	PostStateDiscarded PostState = "DISCARDED"
	PostStateRejected  PostState = "REJECTED"
	PostStateRemoved   PostState = "REMOVED"
	PostStateArchived  PostState = "ARCHIVED"
)

var AllPostState = []PostState{
	PostStateDraft,
	PostStateReview,
	PostStatePublished,
	PostStateDiscarded,
	PostStateRejected,
	PostStateRemoved,
	PostStateArchived,
}

func (e PostState) IsValid() bool {
	switch e {
	case PostStateDraft, PostStateReview, PostStatePublished, PostStateDiscarded, PostStateRejected, PostStateRemoved, PostStateArchived:
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

type SupporterOnlyStatus string

const (
	// None of the content requires supporting to view.
	SupporterOnlyStatusNone SupporterOnlyStatus = "NONE"
	// Some of the content requires supporting to view, at least 1 content piece is free.
	SupporterOnlyStatusPartial SupporterOnlyStatus = "PARTIAL"
	// All of the content is supporter-only.
	SupporterOnlyStatusFull SupporterOnlyStatus = "FULL"
)

var AllSupporterOnlyStatus = []SupporterOnlyStatus{
	SupporterOnlyStatusNone,
	SupporterOnlyStatusPartial,
	SupporterOnlyStatusFull,
}

func (e SupporterOnlyStatus) IsValid() bool {
	switch e {
	case SupporterOnlyStatusNone, SupporterOnlyStatusPartial, SupporterOnlyStatusFull:
		return true
	}
	return false
}

func (e SupporterOnlyStatus) String() string {
	return string(e)
}

func (e *SupporterOnlyStatus) UnmarshalGQL(v interface{}) error {
	str, ok := v.(string)
	if !ok {
		return fmt.Errorf("enums must be strings")
	}

	*e = SupporterOnlyStatus(str)
	if !e.IsValid() {
		return fmt.Errorf("%s is not a valid SupporterOnlyStatus", str)
	}
	return nil
}

func (e SupporterOnlyStatus) MarshalGQL(w io.Writer) {
	fmt.Fprint(w, strconv.Quote(e.String()))
}
