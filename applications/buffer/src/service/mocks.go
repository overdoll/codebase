package service

import (
	"context"

	"overdoll/libraries/common"
)

type EvaServiceMock struct {
}

func (t EvaServiceMock) ValidateSession(ctx context.Context, id string) (*common.User, error) {
	return nil, nil
}
