package adapters

import (
	"context"
	"encoding/json"
	"github.com/go-redis/redis/v8"
	"github.com/gocql/gocql"
	"overdoll/applications/sting/internal/domain/club"
	"overdoll/libraries/crypt"
	"overdoll/libraries/errors"
	"overdoll/libraries/support"
	"time"
)

var (
	errCacheNotFound = errors.New("digest cache not found")
)

type accountClubDigest struct {
	SupportedClubIds         []string `json:"supported_club_ids"`
	OwnerClubIds             []string `json:"owner_club_ids"`
	AccountMembershipClubIds []string `json:"account_membership_club_ids"`
}

const (
	accountDigestPrefix = "accountDigest:"
)

func (r ClubCassandraElasticsearchRepository) clearAccountDigestCache(ctx context.Context, accountId string) error {

	_, err := r.cache.WithContext(ctx).Del(ctx, accountDigestPrefix+accountId).Result()

	if err != nil {
		return errors.Wrap(err, "failed delete account digest - delete redis key")
	}

	return nil
}

func (r ClubCassandraElasticsearchRepository) cacheAccountClubDigest(ctx context.Context, accountId string, digest *club.AccountClubDigest) error {

	cachedDigest := &accountClubDigest{
		SupportedClubIds:         digest.SupportedClubIds(),
		OwnerClubIds:             digest.OwnerClubIds(),
		AccountMembershipClubIds: digest.ClubMembershipIds(),
	}

	val, err := json.Marshal(cachedDigest)

	if err != nil {
		return errors.Wrap(err, "failed to cache account club digest - json marshal")
	}

	valReal, err := crypt.Encrypt(string(val))

	if err != nil {
		return errors.Wrap(err, "failed to cache account club digest - encryption")
	}

	// cache for 24 hours
	_, err = r.cache.WithContext(ctx).Set(ctx, accountDigestPrefix+accountId, valReal, time.Hour*24).Result()

	if err != nil {
		return errors.Wrap(err, "failed to cache account club digest - redis")
	}

	return nil
}

func (r ClubCassandraElasticsearchRepository) getAccountClubDigestByIdFromCache(ctx context.Context, accountId string) (*club.AccountClubDigest, error) {

	val, err := r.cache.WithContext(ctx).Get(ctx, accountDigestPrefix+accountId).Result()

	if err != nil {

		if err == redis.Nil {
			return nil, errCacheNotFound
		}

		return nil, errors.Wrap(err, "failed to get account digest - redis")
	}

	val, err = crypt.Decrypt(val)

	if err != nil {
		return nil, errors.Wrap(err, "failed to get account digest - decryption")
	}

	var digestCached accountClubDigest

	if err := json.Unmarshal([]byte(val), &digestCached); err != nil {
		return nil, errors.Wrap(err, "failed to get account digest - unmarshal")
	}

	return club.UnmarshalAccountClubDigestFromDatabase(digestCached.SupportedClubIds, digestCached.AccountMembershipClubIds, digestCached.OwnerClubIds), nil
}

func (r ClubCassandraElasticsearchRepository) GetAccountClubDigestById(ctx context.Context, accountId string) (*club.AccountClubDigest, error) {

	cached, err := r.getAccountClubDigestByIdFromCache(ctx, accountId)

	if err != nil && err != errCacheNotFound {
		return nil, err
	}

	if cached != nil {
		return cached, nil
	}

	supportedClubIds, err := r.getAccountSupportedClubs(ctx, accountId)

	if err != nil {
		return nil, err
	}

	accountClubIds, err := r.getAccountClubs(ctx, accountId)

	if err != nil {
		return nil, err
	}

	accountMembershipClubIds, err := r.getAccountClubMemberships(ctx, accountId)

	if err != nil {
		return nil, err
	}

	unmarshalled := club.UnmarshalAccountClubDigestFromDatabase(supportedClubIds, accountMembershipClubIds, accountClubIds)

	if err := r.cacheAccountClubDigest(ctx, accountId, unmarshalled); err != nil {
		return nil, err
	}

	return unmarshalled, nil
}

func (r ClubCassandraElasticsearchRepository) getAccountSupportedClubs(ctx context.Context, accountId string) ([]string, error) {

	var supportedClubs []*accountSupportedClubs

	if err := accountSupportedClubsTable.
		SelectBuilder().
		Query(r.session).
		WithContext(ctx).
		Idempotent(true).
		Consistency(gocql.LocalQuorum).
		BindStruct(accountSupportedClubs{
			AccountId: accountId,
		}).
		SelectRelease(&supportedClubs); err != nil {
		return nil, errors.Wrap(support.NewGocqlError(err), "failed to get account supported clubs")
	}

	var supportedIds []string

	for _, supported := range supportedClubs {
		supportedIds = append(supportedIds, supported.ClubId)
	}

	return supportedIds, nil
}

func (r ClubCassandraElasticsearchRepository) getAccountClubs(ctx context.Context, accountId string) ([]string, error) {

	var accountClub []accountClubs

	if err := accountClubsTable.
		SelectBuilder().
		Query(r.session).
		WithContext(ctx).
		Idempotent(true).
		Consistency(gocql.LocalQuorum).
		BindStruct(accountClubs{
			AccountId: accountId,
		}).
		SelectRelease(&accountClub); err != nil {
		return nil, errors.Wrap(support.NewGocqlError(err), "failed to get account clubs by account")
	}

	var accountClubIds []string

	for _, c := range accountClub {
		accountClubIds = append(accountClubIds, c.ClubId)
	}

	return accountClubIds, nil
}

func (r ClubCassandraElasticsearchRepository) getAccountClubMemberships(ctx context.Context, accountId string) ([]string, error) {

	var accountClub []clubMembersByAccount

	if err := clubMembersByAccountTable.
		SelectBuilder().
		Query(r.session).
		WithContext(ctx).
		Idempotent(true).
		Consistency(gocql.LocalQuorum).
		BindStruct(clubMembersByAccount{
			MemberAccountId: accountId,
		}).
		SelectRelease(&accountClub); err != nil {
		return nil, errors.Wrap(support.NewGocqlError(err), "failed to get club members by account")
	}

	var clubIds []string
	for _, clb := range accountClub {
		clubIds = append(clubIds, clb.ClubId)
	}

	return clubIds, nil
}
