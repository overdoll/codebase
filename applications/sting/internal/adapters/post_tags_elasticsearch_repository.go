package adapters

import (
	"context"
	"overdoll/libraries/paging"
)

func (r PostsCassandraElasticsearchRepository) ClubTags(ctx context.Context, cursor *paging.Cursor, clubId string) ([]interface{}, error) {
	//TODO implement me
	panic("implement me")
}
