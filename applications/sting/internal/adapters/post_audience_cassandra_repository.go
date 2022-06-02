package adapters

import (
	"context"
	"github.com/gocql/gocql"
	"github.com/scylladb/gocqlx/v2/qb"
	"github.com/scylladb/gocqlx/v2/table"
	"overdoll/applications/sting/internal/domain/post"
	"overdoll/libraries/errors"
	"overdoll/libraries/errors/domainerror"
	"overdoll/libraries/localization"
	"overdoll/libraries/principal"
	"strings"
	"time"
)

var audienceTable = table.New(table.Metadata{
	Name: "audience",
	Columns: []string{
		"id",
		"slug",
		"title",
		"thumbnail_resource_id",
		"standard",
		"total_likes",
		"total_posts",
		"created_at",
	},
	PartKey: []string{"id"},
	SortKey: []string{},
})

type audience struct {
	Id                  string            `db:"id"`
	Slug                string            `db:"slug"`
	Title               map[string]string `db:"title"`
	ThumbnailResourceId *string           `db:"thumbnail_resource_id"`
	Standard            int               `db:"standard"`
	TotalLikes          int               `db:"total_likes"`
	TotalPosts          int               `db:"total_posts"`
	CreatedAt           time.Time         `db:"created_at"`
}

var audienceSlugTable = table.New(table.Metadata{
	Name: "audience_slugs",
	Columns: []string{
		"audience_id",
		"slug",
	},
	PartKey: []string{"slug"},
	SortKey: []string{},
})

type audienceSlug struct {
	AudienceId string `db:"audience_id"`
	Slug       string `db:"slug"`
}

func marshalAudienceToDatabase(pending *post.Audience) *audience {

	standard := 0

	if pending.IsStandard() {
		standard = 1
	}

	return &audience{
		Id:                  pending.ID(),
		Slug:                pending.Slug(),
		Standard:            standard,
		Title:               localization.MarshalTranslationToDatabase(pending.Title()),
		ThumbnailResourceId: pending.ThumbnailResourceId(),
		TotalLikes:          pending.TotalLikes(),
		TotalPosts:          pending.TotalPosts(),
		CreatedAt:           pending.CreatedAt(),
	}
}

func (r PostsCassandraElasticsearchRepository) GetAudienceIdsFromSlugs(ctx context.Context, audienceSlugs []string) ([]string, error) {

	var audienceSlugResults []audienceSlug

	var lowercaseSlugs []string

	for _, s := range audienceSlugs {
		lowercaseSlugs = append(lowercaseSlugs, strings.ToLower(s))
	}

	if err := qb.Select(audienceSlugTable.Name()).
		Where(qb.In("slug")).
		Query(r.session).
		WithContext(ctx).
		Consistency(gocql.One).
		Bind(lowercaseSlugs).
		SelectRelease(&audienceSlugResults); err != nil {
		return nil, errors.Wrap(err, "failed to get audience slugs")
	}

	var ids []string

	for _, i := range audienceSlugResults {
		ids = append(ids, i.AudienceId)
	}

	return ids, nil
}

func (r PostsCassandraElasticsearchRepository) GetAudienceBySlug(ctx context.Context, requester *principal.Principal, slug string) (*post.Audience, error) {

	var b audienceSlug

	if err := r.session.
		Query(audienceSlugTable.Get()).
		WithContext(ctx).
		Consistency(gocql.LocalQuorum).
		BindStruct(audienceSlug{Slug: strings.ToLower(slug)}).
		GetRelease(&b); err != nil {

		if err == gocql.ErrNotFound {
			return nil, domainerror.NewNotFoundError("audience", slug)
		}

		return nil, errors.Wrap(err, "failed to get audience by slug")
	}

	return r.GetAudienceById(ctx, requester, b.AudienceId)
}

func (r PostsCassandraElasticsearchRepository) GetAudiencesByIds(ctx context.Context, requester *principal.Principal, audienceIds []string) ([]*post.Audience, error) {

	var audiences []*post.Audience

	// if none then we get out or else the query will fail
	if len(audienceIds) == 0 {
		return audiences, nil
	}

	var audienceModels []*audience

	if err := qb.Select(audienceTable.Name()).
		Where(qb.In("id")).
		Query(r.session).
		WithContext(ctx).
		Consistency(gocql.One).
		Bind(audienceIds).
		SelectRelease(&audienceModels); err != nil {
		return nil, errors.Wrap(err, "failed to get audiences by id")
	}

	for _, b := range audienceModels {
		audiences = append(audiences, post.UnmarshalAudienceFromDatabase(
			b.Id,
			b.Slug,
			b.Title,
			b.ThumbnailResourceId,
			b.Standard,
			b.TotalLikes,
			b.TotalPosts,
			b.CreatedAt,
		))
	}

	return audiences, nil
}

func (r PostsCassandraElasticsearchRepository) getAudienceById(ctx context.Context, audienceId string) (*post.Audience, error) {

	var b audience

	if err := r.session.
		Query(audienceTable.Get()).
		WithContext(ctx).
		Consistency(gocql.LocalQuorum).
		BindStruct(audience{Id: audienceId}).
		GetRelease(&b); err != nil {

		if err == gocql.ErrNotFound {
			return nil, domainerror.NewNotFoundError("audience", audienceId)
		}

		return nil, errors.Wrap(err, "failed to get audience by id")
	}

	return post.UnmarshalAudienceFromDatabase(
		b.Id,
		b.Slug,
		b.Title,
		b.ThumbnailResourceId,
		b.Standard,
		b.TotalLikes,
		b.TotalPosts,
		b.CreatedAt,
	), nil
}

func (r PostsCassandraElasticsearchRepository) GetAudienceById(ctx context.Context, requester *principal.Principal, audienceId string) (*post.Audience, error) {
	return r.getAudienceById(ctx, audienceId)
}

func (r PostsCassandraElasticsearchRepository) GetAudiences(ctx context.Context, requester *principal.Principal) ([]*post.Audience, error) {

	var res []audience

	if err := r.session.
		Query(audienceTable.SelectAll()).
		WithContext(ctx).
		Consistency(gocql.One).
		SelectRelease(&res); err != nil {
		return nil, errors.Wrap(err, "failed to get audiences")
	}

	var results []*post.Audience

	for _, b := range res {
		results = append(results, post.UnmarshalAudienceFromDatabase(
			b.Id,
			b.Slug,
			b.Title,
			b.ThumbnailResourceId,
			b.Standard,
			b.TotalLikes,
			b.TotalPosts,
			b.CreatedAt,
		))
	}

	return results, nil
}

func (r PostsCassandraElasticsearchRepository) deleteUniqueAudienceSlug(ctx context.Context, audienceId, slug string) error {

	if err := r.session.
		Query(audienceSlugTable.DeleteBuilder().Existing().ToCql()).
		WithContext(ctx).
		BindStruct(audienceSlug{Slug: strings.ToLower(slug), AudienceId: audienceId}).
		ExecRelease(); err != nil {
		return errors.Wrap(err, "failed to release audience slug")
	}

	return nil
}

func (r PostsCassandraElasticsearchRepository) CreateAudience(ctx context.Context, requester *principal.Principal, audience *post.Audience) error {

	aud := marshalAudienceToDatabase(audience)

	// first, do a unique insert of club to ensure we reserve a unique slug
	applied, err := audienceSlugTable.
		InsertBuilder().
		Unique().
		Query(r.session).
		WithContext(ctx).
		SerialConsistency(gocql.Serial).
		BindStruct(audienceSlug{Slug: strings.ToLower(aud.Slug), AudienceId: aud.Id}).
		ExecCASRelease()

	if err != nil {
		return errors.Wrap(err, "failed to create unique audience slug")
	}

	if !applied {
		return post.ErrAudienceSlugNotUnique
	}

	if err := r.session.
		Query(audienceTable.Insert()).
		WithContext(ctx).
		Consistency(gocql.LocalQuorum).
		BindStruct(aud).
		ExecRelease(); err != nil {

		if err := r.deleteUniqueAudienceSlug(ctx, aud.Id, aud.Slug); err != nil {
			return err
		}

		return err
	}

	if err := r.indexAudience(ctx, audience); err != nil {

		// release the slug
		if err := r.deleteUniqueAudienceSlug(ctx, aud.Id, aud.Slug); err != nil {
			return err
		}

		// failed to index audience - delete audience record
		if err := r.session.
			Query(audienceTable.Delete()).
			WithContext(ctx).
			Consistency(gocql.LocalQuorum).
			BindStruct(aud).
			ExecRelease(); err != nil {
			return errors.Wrap(err, "failed delete audience")
		}

		return err
	}

	return nil
}

func (r PostsCassandraElasticsearchRepository) UpdateAudienceThumbnail(ctx context.Context, requester *principal.Principal, id string, updateFn func(audience *post.Audience) error) (*post.Audience, error) {
	return r.updateAudience(ctx, id, updateFn, []string{"thumbnail_resource_id"})
}

func (r PostsCassandraElasticsearchRepository) UpdateAudienceTitle(ctx context.Context, requester *principal.Principal, id string, updateFn func(audience *post.Audience) error) (*post.Audience, error) {
	return r.updateAudience(ctx, id, updateFn, []string{"title"})
}

func (r PostsCassandraElasticsearchRepository) UpdateAudienceIsStandard(ctx context.Context, requester *principal.Principal, id string, updateFn func(audience *post.Audience) error) (*post.Audience, error) {
	return r.updateAudience(ctx, id, updateFn, []string{"standard"})
}

func (r PostsCassandraElasticsearchRepository) UpdateAudienceTotalPostsOperator(ctx context.Context, id string, updateFn func(audience *post.Audience) error) (*post.Audience, error) {
	return r.updateAudience(ctx, id, updateFn, []string{"total_posts"})
}

func (r PostsCassandraElasticsearchRepository) UpdateAudienceTotalLikesOperator(ctx context.Context, id string, updateFn func(audience *post.Audience) error) (*post.Audience, error) {
	return r.updateAudience(ctx, id, updateFn, []string{"total_likes"})
}

func (r PostsCassandraElasticsearchRepository) updateAudience(ctx context.Context, id string, updateFn func(audience *post.Audience) error, columns []string) (*post.Audience, error) {

	aud, err := r.getAudienceById(ctx, id)

	if err != nil {
		return nil, err
	}

	err = updateFn(aud)

	if err != nil {
		return nil, err
	}

	pst := marshalAudienceToDatabase(aud)

	if err := r.session.
		Query(audienceTable.Update(
			columns...,
		)).
		WithContext(ctx).
		Consistency(gocql.LocalQuorum).
		BindStruct(pst).
		ExecRelease(); err != nil {
		return nil, errors.Wrap(err, "failed to update audience")
	}

	if err := r.indexAudience(ctx, aud); err != nil {
		return nil, err
	}

	return aud, nil
}
