package adapters

import (
	"context"
	"fmt"
	"github.com/gocql/gocql"
	"github.com/scylladb/gocqlx/v2/qb"
	"github.com/scylladb/gocqlx/v2/table"
	"overdoll/applications/sting/internal/domain/post"
	"overdoll/libraries/localization"
	"overdoll/libraries/principal"
	"strings"
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
	},
	PartKey: []string{"id"},
	SortKey: []string{},
})

type audience struct {
	Id                  string            `db:"id"`
	Slug                string            `db:"slug"`
	Title               map[string]string `db:"title"`
	ThumbnailResourceId string            `db:"thumbnail_resource_id"`
	Standard            int               `db:"standard"`
	TotalLikes          int               `db:"total_likes"`
	TotalPosts          int               `db:"total_posts"`
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

func marshalAudienceToDatabase(pending *post.Audience) (*audience, error) {

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
	}, nil
}

func (r PostsCassandraRepository) GetAudienceIdsFromSlugs(ctx context.Context, audienceSlugs []string) ([]string, error) {

	var audienceSlugResults []audienceSlug

	if err := qb.Select(audienceSlugTable.Name()).
		Where(qb.In("slug")).
		Query(r.session).
		Consistency(gocql.One).
		Bind(map[string]interface{}{
			"slug": audienceSlugs,
		}).
		Select(&audienceSlugResults); err != nil {
		return nil, fmt.Errorf("failed to get audience slugs: %v", err)
	}

	var ids []string

	for _, i := range audienceSlugResults {
		ids = append(ids, i.AudienceId)
	}

	return ids, nil
}

func (r PostsCassandraRepository) GetAudienceBySlug(ctx context.Context, requester *principal.Principal, slug string) (*post.Audience, error) {

	queryAudienceSlug := r.session.
		Query(audienceSlugTable.Get()).
		Consistency(gocql.One).
		BindStruct(audienceSlug{Slug: slug})

	var b audienceSlug

	if err := queryAudienceSlug.Get(&b); err != nil {

		if err == gocql.ErrNotFound {
			return nil, post.ErrAudienceNotFound
		}

		return nil, fmt.Errorf("failed to get audience by slug: %v", err)
	}

	return r.GetAudienceById(ctx, requester, b.AudienceId)
}

func (r PostsCassandraRepository) GetAudiencesByIds(ctx context.Context, requester *principal.Principal, audienceIds []string) ([]*post.Audience, error) {

	var audiences []*post.Audience

	// if none then we get out or else the query will fail
	if len(audienceIds) == 0 {
		return audiences, nil
	}

	queryAudiences := qb.Select(audienceTable.Name()).
		Where(qb.In("id")).
		Query(r.session).
		Consistency(gocql.One).
		Bind(audiences)

	var audienceModels []*audience

	if err := queryAudiences.Select(&audienceModels); err != nil {
		return nil, fmt.Errorf("failed to get audiences by id: %v", err)
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
		))
	}

	return audiences, nil
}

func (r PostsCassandraRepository) getAudienceById(ctx context.Context, audienceId string) (*post.Audience, error) {

	queryAudience := r.session.
		Query(audienceTable.Get()).
		Consistency(gocql.One).
		BindStruct(audience{Id: audienceId})

	var b audience

	if err := queryAudience.Get(&b); err != nil {

		if err == gocql.ErrNotFound {
			return nil, post.ErrAudienceNotFound
		}

		return nil, fmt.Errorf("failed to get audience by id: %v", err)
	}

	return post.UnmarshalAudienceFromDatabase(
		b.Id,
		b.Slug,
		b.Title,
		b.ThumbnailResourceId,
		b.Standard,
		b.TotalLikes,
		b.TotalPosts,
	), nil
}

func (r PostsCassandraRepository) GetAudienceById(ctx context.Context, requester *principal.Principal, audienceId string) (*post.Audience, error) {
	return r.getAudienceById(ctx, audienceId)
}

func (r PostsCassandraRepository) GetAudiences(ctx context.Context, requester *principal.Principal) ([]*post.Audience, error) {

	queryAudiences := r.session.
		Query(audienceTable.SelectAll()).
		Consistency(gocql.One)

	var res []audience

	if err := queryAudiences.Select(&res); err != nil {
		return nil, fmt.Errorf("failed to get audiences: %v", err)
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
		))
	}

	return results, nil
}

func (r PostsCassandraRepository) CreateAudience(ctx context.Context, requester *principal.Principal, audience *post.Audience) error {

	aud, err := marshalAudienceToDatabase(audience)

	if err != nil {
		return err
	}

	// first, do a unique insert of club to ensure we reserve a unique slug
	applied, err := audienceSlugTable.
		InsertBuilder().
		Unique().
		Query(r.session).
		SerialConsistency(gocql.Serial).
		BindStruct(audienceSlug{Slug: strings.ToLower(aud.Slug), AudienceId: aud.Id}).
		ExecCAS()

	if err != nil {
		return fmt.Errorf("failed to create unique audience slug: %v", err)
	}

	if !applied {
		return post.ErrAudienceSlugNotUnique
	}

	if err := r.session.
		Query(audienceTable.Insert()).
		Consistency(gocql.LocalQuorum).
		BindStruct(aud).
		ExecRelease(); err != nil {
		return err
	}

	return nil
}

func (r PostsCassandraRepository) UpdateAudienceThumbnail(ctx context.Context, requester *principal.Principal, id string, updateFn func(audience *post.Audience) error) (*post.Audience, error) {
	return r.updateAudience(ctx, id, updateFn, []string{"thumbnail_resource_id"})
}

func (r PostsCassandraRepository) UpdateAudienceTitle(ctx context.Context, requester *principal.Principal, id string, updateFn func(audience *post.Audience) error) (*post.Audience, error) {
	return r.updateAudience(ctx, id, updateFn, []string{"title"})
}

func (r PostsCassandraRepository) UpdateAudienceIsStandard(ctx context.Context, requester *principal.Principal, id string, updateFn func(audience *post.Audience) error) (*post.Audience, error) {
	return r.updateAudience(ctx, id, updateFn, []string{"standard"})
}

func (r PostsCassandraRepository) UpdateAudienceTotalPostsOperator(ctx context.Context, id string, updateFn func(audience *post.Audience) error) (*post.Audience, error) {
	return r.updateAudience(ctx, id, updateFn, []string{"total_posts"})
}

func (r PostsCassandraRepository) UpdateAudienceTotalLikesOperator(ctx context.Context, id string, updateFn func(audience *post.Audience) error) (*post.Audience, error) {
	return r.updateAudience(ctx, id, updateFn, []string{"total_likes"})
}

func (r PostsCassandraRepository) updateAudience(ctx context.Context, id string, updateFn func(audience *post.Audience) error, columns []string) (*post.Audience, error) {

	aud, err := r.getAudienceById(ctx, id)

	if err != nil {
		return nil, err
	}

	err = updateFn(aud)

	if err != nil {
		return nil, err
	}

	pst, err := marshalAudienceToDatabase(aud)

	if err != nil {
		return nil, err
	}

	updateAudTable := r.session.
		Query(audienceTable.Update(
			columns...,
		)).
		Consistency(gocql.LocalQuorum).
		BindStruct(pst)

	if err := updateAudTable.ExecRelease(); err != nil {
		return nil, fmt.Errorf("failed to update audience: %v", err)
	}

	return aud, nil
}
