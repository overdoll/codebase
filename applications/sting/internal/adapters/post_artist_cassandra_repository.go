package adapters

import (
	"context"
	"fmt"

	"github.com/gocql/gocql"
	"github.com/scylladb/gocqlx/v2/table"
	"overdoll/applications/sting/internal/domain/post"
)

var artistTable = table.New(table.Metadata{
	Name: "artists",
	Columns: []string{
		"account_id",
		"do_not_post_reason",
	},
	PartKey: []string{"account_id"},
	SortKey: []string{},
})

type artist struct {
	Id              string `db:"account_id"`
	DoNotPostReason string `db:"do_not_post_reason"`
}

func marshalArtistToDatabase(art *post.Artist) *artist {
	return &artist{
		Id: art.ID(),
	}
}

func (r PostsCassandraRepository) GetArtistById(ctx context.Context, id string) (*post.Artist, error) {

	var art artist

	qc := r.session.
		Query(artistTable.Select()).
		Consistency(gocql.One).
		BindStruct(&artist{
			Id: id,
		})

	if err := qc.Get(&art); err != nil {
		return nil, fmt.Errorf("select() failed: %s", err)
	}

	return post.UnmarshalArtistFromDatabase(art.Id, art.DoNotPostReason), nil
}

func (r PostsCassandraRepository) CreateArtist(ctx context.Context, artist *post.Artist) error {
	pendingArtist := marshalArtistToDatabase(artist)

	insertArtist := r.session.
		Query(artistTable.Insert()).
		Consistency(gocql.LocalQuorum).
		BindStruct(pendingArtist)

	if err := insertArtist.ExecRelease(); err != nil {
		return fmt.Errorf("ExecRelease() failed: '%s", err)
	}

	return nil
}
