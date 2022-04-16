package payment

type ClubPaymentsFilters struct {
	payoutId *string
	clubId   *string
	status   *Status
}

func NewClubPaymentsFilters(payoutId, clubId, status *string) (*ClubPaymentsFilters, error) {

	var st *Status

	if status != nil {
		t, err := StatusFromString(*status)
		if err != nil {
			return nil, err
		}
		st = &t
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

func (e *ClubPaymentsFilters) Status() *Status {
	return e.status
}
