package adapters

import (
	"context"
	"encoding/json"
	"fmt"
	"math"
	"overdoll/applications/sting/internal/app/query"
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
	Id                              string            `json:"id"`
	State                           string            `json:"state"`
	SupporterOnlyStatus             string            `db:"supporter_only_status"`
	ContentResourceIds              []string          `db:"content_resource_ids"`
	ContentSupporterOnly            map[string]bool   `db:"content_supporter_only"`
	ContentSupporterOnlyResourceIds map[string]string `db:"content_supporter_only_resource_ids"`
	Likes                           int               `json:"likes"`
	ModeratorId                     string            `json:"moderator_id"`
	ContributorId                   string            `json:"contributor_id"`
	ClubId                          string            `json:"club_id"`
	AudienceId                      string            `json:"audience_id"`
	CategoryIds                     []string          `json:"category_ids"`
	CharacterIds                    []string          `json:"character_ids"`
	SeriesIds                       []string          `json:"series_ids"`
	CreatedAt                       string            `json:"created_at"`
	PostedAt                        string            `json:"posted_at"`
	ReassignmentAt                  string            `json:"reassignment_at"`
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
				"supporter_only_status": {
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
				"audience_id": {
					"type": "keyword"
				},
                "club_id": {
					"type": "keyword"
				},
				"category_ids": {
					"type": "keyword"
				},
				"character_ids": {
					"type": "keyword"
				},
				"series_ids": {
					"type": "keyword"
				},
				"content_resource_ids": {
                     "type": "keyword"
				},
				"content_supporter_only": {
                     "type": "object",
					 "dynamic": true
				},
				"content_supporter_only_resource_ids": {
                     "type": "object",
					 "dynamic": true
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
	stella  query.StellaService
}

func NewPostsIndexElasticSearchRepository(client *elastic.Client, session gocqlx.Session, stella query.StellaService) PostsIndexElasticSearchRepository {
	return PostsIndexElasticSearchRepository{client: client, session: session, stella: stella}
}

func unmarshalPostDocument(hit *elastic.SearchHit, supportedClubIds []string) (*post.Post, error) {

	var pst postDocument

	err := json.Unmarshal(hit.Source, &pst)

	if err != nil {
		return nil, fmt.Errorf("failed to unmarshal post: %v", err)
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

	var audience *string

	if pst.AudienceId != "" {
		audience = &pst.AudienceId
	}

	createdPost := post.UnmarshalPostFromDatabase(
		pst.Id,
		pst.State,
		pst.SupporterOnlyStatus,
		pst.Likes,
		&pst.ModeratorId,
		pst.ContributorId,
		pst.ContentResourceIds,
		pst.ContentSupporterOnly,
		pst.ContentSupporterOnlyResourceIds,
		pst.ClubId,
		audience,
		pst.CharacterIds,
		pst.SeriesIds,
		pst.CategoryIds,
		time.Unix(createdAt, 0),
		postedAtTime,
		reassignmentAtTime,
		supportedClubIds,
	)

	createdPost.Node = paging.NewNode(hit.Sort)

	return createdPost, nil
}

func marshalPostToDocument(pst *post.Post) (*postDocument, error) {

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

	var audience string

	if pst.AudienceId() != nil {
		audience = *pst.AudienceId()
	}

	var contentResourceIds []string
	var contentSupporterOnly map[string]bool
	var contentSupporterOnlyResourceIds map[string]string

	for _, cont := range pst.Content() {
		contentResourceIds = append(contentResourceIds, cont.ResourceId())
		contentSupporterOnly[cont.ResourceId()] = cont.IsSupporterOnly()
		if cont.IsSupporterOnly() {
			contentSupporterOnlyResourceIds[cont.ResourceId()] = cont.ResourceIdHidden()
		}
	}

	return &postDocument{
		Id:                              pst.ID(),
		Likes:                           pst.Likes(),
		SupporterOnlyStatus:             pst.SupporterOnlyStatus().String(),
		State:                           pst.State().String(),
		AudienceId:                      audience,
		ClubId:                          pst.ClubId(),
		ModeratorId:                     moderatorId,
		ContributorId:                   pst.ContributorId(),
		ContentResourceIds:              contentResourceIds,
		ContentSupporterOnly:            contentSupporterOnly,
		ContentSupporterOnlyResourceIds: contentSupporterOnlyResourceIds,
		CategoryIds:                     pst.CategoryIds(),
		CharacterIds:                    pst.CharacterIds(),
		SeriesIds:                       pst.SeriesIds(),
		CreatedAt:                       strconv.FormatInt(pst.CreatedAt().Unix(), 10),
		PostedAt:                        postedAt,
		ReassignmentAt:                  reassignmentAt,
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
				elastic.NewTermsQueryFromStrings("character_ids", character.ID()),
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
				elastic.NewTermsQueryFromStrings("character_ids", character.ID()),
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
				elastic.NewTermsQueryFromStrings("audience_id", audience.ID()),
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
				elastic.NewTermsQueryFromStrings("audience_id", audience.ID()),
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
				elastic.NewTermsQueryFromStrings("series_ids", series.ID()),
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
				elastic.NewTermsQueryFromStrings("series_ids", series.ID()),
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
				elastic.NewTermsQueryFromStrings("category_ids", category.ID()),
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
				elastic.NewTermsQueryFromStrings("category_ids", category.ID()),
			)).
		Do(ctx)

	if err != nil {
		return 0, nil
	}

	return int(count), nil
}

func (r PostsIndexElasticSearchRepository) ClubMembersPostsFeed(ctx context.Context, requester *principal.Principal, cursor *paging.Cursor) ([]*post.Post, error) {

	builder := r.client.Search().
		Index(PostIndexName)

	if cursor == nil {
		return nil, fmt.Errorf("cursor must be present")
	}

	if err := cursor.BuildElasticsearch(builder, post.NewSort.String(), "id", true); err != nil {
		return nil, err
	}

	query := elastic.NewBoolQuery()

	var filterQueries []elastic.Query

	suspendedClubs, err := r.stella.GetSuspendedClubs(ctx)

	if err != nil {
		return nil, err
	}

	filterQueries = append(filterQueries, elastic.NewBoolQuery().MustNot(elastic.NewTermsQueryFromStrings("club_id", suspendedClubs...)))
	filterQueries = append(filterQueries, elastic.NewTermQuery("state", post.Published.String()))
	filterQueries = append(filterQueries, elastic.NewTermsQueryFromStrings("supporter_only_status", post.None.String(), post.Partial.String(), post.Full.String()))

	query.Filter(filterQueries...)

	builder.Query(query)

	response, err := builder.Pretty(true).Do(ctx)

	if err != nil {
		return nil, fmt.Errorf("failed to search posts: %v", err)
	}

	var supportedClubIds []string

	if requester != nil {
		supportedClubIds, err = r.stella.GetAccountSupportedClubs(ctx, requester.AccountId())
		if err != nil {
			return nil, err
		}
	}

	var posts []*post.Post

	for _, hit := range response.Hits.Hits {

		createdPost, err := unmarshalPostDocument(hit, supportedClubIds)

		if err != nil {
			return nil, err
		}

		posts = append(posts, createdPost)
	}

	return posts, nil
}

func (r PostsIndexElasticSearchRepository) PostsFeed(ctx context.Context, requester *principal.Principal, cursor *paging.Cursor, filter *post.Feed) ([]*post.Post, error) {

	builder := r.client.Search().
		Index(PostIndexName)

	if cursor == nil {
		return nil, fmt.Errorf("cursor must be present")
	}

	if err := cursor.BuildElasticsearch(builder, "_score", "id", false); err != nil {
		return nil, err
	}

	query := elastic.NewFunctionScoreQuery()

	// decay from initial post time
	postedTimeFunc := elastic.
		NewGaussDecayFunction().
		FieldName("posted_at").
		Scale("1d").
		Decay(0.5)

	// multiply by likes for this post
	likesFunc := elastic.
		NewFieldValueFactorFunction().
		Field("likes").
		Factor(1).
		Modifier("none")

	query.Add(elastic.NewTermQuery("state", post.Published.String()), postedTimeFunc)
	query.Add(elastic.NewTermsQueryFromStrings("supporter_only_status", post.None.String(), post.Partial.String()), postedTimeFunc)

	suspendedClubs, err := r.stella.GetSuspendedClubs(ctx)
	if err != nil {
		return nil, err
	}

	query.Add(elastic.NewBoolQuery().MustNot(elastic.NewTermsQueryFromStrings("club_id", suspendedClubs...)), postedTimeFunc)

	if len(filter.AudienceIds()) > 0 {
		query.Add(
			elastic.NewTermsQueryFromStrings("audience_id", filter.AudienceIds()...),
			likesFunc,
		)
	} else {
		query.AddScoreFunc(likesFunc)
	}

	// multiply results
	query.ScoreMode("multiply")

	builder.Query(query)

	response, err := builder.Pretty(true).Do(ctx)

	if err != nil {
		return nil, fmt.Errorf("failed to search posts: %v", err)
	}

	var supportedClubIds []string

	if requester != nil {

		supportedClubIds, err = r.stella.GetAccountSupportedClubs(ctx, requester.AccountId())

		if err != nil {
			return nil, err
		}

	}

	if err != nil {
		return nil, err
	}

	var posts []*post.Post

	for _, hit := range response.Hits.Hits {

		createdPost, err := unmarshalPostDocument(hit, supportedClubIds)

		if err != nil {
			return nil, err
		}

		posts = append(posts, createdPost)
	}

	return posts, nil
}

func (r PostsIndexElasticSearchRepository) SearchPosts(ctx context.Context, requester *principal.Principal, cursor *paging.Cursor, filter *post.Filters) ([]*post.Post, error) {

	builder := r.client.Search().
		Index(PostIndexName)

	if cursor == nil {
		return nil, fmt.Errorf("cursor must be present")
	}

	var sortingColumn string
	var sortingAscending bool

	if filter.SortBy() == post.NewSort {

		sortingColumn = "created_at"

		// if viewing by published, then do posted_at
		if filter.State() == post.Published {
			sortingColumn = "posted_at"
		}

		sortingAscending = false
	} else if filter.SortBy() == post.TopSort {
		sortingColumn = "likes"
		sortingAscending = false
	}

	if err := cursor.BuildElasticsearch(builder, sortingColumn, "id", sortingAscending); err != nil {
		return nil, err
	}

	query := elastic.NewBoolQuery()

	var filterQueries []elastic.Query

	if !filter.ShowSuspendedClubs() {
		suspendedClubs, err := r.stella.GetSuspendedClubs(ctx)
		if err != nil {
			return nil, err
		}

		filterQueries = append(filterQueries, elastic.NewBoolQuery().MustNot(elastic.NewTermsQueryFromStrings("club_id", suspendedClubs...)))
	}

	if filter.State() != post.Unknown {
		filterQueries = append(filterQueries, elastic.NewTermQuery("state", filter.State().String()))
	}

	if len(filter.SupporterOnlyStatus()) > 0 {
		var supporterStatus []string
		for _, status := range filter.SupporterOnlyStatus() {
			supporterStatus = append(supporterStatus, status.String())
		}
		filterQueries = append(filterQueries, elastic.NewTermsQueryFromStrings("supporter_only_status", supporterStatus...))
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

	if len(filter.CategoryIds()) > 0 {
		filterQueries = append(filterQueries, elastic.NewTermsQueryFromStrings("category_ids", filter.CategoryIds()...))
	}

	if len(filter.CharacterIds()) > 0 {
		filterQueries = append(filterQueries, elastic.NewTermsQueryFromStrings("character_ids", filter.CharacterIds()...))
	}

	if len(filter.SeriesIds()) > 0 {
		filterQueries = append(filterQueries, elastic.NewTermsQueryFromStrings("series_ids", filter.SeriesIds()...))
	}

	if len(filter.AudienceIds()) > 0 {
		filterQueries = append(filterQueries, elastic.NewTermsQueryFromStrings("audience_id", filter.AudienceIds()...))
	}

	if filterQueries != nil {
		query.Filter(filterQueries...)
	}

	builder.Query(query)

	response, err := builder.Pretty(true).Do(ctx)

	if err != nil {
		return nil, fmt.Errorf("failed to search posts: %v", err)
	}

	var supportedClubIds []string

	if requester != nil {

		supportedClubIds, err = r.stella.GetAccountSupportedClubs(ctx, requester.AccountId())

		if err != nil {
			return nil, err
		}

	}

	var posts []*post.Post

	for _, hit := range response.Hits.Hits {

		createdPost, err := unmarshalPostDocument(hit, supportedClubIds)

		if err != nil {
			return nil, err
		}

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

	rep := NewPostsCassandraRepository(r.session, r.stella)

	err := scanner.RunIterator(ctx, postTable, func(iter *gocqlx.Iterx) error {

		var p posts

		for iter.StructScan(&p) {

			var moderatorId string

			if p.ModeratorId != nil {
				moderatorId = *p.ModeratorId
			}

			likes, err := rep.getLikesForPost(ctx, p.Id)

			if err != nil {
				return err
			}

			var audienceId string

			if p.AudienceId != nil {
				audienceId = *p.AudienceId
			}

			doc := postDocument{
				Id:                 p.Id,
				State:              p.State,
				Likes:              likes,
				ModeratorId:        moderatorId,
				ContributorId:      p.ContributorId,
				ContentResourceIds: p.ContentResourceIds,
				ClubId:             p.ClubId,
				AudienceId:         audienceId,
				CategoryIds:        p.CategoryIds,
				CharacterIds:       p.CharacterIds,
				SeriesIds:          p.SeriesIds,
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
