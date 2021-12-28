package adapters

import (
	"context"
	"github.com/scylladb/gocqlx/v2/table"
	"overdoll/applications/sting/internal/domain/club"
	"overdoll/libraries/paging"
	"overdoll/libraries/principal"
)

const (
	maxClubMembersPerPartition   = 10000
	initialClubMembersPartitions = 10
)

var clubMembersPartitionsTable = table.New(table.Metadata{
	Name: "club_members_partitions",
	Columns: []string{
		"club_id",
		"bucket",
		"last_joined_at_count",
		"members_count",
		"max_members_count",
	},
	PartKey: []string{"club_id"},
	SortKey: []string{"bucket"},
})

func (r ClubCassandraRepository) GetClubMemberById(ctx context.Context, requester *principal.Principal, clubId, accountId string) (*club.Member, error) {
	//TODO implement me
	panic("implement me")
}

func (r ClubCassandraRepository) CreateClubMember(ctx context.Context, requester *principal.Principal, member *club.Member) error {
	//TODO implement me
	panic("implement me")
}

func (r ClubCassandraRepository) DeleteClubMember(ctx context.Context, requester *principal.Principal, clubId string) error {
	//TODO implement me
	panic("implement me")
}

func (r ClubCassandraRepository) GetAccountClubMemberships(ctx context.Context, requester *principal.Principal, cursor *paging.Cursor, accountId string) ([]*club.Member, error) {
	//TODO implement me
	panic("implement me")
}

func (r ClubCassandraRepository) GetMembersForClub(ctx context.Context, requester *principal.Principal, cursor *paging.Cursor, clubId string) ([]*club.Member, error) {
	//TODO implement me
	panic("implement me")
}
