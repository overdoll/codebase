package post

import (
	"errors"
	"os"
	"time"

	"overdoll/libraries/account"
	"overdoll/libraries/paging"
	"overdoll/libraries/uuid"
)

type PostPendingState string

const (
	Publishing PostPendingState = "publishing"
	Review     PostPendingState = "review"
	Published  PostPendingState = "published"
	Discarding PostPendingState = "discarding"
	Discarded  PostPendingState = "discarded"
	Rejected   PostPendingState = "rejected"
	Processing PostPendingState = "processing"
)

var (
	ErrNotPublishing    = errors.New("post must be publishing")
	ErrNotReview        = errors.New("post must be in review")
	ErrNotComplete      = errors.New("post is incomplete")
	ErrInvalidId        = errors.New("passed id is not a valid ID")
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

type PendingPostFilters struct {
	moderatorId   string
	contributorId string
	artistId      string
	id            string
}

func NewPendingPostFilters(moderatorId, contributorId, artistId, id string) (*PendingPostFilters, error) {
	return &PendingPostFilters{
		moderatorId:   moderatorId,
		contributorId: contributorId,
		artistId:      artistId,
		id:            id,
	}, nil
}

func (e *PendingPostFilters) ID() string {
	return e.id
}

func (e *PendingPostFilters) ModeratorId() string {
	return e.moderatorId
}

func (e *PendingPostFilters) ContributorId() string {
	return e.contributorId
}

func (e *PendingPostFilters) ArtistId() string {
	return e.artistId
}

type PendingPostConnection struct {
	Edges    []*PendingPostEdge
	PageInfo *paging.PageInfo
}

type PendingPostEdge struct {
	Cursor string
	Node   *PendingPost
}

type PendingPost struct {
	id          string
	moderatorId string
	state       PostPendingState

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

func NewPendingPost(id, moderatorId string, artist *Artist, contributor *account.Account, content []string, characters []*Character, categories []*Category) (*PendingPost, error) {
	return &PendingPost{
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

func UnmarshalPendingPostFromDatabase(id, moderatorId, state string, artist *Artist, contributorId, contributorUsername, contributorAvatar string, content []string, characters []*Character, categories []*Category, charactersRequests map[string]string, categoryRequests, mediaRequests []string, postedAt, reassignmentAt time.Time) *PendingPost {

	postPending := &PendingPost{
		id:             id,
		moderatorId:    moderatorId,
		state:          PostPendingState(state),
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

func (p *PendingPost) ID() string {
	return p.id
}

func (p *PendingPost) ModeratorId() string {
	return p.moderatorId
}

func (p *PendingPost) State() PostPendingState {
	return p.state
}

func (p *PendingPost) Artist() *Artist {
	return p.artist
}

func (p *PendingPost) Contributor() *account.Account {
	return p.contributor
}

func (p *PendingPost) RawContent() []string {
	return p.content
}

func (p *PendingPost) Content() []string {

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

func (p *PendingPost) UpdateCategories(categories []*Category) error {
	p.categories = categories
	return nil
}

func (p *PendingPost) UpdateCharacters(characters []*Character) error {
	p.characters = characters
	return nil
}

func (p *PendingPost) UpdateArtist(artist *Artist) {
	p.artist = artist
}

func (p *PendingPost) UpdateModerator(moderatorId string) error {

	if p.state != Review {
		return ErrAlreadyModerated
	}

	p.moderatorId = moderatorId
	p.reassignmentAt = time.Now().Add(time.Hour * 24)

	return nil
}

func (p *PendingPost) UpdateContributor(contributor *account.Account) {
	p.contributor = contributor
}

func (p *PendingPost) Categories() []*Category {
	return p.categories
}

func (p *PendingPost) CategoryIds() []string {

	var ids []string

	for _, cats := range p.categories {
		ids = append(ids, cats.ID())
	}

	return ids
}

func (p *PendingPost) CharacterIds() []string {

	var ids []string

	for _, chars := range p.characters {
		ids = append(ids, chars.ID())
	}

	return ids
}

func (p *PendingPost) Characters() []*Character {
	return p.characters
}

func (p *PendingPost) PostedAt() time.Time {
	return p.postedAt
}

func (p *PendingPost) ReassignmentAt() time.Time {
	return p.reassignmentAt
}

func (p *PendingPost) MakePublish() error {

	// State of the post needs to be "publishing" before "published"
	if p.state != Publishing {
		return ErrNotPublishing
	}

	p.state = Published

	return nil
}

func (p *PendingPost) MakeDiscarding() error {

	if p.state != Review {
		return ErrNotReview
	}

	p.state = Discarding

	return nil
}

func (p *PendingPost) MakeDiscarded() error {

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

func (p *PendingPost) MakeRejected() error {

	p.state = Rejected

	return nil
}

func (p *PendingPost) MakeUndo() error {
	if p.state == Discarded || p.state == Published {
		return ErrNotComplete
	}

	return nil
}

func (p *PendingPost) MakePublishing() {
	p.state = Publishing
}

func (p *PendingPost) MakeProcessing() error {

	p.state = Processing

	return nil
}

func (p *PendingPost) InReview() bool {
	return p.state == Review
}

func (p *PendingPost) IsPublished() bool {
	return p.state == Published
}

func (p *PendingPost) IsRejected() bool {
	return p.state == Rejected
}

func (p *PendingPost) IsDiscarded() bool {
	return p.state == Discarded
}

func (p *PendingPost) UpdateContent(content []string) {
	p.content = content
}

func (p *PendingPost) CharacterRequests() []CharacterRequest {
	return p.charactersRequests
}

func (p *PendingPost) CategoryRequests() []CategoryRequest {
	return p.categoriesRequests
}

func (p *PendingPost) MediaRequests() []MediaRequest {
	return p.mediaRequests
}

func (p *PendingPost) MakeReview() error {
	p.state = Review

	return nil
}

// When requesting a new character, you must select a media or request a new media as well
// This function helps to match against mediaRequests and tell you which of the medias already exist in our database
// so we can pass it to ConsumeCustomResources
func (p *PendingPost) GetExistingMediaIds() []string {

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
func (p *PendingPost) ConsumeCustomResources(existingMedia []*Media) ([]*Category, []*Character, []*Media) {

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
func (p *PendingPost) RequestResources(characters map[string]string, categories, medias []string) {
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
