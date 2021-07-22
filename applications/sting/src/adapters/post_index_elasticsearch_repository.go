package adapters

import (
	"bytes"
	"context"
	"encoding/json"
	"errors"
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
	ContributorId      string               `json:"contributor_id"`
	Content            []string             `json:"content"`
	Categories         []*categoryDocument  `json:"categories"`
	Characters         []*characterDocument `json:"characters"`
	CharactersRequests map[string]string    `json:"characters_requests"`
	CategoriesRequests []string             `json:"categories_requests"`
	MediaRequests      []string             `json:"media_requests"`
	ArtistRequest      string               `json:"artist_request"`
	PostedAt           string               `json:"posted_at"`
	ReassignmentAt     string               `json:"reassignment_at"`
}

const postIndex = `
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
				"contributor_id": {
					"type": "keyword"
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
						},
						"created_at": {
							"type": "date"
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
						"created_at": {
							"type": "date"
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
								},
								"created_at": {
									"type": "date"
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
				"artist_request": {
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
	{{.Size}}
    {{.Sort}}
	"track_total_hits": false
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

func marshalPostToDocument(pst *post.Post) (*postDocument, error) {
	var characterDocuments []*characterDocument

	for _, char := range pst.Characters() {
		c, err := marshalCharacterToDocument(char)

		if err != nil {
			return nil, err
		}

		characterDocuments = append(characterDocuments, c)
	}

	var categoryDocuments []*categoryDocument

	for _, cat := range pst.Categories() {

		cat, err := marshalCategoryToDocument(cat)

		if err != nil {
			return nil, err
		}

		categoryDocuments = append(categoryDocuments, cat)
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
		Id:                 pst.ID(),
		State:              string(pst.State()),
		ArtistId:           pst.ArtistId(),
		ModeratorId:        pst.ModeratorId(),
		ContributorId:      pst.ContributorId(),
		Content:            pst.Content(),
		PostedAt:           strconv.FormatInt(pst.PostedAt().Unix(), 10),
		ArtistRequest:      pst.CustomArtistUsername(),
		Categories:         categoryDocuments,
		Characters:         characterDocuments,
		CharactersRequests: characterRequests,
		CategoriesRequests: categoryRequests,
		MediaRequests:      mediaRequests,
		ReassignmentAt:     strconv.FormatInt(pst.ReassignmentAt().Unix(), 10),
	}, nil
}

func (r PostsIndexElasticSearchRepository) IndexPost(ctx context.Context, post *post.Post) error {

	if err := r.store.CreateBulkIndex(postIndex); err != nil {
		return err
	}

	pst, err := marshalPostToDocument(post)

	if err != nil {
		return err
	}

	if err := r.store.AddToBulkIndex(ctx, post.ID(), pst); err != nil {
		return err
	}

	if err := r.store.CloseBulkIndex(ctx); err != nil {
		return fmt.Errorf("unexpected error: %s", err)
	}

	return nil
}

func (r PostsIndexElasticSearchRepository) SearchPosts(ctx context.Context, cursor *paging.Cursor, filter *post.PostFilters) ([]*post.Post, error) {

	t, err := template.New("searchPost").Parse(searchPostPending)

	if err != nil {
		return nil, err
	}

	if cursor == nil {
		return nil, errors.New("cursor required")
	}

	postId := ""

	if filter.ID() != "" {
		postId = fmt.Sprintf(`{"multi_match": {"query" : %q,"fields" : ["id"],"operator" : "and"}},`, filter.ID())
	}

	curse, sort, count := cursor.BuildElasticsearch("posted_at")

	data := struct {
		ModeratorId string
		PostId      string
		Cursor      string
		Sort        string
		Size        string
	}{
		ModeratorId: filter.ModeratorId(),
		PostId:      postId,
		Size:        count,
		Sort:        sort,
		Cursor:      curse,
	}

	var query bytes.Buffer

	if err := t.Execute(&query, data); err != nil {
		return nil, err
	}

	response, err := r.store.Search(PostIndexName, query.String())

	if err != nil {
		return nil, err
	}

	var posts []*post.Post

	for _, pest := range response.Hits {

		var pst postDocument

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

		postedAt, err := strconv.ParseInt(pst.PostedAt, 10, 64)
		reassignmentAt, err := strconv.ParseInt(pst.ReassignmentAt, 10, 64)

		createdPost := post.UnmarshalPendingPostFromDatabase(
			pst.Id,
			pst.State,
			pst.ModeratorId,
			pst.ArtistId,
			pst.ArtistRequest,
			pst.ContributorId,
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

	return posts, nil
}

func (r PostsIndexElasticSearchRepository) IndexAllPosts(ctx context.Context) error {

	if err := r.store.CreateBulkIndex(PostIndexName); err != nil {
		return err
	}

	scanner := scan.New(r.session,
		scan.Config{
			NodesInCluster: 1,
			CoresInNode:    2,
			SmudgeFactor:   3,
		},
	)

	rep := NewPostsCassandraRepository(r.session)

	err := scanner.RunIterator(postTable, func(iter *gocqlx.Iterx) error {

		var p posts

		for iter.StructScan(&p) {

			var characterDocuments []*characterDocument

			chars, err := rep.GetCharactersById(ctx, p.Characters)

			if err != nil {
				return err
			}

			for _, char := range chars {

				charDoc, err := marshalCharacterToDocument(char)

				if err != nil {
					return err
				}

				characterDocuments = append(characterDocuments, charDoc)
			}

			var categoryDocuments []*categoryDocument

			cats, err := rep.GetCategoriesById(ctx, p.Categories)

			if err != nil {
				return err
			}

			for _, cat := range cats {
				catDoc, err := marshalCategoryToDocument(cat)

				if err != nil {
					return err
				}

				categoryDocuments = append(categoryDocuments, catDoc)
			}

			if err := r.store.AddToBulkIndex(ctx, p.Id, postDocument{
				Id:                 p.Id,
				State:              p.State,
				ModeratorId:        p.ModeratorId,
				ArtistId:           p.ArtistId,
				ContributorId:      p.ContributorId,
				Content:            p.Content,
				Categories:         categoryDocuments,
				Characters:         characterDocuments,
				CharactersRequests: p.CharactersRequests,
				CategoriesRequests: p.CategoriesRequests,
				MediaRequests:      p.MediaRequests,
				ArtistRequest:      p.ArtistRequest,
				PostedAt:           strconv.FormatInt(p.PostedAt.Unix(), 10),
				ReassignmentAt:     strconv.FormatInt(p.ReassignmentAt.Unix(), 10),
			}); err != nil {
				return err
			}
		}

		return nil
	})

	if err != nil {
		return err
	}

	if err := r.store.CloseBulkIndex(ctx); err != nil {
		return fmt.Errorf("unexpected error: %s", err)
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
		return err
	}

	err = r.store.CreateIndex(PostIndexName, postIndex)

	if err != nil {
		return fmt.Errorf("failed to create pending post index: %s", err)
	}

	return nil
}
