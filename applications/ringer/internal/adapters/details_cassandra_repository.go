package adapters

import (
	"context"
	"fmt"
	"github.com/gocql/gocql"
	"github.com/scylladb/gocqlx/v2"
	"github.com/scylladb/gocqlx/v2/table"
	"overdoll/applications/ringer/internal/domain/details"
	"overdoll/libraries/crypt"
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

func (r DetailsCassandraRepository) DeleteAccountDetailsOperator(ctx context.Context, accountId string) error {

	if err := r.session.
		Query(accountDetailsTable.Delete()).
		WithContext(ctx).
		BindStruct(accountDetails{AccountId: accountId}).
		ExecRelease(); err != nil {
		return fmt.Errorf("failed to delete account details: %v", err)
	}

	return nil
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

	decryptedFirstName, err := crypt.Decrypt(accDetails.FirstName)

	if err != nil {
		return nil, err
	}

	decryptedLastName, err := crypt.Decrypt(accDetails.LastName)

	if err != nil {
		return nil, err
	}

	decryptedCountry, err := crypt.Decrypt(accDetails.CountryOfResidence)

	if err != nil {
		return nil, err
	}

	return details.UnmarshalAccountDetailsFromDatabase(accDetails.AccountId, decryptedFirstName, decryptedLastName, decryptedCountry), nil
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

	if err != nil && err != details.ErrAccountDetailsNotFound {
		return nil, err
	}

	// if details are not found we must use a new one as a stub
	if err == details.ErrAccountDetailsNotFound {
		detail = details.UnmarshalAccountDetailsFromDatabase(accountId, "", "", "USA")
	}

	if err = updateFn(detail); err != nil {
		return nil, err
	}

	encryptedFirstName, err := crypt.Encrypt(detail.FirstName())

	if err != nil {
		return nil, err
	}

	encryptedLastName, err := crypt.Encrypt(detail.LastName())

	if err != nil {
		return nil, err
	}

	encryptedCountry, err := crypt.Encrypt(detail.Country().Alpha3())

	if err != nil {
		return nil, err
	}

	if err := r.session.
		Query(accountDetailsTable.Update("first_name", "last_name", "country_of_residence_iso3166_alpha3")).
		BindStruct(&accountDetails{
			AccountId:          detail.AccountId(),
			FirstName:          encryptedFirstName,
			LastName:           encryptedLastName,
			CountryOfResidence: encryptedCountry,
		}).
		ExecRelease(); err != nil {
		return nil, fmt.Errorf("failed to update account details: %v", err)
	}

	return detail, nil
}
