package query

import (
	"context"
	"overdoll/applications/eva/internal/domain/location"
)

type LocationFromIp struct {
	IP string
}

type LocationFromIpHandler struct {
	lr location.Repository
}

func NewLocationFromIpHandler(lr location.Repository) LocationFromIpHandler {
	return LocationFromIpHandler{lr: lr}
}

func (h LocationFromIpHandler) Handle(ctx context.Context, query LocationFromIp) (*location.Location, error) {

	loc, err := h.lr.GetLocationFromIp(ctx, query.IP)

	if err != nil {
		return nil, err
	}

	return loc, nil
}
