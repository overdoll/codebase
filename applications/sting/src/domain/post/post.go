package post

import (
	"errors"
	"os"
	"time"

	"overdoll/libraries/account"
	"overdoll/libraries/paging"
	"overdoll/libraries/uuid"
)

type PostState string

const (
	Publishing PostState = "publishing"
	Review     PostState = "review"
	Published  PostState = "published"
	Discarding PostState = "discarding"
	Discarded  PostState = "discarded"
	Rejected   PostState = "rejected"
	Processing PostState = "processing"
)

var (
	ErrNotPublishing    = errors.New("post must be publishing")
	ErrNotReview        = errors.New("post must be in review")
	ErrNotComplete      = errors.New("post is incomplete")
	ErrNotFound         = errors.New("post not found")
	ErrAlreadyModerated = errors.New("already moderated")
)

// Each request type contains space for an "ID" - we pre-generate IDs and pass them in between events to ensure idempotency
type CharacterRequest struct {
	Id    string
	Name  string
	Media string
}

type CategoryRequest struct {
	Id    string
	Title string
}

type MediaRequest struct {
	Id    string
	Title string
}

type PostFilters struct {
	moderatorId   string
	contributorId string
	artistId      string
	id            string
}

func NewPostFilters(moderatorId, contributorId, artistId, id string) (*PostFilters, error) {
	return &PostFilters{
		moderatorId:   moderatorId,
		contributorId: contributorId,
		artistId:      artistId,
		id:            id,
	}, nil
}

func (e *PostFilters) ID() string {
	return e.id
}

func (e *PostFilters) ModeratorId() string {
	return e.moderatorId
}

func (e *PostFilters) ContributorId() string {
	return e.contributorId
}

func (e *PostFilters) ArtistId() string {
	return e.artistId
}

type Post struct {
	*paging.Node

	id          string
	moderatorId string
	state       PostState

	characters []*Character
	categories []*Category

	contributor *account.Account

	artist *Artist

	content            []string
	charactersRequests []CharacterRequest
	categoriesRequests []CategoryRequest
	mediaRequests      []MediaRequest
	postedAt           time.Time
	reassignmentAt     time.Time
	generatedIds       []string
}

func NewPendingPost(id, moderatorId string, artist *Artist, contributor *account.Account, content []string, characters []*Character, categories []*Category) (*Post, error) {
	return &Post{
		id:             id,
		moderatorId:    moderatorId,
		state:          Publishing,
		artist:         artist,
		contributor:    contributor,
		content:        content,
		characters:     characters,
		categories:     categories,
		postedAt:       time.Now(),
		reassignmentAt: time.Now().Add(time.Hour * 24),
	}, nil
}

func UnmarshalPendingPostFromDatabase(id, moderatorId, state string, artist *Artist, contributorId, contributorUsername, contributorAvatar string, content []string, characters []*Character, categories []*Category, charactersRequests map[string]string, categoryRequests, mediaRequests []string, postedAt, reassignmentAt time.Time) *Post {

	postPending := &Post{
		id:             id,
		moderatorId:    moderatorId,
		state:          PostState(state),
		artist:         artist,
		contributor:    account.NewAccount(contributorId, contributorUsername, contributorAvatar, nil, false, false),
		content:        content,
		characters:     characters,
		categories:     categories,
		postedAt:       postedAt,
		reassignmentAt: reassignmentAt,
	}

	postPending.RequestResources(charactersRequests, categoryRequests, mediaRequests)

	return postPending
}

func (p *Post) ID() string {
	return p.id
}

func (p *Post) ModeratorId() string {
	return p.moderatorId
}

func (p *Post) State() PostState {
	return p.state
}

func (p *Post) Artist() *Artist {
	return p.artist
}

func (p *Post) Contributor() *account.Account {
	return p.contributor
}

func (p *Post) RawContent() []string {
	return p.content
}

func (p *Post) Content() []string {

	var generatedContent []string

	for _, image := range p.content {

		baseUrl := os.Getenv("STATIC_URL") + "/" + "pending_posts"

		if p.state == Published {
			baseUrl = os.Getenv("POSTS_URL")
		}

		// generate the proper content url
		generatedContent = append(generatedContent, baseUrl+"/"+p.Contributor().ID()+"/"+image)
	}

	return generatedContent
}

func (p *Post) UpdateCategories(categories []*Category) error {
	p.categories = categories
	return nil
}

func (p *Post) UpdateCharacters(characters []*Character) error {
	p.characters = characters
	return nil
}

func (p *Post) UpdateArtist(artist *Artist) {
	p.artist = artist
}

func (p *Post) UpdateModerator(moderatorId string) error {

	if p.state != Review {
		return ErrAlreadyModerated
	}

	p.moderatorId = moderatorId
	p.reassignmentAt = time.Now().Add(time.Hour * 24)

	return nil
}

func (p *Post) UpdateContributor(contributor *account.Account) {
	p.contributor = contributor
}

func (p *Post) Categories() []*Category {
	return p.categories
}

func (p *Post) CategoryIds() []string {

	var ids []string

	for _, cats := range p.categories {
		ids = append(ids, cats.ID())
	}

	return ids
}

func (p *Post) CharacterIds() []string {

	var ids []string

	for _, chars := range p.characters {
		ids = append(ids, chars.ID())
	}

	return ids
}

func (p *Post) Characters() []*Character {
	return p.characters
}

func (p *Post) PostedAt() time.Time {
	return p.postedAt
}

func (p *Post) ReassignmentAt() time.Time {
	return p.reassignmentAt
}

func (p *Post) MakePublish() error {

	// State of the post needs to be "publishing" before "published"
	if p.state != Publishing {
		return ErrNotPublishing
	}

	p.state = Published

	return nil
}

func (p *Post) MakeDiscarding() error {

	if p.state != Review {
		return ErrNotReview
	}

	p.state = Discarding

	return nil
}

func (p *Post) MakeDiscarded() error {

	if p.state != Discarding {
		return ErrNotReview
	}

	p.state = Discarded

	p.categoriesRequests = []CategoryRequest{}
	p.charactersRequests = []CharacterRequest{}
	p.mediaRequests = []MediaRequest{}
	p.content = []string{}

	return nil
}

func (p *Post) MakeRejected() error {

	p.state = Rejected

	return nil
}

func (p *Post) MakeUndo() error {
	if p.state == Discarded || p.state == Published {
		return ErrNotComplete
	}

	return nil
}

func (p *Post) MakePublishing() {
	p.state = Publishing
}

func (p *Post) MakeProcessing() error {

	p.state = Processing

	return nil
}

func (p *Post) InReview() bool {
	return p.state == Review
}

func (p *Post) IsPublished() bool {
	return p.state == Published
}

func (p *Post) IsPublishing() bool {
	return p.state == Publishing
}

func (p *Post) IsProcessing() bool {
	return p.state == Processing
}

func (p *Post) IsRejected() bool {
	return p.state == Rejected
}

func (p *Post) IsDiscarded() bool {
	return p.state == Discarded
}

func (p *Post) IsDiscarding() bool {
	return p.state == Discarding
}

func (p *Post) UpdateContent(content []string) {
	p.content = content
}

func (p *Post) CharacterRequests() []CharacterRequest {
	return p.charactersRequests
}

func (p *Post) CategoryRequests() []CategoryRequest {
	return p.categoriesRequests
}

func (p *Post) MediaRequests() []MediaRequest {
	return p.mediaRequests
}

func (p *Post) MakeReview() error {
	p.state = Review

	return nil
}

// When requesting a new character, you must select a media or request a new media as well
// This function helps to match against mediaRequests and tell you which of the medias already exist in our database
// so we can pass it to ConsumeCustomResources
func (p *Post) GetExistingMediaIds() []string {

	var medias []string

	for _, char := range p.charactersRequests {
		var exists = true

		// Check if the requested media is a media in our list
		for _, requestedMedia := range p.mediaRequests {

			// If the media is on our list, skip
			if char.Media == requestedMedia.Title {
				exists = false
				break
			}
		}

		if exists {
			medias = append(medias, char.Media)
		}
	}

	return medias
}

// ConsumeCustomResources - pass existingMedia so it can use that as arguments.
func (p *Post) ConsumeCustomResources(existingMedia []*Media) ([]*Category, []*Character, []*Media) {

	var characters []*Character
	var medias []*Media

	for _, char := range p.charactersRequests {

		var exists = false
		var newMedia *Media

		// Check if the requested media is a media in our list
		for _, requestedMedia := range p.mediaRequests {
			// If the media is on our list, then we create a new media, and append to array of events
			if char.Media == requestedMedia.Title {
				newMedia = NewMedia(char.Id, requestedMedia.Title)
				medias = append(medias, newMedia)
				exists = true
				break
			}
		}

		// If a media exists (not in media requests), we use the string as the ID
		if !exists {
			for _, media := range existingMedia {
				if media.ID() == char.Media {
					// media exists in DB
					newMedia = media
					break
				}
			}

		}

		newCharacter := NewCharacter(char.Id, char.Name, newMedia)

		p.characters = append(p.characters, newCharacter)
		characters = append(characters, newCharacter)
	}

	var categories []*Category

	for _, cat := range p.categoriesRequests {

		newCategory := NewCategory(cat.Id, cat.Title)

		p.categories = append(p.categories, newCategory)
		categories = append(categories, newCategory)
	}

	p.categoriesRequests = []CategoryRequest{}
	p.charactersRequests = []CharacterRequest{}
	p.mediaRequests = []MediaRequest{}

	return categories, characters, medias
}

// RequestResources will pre-generate IDs for each request type
func (p *Post) RequestResources(characters map[string]string, categories, medias []string) {
	for char, med := range characters {
		p.charactersRequests = append(p.charactersRequests, CharacterRequest{Id: uuid.New().String(), Name: char, Media: med})
	}

	for _, cat := range categories {
		p.categoriesRequests = append(p.categoriesRequests, CategoryRequest{Id: uuid.New().String(), Title: cat})
	}

	for _, med := range medias {
		p.mediaRequests = append(p.mediaRequests, MediaRequest{Id: uuid.New().String(), Title: med})
	}
}
