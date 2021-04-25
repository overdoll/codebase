package adapters

import (
	"context"
	"fmt"

	"overdoll/applications/sting/src/domain/post"
	"overdoll/libraries/search"
)

type PostDocument struct {
	Id          string               `json:"id"`
	Artist      ArtistDocument       `json:"artist"`
	Contributor ContributorDocument  `json:"contributor"`
	Content     []string             `json:"content"`
	Categories  []*CategoryDocument  `json:"categories"`
	Characters  []*CharacterDocument `json:"characters"`
	PostedAt    string               `json:"posted_at"`
}

type PostPendingDocument struct {
	Id                 string               `json:"id"`
	ArtistId           string               `json:"artist_id"`
	ArtistUsername     string               `json:"artist_username"`
	Contributor        ContributorDocument  `json:"contributor"`
	Content            []string             `json:"content"`
	Categories         []*CategoryDocument  `json:"categories"`
	Characters         []*CharacterDocument `json:"characters"`
	CharactersRequests map[string]string    `json:"characters_requests"`
	CategoriesRequests []string             `json:"categories_requests"`
	MediaRequests      []string             `json:"media_requests"`
	PostedAt           string               `json:"posted_at"`
}

type ContributorDocument struct {
	Id       string `json:"id"`
	Avatar   string `json:"avatar"`
	Username string `json:"username"`
}

const PostIndex = `
{
	"mappings": {
		"dynamic": "strict",
		"properties": {
			"id": {
				"type": "keyword"
			}
		}
	}
}`

const PostPendingIndex = `
{
	"mappings": {
		"dynamic": "strict",
		"properties": {
			"id": {
				"type": "keyword"
			}
		}
	}
}`

type PostIndexElasticSearchRepository struct {
	store *search.Store
}

func NewPostIndexElasticSearchRepository(store *search.Store) PostIndexElasticSearchRepository {
	return PostIndexElasticSearchRepository{store: store}
}
func (r PostIndexElasticSearchRepository) BulkIndexPendingPosts(ctx context.Context, pendingPosts []*post.PostPending) error {
	err := r.store.CreateBulkIndex("pending_posts")

	if err != nil {
		return fmt.Errorf("error creating bulk indexer: %s", err)
	}

	for _, pst := range pendingPosts {

		var characterDocuments []*CharacterDocument

		for _, char := range pst.Characters() {
			characterDocuments = append(characterDocuments, MarshalCharacterToDocument(char))
		}

		var categoryDocuments []*CategoryDocument

		for _, cat := range pst.Categories() {
			categoryDocuments = append(categoryDocuments, MarshalCategoryToDocument(cat))
		}

		characterRequests := make(map[string]string)

		for _, cr := range pst.CharacterRequests() {
			characterRequests[cr.Name] = cr.Media
		}

		var categoryRequests []string

		for _, cr := range pst.CategoryRequests() {
			categoryRequests = append(categoryRequests, cr.Title)
		}

		var mediaRequests []string

		for _, cr := range pst.MediaRequests() {
			mediaRequests = append(mediaRequests, cr.Title)
		}

		data := &PostPendingDocument{
			Id:             pst.ID().String(),
			ArtistUsername: pst.ArtistUsername(),
			ArtistId:       pst.ArtistId(),
			Contributor: ContributorDocument{
				Id:       pst.Contributor().Id.String(),
				Avatar:   pst.Contributor().Avatar,
				Username: pst.Contributor().Username,
			},
			Content:            pst.Content(),
			PostedAt:           pst.PostedAt().String(),
			Categories:         categoryDocuments,
			Characters:         characterDocuments,
			CharactersRequests: characterRequests,
			CategoriesRequests: categoryRequests,
			MediaRequests:      mediaRequests,
		}

		err = r.store.AddToBulkIndex(data.Id, data)

		if err != nil {
			return fmt.Errorf("unexpected error: %s", err)
		}
	}

	if err := r.store.CloseBulkIndex(); err != nil {
		return fmt.Errorf("unexpected error: %s", err)
	}

	return nil
}

func (r PostIndexElasticSearchRepository) BulkIndexPosts(ctx context.Context, posts []*post.Post) error {

	err := r.store.CreateBulkIndex("post")

	if err != nil {
		return fmt.Errorf("error creating bulk indexer: %s", err)
	}

	for _, pst := range posts {

		var characterDocuments []*CharacterDocument

		for _, char := range pst.Characters() {
			characterDocuments = append(characterDocuments, MarshalCharacterToDocument(char))
		}

		var categoryDocuments []*CategoryDocument

		for _, cat := range pst.Categories() {
			categoryDocuments = append(categoryDocuments, MarshalCategoryToDocument(cat))
		}

		data := &PostDocument{
			Id: pst.ID().String(),
			Artist: ArtistDocument{
				Id:       pst.Artist().Id.String(),
				Avatar:   pst.Artist().Avatar,
				Username: pst.Artist().Username,
			},
			Contributor: ContributorDocument{
				Id:       pst.Contributor().Id.String(),
				Avatar:   pst.Contributor().Avatar,
				Username: pst.Contributor().Username,
			},
			Content:    pst.Content(),
			PostedAt:   pst.PostedAt().String(),
			Categories: categoryDocuments,
			Characters: characterDocuments,
		}

		err = r.store.AddToBulkIndex(data.Id, data)

		if err != nil {
			return fmt.Errorf("unexpected error: %s", err)
		}
	}

	if err := r.store.CloseBulkIndex(); err != nil {
		return fmt.Errorf("unexpected error: %s", err)
	}

	return nil
}

func (r PostIndexElasticSearchRepository) DeletePostIndex(ctx context.Context) error {
	err := r.store.DeleteIndex("post")

	if err != nil {
	}

	err = r.store.CreateIndex("post", PostIndex)

	if err != nil {
		return fmt.Errorf("failed to create media index: %s", err)
	}

	return nil
}

func (r PostIndexElasticSearchRepository) DeletePendingPostIndex(ctx context.Context) error {
	err := r.store.DeleteIndex("pending_posts")

	if err != nil {
	}

	err = r.store.CreateIndex("pending_posts", PostPendingIndex)

	if err != nil {
		return fmt.Errorf("failed to create media index: %s", err)
	}

	return nil
}
