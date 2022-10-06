package adapters

import (
	"context"
	"overdoll/applications/sting/internal/domain/post"
)

func (r PostsCassandraElasticsearchRepository) GetStatsByAccountId(ctx context.Context, accountId string) (*post.AccountStats, error) {
	return nil, nil
}
