package adapters

import (
	"context"
	"encoding/json"
	"fmt"
	"math"
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
	Likes              int                  `json:"likes"`
	ModeratorId        string               `json:"moderator_id"`
	ContributorId      string               `json:"contributor_id"`
	ClubId             string               `json:"club_id"`
	ContentResourceIds []string             `json:"content_resource_ids"`
	Audience           *audienceDocument    `json:"audience"`
	Categories         []*categoryDocument  `json:"categories"`
	Characters         []*characterDocument `json:"characters"`
	CreatedAt          string               `json:"created_at"`
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
				"likes": {
					"type": "integer"
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
                "club_id": {
					"type": "keyword"
				},
				"categories": {
					"type": "nested",
					"properties": ` + categoryIndexProperties + ` 
				},
				"characters": {
					"type": "nested",
					"properties": ` + characterIndexProperties + ` 
				},
				"content_resource_ids": {
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

	var audDoc *audienceDocument

	if pst.Audience() != nil {
		audDoc, err = marshalAudienceToDocument(pst.Audience())

		if err != nil {
			return nil, err
		}
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
		Id:                 pst.ID(),
		Likes:              pst.Likes(),
		State:              pst.State().String(),
		Audience:           audDoc,
		ClubId:             pst.ClubId(),
		ModeratorId:        moderatorId,
		ContributorId:      pst.ContributorId(),
		ContentResourceIds: pst.ContentResourceIds(),
		Categories:         categoryDocuments,
		Characters:         characterDocuments,
		CreatedAt:          strconv.FormatInt(pst.CreatedAt().Unix(), 10),
		PostedAt:           postedAt,
		ReassignmentAt:     reassignmentAt,
	}, nil
}

func (r PostsIndexElasticSearchRepository) RefreshPostIndex(ctx context.Context) error {

	_, err := r.client.
		Refresh().
		Index(PostIndexName).
		Do(ctx)

	if err != nil {
		return fmt.Errorf("failed to refresh post index: %v", err)
	}

	return nil
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

func (r PostsIndexElasticSearchRepository) GetTotalLikesForCharacterOperator(ctx context.Context, character *post.Character) (int, error) {

	response, err := r.client.Search().
		Index(PostIndexName).
		Query(elastic.NewBoolQuery().
			Filter(
				elastic.NewNestedQuery("characters",
					elastic.NewTermQuery("character.id", character.ID()),
				),
			)).
		Aggregation("total_likes", elastic.NewSumAggregation().Field("likes")).
		Do(ctx)

	if err != nil {
		return 0, nil
	}

	sm, _ := response.Aggregations.Sum("total_likes")

	return int(math.Round(*sm.Value)), nil
}

func (r PostsIndexElasticSearchRepository) GetTotalPostsForCharacterOperator(ctx context.Context, character *post.Character) (int, error) {

	count, err := r.client.Count().
		Index(PostIndexName).
		Query(elastic.NewBoolQuery().
			Filter(
				elastic.NewNestedQuery("characters",
					elastic.NewTermQuery("character.id", character.ID()),
				),
			)).
		Do(ctx)

	if err != nil {
		return 0, nil
	}

	return int(count), nil
}

func (r PostsIndexElasticSearchRepository) GetTotalLikesForAudienceOperator(ctx context.Context, audience *post.Audience) (int, error) {

	response, err := r.client.Search().
		Index(PostIndexName).
		Query(elastic.NewBoolQuery().
			Filter(
				elastic.NewNestedQuery("audience",
					elastic.NewTermQuery("audience.id", audience.ID()),
				),
			)).
		Aggregation("total_likes", elastic.NewSumAggregation().Field("likes")).
		Do(ctx)

	if err != nil {
		return 0, nil
	}

	sm, _ := response.Aggregations.Sum("total_likes")

	return int(math.Round(*sm.Value)), nil
}

func (r PostsIndexElasticSearchRepository) GetTotalPostsForAudienceOperator(ctx context.Context, audience *post.Audience) (int, error) {

	count, err := r.client.Count().
		Index(PostIndexName).
		Query(elastic.NewBoolQuery().
			Filter(
				elastic.NewNestedQuery("audience",
					elastic.NewTermQuery("audience.id", audience.ID()),
				),
			)).
		Do(ctx)

	if err != nil {
		return 0, nil
	}

	return int(count), nil
}

func (r PostsIndexElasticSearchRepository) GetTotalLikesForSeriesOperator(ctx context.Context, series *post.Series) (int, error) {

	response, err := r.client.Search().
		Index(PostIndexName).
		Query(elastic.NewBoolQuery().
			Filter(
				elastic.NewNestedQuery("characters.series",
					elastic.NewTermQuery("characters.series.id", series.ID()),
				),
			)).
		Aggregation("total_likes", elastic.NewSumAggregation().Field("likes")).
		Do(ctx)

	if err != nil {
		return 0, nil
	}

	sm, _ := response.Aggregations.Sum("total_likes")

	return int(math.Round(*sm.Value)), nil
}

func (r PostsIndexElasticSearchRepository) GetTotalPostsForSeriesOperator(ctx context.Context, series *post.Series) (int, error) {

	count, err := r.client.Count().
		Index(PostIndexName).
		Query(elastic.NewBoolQuery().
			Filter(
				elastic.NewNestedQuery("characters.series",
					elastic.NewTermQuery("characters.series.id", series.ID()),
				),
			)).
		Do(ctx)

	if err != nil {
		return 0, nil
	}

	return int(count), nil
}

func (r PostsIndexElasticSearchRepository) GetTotalLikesForCategoryOperator(ctx context.Context, category *post.Category) (int, error) {

	response, err := r.client.Search().
		Index(PostIndexName).
		Query(elastic.NewBoolQuery().
			Filter(
				elastic.NewNestedQuery("categories",
					elastic.NewTermQuery("categories.id", category.ID()),
				),
			)).
		Aggregation("total_likes", elastic.NewSumAggregation().Field("likes")).
		Do(ctx)

	if err != nil {
		return 0, nil
	}

	sm, _ := response.Aggregations.Sum("total_likes")

	return int(math.Round(*sm.Value)), nil
}

func (r PostsIndexElasticSearchRepository) GetTotalPostsForCategoryOperator(ctx context.Context, category *post.Category) (int, error) {

	count, err := r.client.Count().
		Index(PostIndexName).
		Query(elastic.NewBoolQuery().
			Filter(
				elastic.NewNestedQuery("categories",
					elastic.NewTermQuery("categories.id", category.ID()),
				),
			)).
		Do(ctx)

	if err != nil {
		return 0, nil
	}

	return int(count), nil
}

func (r PostsIndexElasticSearchRepository) SearchPosts(ctx context.Context, requester *principal.Principal, cursor *paging.Cursor, filter *post.Filters) ([]*post.Post, error) {

	builder := r.client.Search().
		Index(PostIndexName)

	if err := post.CanViewWithFilters(requester, filter); err != nil {
		return nil, err
	}

	if cursor == nil {
		return nil, fmt.Errorf("cursor must be present")
	}

	var sortingColumn string
	var sortingAscending bool

	if filter.SortBy() == post.NewSort {

		sortingColumn = "created_at"

		// if viewing by published, then do posted_at
		if filter.State() != post.Unknown {
			if filter.State() == post.Published {
				sortingColumn = "posted_at"
			}
		}

		sortingAscending = true
	} else if filter.SortBy() == post.TopSort {
		sortingColumn = "likes"
		sortingAscending = false
	}

	cursor.BuildElasticsearch(builder, sortingColumn, sortingAscending)

	query := elastic.NewBoolQuery()

	var filterQueries []elastic.Query

	if filter.State() != post.Unknown {
		filterQueries = append(filterQueries, elastic.NewTermQuery("state", filter.State().String()))
	}

	if len(filter.CategoryIds()) > 0 {
		filterQueries = append(filterQueries, elastic.NewNestedQuery("categories", elastic.NewTermsQueryFromStrings("categories.id", filter.CategoryIds()...)))
	}

	if len(filter.AudienceIds()) > 0 {
		filterQueries = append(filterQueries, elastic.NewNestedQuery("audience", elastic.NewTermsQueryFromStrings("audience.id", filter.AudienceIds()...)))
	}

	if filter.ModeratorId() != nil {
		filterQueries = append(filterQueries, elastic.NewTermQuery("moderator_id", *filter.ModeratorId()))
	}

	if len(filter.ClubIds()) > 0 {
		filterQueries = append(filterQueries, elastic.NewTermsQueryFromStrings("club_id", filter.ClubIds()...))
	}

	if filter.ContributorId() != nil {
		filterQueries = append(filterQueries, elastic.NewTermQuery("contributor_id", *filter.ContributorId()))
	}

	if len(filter.CategorySlugs()) > 0 {
		filterQueries = append(filterQueries, elastic.NewNestedQuery("categories", elastic.NewTermsQueryFromStrings("categories.slug", filter.CategorySlugs()...)))
	}

	if len(filter.CharacterSlugs()) > 0 {
		filterQueries = append(filterQueries, elastic.NewNestedQuery("characters", elastic.NewTermsQueryFromStrings("characters.slug", filter.CharacterSlugs()...)))
	}

	if len(filter.AudienceSlugs()) > 0 {
		filterQueries = append(filterQueries, elastic.NewNestedQuery("audience", elastic.NewTermsQueryFromStrings("audience.slug", filter.AudienceSlugs()...)))
	}

	if len(filter.SeriesSlugs()) > 0 {
		filterQueries = append(filterQueries, elastic.NewNestedQuery("characters.series", elastic.NewTermsQueryFromStrings("characters.series.slug", filter.SeriesSlugs()...)))
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
			characters = append(characters, post.UnmarshalCharacterFromDatabase(
				char.Id,
				char.Slug,
				char.Name,
				char.ThumbnailResourceId,
				char.TotalLikes,
				char.TotalPosts,
				post.UnmarshalSeriesFromDatabase(
					char.Series.Id,
					char.Series.Slug,
					char.Series.Title,
					char.Series.ThumbnailResourceId,
					char.Series.TotalLikes,
					char.TotalLikes,
				),
			))
		}

		var categories []*post.Category

		for _, cat := range pst.Categories {
			categories = append(categories, post.UnmarshalCategoryFromDatabase(
				cat.Id,
				cat.Slug,
				cat.Title,
				cat.ThumbnailResourceId,
				cat.TotalLikes,
				cat.TotalPosts,
			))
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

		var audience *post.Audience

		if pst.Audience != nil {
			audience = post.UnmarshalAudienceFromDatabase(
				pst.Audience.Id,
				pst.Audience.Slug,
				pst.Audience.Title,
				pst.Audience.ThumbnailResourceId,
				pst.Audience.Standard,
				pst.Audience.TotalLikes,
				pst.Audience.TotalPosts,
			)
		}

		createdPost := post.UnmarshalPostFromDatabase(
			pst.Id,
			pst.State,
			pst.Likes,
			&pst.ModeratorId,
			pst.ContributorId,
			pst.ContentResourceIds,
			pst.ClubId,
			audience,
			characters,
			categories,
			time.Unix(createdAt, 0),
			postedAtTime,
			reassignmentAtTime,
		)

		createdPost.Node = paging.NewNode(hit.Sort)

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
				Id:                 p.Id,
				State:              p.State,
				Likes:              p.Likes,
				ModeratorId:        moderatorId,
				ContributorId:      p.ContributorId,
				ContentResourceIds: p.ContentResourceIds,
				ClubId:             p.ClubId,
				Audience:           audDoc,
				Categories:         categoryDocuments,
				Characters:         characterDocuments,
				CreatedAt:          strconv.FormatInt(p.CreatedAt.Unix(), 10),
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
