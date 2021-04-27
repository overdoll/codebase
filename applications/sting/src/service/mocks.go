package service

import (
	"context"

	"overdoll/applications/sting/src/domain/post"
)

type EvaServiceMock struct {
}

func (t EvaServiceMock) GetUser(ctx context.Context, id string) (*post.User, error) {
	return nil, nil
}
