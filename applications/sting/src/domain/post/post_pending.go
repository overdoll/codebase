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

type CharacterRequest struct {
	Name  string
	Media string
}

type CategoryRequest struct {
	Title string
}

type MediaRequest struct {
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
}

func NewPendingPost(artist *Artist, contributor *User, content []string, characters []*Character, categories []*Category) (*PostPending, error) {

	return &PostPending{
		id:          ksuid.New().String(),
		state:       Publishing,
		artist:      artist,
		contributor: contributor,
		content:     content,
		characters:  characters,
		categories:  categories,
		postedAt:    time.Now(),
	}, nil
}

func UnmarshalPendingPostFromDatabase(id string, state string, artistId string, artistUsername string, contributorId string, content []string, characters []string, categories []string, charactersRequests map[string]string, categoryRequests []string, mediaRequests []string, postedAt time.Time, publishedPostId string) *PostPending {

	var chars []*Character

	for _, char := range characters {
		chars = append(chars, NewCharacter(char, &Media{}))
	}

	var cats []*Category

	for _, char := range categories {
		cats = append(cats, NewCategory(char))
	}

	postPending := &PostPending{
		id:              id,
		state:           PostPendingState(state),
		contributor:     &User{Id: contributorId},
		content:         content,
		characters:      chars,
		categories:      cats,
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

func (p *PostPending) ConsumeCustomResources() ([]*Category, []*Character, []*Media) {

	var characters []*Character
	var medias []*Media

	for _, char := range p.charactersRequests {

		var exists = true
		var newMedia *Media

		// Check if the requested media is a media in our list
		for _, requestedMedia := range p.mediaRequests {

			// If the media is on our list, then we create a new media, and append to array of events
			if char.Media == requestedMedia.Title {
				NewMedia(char.Media)
				exists = false
				break
			}
		}

		// If a media exists (not in media requests), we use the string as the ID
		if !exists {
			// media exists in DB
			newMedia = &Media{
				id:        char.Media,
				title:     "",
				thumbnail: "",
			}
			medias = append(medias, newMedia)
		}

		newCharacter := NewCharacter(char.Name, newMedia)

		p.characters = append(p.characters, newCharacter)
		characters = append(characters, newCharacter)
	}

	var categories []*Category

	for _, cat := range p.categoriesRequests {

		newCategory := NewCategory(cat.Title)

		p.categories = append(p.categories, newCategory)
		categories = append(categories, newCategory)
	}

	return categories, characters, medias
}

func (p *PostPending) RequestResources(characters map[string]string, categories []string, medias []string) {
	for char, med := range characters {
		p.charactersRequests = append(p.charactersRequests, CharacterRequest{Name: char, Media: med})
	}

	for _, cat := range categories {
		p.categoriesRequests = append(p.categoriesRequests, CategoryRequest{Title: cat})
	}

	for _, med := range medias {
		p.mediaRequests = append(p.mediaRequests, MediaRequest{Title: med})
	}
}
