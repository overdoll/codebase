package extensions

import (
	"context"
	"encoding/json"
	"fmt"
	"io/ioutil"
	"log"
	"os"

	"github.com/99designs/gqlgen/graphql"
	"github.com/99designs/gqlgen/graphql/errcode"
	"github.com/mitchellh/mapstructure"
	"github.com/vektah/gqlparser/v2/gqlerror"
	"overdoll/libraries/helpers"
)

type Cache struct {
	queries map[string]interface{}
}

func NewCache() (*Cache, error) {
	// Open our jsonFile
	dir, err := helpers.GetBinaryDirectory()

	if err != nil {
		return nil, err
	}

	jsonFile, err := os.Open(*dir + "/queries.json")

	if err != nil {
		return nil, err
	}
	// defer the closing of our jsonFile so that we can parse it later on
	defer jsonFile.Close()

	byteValue, _ := ioutil.ReadAll(jsonFile)

	var result map[string]interface{}
	json.Unmarshal([]byte(byteValue), &result)

	return &Cache{queries: result}, nil
}

func (c *Cache) Get(ctx context.Context, key string) (interface{}, bool) {
	s := c.queries[key]
	return s, true
}

func (c *Cache) Add(ctx context.Context, key string, value interface{}) {
	log.Printf("query not found. please generate the queries.json file")
}

const errPersistedQueryNotFound = "PersistedQueryNotFound"
const errPersistedQueryNotFoundCode = "PERSISTED_QUERY_NOT_FOUND"

type AutomaticPersistedQuery struct {
	Cache graphql.Cache
}

type ApqStats struct {
	// The hash of the incoming query
	Hash string

	// SentQuery is true if the incoming request sent the full query
	SentQuery bool
}

const apqExtension = "APQ"

var _ interface {
	graphql.OperationParameterMutator
	graphql.HandlerExtension
} = AutomaticPersistedQuery{}

func (a AutomaticPersistedQuery) ExtensionName() string {
	return "AutomaticPersistedQuery"
}

func (a AutomaticPersistedQuery) Validate(schema graphql.ExecutableSchema) error {
	if a.Cache == nil {
		return fmt.Errorf("AutomaticPersistedQuery.Cache can not be nil")
	}
	return nil
}

// Custom implementation of APQ
// We just check the "query" parameter, which contains the string
// Avoids an incompatibility with a JS library, and we can later customize this transport to be even smaller
func (a AutomaticPersistedQuery) MutateOperationParameters(ctx context.Context, rawParams *graphql.RawParams) *gqlerror.Error {
	if rawParams.Extensions["apq"] == nil {
		return nil
	}

	var extension struct {
		Sha256 string `mapstructure:"hash"`
	}

	if err := mapstructure.Decode(rawParams.Extensions["apq"], &extension); err != nil {
		return gqlerror.Errorf("invalid APQ extension data")
	}

	fullQuery := false
	if rawParams.Query == "" {
		// client sent optimistic query hash without query string, get it from the cache
		query, ok := a.Cache.Get(ctx, extension.Sha256)
		if !ok {
			err := gqlerror.Errorf(extension.Sha256)
			errcode.Set(err, errPersistedQueryNotFoundCode)
			return err
		}
		rawParams.Query = query.(string)
	} else {

		// If introspection enabled, we allow full queries
		if os.Getenv("APP_DEBUG") == "true" {
			// Dont do anything if client sends a full query
			fullQuery = true
		}

	}

	graphql.GetOperationContext(ctx).Stats.SetExtension(apqExtension, &ApqStats{
		Hash:      extension.Sha256,
		SentQuery: fullQuery,
	})

	return nil
}
