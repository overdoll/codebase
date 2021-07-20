package adapters

import (
	"bytes"
	"context"
	"encoding/json"
	"fmt"
	"strconv"
	"text/template"
	"time"

	"github.com/scylladb/gocqlx/v2"
	"overdoll/applications/sting/src/domain/post"
	search "overdoll/libraries/elasticsearch"
	"overdoll/libraries/paging"
	"overdoll/libraries/scan"
)

type postDocument struct {
	Id                 string               `json:"id"`
	State              string               `json:"state"`
	ModeratorId        string               `json:"moderator_id"`
	ArtistId           string               `json:"artist_id"`
	ArtistUsername     string               `json:"artist_username"`
	Contributor        contributorDocument  `json:"contributor"`
	Content            []string             `json:"content"`
	Categories         []*categoryDocument  `json:"categories"`
	Characters         []*characterDocument `json:"characters"`
	CharactersRequests map[string]string    `json:"characters_requests"`
	CategoriesRequests []string             `json:"categories_requests"`
	MediaRequests      []string             `json:"media_requests"`
	PostedAt           string               `json:"posted_at"`
	ReassignmentAt     string               `json:"reassignment_at"`
}

type contributorDocument struct {
	Id       string `json:"id"`
	Avatar   string `json:"avatar"`
	Username string `json:"username"`
}

const postPendingIndex = `
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
				},
				"reassignment_at": {
                     "type": "date"
				}
			}
	}
}`

const searchPostPending = `	
    "query" : {
		"bool": {
			"must": [
				{{.Cursor}}
				{{.PendingPostID}}
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

// needs to be exported because its used in a test to refresh the index
const PostIndexName = "posts"

type PostsIndexElasticSearchRepository struct {
	session gocqlx.Session
	store   *search.Store
}

func NewPostsIndexElasticSearchRepository(store *search.Store, session gocqlx.Session) PostsIndexElasticSearchRepository {
	return PostsIndexElasticSearchRepository{store: store, session: session}
}

func (r PostsIndexElasticSearchRepository) IndexPost(ctx context.Context, pendingPost *post.Post) error {

	var pendingPosts []*post.Post

	pendingPosts = append(pendingPosts, pendingPost)

	return r.BulkIndexPosts(ctx, pendingPosts)
}

func marshalPostToDocument(pst *post.Post) *postDocument {
	var characterDocuments []*characterDocument

	for _, char := range pst.Characters() {
		characterDocuments = append(characterDocuments, marshalCharacterToDocument(char))
	}

	var categoryDocuments []*categoryDocument

	for _, cat := range pst.Categories() {
		categoryDocuments = append(categoryDocuments, marshalCategoryToDocument(cat))
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

	return &postDocument{
		Id:             pst.ID(),
		State:          string(pst.State()),
		ArtistUsername: "",
		ArtistId:       pst.Artist().ID(),
		ModeratorId:    pst.ModeratorId(),
		Contributor: contributorDocument{
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
		ReassignmentAt:     strconv.FormatInt(pst.ReassignmentAt().Unix(), 10),
	}
}

func (r PostsIndexElasticSearchRepository) SearchPosts(ctx context.Context, cursor *paging.Cursor, filter *post.PostFilters) ([]*post.Post, *paging.Info, error) {

	t, err := template.New("searchPostPending").Parse(searchPostPending)

	if err != nil {
		return nil, nil, err
	}

	paginator := paging.NewPagination(cursor)

	runSearch := func(rng string, size int) (*search.SearchResults, error) {

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
			Size:        size,
			ModeratorId: filter.ModeratorId(),
			Cursor:      rng,
			PostId:      postId,
		}

		var query bytes.Buffer

		if err := t.Execute(&query, data); err != nil {
			return nil, err
		}

		return r.store.Search(PostIndexName, query.String())
	}

	var response *search.SearchResults

	paginator.DefineForwardsPagination(func(first int, after string) (bool, error) {

		cursor := ""

		if after != "" {
			cursor = fmt.Sprintf(`{"range": {"posted_at": { "gt": %q } } },`, after)
		}

		response, err = runSearch(cursor, first)

		if err != nil {
			return false, err
		}

		return response.Total-len(response.Hits) > 0, nil
	})

	paginator.DefineBackwardsPagination(func(last int, before string) (bool, error) {

		response, err = runSearch(fmt.Sprintf(`{"range": {"posted_at": { "lt": %q } } },`, before), last)

		if err != nil {
			return false, err
		}

		return response.Total-len(response.Hits) > 0, nil
	})

	pageInfo, err := paginator.Run()

	if err != nil {
		return nil, nil, err
	}

	var posts []*post.Post

	for _, pest := range response.Hits {

		var pst postDocument

		err := json.Unmarshal(pest, &pst)

		if err != nil {
			return nil, nil, err
		}

		var characters []*post.Character

		for _, char := range pst.Characters {
			characters = append(characters, post.UnmarshalCharacterFromDatabase(char.Id, char.Name, char.Thumbnail, post.UnmarshalMediaFromDatabase(char.Media.Id, char.Media.Title, char.Media.Thumbnail)))
		}

		var categories []*post.Category

		for _, cat := range pst.Categories {
			categories = append(categories, post.UnmarshalCategoryFromDatabase(cat.Id, cat.Title, cat.Thumbnail))
		}

		postedAt, err := strconv.ParseInt(pst.PostedAt, 10, 64)
		reassignmentAt, err := strconv.ParseInt(pst.ReassignmentAt, 10, 64)

		createdPost := post.UnmarshalPendingPostFromDatabase(
			pst.Id,
			pst.ModeratorId,
			pst.State,
			post.NewArtist(pst.ArtistId),
			pst.Contributor.Id,
			pst.Contributor.Username,
			pst.Contributor.Avatar,
			pst.Content,
			characters,
			categories,
			pst.CharactersRequests,
			pst.CategoriesRequests,
			pst.MediaRequests,
			time.Unix(postedAt, 0),
			time.Unix(reassignmentAt, 0),
		)

		createdPost.Node = paging.NewNode(pst.PostedAt)

		posts = append(posts, createdPost)
	}

	return posts, pageInfo, nil
}

func (r PostsIndexElasticSearchRepository) IndexAllPosts(ctx context.Context) error {
	
	scanner := scan.New(r.session,
		scan.Config{
			NodesInCluster: 1,
			CoresInNode:    2,
			SmudgeFactor:   3,
		},
	)

	err := scanner.RunIterator(mediaTable, func(iter *gocqlx.Iterx) error {

		if err := r.store.CreateBulkIndex(mediaIndex); err != nil {
			return err
		}

		var p posts

		for iter.StructScan(&p) {

			var characterDocuments []*characterDocument

			for _, char := range pst.Characters() {
				characterDocuments = append(characterDocuments, marshalCharacterToDocument(char))
			}

			var categoryDocuments []*categoryDocument

			for _, cat := range p.Categories {
				categoryDocuments = append(categoryDocuments, &categoryDocument{
					Id:        cat,
					Thumbnail: "",
					Title:     "",
				})
			}

			if err := r.store.AddToBulkIndex(p.Id, postDocument{
				Id:                 p.Id,
				State:              p.State,
				ModeratorId:        p.ModeratorId,
				ArtistId:           p.ArtistId,
				ArtistUsername:     p.ArtistRequest,
				Contributor:        contributorDocument{},
				Content:            p.Content,
				Categories:         p.Categories,
				Characters:         nil,
				CharactersRequests: nil,
				CategoriesRequests: nil,
				MediaRequests:      nil,
				PostedAt:           "",
				ReassignmentAt:     "",
			}); err != nil {
				return err
			}
		}

		if err := r.store.CloseBulkIndex(); err != nil {
			return fmt.Errorf("unexpected error: %s", err)
		}

		return nil
	})

	if err != nil {
		return err
	}
	
	return nil
}

func (r PostsIndexElasticSearchRepository) DeletePost(ctx context.Context, id string) error {

	if err := r.store.Delete(PostIndexName, id); err != nil {
		return fmt.Errorf("failed to delete pending post document: %s", err)
	}

	return nil
}

func (r PostsIndexElasticSearchRepository) DeletePostIndex(ctx context.Context) error {
	
	err := r.store.DeleteIndex(PostIndexName)

	if err != nil {
	}

	err = r.store.CreateIndex(PostIndexName, postPendingIndex)

	if err != nil {
		return fmt.Errorf("failed to create pending post index: %s", err)
	}

	return nil
}
