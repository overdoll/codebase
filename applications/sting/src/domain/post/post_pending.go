package post

import (
	"errors"
	"time"

	"overdoll/libraries/ksuid"
)

type PostPendingState string

const (
	Publishing PostPendingState = "publishing"
	Review     PostPendingState = "review"
	Published  PostPendingState = "published"
)

var (
	ErrNotPublishing = errors.New("post must be publishing")
	ErrInvalidId     = errors.New("passed id is not a valid ID")
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

type PostPending struct {
	id    string
	state PostPendingState

	characters []*Character
	categories []*Category

	contributor *User

	artist *Artist

	content            []string
	charactersRequests []CharacterRequest
	categoriesRequests []CategoryRequest
	mediaRequests      []MediaRequest
	postedAt           time.Time
	publishedPostId    string
	generatedIds       []string
}

func NewPendingPost(id string, artist *Artist, contributor *User, content []string, characters []*Character, categories []*Category) (*PostPending, error) {
	return &PostPending{
		id:          id,
		state:       Publishing,
		artist:      artist,
		contributor: contributor,
		content:     content,
		characters:  characters,
		categories:  categories,
		postedAt:    time.Now(),
	}, nil
}

func UnmarshalPendingPostFromDatabase(id string, state string, artist *Artist, contributorId string, content []string, characters []*Character, categories []*Category, charactersRequests map[string]string, categoryRequests []string, mediaRequests []string, postedAt time.Time, publishedPostId string) *PostPending {

	postPending := &PostPending{
		id:              id,
		state:           PostPendingState(state),
		artist:          artist,
		contributor:     &User{Id: contributorId},
		content:         content,
		characters:      characters,
		categories:      categories,
		postedAt:        postedAt,
		publishedPostId: publishedPostId,
	}

	postPending.RequestResources(charactersRequests, categoryRequests, mediaRequests)

	return postPending
}

func (p *PostPending) ID() string {
	return p.id
}

func (p *PostPending) State() PostPendingState {
	return p.state
}

func (p *PostPending) Artist() *Artist {
	return p.artist
}

func (p *PostPending) Contributor() *User {
	return p.contributor
}

func (p *PostPending) RawContent() []string {
	return p.content
}

func (p *PostPending) Content() []string {
	return p.content
}

func (p *PostPending) UpdateCategories(categories []*Category) error {
	p.categories = categories
	return nil
}

func (p *PostPending) UpdateCharacters(characters []*Character) error {
	p.characters = characters
	return nil
}

func (p *PostPending) UpdateArtist(artist *Artist) {
	p.artist = artist
}

func (p *PostPending) UpdateContributor(contributor *User) {
	p.contributor = contributor
}

func (p *PostPending) Categories() []*Category {
	return p.categories
}

func (p *PostPending) CategoryIds() []string {

	var ids []string

	for _, cats := range p.categories {
		ids = append(ids, cats.ID())
	}

	return ids
}

func (p *PostPending) CharacterIds() []string {

	var ids []string

	for _, chars := range p.characters {
		ids = append(ids, chars.ID())
	}

	return ids
}

func (p *PostPending) Characters() []*Character {
	return p.characters
}

func (p *PostPending) PostedAt() time.Time {
	return p.postedAt
}

func (p *PostPending) PublishedPostId() string {
	return p.publishedPostId
}

func (p *PostPending) MakePublish() error {

	// State of the post needs to be "publishing" before "published"
	if p.state != Publishing {
		return ErrNotPublishing
	}

	p.state = Published

	return nil
}

func (p *PostPending) MakePublishing() {
	p.state = Publishing
}

func (p *PostPending) MakePublicOrReview() error {

	if !p.contributor.Verified {
		p.state = Review
	}

	return nil
}

func (p *PostPending) InReview() bool {
	return p.state == Review
}

func (p *PostPending) IsPublished() bool {
	return p.publishedPostId != ""
}

func (p *PostPending) UpdateContent(content []string) {
	p.content = content
}

func (p *PostPending) CharacterRequests() []CharacterRequest {
	return p.charactersRequests
}

func (p *PostPending) CategoryRequests() []CategoryRequest {
	return p.categoriesRequests
}

func (p *PostPending) MediaRequests() []MediaRequest {
	return p.mediaRequests
}

// When requesting a new character, you must select a media or request a new media as well
// This function helps to match against mediaRequests and tell you which of the medias already exist in our database
// so we can pass it to ConsumeCustomResources
func (p *PostPending) GetExistingMediaIds() []string {

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

// ConsumeCustomResources - pass existingMedia so it can use that as arguments. As well, pass an array of IDs, and it will use them, in order
func (p *PostPending) ConsumeCustomResources(existingMedia []*Media, ids []string) ([]*Category, []*Character, []*Media) {

	// TODO: prefer 'ids' over ID from resource

	var characters []*Character
	var medias []*Media

	for _, char := range p.charactersRequests {

		var exists = true
		var newMedia *Media

		// Check if the requested media is a media in our list
		for _, requestedMedia := range p.mediaRequests {

			// If the media is on our list, then we create a new media, and append to array of events
			if char.Media == requestedMedia.Title {
				NewMedia(char.Id, char.Media)
				exists = false
				break
			}
		}

		// If a media exists (not in media requests), we use the string as the ID
		if !exists {
			for _, media := range existingMedia {
				if media.ID() == char.Media {
					// media exists in DB
					newMedia = media
					medias = append(medias, media)
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

	return categories, characters, medias
}

// RequestResources will pre-generate IDs for each request type
func (p *PostPending) RequestResources(characters map[string]string, categories []string, medias []string) {
	for char, med := range characters {
		p.charactersRequests = append(p.charactersRequests, CharacterRequest{Id: ksuid.New().String(), Name: char, Media: med})
	}

	for _, cat := range categories {
		p.categoriesRequests = append(p.categoriesRequests, CategoryRequest{Id: ksuid.New().String(), Title: cat})
	}

	for _, med := range medias {
		p.mediaRequests = append(p.mediaRequests, MediaRequest{Id: ksuid.New().String(), Title: med})
	}
}
