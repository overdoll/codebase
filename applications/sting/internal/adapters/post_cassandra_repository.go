package adapters

import (
	"context"
	"github.com/aws/aws-sdk-go/aws/session"
	"github.com/go-redis/redis/v8"
	"github.com/olivere/elastic/v7"
	"github.com/scylladb/gocqlx/v2/qb"
	"overdoll/libraries/errors"
	"overdoll/libraries/errors/apperror"
	"overdoll/libraries/localization"
	"overdoll/libraries/media"
	"overdoll/libraries/passport"
	"overdoll/libraries/support"
	"time"

	"github.com/gocql/gocql"
	"github.com/scylladb/gocqlx/v2"
	"github.com/scylladb/gocqlx/v2/table"
	"overdoll/applications/sting/internal/domain/post"
	"overdoll/libraries/principal"
)

var clubWeightsTable = table.New(table.Metadata{
	Name: "club_weights",
	Columns: []string{
		"bucket",
		"club_id",
		"weight",
	},
	PartKey: []string{"bucket"},
	SortKey: []string{"club_id"},
})

type clubWeights struct {
	Bucket int     `db:"bucket"`
	ClubId string  `db:"club_id"`
	Weight float64 `db:"weight"`
}

var postsOccupiedMediaTable = table.New(table.Metadata{
	Name: "posts_occupied_resources",
	Columns: []string{
		"bucket",
		"post_id",
		"resource_id",
	},
	PartKey: []string{"bucket"},
	SortKey: []string{"post_id", "resource_id"},
})

type postsOccupiedMedia struct {
	Bucket     int    `db:"bucket"`
	PostId     string `db:"post_id"`
	ResourceId string `db:"resource_id"`
}

var postTable = table.New(table.Metadata{
	Name: "posts",
	Columns: []string{
		"id",
		"state",
		"likes",
		"likes_last_update_id",
		"supporter_only_status",
		"content_resource_ids",
		"content_resources",
		"content_media",
		"content_supporter_only",
		"content_supporter_only_resource_ids",
		"contributor_account_id",
		"description",
		"club_id",
		"audience_id",
		"category_ids",
		"character_ids",
		"series_ids",
		"created_at",
		"updated_at",
		"posted_at",
	},
	PartKey: []string{"id"},
	SortKey: []string{},
})

type posts struct {
	Id                           string            `db:"id"`
	State                        string            `db:"state"`
	Likes                        int               `db:"likes"`
	Description                  map[string]string `db:"description"`
	LikesLastUpdateId            gocql.UUID        `db:"likes_last_update_id"`
	SupporterOnlyStatus          string            `db:"supporter_only_status"`
	ContentMediaIds              []string          `db:"content_resource_ids"`
	ContentSupporterOnly         map[string]bool   `db:"content_supporter_only"`
	ContentResources             map[string]string `db:"content_resources"`
	ContentMedia                 map[string]string `db:"content_media"`
	ContentSupporterOnlyMediaIds map[string]string `db:"content_supporter_only_resource_ids"`
	ContributorId                string            `db:"contributor_account_id"`
	ClubId                       string            `db:"club_id"`
	AudienceId                   *string           `db:"audience_id"`
	CategoryIds                  []string          `db:"category_ids"`
	CharacterIds                 []string          `db:"character_ids"`
	SeriesIds                    []string          `db:"series_ids"`
	CreatedAt                    time.Time         `db:"created_at"`
	UpdatedAt                    time.Time         `db:"updated_at"`
	PostedAt                     *time.Time        `db:"posted_at"`
}

var terminatedClubsTable = table.New(table.Metadata{
	Name: "terminated_clubs",
	Columns: []string{
		"bucket",
		"club_id",
	},
	PartKey: []string{"bucket"},
	SortKey: []string{"club_id"},
})

type terminatedClubs struct {
	Bucket int    `db:"bucket"`
	ClubId string `db:"club_id"`
}

type PostsCassandraElasticsearchRepository struct {
	session gocqlx.Session
	client  *elastic.Client
	aws     *session.Session
	cache   *redis.Client
}

func NewPostsCassandraRepository(session gocqlx.Session, client *elastic.Client, aws *session.Session, cache *redis.Client) PostsCassandraElasticsearchRepository {
	return PostsCassandraElasticsearchRepository{session: session, client: client, aws: aws, cache: cache}
}

func marshalPostToDatabase(pending *post.Post) (*posts, error) {

	var contentResourceIds []string
	contentSupporterOnly := make(map[string]bool)
	contentSupporterOnlyResourceIds := make(map[string]string)
	contentResources := make(map[string]string)
	contentMedia := make(map[string]string)

	for _, cont := range pending.Content() {
		contentResourceIds = append(contentResourceIds, cont.Media().ID())
		contentSupporterOnly[cont.Media().ID()] = cont.IsSupporterOnly()
		if cont.IsSupporterOnly() && cont.MediaHidden() != nil {
			contentSupporterOnlyResourceIds[cont.Media().ID()] = cont.MediaHidden().ID()
		}

		if cont.MediaHidden() != nil {

			if cont.MediaHidden().IsLegacy() {
				contentResources[cont.MediaHidden().ID()] = cont.MediaHidden().LegacyResource()
			} else {
				marshalled, err := media.MarshalMediaToDatabase(cont.MediaHidden())

				if err != nil {
					return nil, err
				}

				contentMedia[cont.MediaHidden().ID()] = *marshalled
			}

		}

		if cont.Media().IsLegacy() {
			contentResources[cont.Media().ID()] = cont.Media().LegacyResource()
		} else {
			marshalled, err := media.MarshalMediaToDatabase(cont.Media())

			if err != nil {
				return nil, err
			}

			contentMedia[cont.Media().ID()] = *marshalled
		}
	}

	return &posts{
		Id:                           pending.ID(),
		State:                        pending.State().String(),
		SupporterOnlyStatus:          pending.SupporterOnlyStatus().String(),
		Likes:                        pending.Likes(),
		Description:                  localization.MarshalTranslationToDatabase(pending.Description()),
		LikesLastUpdateId:            gocql.TimeUUID(),
		ClubId:                       pending.ClubId(),
		AudienceId:                   pending.AudienceId(),
		ContributorId:                pending.ContributorId(),
		ContentMediaIds:              contentResourceIds,
		ContentSupporterOnly:         contentSupporterOnly,
		ContentResources:             contentResources,
		ContentMedia:                 contentMedia,
		ContentSupporterOnlyMediaIds: contentSupporterOnlyResourceIds,
		CategoryIds:                  pending.CategoryIds(),
		CharacterIds:                 pending.CharacterIds(),
		SeriesIds:                    pending.SeriesIds(),
		CreatedAt:                    pending.CreatedAt(),
		PostedAt:                     pending.PostedAt(),
		UpdatedAt:                    pending.UpdatedAt(),
	}, nil
}

func (r PostsCassandraElasticsearchRepository) GetPostWithRandomSeed(ctx context.Context, passport *passport.Passport, seed int64, audienceIds []string) (*post.Post, error) {

	builder := r.client.Search().
		Index(PostReaderIndex)

	builder.Size(1)

	terminatedClubIds, err := r.getTerminatedClubIds(ctx)

	if err != nil {
		return nil, err
	}

	query := elastic.NewBoolQuery()

	var filterQueries []elastic.Query

	filterQueries = append(filterQueries, elastic.NewTermQuery("state", post.Published.String()))

	filterQueries = append(filterQueries, elastic.NewBoolQuery().
		MustNot(elastic.NewTermsQueryFromStrings("club_id", terminatedClubIds...)),
	)

	if len(audienceIds) > 0 {
		filterQueries = append(filterQueries, elastic.NewTermsQueryFromStrings("audience_id", audienceIds...))
	}

	if filterQueries != nil {
		query.Filter(filterQueries...)
	}

	query.Must(elastic.NewFunctionScoreQuery().AddScoreFunc(elastic.NewRandomFunction().Seed(seed)))

	builder.Query(query)

	response, err := builder.Pretty(true).Do(ctx)

	if err != nil {
		return nil, errors.Wrap(support.ParseElasticError(err), "failed to get random post")
	}

	if len(response.Hits.Hits) == 0 {
		return nil, errors.New("could not find a random post")
	}

	var posts []*post.Post

	for _, hit := range response.Hits.Hits {

		createdPost, err := r.unmarshalPostDocument(ctx, hit.Source, hit.Sort)

		if err != nil {
			return nil, err
		}

		posts = append(posts, createdPost)
	}

	return posts[0], nil
}

func (r *PostsCassandraElasticsearchRepository) unmarshalPost(ctx context.Context, postPending posts) (*post.Post, error) {

	var finalMedia []*media.Media
	alreadyVisitedIds := make(map[string]bool)

	for _, r := range postPending.ContentMedia {

		m, err := media.UnmarshalMediaFromDatabase(ctx, &r)

		if err != nil {
			return nil, err
		}

		if !m.IsProcessed() && postPending.State == "PUBLISHED" {
			continue
		}

		finalMedia = append(finalMedia, m)
		alreadyVisitedIds[m.ID()] = true
	}

	for _, r := range postPending.ContentResources {
		m, err := media.UnmarshalMediaWithLegacyResourceFromDatabase(ctx, r, nil)

		if err != nil {
			return nil, err
		}

		if _, ok := alreadyVisitedIds[m.ID()]; !ok {
			finalMedia = append(finalMedia, m)
		}
	}

	return post.UnmarshalPostFromDatabase(
		postPending.Id,
		postPending.State,
		postPending.SupporterOnlyStatus,
		postPending.Likes,
		postPending.ContributorId,
		postPending.ContentMediaIds,
		finalMedia,
		postPending.ContentSupporterOnly,
		postPending.ContentSupporterOnlyMediaIds,
		postPending.ClubId,
		postPending.AudienceId,
		postPending.CharacterIds,
		postPending.SeriesIds,
		postPending.CategoryIds,
		postPending.CreatedAt,
		postPending.UpdatedAt,
		postPending.PostedAt,
		postPending.Description,
	), nil
}

func (r PostsCassandraElasticsearchRepository) getPostOccupiedResourcesPostIds(ctx context.Context) ([]string, error) {

	var postResults []*postsOccupiedMedia

	if err := r.session.
		Query(qb.Select(postsOccupiedMediaTable.Name()).Where(qb.Eq("bucket")).ToCql()).
		WithContext(ctx).
		Idempotent(true).
		BindStruct(postsOccupiedMedia{
			Bucket: 0,
		}).
		Consistency(gocql.LocalQuorum).
		SelectRelease(&postResults); err != nil {
		return nil, errors.Wrap(support.NewGocqlError(err), "failed to get post occupied resources")
	}

	var postIds []string

	for _, result := range postResults {
		postIds = append(postIds, result.PostId)
	}

	return postIds, nil
}

func (r PostsCassandraElasticsearchRepository) AddPostOccupiedMedia(ctx context.Context, post *post.Post, resource *media.Media) error {

	if err := r.session.
		Query(postsOccupiedMediaTable.Insert()).
		WithContext(ctx).
		Idempotent(true).
		BindStruct(postsOccupiedMedia{
			Bucket:     0,
			PostId:     post.ID(),
			ResourceId: resource.ID(),
		}).
		Consistency(gocql.LocalQuorum).
		ExecRelease(); err != nil {
		return errors.Wrap(support.NewGocqlError(err), "failed to create post occupied resource")
	}

	return nil
}

func (r PostsCassandraElasticsearchRepository) CreatePost(ctx context.Context, pending *post.Post) error {

	pst, err := marshalPostToDatabase(pending)

	if err != nil {
		return err
	}

	if err := r.session.
		Query(postTable.Insert()).
		WithContext(ctx).
		Idempotent(true).
		BindStruct(pst).
		Consistency(gocql.LocalQuorum).
		ExecRelease(); err != nil {
		return errors.Wrap(support.NewGocqlError(err), "failed to create post")
	}

	if err := r.indexPost(ctx, pending); err != nil {

		// failed to index post - delete the post record
		if err := r.session.
			Query(postTable.Delete()).
			WithContext(ctx).
			Idempotent(true).
			Consistency(gocql.LocalQuorum).
			BindStruct(pst).
			ExecRelease(); err != nil {
			return errors.Wrap(support.NewGocqlError(err), "failed to delete post")
		}

		return err
	}

	return nil
}

func (r PostsCassandraElasticsearchRepository) DeletePost(ctx context.Context, id string) error {

	if err := r.session.
		Query(postTable.Delete()).
		WithContext(ctx).
		Idempotent(true).
		Consistency(gocql.LocalQuorum).
		BindStruct(&posts{Id: id}).
		ExecRelease(); err != nil {
		return errors.Wrap(support.NewGocqlError(err), "failed to delete post")
	}

	if err := r.deletePostIndexById(ctx, id); err != nil {
		return err
	}

	return nil
}

func (r PostsCassandraElasticsearchRepository) getPostById(ctx context.Context, id string) (*posts, error) {

	var postPending posts

	if err := r.session.
		Query(postTable.Get()).
		WithContext(ctx).
		Idempotent(true).
		Consistency(gocql.LocalQuorum).
		BindStruct(&posts{Id: id}).
		GetRelease(&postPending); err != nil {

		if err == gocql.ErrNotFound {
			return nil, apperror.NewNotFoundError("post", id)
		}

		return nil, errors.Wrap(support.NewGocqlError(err), "failed to get post")
	}

	return &postPending, nil
}

func (r PostsCassandraElasticsearchRepository) GetPostByIdOperator(ctx context.Context, id string) (*post.Post, error) {

	postPending, err := r.getPostById(ctx, id)

	if err != nil {
		return nil, err
	}

	return r.unmarshalPost(ctx, *postPending)
}

func (r PostsCassandraElasticsearchRepository) addClubWeightsToESQuery(ctx context.Context, query *elastic.BoolQuery) error {
	return addClubWeightsToESQuery(r.session, ctx, "club_id", query)
}

func addClubWeightsToESQuery(session gocqlx.Session, ctx context.Context, key string, query *elastic.BoolQuery) error {

	var clubWeighted []*clubWeights

	if err := qb.Select(clubWeightsTable.Name()).
		Where(qb.Eq("bucket")).
		Query(session).
		WithContext(ctx).
		Idempotent(true).
		Consistency(gocql.One).
		BindStruct(&clubWeights{Bucket: 0}).
		SelectRelease(&clubWeighted); err != nil {
		return errors.Wrap(support.NewGocqlError(err), "failed to get club weights")
	}

	if len(clubWeighted) > 0 {
		fnQuery := elastic.NewFunctionScoreQuery().Boost(2).BoostMode("multiply")
		for _, w := range clubWeighted {
			fnQuery.Add(
				elastic.NewTermsQuery(key, w.ClubId),
				elastic.
					NewWeightFactorFunction(float64(w.Weight)),
			)
		}
		query.Must(fnQuery)
	}

	return nil
}

func (r PostsCassandraElasticsearchRepository) getTerminatedClubIds(ctx context.Context) ([]string, error) {

	var suspendedClub []*terminatedClubs

	if err := qb.Select(terminatedClubsTable.Name()).
		Where(qb.Eq("bucket")).
		Query(r.session).
		WithContext(ctx).
		Idempotent(true).
		Consistency(gocql.LocalQuorum).
		BindStruct(&terminatedClubs{Bucket: 0}).
		SelectRelease(&suspendedClub); err != nil {
		return nil, errors.Wrap(support.NewGocqlError(err), "failed to get terminated clubs")
	}

	var ids []string

	for _, suspended := range suspendedClub {
		ids = append(ids, suspended.ClubId)
	}

	return ids, nil
}

func (r PostsCassandraElasticsearchRepository) AddTerminatedClub(ctx context.Context, clubId string) error {

	if err := r.session.
		Query(terminatedClubsTable.Insert()).
		WithContext(ctx).
		Idempotent(true).
		Consistency(gocql.LocalQuorum).
		BindStruct(&terminatedClubs{Bucket: 0, ClubId: clubId}).
		ExecRelease(); err != nil {
		return errors.Wrap(support.NewGocqlError(err), "failed to add terminated club")
	}

	return nil
}

func (r PostsCassandraElasticsearchRepository) RemoveTerminatedClub(ctx context.Context, clubId string) error {

	if err := r.session.
		Query(terminatedClubsTable.Delete()).
		WithContext(ctx).
		Idempotent(true).
		Consistency(gocql.LocalQuorum).
		BindStruct(&terminatedClubs{Bucket: 0, ClubId: clubId}).
		ExecRelease(); err != nil {
		return errors.Wrap(support.NewGocqlError(err), "failed to delete terminated club")
	}

	return nil
}

func (r PostsCassandraElasticsearchRepository) GetPostById(ctx context.Context, requester *principal.Principal, id string) (*post.Post, error) {

	postPending, err := r.getPostById(ctx, id)

	if err != nil {
		return nil, err
	}

	pst, err := r.unmarshalPost(ctx, *postPending)

	if err != nil {
		return nil, err
	}

	suspendedClubIds, err := r.getTerminatedClubIds(ctx)

	if err != nil {
		return nil, err
	}

	if err := pst.CanView(suspendedClubIds, requester); err != nil {
		return nil, err
	}

	return pst, err
}

func (r PostsCassandraElasticsearchRepository) UpdatePost(ctx context.Context, id string, updateFn func(pending *post.Post) error) (*post.Post, error) {

	currentPost, err := r.GetPostByIdOperator(ctx, id)

	if err != nil {
		return nil, err
	}

	err = updateFn(currentPost)

	if err != nil {
		return nil, err
	}

	pst, err := marshalPostToDatabase(currentPost)

	if err != nil {
		return nil, err
	}

	if err := r.session.
		Query(postTable.Update(
			"state",
			"posted_at",
			"updated_at",
		)).
		WithContext(ctx).
		Idempotent(true).
		Consistency(gocql.LocalQuorum).
		BindStruct(pst).
		ExecRelease(); err != nil {
		return nil, errors.Wrap(support.NewGocqlError(err), "failed to update post")
	}

	if err := r.indexPost(ctx, currentPost); err != nil {
		return nil, err
	}

	return currentPost, nil
}

func (r PostsCassandraElasticsearchRepository) updatePostResult(ctx context.Context, currentPost *post.Post, updateFn func(pending *post.Post) error, columns []string) (*post.Post, error) {

	if err := updateFn(currentPost); err != nil {
		return nil, err
	}

	pst, err := marshalPostToDatabase(currentPost)

	if err != nil {
		return nil, err
	}

	if err := r.session.
		Query(postTable.Update(
			append(columns, "updated_at")...,
		)).
		WithContext(ctx).
		Idempotent(true).
		Consistency(gocql.LocalQuorum).
		BindStruct(pst).
		ExecRelease(); err != nil {
		return nil, errors.Wrap(support.NewGocqlError(err), "failed to update post")
	}

	if err := r.indexPost(ctx, currentPost); err != nil {
		return nil, err
	}

	return currentPost, nil
}

func (r PostsCassandraElasticsearchRepository) updatePost(ctx context.Context, id string, updateFn func(pending *post.Post) error, columns []string) (*post.Post, error) {

	currentPost, err := r.GetPostByIdOperator(ctx, id)

	if err != nil {
		return nil, err
	}

	return r.updatePostResult(ctx, currentPost, updateFn, columns)
}

func (r PostsCassandraElasticsearchRepository) updatePostRequest(ctx context.Context, requester *principal.Principal, id string, updateFn func(pending *post.Post) error, columns []string) (*post.Post, error) {

	currentPost, err := r.GetPostById(ctx, requester, id)

	if err != nil {
		return nil, err
	}

	if err := currentPost.CanUpdate(requester); err != nil {
		return nil, err
	}

	return r.updatePostResult(ctx, currentPost, updateFn, columns)
}

func (r PostsCassandraElasticsearchRepository) UpdatePostContentAndState(ctx context.Context, id string, updateFn func(pending *post.Post) error) error {
	_, err := r.updatePost(ctx, id, updateFn, []string{"content_resource_ids", "content_supporter_only", "content_supporter_only_resource_ids", "supporter_only_status", "state", "content_media"})
	return err
}

func (r PostsCassandraElasticsearchRepository) UpdatePostContent(ctx context.Context, requester *principal.Principal, id string, updateFn func(pending *post.Post) error) (*post.Post, error) {
	return r.updatePostRequest(ctx, requester, id, updateFn, []string{"content_resource_ids", "content_supporter_only", "content_supporter_only_resource_ids", "supporter_only_status", "content_media"})
}

func (r PostsCassandraElasticsearchRepository) UpdatePostAudience(ctx context.Context, requester *principal.Principal, id string, updateFn func(pending *post.Post) error) (*post.Post, error) {
	return r.updatePostRequest(ctx, requester, id, updateFn, []string{"audience_id"})
}

func (r PostsCassandraElasticsearchRepository) UpdatePostDescription(ctx context.Context, requester *principal.Principal, id string, updateFn func(pending *post.Post) error) (*post.Post, error) {
	return r.updatePostRequest(ctx, requester, id, updateFn, []string{"description"})
}

func (r PostsCassandraElasticsearchRepository) UpdatePostCharacters(ctx context.Context, requester *principal.Principal, id string, updateFn func(pending *post.Post) error) (*post.Post, error) {
	return r.updatePostRequest(ctx, requester, id, updateFn, []string{"character_ids", "series_ids"})
}

func (r PostsCassandraElasticsearchRepository) UpdatePostCategories(ctx context.Context, requester *principal.Principal, id string, updateFn func(pending *post.Post) error) (*post.Post, error) {
	return r.updatePostRequest(ctx, requester, id, updateFn, []string{"category_ids"})
}

func (r PostsCassandraElasticsearchRepository) UpdatePostCategoriesOperator(ctx context.Context, id string, updateFn func(pending *post.Post) error) (*post.Post, error) {
	return r.updatePost(ctx, id, updateFn, []string{"category_ids"})

}
func (r PostsCassandraElasticsearchRepository) UpdatePostContentOperator(ctx context.Context, id string, updateFn func(pending *post.Post) error) (*post.Post, error) {

	currentPost, err := r.GetPostByIdOperator(ctx, id)

	if err != nil {
		return nil, err
	}

	if err = updateFn(currentPost); err != nil {
		return nil, err
	}

	pst, err := marshalPostToDatabase(currentPost)

	if err != nil {
		return nil, err
	}

	if err := r.session.
		Query(postTable.Update(
			"content_resource_ids", "content_supporter_only", "content_supporter_only_resource_ids", "supporter_only_status", "content_media", "updated_at",
		)).
		WithContext(ctx).
		Idempotent(true).
		Consistency(gocql.LocalQuorum).
		BindStruct(pst).
		ExecRelease(); err != nil {
		return nil, errors.Wrap(support.NewGocqlError(err), "failed to update post")
	}

	if err := r.indexPost(ctx, currentPost); err != nil {
		return nil, err
	}

	return currentPost, nil
}

func (r PostsCassandraElasticsearchRepository) UpdatePostContentOperatorMedia(ctx context.Context, id string, resources []*media.Media) error {

	postPending, err := r.getPostById(ctx, id)

	if err != nil {
		return err
	}

	if err != nil {

		// not found errors - send back a resource not present, so we gracefully handle it
		if apperror.IsNotFoundError(err) {
			return media.ErrMediaNotPresent
		}

		return err
	}

	foundCount := 0

	var allContentIds []string

	for _, contentMediaId := range postPending.ContentMediaIds {
		allContentIds = append(allContentIds, contentMediaId)
	}

	for _, contentMediaId := range postPending.ContentSupporterOnlyMediaIds {
		allContentIds = append(allContentIds, contentMediaId)
	}

	for _, contentMediaId := range allContentIds {
		for _, res := range resources {
			if contentMediaId == res.ID() {
				foundCount += 1
				break
			}
		}
	}

	// make sure we updated all resources for this post otherwise we send a not found errors
	if foundCount != len(resources) {
		return media.ErrMediaNotPresent
	}

	marshalledResources := make(map[string]string)

	for _, r := range resources {
		marshalled, err := media.MarshalMediaToDatabase(r)
		if err != nil {
			return err
		}
		marshalledResources[r.ID()] = *marshalled
	}

	var mapped []string

	for key := range marshalledResources {
		mapped = append(mapped, "content_media['"+key+"']")
	}

	finalStruct := make(map[string]interface{})

	for key, val := range marshalledResources {
		finalStruct["content_media['"+key+"']"] = val
	}

	finalStruct["updated_at"] = postPending.UpdatedAt
	finalStruct["id"] = postPending.Id

	// update strategically so we don't override each-other
	if err := r.session.
		Query(postTable.Update(append(mapped, "updated_at")...)).
		WithContext(ctx).
		Idempotent(true).
		Consistency(gocql.LocalQuorum).
		BindMap(finalStruct).
		ExecRelease(); err != nil {
		return errors.Wrap(support.NewGocqlError(err), "failed to update post")
	}

	updateDoc := make(map[string]interface{})
	contentMedia := make(map[string]string)

	for key, val := range marshalledResources {
		contentMedia[key] = val
	}

	updateDoc["content_media"] = contentMedia
	updateDoc["updated_at"] = postPending.UpdatedAt

	_, err = r.client.
		Update().
		Index(postWriterIndex).
		Id(postPending.Id).
		RetryOnConflict(20).
		Doc(updateDoc).
		Do(ctx)

	if err != nil {
		return errors.Wrap(support.ParseElasticError(err), "failed to partially update post media")
	}

	return nil
}

func (r PostsCassandraElasticsearchRepository) UpdatePostLikesOperator(ctx context.Context, id string, updateFn func(pending *post.Post) error) (*post.Post, error) {

	postPending, err := r.getPostById(ctx, id)

	if err != nil {
		return nil, err
	}

	unmarshalled, err := r.unmarshalPost(ctx, *postPending)

	if err != nil {
		return nil, err
	}

	if err = updateFn(unmarshalled); err != nil {
		return nil, err
	}

	ok, err := postTable.UpdateBuilder("likes", "likes_last_update_id", "updated_at").
		If(qb.EqLit("likes_last_update_id", postPending.LikesLastUpdateId.String())).
		Query(r.session).
		WithContext(ctx).
		BindStruct(posts{Id: id, Likes: unmarshalled.Likes(), LikesLastUpdateId: gocql.TimeUUID(), UpdatedAt: unmarshalled.UpdatedAt()}).
		SerialConsistency(gocql.Serial).
		ExecCASRelease()

	if err != nil {
		return nil, errors.Wrap(support.NewGocqlError(err), "failed to update post likes")
	}

	if !ok {
		return nil, errors.Wrap(support.NewGocqlTransactionError(), "failed to update post likes")
	}

	if err := r.indexPost(ctx, unmarshalled); err != nil {
		return nil, err
	}

	return unmarshalled, nil
}
