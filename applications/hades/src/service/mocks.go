package service

import (
	"context"

	"overdoll/libraries/common"
)

type EvaServiceMock struct {
}

func (t EvaServiceMock) RevokeSession(ctx context.Context, s string) error {
	panic("implement me")
}

func (t EvaServiceMock) ValidateSession(ctx context.Context, id string) (*common.User, error) {
	return nil, nil
}
