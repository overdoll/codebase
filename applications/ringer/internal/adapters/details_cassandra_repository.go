package adapters

import (
	"context"
	"fmt"
	"github.com/gocql/gocql"
	"github.com/scylladb/gocqlx/v2"
	"github.com/scylladb/gocqlx/v2/table"
	"overdoll/applications/ringer/internal/domain/details"
	"overdoll/libraries/principal"
)

var accountDetailsTable = table.New(table.Metadata{
	Name: "account_details",
	Columns: []string{
		"account_id",
		"first_name",
		"last_name",
		"country_of_residence_iso3166_alpha3",
	},
	PartKey: []string{"account_id"},
	SortKey: []string{},
})

type accountDetails struct {
	AccountId          string `db:"account_id"`
	FirstName          string `db:"first_name"`
	LastName           string `db:"last_name"`
	CountryOfResidence string `db:"country_of_residence_iso3166_alpha3"`
}

type DetailsCassandraRepository struct {
	session gocqlx.Session
}

func NewDetailsCassandraRepository(session gocqlx.Session) DetailsCassandraRepository {
	return DetailsCassandraRepository{session: session}
}

func (r DetailsCassandraRepository) GetAccountDetailsByIdOperator(ctx context.Context, accountId string) (*details.AccountDetails, error) {

	var accDetails accountDetails

	if err := r.session.
		Query(accountDetailsTable.Get()).
		WithContext(ctx).
		BindStruct(accountDetails{AccountId: accountId}).
		Get(&accDetails); err != nil {

		if err == gocql.ErrNotFound {
			return nil, details.ErrAccountDetailsNotFound
		}

		return nil, fmt.Errorf("failed to get account details: %v", err)
	}

	return details.UnmarshalAccountDetailsFromDatabase(accDetails.AccountId, accDetails.FirstName, accDetails.LastName, accDetails.CountryOfResidence), nil
}

func (r DetailsCassandraRepository) GetAccountDetailsById(ctx context.Context, requester *principal.Principal, accountId string) (*details.AccountDetails, error) {

	detail, err := r.GetAccountDetailsByIdOperator(ctx, accountId)

	if err != nil {
		return nil, err
	}

	if err := detail.CanView(requester); err != nil {
		return nil, err
	}

	return detail, nil
}

func (r DetailsCassandraRepository) UpdateAccountDetails(ctx context.Context, requester *principal.Principal, accountId string, updateFn func(id *details.AccountDetails) error) (*details.AccountDetails, error) {

	detail, err := r.GetAccountDetailsById(ctx, requester, accountId)

	if err != nil {
		return nil, err
	}

	if err = updateFn(detail); err != nil {
		return nil, err
	}

	if err := r.session.
		Query(accountDetailsTable.Update()).
		BindStruct(&accountDetails{
			AccountId:          detail.AccountId(),
			FirstName:          detail.FirstName(),
			LastName:           detail.LastName(),
			CountryOfResidence: detail.Country().Alpha3(),
		}).
		ExecRelease(); err != nil {
		return nil, fmt.Errorf("failed to update account details: %v", err)
	}

	return detail, nil
}
