package common

import (
	"context"
)

type EvaServiceMock struct {
}

func (t EvaServiceMock) GetUser(ctx context.Context, id string) (*User, error) {
	return nil, nil
}
