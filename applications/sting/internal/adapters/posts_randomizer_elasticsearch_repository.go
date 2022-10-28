package adapters

import (
	"context"
	"crypto/rand"
	"github.com/go-redis/redis/v8"
	"math/big"
	"strconv"
	"time"
)

const (
	randomizerPrefix = "randomSeed:"
)

func (r PostsCassandraElasticsearchRepository) newRandomizerSeed(ctx context.Context, key string) (int64, error) {

	nBig, err := rand.Int(rand.Reader, big.NewInt(9223372036854775))

	if err != nil {
		return 0, err
	}

	seedValue := nBig.Int64()

	// cache for 24 hours
	_, err = r.cache.WithContext(ctx).Set(ctx, randomizerPrefix+key, seedValue, time.Hour*24).Result()

	if err != nil {
		return 0, err
	}

	return seedValue, nil
}

func (r PostsCassandraElasticsearchRepository) getRandomizerSeed(ctx context.Context, key string) (int64, error) {

	val, err := r.cache.WithContext(ctx).Get(ctx, randomizerPrefix+key).Result()

	if err != nil {

		if err == redis.Nil {
			return r.newRandomizerSeed(ctx, key)
		}

		return 0, err
	}

	n, err := strconv.ParseInt(val, 10, 64)
	if err != nil {
		return 0, err
	}

	return n, nil
}
