package activities

import (
	"context"
)

type GetAccountLocalTimeZoneInput struct {
	AccountId string
}

type GetAccountLocalTimeZonePayload struct {
	Timezone string
}

func (h *Activities) GetAccountLocalTimeZone(ctx context.Context, input GetAccountLocalTimeZoneInput) (*GetAccountLocalTimeZonePayload, error) {

	session, err := h.sr.GetLastActiveSessionByAccountIdOperator(ctx, input.AccountId)

	if err != nil {
		return nil, err
	}

	var localTimeZone string

	// using the last active session, we grab the local time
	if session != nil {
		location, err := h.lr.GetLocationFromIp(ctx, session.IP())
		if err != nil {
			return nil, err
		}

		if location.Timezone() != "" {
			localTimeZone = location.Timezone()
		}
	}

	return &GetAccountLocalTimeZonePayload{Timezone: localTimeZone}, nil
}
