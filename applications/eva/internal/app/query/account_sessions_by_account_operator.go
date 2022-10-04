package query

import (
	"context"
	"overdoll/applications/eva/internal/domain/session"
)

type AccountSessionsByAccountOperator struct {
	AccountId string
}

type AccountSessionsByAccountOperatorHandler struct {
	sr session.Repository
}

func NewAccountSessionsByAccountOperatorHandler(sr session.Repository) AccountSessionsByAccountOperatorHandler {
	return AccountSessionsByAccountOperatorHandler{sr: sr}
}

func (h AccountSessionsByAccountOperatorHandler) Handle(ctx context.Context, query AccountSessionsByAccountOperator) ([]*session.Session, error) {

	ur, err := h.sr.GetSessionsByAccountIdOperator(ctx, query.AccountId)

	if err != nil {
		return nil, err
	}

	return ur, nil
}
