package adapters

import (
	"context"
	"encoding/json"
	"errors"
	"fmt"
	"strconv"
	"time"

	"github.com/olivere/elastic/v7"
	"github.com/scylladb/gocqlx/v2"
	"overdoll/applications/sting/internal/domain/post"
	"overdoll/libraries/paging"
	"overdoll/libraries/principal"
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

// needs to be exported because its used in a test to refresh the index
const PostIndexName = "posts"

type PostsIndexElasticSearchRepository struct {
	session gocqlx.Session
	client  *elastic.Client
}

func NewPostsIndexElasticSearchRepository(client *elastic.Client, session gocqlx.Session) PostsIndexElasticSearchRepository {
	return PostsIndexElasticSearchRepository{client: client, session: session}
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

	pst, err := marshalPostToDocument(post)

	if err != nil {
		return err
	}

	_, err = r.client.
		Index().
		Index(PostIndexName).
		Id(post.ID()).
		BodyJson(pst).
		Do(ctx)

	if err != nil {
		return fmt.Errorf("failed to index post: %v", err)
	}

	return nil
}

func (r PostsIndexElasticSearchRepository) SearchPosts(ctx context.Context, requester *principal.Principal, cursor *paging.Cursor, filter *post.PostFilters) ([]*post.Post, error) {

	builder := r.client.Search().
		Index(PostIndexName)

	if cursor == nil {
		return nil, errors.New("cursor required")
	}

	if err := post.CanViewWithFilters(requester, filter); err != nil {
		return nil, err
	}

	query := cursor.BuildElasticsearch(builder, "posted_at")

	if filter.ModeratorId() != nil {
		query.Must(elastic.NewMultiMatchQuery(*filter.ModeratorId(), "moderator_id"))
		// only show if post is in review when filtering by moderator ID
		query.Must(elastic.NewMultiMatchQuery("review", "state"))
	}

	if filter.ContributorId() != nil {
		query.Must(elastic.NewMultiMatchQuery(*filter.ContributorId(), "contributor_id"))
	}

	builder.Query(query)

	response, err := builder.Pretty(true).Do(ctx)

	if err != nil {
		return nil, fmt.Errorf("failed to search posts: %v", err)
	}

	var posts []*post.Post

	for _, hit := range response.Hits.Hits {

		var pst postDocument

		err := json.Unmarshal(hit.Source, &pst)

		if err != nil {
			return nil, fmt.Errorf("failed to unmarshal post: %v", err)
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

		createdPost := post.UnmarshalPostFromDatabase(
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

			doc := postDocument{
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
			}

			_, err = r.client.
				Index().
				Index(PostIndexName).
				Id(p.Id).
				BodyJson(doc).
				Do(ctx)

			if err != nil {
				return fmt.Errorf("failed to index post: %v", err)
			}
		}

		return nil
	})

	if err != nil {
		return err
	}

	return nil
}

func (r PostsIndexElasticSearchRepository) DeletePost(ctx context.Context, id string) error {

	if _, err := r.client.Delete().Index(PostIndexName).Id(id).Do(ctx); err != nil {
		return fmt.Errorf("failed to delete post document: %v", err)
	}

	return nil
}

func (r PostsIndexElasticSearchRepository) DeletePostIndex(ctx context.Context) error {

	exists, err := r.client.IndexExists(PostIndexName).Do(ctx)

	if err != nil {
		return err
	}

	if exists {
		if _, err := r.client.DeleteIndex(PostIndexName).Do(ctx); err != nil {
			// Handle error
			return err
		}
	}

	if _, err := r.client.CreateIndex(PostIndexName).BodyString(postIndex).Do(ctx); err != nil {
		return err
	}

	return nil
}
