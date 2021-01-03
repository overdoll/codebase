package extension

import (
	"context"
	"fmt"
	"github.com/99designs/gqlgen/graphql/errcode"
	"github.com/mitchellh/mapstructure"
	"github.com/vektah/gqlparser/v2/gqlerror"

	"github.com/99designs/gqlgen/graphql"
)

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
		// Dont do anything if client sends a full query
		fullQuery = true
	}

	graphql.GetOperationContext(ctx).Stats.SetExtension(apqExtension, &ApqStats{
		Hash:      extension.Sha256,
		SentQuery: fullQuery,
	})

	return nil
}
