package queries

import (
	"context"
	"overdoll/applications/eva/internal/ports/graphql/types"
	"overdoll/libraries/errors"
	"overdoll/libraries/graphql/relay"
)

func (r *QueryResolver) Node(ctx context.Context, id relay.ID) (relay.Node, error) {
	switch id.GetTypeName() {
	case "Post":
		return &types.Post{ID: id}, nil
	case "Account":
		return &types.Post{ID: id}, nil
	case "Series":
		return &types.Series{ID: id}, nil
	case "Topic":
		return &types.Topic{ID: id}, nil
	case "AccountTransaction":
		return &types.AccountTransaction{ID: id}, nil
	case "Audience":
		return &types.Audience{ID: id}, nil
	case "CancellationReason":
		return &types.CancellationReason{ID: id}, nil
	case "Category":
		return &types.Category{ID: id}, nil
	case "Character":
		return &types.Character{ID: id}, nil
	case "Club":
		return &types.Club{ID: id}, nil
	case "ClubInfractionHistory":
		return &types.ClubInfractionHistory{ID: id}, nil
	case "ClubMember":
		return &types.ClubMember{ID: id}, nil
	case "ClubPayout":
		return &types.ClubPayout{ID: id}, nil
	case "ClubPayment":
		return &types.ClubPayment{ID: id}, nil
	case "DepositRequest":
		return &types.DepositRequest{ID: id}, nil
	case "PostAuditLog":
		return &types.PostAuditLog{ID: id}, nil
	case "PostLike":
		return &types.PostLike{ID: id}, nil
	case "PostReport":
		return &types.PostReport{ID: id}, nil
	case "Rule":
		return &types.Rule{ID: id}, nil
	case "AccountEmail":
		return &types.AccountEmail{ID: id}, nil
	case "AccountSession":
		return &types.AccountSession{ID: id}, nil
	}

	return nil, errors.New("invalid type: " + id.GetTypeName())
}
