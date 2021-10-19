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
	Id             string               `json:"id"`
	State          string               `json:"state"`
	ModeratorId    string               `json:"moderator_id"`
	ContributorId  string               `json:"contributor_id"`
	Content        []string             `json:"content"`
	Audience       *audienceDocument    `json:"audience"`
	Brand          *brandDocument       `json:"brand"`
	Categories     []*categoryDocument  `json:"categories"`
	Characters     []*characterDocument `json:"characters"`
	CreatedAt      string               `json:"created_at"`
	PostedAt       string               `json:"posted_at"`
	ReassignmentAt string               `json:"reassignment_at"`
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
				"contributor_id": {
					"type": "keyword"
				},
				"audience": {
					"type": "nested",
					"properties": ` + audienceIndexProperties + ` 
				},
				"brand": {
					"type": "nested",
					"properties": ` + brandsIndexProperties + ` 
				},
				"categories": {
					"type": "nested",
					"properties": ` + categoryIndexProperties + ` 
				},
				"characters": {
					"type": "nested",
					"properties": ` + characterIndexProperties + ` 
				},
				"content": {
                     "type": "keyword"
				},
				"created_at": {
                     "type": "date"
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
	var err error

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

	var brandDoc *brandDocument

	if pst.Brand() != nil {
		brandDoc, err = marshalBrandToDocument(pst.Brand())

		if err != nil {
			return nil, err
		}
	}

	var audDoc *audienceDocument

	if pst.Audience() != nil {
		audDoc, err = marshalAudienceToDocument(pst.Audience())

		if err != nil {
			return nil, err
		}
	}

	var content []string

	for _, cnt := range pst.Content() {

		contentThumb, err := cnt.MarshalResourceToDatabase()

		if err != nil {
			return nil, err
		}

		content = append(content, contentThumb)
	}

	var moderatorId string

	if pst.ModeratorId() != nil {
		moderatorId = *pst.ModeratorId()
	}

	var postedAt string

	if pst.PostedAt() != nil {
		postedAt = strconv.FormatInt(pst.PostedAt().Unix(), 10)
	} else {
		postedAt = strconv.FormatInt(0, 10)
	}

	var reassignmentAt string

	if pst.ReassignmentAt() != nil {
		reassignmentAt = strconv.FormatInt(pst.ReassignmentAt().Unix(), 10)
	} else {
		reassignmentAt = strconv.FormatInt(0, 10)
	}

	return &postDocument{
		Id:             pst.ID(),
		State:          pst.State(),
		Audience:       audDoc,
		Brand:          brandDoc,
		ModeratorId:    moderatorId,
		ContributorId:  pst.ContributorId(),
		Content:        content,
		Categories:     categoryDocuments,
		Characters:     characterDocuments,
		CreatedAt:      strconv.FormatInt(pst.CreatedAt().Unix(), 10),
		PostedAt:       postedAt,
		ReassignmentAt: reassignmentAt,
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
		BodyJson(*pst).
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

	query := cursor.BuildElasticsearch(builder, "created_at")

	var filterQueries []elastic.Query

	if filter.State() != nil {
		filterQueries = append(filterQueries, elastic.NewTermQuery("state", *filter.State()))
	}

	if filter.ModeratorId() != nil {
		filterQueries = append(filterQueries, elastic.NewTermQuery("moderator_id", *filter.ModeratorId()))
	}

	if filter.ContributorId() != nil {
		filterQueries = append(filterQueries, elastic.NewTermQuery("contributor_id", *filter.ContributorId()))
	}

	if len(filter.CategorySlugs()) > 0 {
		for _, id := range filter.CategorySlugs() {
			filterQueries = append(filterQueries, elastic.NewNestedQuery("categories", elastic.NewTermQuery("categories.slug", id)))
		}
	}

	if len(filter.CharacterSlugs()) > 0 {
		for _, id := range filter.CharacterSlugs() {
			filterQueries = append(filterQueries, elastic.NewNestedQuery("characters", elastic.NewTermQuery("characters.slug", id)))
		}
	}

	if len(filter.BrandSlugs()) > 0 {
		for _, id := range filter.BrandSlugs() {
			filterQueries = append(filterQueries, elastic.NewNestedQuery("brand", elastic.NewTermQuery("brand.slug", id)))
		}
	}

	if len(filter.AudienceSlugs()) > 0 {
		for _, id := range filter.AudienceSlugs() {
			filterQueries = append(filterQueries, elastic.NewNestedQuery("audience", elastic.NewTermQuery("audience.slug", id)))
		}
	}

	if len(filter.SeriesSlugs()) > 0 {
		for _, id := range filter.SeriesSlugs() {
			filterQueries = append(filterQueries, elastic.NewNestedQuery("characters.series", elastic.NewTermQuery("characters.series.slug", id)))
		}
	}

	// if orderby another column
	if filter.OrderBy() != "created_at" {
		builder.Sort(filter.OrderBy(), false)
	}

	if filterQueries != nil {
		query.Filter(filterQueries...)
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
			characters = append(characters, post.UnmarshalCharacterFromDatabase(char.Id, char.Slug, char.Name, char.Thumbnail, post.UnmarshalSeriesFromDatabase(char.Series.Id, char.Series.Slug, char.Series.Title, char.Series.Thumbnail)))
		}

		var categories []*post.Category

		for _, cat := range pst.Categories {
			categories = append(categories, post.UnmarshalCategoryFromDatabase(cat.Id, cat.Slug, cat.Title, cat.Thumbnail))
		}

		createdAt, err := strconv.ParseInt(pst.CreatedAt, 10, 64)

		if err != nil {
			return nil, err
		}

		var postedAtTime *time.Time
		var reassignmentAtTime *time.Time

		if pst.ReassignmentAt != "" {
			reassignmentAt, err := strconv.ParseInt(pst.ReassignmentAt, 10, 64)

			if err != nil {
				return nil, err
			}

			newTime := time.Unix(reassignmentAt, 0)

			reassignmentAtTime = &newTime
		}

		if pst.PostedAt != "" {
			postedAt, err := strconv.ParseInt(pst.PostedAt, 10, 64)

			if err != nil {
				return nil, err
			}

			newTime := time.Unix(postedAt, 0)

			postedAtTime = &newTime
		}

		createdPost := post.UnmarshalPostFromDatabase(
			pst.Id,
			pst.State,
			&pst.ModeratorId,
			pst.ContributorId,
			pst.Content,
			post.UnmarshalBrandFromDatabase(pst.Brand.Id, pst.Brand.Slug, pst.Brand.Name, pst.Brand.Thumbnail),
			post.UnmarshalAudienceFromDatabase(pst.Audience.Id, pst.Audience.Slug, pst.Audience.Title, pst.Audience.Thumbnail, pst.Audience.Standard),
			characters,
			categories,
			time.Unix(createdAt, 0),
			postedAtTime,
			reassignmentAtTime,
		)

		createdPost.Node = paging.NewNode(pst.CreatedAt)

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

	err := scanner.RunIterator(ctx, postTable, func(iter *gocqlx.Iterx) error {

		var p posts

		for iter.StructScan(&p) {

			var characterDocuments []*characterDocument

			chars, err := rep.GetCharactersById(ctx, p.CharacterIds)

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

			cats, err := rep.GetCategoriesById(ctx, p.CategoryIds)

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

			var brandDoc *brandDocument

			if p.BrandId != nil {
				brnd, err := rep.GetBrandById(ctx, nil, *p.BrandId)

				if err != nil {
					return err
				}

				brandDoc, err = marshalBrandToDocument(brnd)

				if err != nil {
					return err
				}
			}

			var audDoc *audienceDocument

			if p.AudienceId != nil {
				aud, err := rep.GetAudienceById(ctx, nil, *p.AudienceId)

				if err != nil {
					return err
				}

				audDoc, err = marshalAudienceToDocument(aud)

				if err != nil {
					return err
				}
			}

			var moderatorId string

			if p.ModeratorId != nil {
				moderatorId = *p.ModeratorId
			}

			doc := postDocument{
				Id:             p.Id,
				State:          p.State,
				ModeratorId:    moderatorId,
				ContributorId:  p.ContributorId,
				Content:        p.Content,
				Brand:          brandDoc,
				Audience:       audDoc,
				Categories:     categoryDocuments,
				Characters:     characterDocuments,
				CreatedAt:      strconv.FormatInt(p.CreatedAt.Unix(), 10),
				PostedAt:       strconv.FormatInt(p.PostedAt.Unix(), 10),
				ReassignmentAt: strconv.FormatInt(p.ReassignmentAt.Unix(), 10),
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
