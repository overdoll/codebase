package adapters

import (
	"context"
	"encoding/json"
	"fmt"
	"time"

	"overdoll/applications/sting/src/domain/post"
	search "overdoll/libraries/elasticsearch"
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
	State              string               `json:"state"`
	ModeratorId        string               `json:"moderator_id"`
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

const SearchPostPending = `
	"query" : {
		"multi_match" : {
			"query" : %q,
			"fields" : ["moderator_id^100"],
			"operator" : "and"
		}
	},
	"size" : 5`

const AllPostPending = `
	"query" : { "match_all" : {} },
	"size" : 5`

const PendingPostIndexName = "pending_posts"

const PostIndexName = "posts"

type PostsIndexElasticSearchRepository struct {
	store *search.Store
}

func NewPostsIndexElasticSearchRepository(store *search.Store) PostsIndexElasticSearchRepository {
	return PostsIndexElasticSearchRepository{store: store}
}

func (r PostsIndexElasticSearchRepository) IndexPendingPost(ctx context.Context, pendingPost *post.PostPending) error {

	var pendingPosts []*post.PostPending

	pendingPosts = append(pendingPosts, pendingPost)

	return r.BulkIndexPendingPosts(ctx, pendingPosts)
}

func (r PostsIndexElasticSearchRepository) SearchPendingPosts(ctx context.Context, moderatorId string) ([]*post.PostPending, error) {

	var query string

	if moderatorId == "" {
		query = AllPostPending
	} else {
		query = fmt.Sprintf(SearchPostPending, moderatorId)
	}

	response, err := r.store.Search(PendingPostIndexName, query)

	if err != nil {
		return nil, err
	}

	var posts []*post.PostPending

	for _, pest := range response.Hits {

		var pst PostPendingDocument

		err := json.Unmarshal(pest, &pst)

		if err != nil {
			return nil, err
		}

		var characters []*post.Character

		for _, char := range pst.Characters {
			characters = append(characters, post.UnmarshalCharacterFromDatabase(char.Id, char.Name, char.Thumbnail, post.UnmarshalMediaFromDatabase(char.Media.Id, char.Media.Title, char.Media.Thumbnail)))
		}

		var categories []*post.Category

		for _, cat := range pst.Categories {
			categories = append(categories, post.UnmarshalCategoryFromDatabase(cat.Id, cat.Title, cat.Thumbnail))
		}

		tm, err := time.Parse("UTC", pst.PostedAt)

		posts = append(posts,
			post.UnmarshalPendingPostFromDatabase(
				pst.Id,
				pst.ModeratorId,
				pst.State,
				post.NewArtist(pst.ArtistId, pst.ArtistUsername),
				pst.Contributor.Id,
				pst.Contributor.Username,
				pst.Contributor.Avatar,
				pst.Content,
				characters,
				categories,
				pst.CharactersRequests,
				pst.CategoriesRequests,
				pst.MediaRequests,
				tm,
			),
		)
	}

	return posts, nil
}

func (r PostsIndexElasticSearchRepository) BulkIndexPendingPosts(ctx context.Context, pendingPosts []*post.PostPending) error {
	err := r.store.CreateBulkIndex(PendingPostIndexName)

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
			Id:             pst.ID(),
			ArtistUsername: pst.Artist().Username(),
			ArtistId:       pst.Artist().ID(),
			Contributor: ContributorDocument{
				Id:       pst.Contributor().ID(),
				Avatar:   pst.Contributor().Avatar(),
				Username: pst.Contributor().Username(),
			},
			Content:            pst.RawContent(),
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

func (r PostsIndexElasticSearchRepository) IndexPost(ctx context.Context, pst *post.Post) error {

	// We have only one post - index it
	var posts []*post.Post
	posts = append(posts, pst)

	return r.BulkIndexPosts(ctx, posts)
}

func (r PostsIndexElasticSearchRepository) BulkIndexPosts(ctx context.Context, posts []*post.Post) error {

	err := r.store.CreateBulkIndex(PostIndexName)

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
			Id: pst.ID(),
			Artist: ArtistDocument{
				Id:       pst.Artist().ID(),
				Avatar:   pst.Artist().RawAvatar(),
				Username: pst.Artist().Username(),
			},
			Contributor: ContributorDocument{
				Id:       pst.Contributor().ID(),
				Avatar:   pst.Contributor().Avatar(),
				Username: pst.Contributor().Username(),
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

func (r PostsIndexElasticSearchRepository) DeletePostDocument(ctx context.Context, id string) error {

	if err := r.store.Delete(PostIndexName, id); err != nil {
		return fmt.Errorf("failed to delete pos document: %s", err)
	}

	return nil
}

func (r PostsIndexElasticSearchRepository) DeletePendingPostDocument(ctx context.Context, id string) error {

	if err := r.store.Delete(PendingPostIndexName, id); err != nil {
		return fmt.Errorf("failed to delete pending post document: %s", err)
	}

	return nil
}

func (r PostsIndexElasticSearchRepository) DeletePostIndex(ctx context.Context) error {
	err := r.store.DeleteIndex(PostIndexName)

	if err != nil {
	}

	err = r.store.CreateIndex(PostIndexName, PostIndex)

	if err != nil {
		return fmt.Errorf("failed to create media index: %s", err)
	}

	return nil
}

func (r PostsIndexElasticSearchRepository) DeletePendingPostIndex(ctx context.Context) error {
	err := r.store.DeleteIndex(PendingPostIndexName)

	if err != nil {
	}

	err = r.store.CreateIndex(PendingPostIndexName, PostPendingIndex)

	if err != nil {
		return fmt.Errorf("failed to create media index: %s", err)
	}

	return nil
}
