package adapters

import (
	"context"
	"overdoll/libraries/errors"
	"overdoll/libraries/location"

	eva "overdoll/applications/eva/proto"
	"overdoll/libraries/principal"
)

type EvaGrpc struct {
	client eva.EvaClient
}

func NewEvaGrpc(client eva.EvaClient) EvaGrpc {
	return EvaGrpc{client: client}
}

func (s EvaGrpc) GetAccount(ctx context.Context, id string) (*principal.Principal, error) {

	acc, err := s.client.GetAccount(ctx, &eva.GetAccountRequest{
		Id: id,
	})

	if err != nil {
		return nil, errors.Wrap(err, "error getting account by id")
	}

	if acc == nil {
		return nil, nil
	}

	return principal.UnmarshalFromEvaProto(acc), nil
}

func (s EvaGrpc) LocationFromIp(ctx context.Context, ip string) (*location.Location, error) {

	acc, err := s.client.GetLocationFromIp(ctx, &eva.GetLocationFromIpRequest{
		Ip: ip,
	})

	if err != nil {
		return nil, errors.Wrap(err, "error getting location from ip")
	}

	return location.UnmarshalLocationFromDatabase(
		acc.City,
		acc.Country,
		acc.PostalCode,
		acc.Subdivision,
		acc.Latitude,
		acc.Longitude,
	), nil
}
