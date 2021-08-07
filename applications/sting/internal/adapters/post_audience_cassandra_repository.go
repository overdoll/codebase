package adapters

import (
	"context"
	"fmt"

	"github.com/gocql/gocql"
	"github.com/scylladb/gocqlx/v2/table"
	"overdoll/applications/sting/internal/domain/post"
)

var audienceTable = table.New(table.Metadata{
	Name: "audience",
	Columns: []string{
		"id",
		"slug",
		"title",
		"thumbnail",
		"standard",
	},
	PartKey: []string{"id"},
	SortKey: []string{},
})

type audience struct {
	Id        string `db:"id"`
	Slug      string `db:"slug"`
	Title     string `db:"title"`
	Thumbnail string `db:"thumbnail"`
	Standard  int    `db:"standard"`
}

func (r PostsCassandraRepository) GetAudienceById(ctx context.Context, audienceId string) (*post.Audience, error) {

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
		b.Thumbnail,
		b.Standard,
	), nil
}
