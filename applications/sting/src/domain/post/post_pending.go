package post

import (
	"context"
	"errors"
	"fmt"
	"time"

	"overdoll/applications/sting/src/domain/category"
	"overdoll/applications/sting/src/domain/character"
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

type Contributor struct {
	Id       string
	Roles    []string
	Verified bool
}

type PostPending struct {
	id                 ksuid.UUID
	state              PostPendingState
	artistId           string
	artistUsername     string
	contributorId      ksuid.UUID
	content            []string
	categories         []ksuid.UUID
	characters         []ksuid.UUID
	charactersRequests []CharacterRequest
	categoriesRequests []CategoryRequest
	mediaRequests      []MediaRequest
	postedAt           time.Time
	publishedPostId    string
}

func NewPendingPost(id ksuid.UUID, artistId string, artistUsername string, contributorId ksuid.UUID, content []string, characters []ksuid.UUID, categories []ksuid.UUID, ) (*PostPending, error) {
	return &PostPending{
		id:             id,
		state:          Publishing,
		artistId:       artistId,
		artistUsername: artistUsername,
		contributorId:  contributorId,
		content:        content,
		characters:     characters,
		categories:     categories,
		postedAt:       time.Now(),
	}, nil
}

func UnmarshalPendingPostFromDatabase(id ksuid.UUID, state string, artistId string, artistUsername string, contributorId ksuid.UUID, content []string, characters []ksuid.UUID, categories []ksuid.UUID, charactersRequests map[string]string, categoryRequests []string, mediaRequests []string, postedAt time.Time, publishedPostId string) *PostPending {

	postPending := &PostPending{
		id:              id,
		state:           PostPendingState(state),
		artistId:        artistId,
		artistUsername:  artistUsername,
		contributorId:   contributorId,
		content:         content,
		characters:      characters,
		categories:      categories,
		postedAt:        postedAt,
		publishedPostId: publishedPostId,
	}

	postPending.RequestResources(charactersRequests, categoryRequests, mediaRequests)

	return postPending
}

func (p *PostPending) ValidateCharactersAndCategories(ctx context.Context, cRepo character.Repository, catRepo category.Repository) error {
	characterInstances, err := cRepo.GetCharactersById(ctx, p.characters)

	if err != nil {
		return err
	}

	// make sure that the submitted characters are found in the database
	if len(characterInstances) != len(p.characters) {
		return fmt.Errorf("invalid character found")
	}

	categoryInstances, err := catRepo.GetCategoriesById(ctx, p.categories)

	if err != nil {
		return err
	}

	// make sure that the submitted categories exist in the database
	if len(categoryInstances) != len(p.categories) {
		return fmt.Errorf("invalid category found")
	}

	return nil
}

func (p *PostPending) ID() ksuid.UUID {
	return p.id
}

func (p *PostPending) State() PostPendingState {
	return p.state
}

func (p *PostPending) ArtistId() string {
	return p.artistId
}

func (p *PostPending) ArtistUsername() string {
	return p.artistUsername
}

func (p *PostPending) ContributorId() ksuid.UUID {
	return p.contributorId
}

func (p *PostPending) Content() []string {
	return p.content
}

func (p *PostPending) Categories() []ksuid.UUID {
	return p.categories
}

func (p *PostPending) Characters() []ksuid.UUID {
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

func (p *PostPending) MakePublicOrReview(contributor *Contributor) error {

	if !contributor.Verified {
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

func (p *PostPending) ConsumeCustomCategories() []*category.Category {

	var categories []*category.Category

	for _, cat := range p.categoriesRequests {

		id := ksuid.New()

		p.categories = append(p.categories, id)

		categories = append(categories, category.NewCategory(id, cat.Title, ""))
	}

	return categories
}

func (p *PostPending) ConsumeCustomCharacters() ([]*character.Character, []*character.Media) {

	var characters []*character.Character
	var medias []*character.Media

	for _, char := range p.charactersRequests {

		var exists = true
		var id ksuid.UUID

		// Check if the requested media is a media in our list
		for _, requestedMedia := range p.mediaRequests {

			// If the media is on our list, then we create a new media, and append to array of events
			if char.Media == requestedMedia.Title {
				id = ksuid.New()
				exists = false
				break
			}
		}

		// If a media exists (not in media requests), we use the string as the ID
		if exists {
			id, _ = ksuid.Parse(char.Media)
		} else {
			// otherwise, we create a new media
			medias = append(medias, character.NewMedia(id, char.Media, ""))
		}

		characterId := ksuid.New()

		p.characters = append(p.characters, characterId)

		characters = append(characters, character.NewCharacter(characterId, char.Name, "", id, "", ""))
	}

	return characters, medias
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
