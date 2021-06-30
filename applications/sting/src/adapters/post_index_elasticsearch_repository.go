package adapters

import (
	"bytes"
	"context"
	"encoding/json"
	"fmt"
	"strconv"
	"text/template"
	"time"

	"overdoll/applications/sting/src/domain/post"
	search "overdoll/libraries/elasticsearch"
	"overdoll/libraries/paging"
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
				},
				"artist": {
					"type": "nested",
					"properties": {
						"id": {
							"type": "keyword"
						},
						"avatar": {
							"type": "keyword"
						},
						"username": {
							"type": "text",
							"analyzer": "english"
						}
					}
				},
				"contributor": {
					"type": "nested",
					"properties": {
						"id": {
							"type": "keyword"
						},
						"avatar": {
							"type": "keyword"
						},
						"username": {
							"type": "text",
							"analyzer": "english"
						}
					}
				},
				"categories": {
					"type": "nested",
					"properties": {
						"id": {
							"type": "keyword"
						},
						"thumbnail": {
							"type": "keyword"
						},
						"title": {
							"type": "text",
							"analyzer": "english"
						}
					}
				},
				"characters": {
					"type": "nested",
					"properties": {
						"id": {
							"type": "keyword"
						},
						"thumbnail": {
							"type": "keyword"
						},
						"name": {
							"type": "text",
							"analyzer": "english"
						}
					}
				},
				"content": {
                     "type": "keyword"
				},
				"posted_at": {
                     "type": "date"
				},
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
				},
				"state": {
					"type": "keyword"
				},
				"moderator_id": {
					"type": "keyword"
				},
				"artist_id": {
					"type": "keyword"
				},
				"artist_username": {
					"type": "keyword"
				},
				"contributor": {
					"type": "nested",
					"properties": {
						"id": {
							"type": "keyword"
						},
						"avatar": {
							"type": "keyword"
						},
						"username": {
							"type": "text",
							"analyzer": "english"
						}
					}
				},
				"categories": {
					"type": "nested",
					"properties": {
						"id": {
							"type": "keyword"
						},
						"thumbnail": {
							"type": "keyword"
						},
						"title": {
							"type": "text",
							"analyzer": "english"
						}
					}
				},
				"characters": {
					"type": "nested",
					"properties": {
						"id": {
							"type": "keyword"
						},
						"thumbnail": {
							"type": "keyword"
						},
						"name": {
							"type": "text",
							"analyzer": "english"
						},
					    "media": {
							"dynamic": "strict",
							"properties": {
								"id": {
									"type": "keyword"
								},
								"thumbnail": {
									"type": "keyword"
								},
								"title": {
									"type": "text",
									"analyzer": "english"
								}
							}		
						}			
					}
				},
				"content": {
                     "type": "keyword"
				},
				"categories_requests": {
                     "type": "keyword"
				},
				"media_requests": {
                     "type": "keyword"
				},
				"characters_requests": {
                     "type": "object",
					 "dynamic": true
				},
				"posted_at": {
                     "type": "date"
				}
			}
	}
}`

const SearchPostPending = `	
    "query" : {
		"bool": {
			"must": [
				{{.Cursor}}
				{{.PostId}}
				{
					"multi_match": {
						"query" : "{{.ModeratorId}}",
						"fields" : ["moderator_id"],
						"operator" : "and"
					}
				},
				{
					"multi_match": {
						"query" : "review",
						"fields" : ["state"],
						"operator" : "and"
					}
				}
			]
		}
	},
	"size" : {{.Size}},
    "sort": [{"posted_at": "asc"}],
	"track_total_hits": true
`

const PendingPostIndexName = "pending_posts"

const PostIndexName = "posts"

type PostsIndexElasticSearchRepository struct {
	store *search.Store
}

func NewPostsIndexElasticSearchRepository(store *search.Store) PostsIndexElasticSearchRepository {
	return PostsIndexElasticSearchRepository{store: store}
}

func (r PostsIndexElasticSearchRepository) IndexPendingPost(ctx context.Context, pendingPost *post.PendingPost) error {

	var pendingPosts []*post.PendingPost

	pendingPosts = append(pendingPosts, pendingPost)

	return r.BulkIndexPendingPosts(ctx, pendingPosts)
}

func (r PostsIndexElasticSearchRepository) SearchPendingPosts(ctx context.Context, cursor *paging.Cursor, filter *post.PendingPostFilters) (*post.PendingPostConnection, error) {

	t, err := template.New("SearchPostPending").Parse(SearchPostPending)

	if err != nil {
		return nil, err
	}

	cont := cursor.First()

	rng := ""

	if cursor.IsAfterCursor() {
		rng = fmt.Sprintf(`{"range": {"posted_at": { "gt": %q } } },`, cursor.After())
	}

	if cursor.IsBeforeCursor() {
		rng = fmt.Sprintf(`{"range": {"posted_at": { "lt": %q } } },`, cursor.Before())
		cont = cursor.Last()
	}

	postId := ""

	if filter.ID() != "" {
		postId = fmt.Sprintf(`{"multi_match": {"query" : %q,"fields" : ["id"],"operator" : "and"}},`, filter.ID())
	}

	data := struct {
		Cursor      string
		ModeratorId string
		Size        int
		PostId      string
	}{
		Size:        cont,
		ModeratorId: filter.ModeratorId(),
		Cursor:      rng,
		PostId:      postId,
	}

	var query bytes.Buffer

	if err := t.Execute(&query, data); err != nil {
		return nil, err
	}

	response, err := r.store.Search(PendingPostIndexName, query.String())

	if err != nil {
		return nil, err
	}

	var posts []*post.PendingPostEdge

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

		p, err := strconv.ParseInt(pst.PostedAt, 10, 64)

		posts = append(posts, &post.PendingPostEdge{
			Cursor: pst.PostedAt,
			Node: post.UnmarshalPendingPostFromDatabase(
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
				time.Unix(p, 0),
			),
		})
	}

	return &post.PendingPostConnection{
		Edges:    posts,
		PageInfo: paging.NewPageInfo(response.Total-len(posts) > 0),
	}, nil
}

func (r PostsIndexElasticSearchRepository) BulkIndexPendingPosts(ctx context.Context, pendingPosts []*post.PendingPost) error {
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
			State:          string(pst.State()),
			ArtistUsername: pst.Artist().Username(),
			ArtistId:       pst.Artist().ID(),
			ModeratorId:    pst.ModeratorId(),
			Contributor: ContributorDocument{
				Id:       pst.Contributor().ID(),
				Avatar:   pst.Contributor().Avatar(),
				Username: pst.Contributor().Username(),
			},
			Content:            pst.RawContent(),
			PostedAt:           strconv.FormatInt(pst.PostedAt().Unix(), 10),
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
		return fmt.Errorf("failed to create pending post index: %s", err)
	}

	return nil
}
