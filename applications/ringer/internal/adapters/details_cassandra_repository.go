package adapters

import (
	"context"
	"github.com/gocql/gocql"
	"github.com/scylladb/gocqlx/v2"
	"github.com/scylladb/gocqlx/v2/table"
	"overdoll/applications/ringer/internal/domain/details"
	"overdoll/libraries/crypt"
	"overdoll/libraries/errors"
	"overdoll/libraries/errors/apperror"
	"overdoll/libraries/principal"
	"overdoll/libraries/support"
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
		Idempotent(true).
		BindStruct(accountDetails{AccountId: accountId}).
		ExecRelease(); err != nil {
		return errors.Wrap(support.NewGocqlError(err), "failed to delete account details")
	}

	return nil
}

func (r DetailsCassandraRepository) GetAccountDetailsByIdOperator(ctx context.Context, accountId string) (*details.AccountDetails, error) {

	var accDetails accountDetails

	if err := r.session.
		Query(accountDetailsTable.Get()).
		WithContext(ctx).
		Idempotent(true).
		BindStruct(accountDetails{AccountId: accountId}).
		GetRelease(&accDetails); err != nil {

		if err == gocql.ErrNotFound {
			return nil, apperror.NewNotFoundError("account details", accountId)
		}

		return nil, errors.Wrap(support.NewGocqlError(err), "failed to get account details")
	}

	decryptedFirstName, err := crypt.Decrypt(accDetails.FirstName)

	if err != nil {
		return nil, errors.Wrap(err, "failed to decrypt first name")
	}

	decryptedLastName, err := crypt.Decrypt(accDetails.LastName)

	if err != nil {
		return nil, errors.Wrap(err, "failed to decrypt last name")
	}

	decryptedCountry, err := crypt.Decrypt(accDetails.CountryOfResidence)

	if err != nil {
		return nil, errors.Wrap(err, "failed to decrypt country of residence")
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

	if err != nil && !apperror.IsNotFoundError(err) {
		return nil, err
	}

	// if details are not found we must use a new one as a stub
	if apperror.IsNotFoundError(err) {
		detail = details.UnmarshalAccountDetailsFromDatabase(accountId, "", "", "USA")
	}

	if err = updateFn(detail); err != nil {
		return nil, err
	}

	encryptedFirstName, err := crypt.Encrypt(detail.FirstName())

	if err != nil {
		return nil, errors.Wrap(err, "failed to encrypt first name")
	}

	encryptedLastName, err := crypt.Encrypt(detail.LastName())

	if err != nil {
		return nil, errors.Wrap(err, "failed to encrypt last name")
	}

	encryptedCountry, err := crypt.Encrypt(detail.Country().Alpha3())

	if err != nil {
		return nil, errors.Wrap(err, "failed to encrypt country of residence")
	}

	if err := r.session.
		Query(accountDetailsTable.Update("first_name", "last_name", "country_of_residence_iso3166_alpha3")).
		WithContext(ctx).
		Idempotent(true).
		BindStruct(&accountDetails{
			AccountId:          detail.AccountId(),
			FirstName:          encryptedFirstName,
			LastName:           encryptedLastName,
			CountryOfResidence: encryptedCountry,
		}).
		ExecRelease(); err != nil {
		return nil, errors.Wrap(support.NewGocqlError(err), "failed to update account details")
	}

	return detail, nil
}
