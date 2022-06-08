package payment

import (
	"math"
	"overdoll/libraries/errors/domainerror"
)

const (
	defaultPlatformFeePercent = 30
)

type ClubPlatformFee struct {
	clubId  string
	percent uint64
}

func NewDefaultPlatformFee(clubId string) (*ClubPlatformFee, error) {
	return &ClubPlatformFee{
		clubId:  clubId,
		percent: defaultPlatformFeePercent,
	}, nil
}

func NewClubPlatformFeeFromAmountAndFinalAmount(clubId string, baseAmount uint64, finalAmount uint64) (*ClubPlatformFee, error) {
	return &ClubPlatformFee{
		clubId:  clubId,
		percent: uint64(100 - math.Round(float64(finalAmount)/float64(baseAmount)*100)),
	}, nil
}

func (p *ClubPlatformFee) CalculateFee(amount uint64) uint64 {
	return uint64(math.Round(float64(p.percent) / 100 * float64(amount)))
}

func (p *ClubPlatformFee) CalculateAmountAfterFee(amount uint64) uint64 {
	return amount - p.CalculateFee(amount)
}

func (p *ClubPlatformFee) Percent() uint64 {
	return p.percent
}

func (p *ClubPlatformFee) ClubId() string {
	return p.clubId
}

func (p *ClubPlatformFee) UpdatePercent(newPercent uint64) error {

	if newPercent >= 20 && newPercent <= 30 {
		p.percent = newPercent
		return nil
	}

	return domainerror.NewValidation("invalid percentage set for platform fee")
}

func UnmarshalClubPlatformFeeFromDatabase(clubId string, percent uint64) *ClubPlatformFee {
	return &ClubPlatformFee{
		clubId:  clubId,
		percent: percent,
	}
}
