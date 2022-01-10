package adapters

import (
	"context"
	"fmt"
	"github.com/gocql/gocql"
	"github.com/scylladb/gocqlx/v2/table"
	"overdoll/applications/sting/internal/domain/post"
	"overdoll/libraries/principal"
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
	), nil
}

func (r PostsCassandraRepository) GetAudienceById(ctx context.Context, requester *principal.Principal, audienceId string) (*post.Audience, error) {
	return r.getAudienceById(ctx, audienceId)
}
