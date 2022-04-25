package payment

type ClubPaymentsFilters struct {
	payoutId *string
	clubId   *string
	status   []Status
}

func NewClubPaymentsFilters(payoutId, clubId *string, status []string) (*ClubPaymentsFilters, error) {

	var st []Status

	for _, s := range status {
		t, err := StatusFromString(s)
		if err != nil {
			return nil, err
		}
		st = append(st, t)
	}

	return &ClubPaymentsFilters{
		payoutId: payoutId,
		clubId:   clubId,
		status:   st,
	}, nil
}

func (e *ClubPaymentsFilters) PayoutId() *string {
	return e.payoutId
}

func (e *ClubPaymentsFilters) ClubId() *string {
	return e.clubId
}

func (e *ClubPaymentsFilters) Status() []Status {
	return e.status
}
