package adapters

import (
	"context"
	"fmt"
	"github.com/gocql/gocql"
	"github.com/scylladb/gocqlx/v2"
	"github.com/scylladb/gocqlx/v2/table"
	"overdoll/applications/sting/internal/domain/club"
	"overdoll/libraries/principal"
)

var supporterTable = table.New(table.Metadata{
	Name: "account_club_supporter_cache",
	Columns: []string{
		"account_id",
		"club_ids",
	},
	PartKey: []string{"account_id"},
	SortKey: []string{},
})

type supporter struct {
	AccountId string   `db:"account_id"`
	ClubIds   []string `db:"club_ids"`
}

type SupporterCassandraRepository struct {
	session gocqlx.Session
}

func NewSupporterCassandraRepository(session gocqlx.Session) SupporterCassandraRepository {
	return SupporterCassandraRepository{session: session}
}

func getAccountSupportedClubs(ctx context.Context, session gocqlx.Session, requester *principal.Principal) (*club.Supporter, error) {

	if requester == nil {
		return nil, nil
	}

	var supp supporter

	if err := session.
		Query(supporterTable.Get()).
		Consistency(gocql.LocalQuorum).
		BindStruct(&supporter{AccountId: requester.AccountId()}).
		Get(&supp); err != nil {

		if err == gocql.ErrNotFound {
			return nil, nil
		}

		return nil, fmt.Errorf("failed to get club supporter info: %v", err)
	}

	return club.UnmarshalSupporterFromDatabase(requester.AccountId(), supp.ClubIds), nil
}
