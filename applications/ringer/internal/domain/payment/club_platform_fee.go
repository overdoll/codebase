package payment

import (
	"errors"
	"math"
)

const (
	defaultPlatformFeePercent = 30
)

type ClubPlatformFee struct {
	clubId  string
	percent int64
}

func NewDefaultPlatformFee(clubId string) (*ClubPlatformFee, error) {
	return &ClubPlatformFee{
		clubId:  clubId,
		percent: defaultPlatformFeePercent,
	}, nil
}

func NewClubPlatformFeeFromAmountAndFinalAmount(clubId string, baseAmount int64, finalAmount int64) (*ClubPlatformFee, error) {
	return &ClubPlatformFee{
		clubId:  clubId,
		percent: int64(100 - math.Round(float64(finalAmount)/float64(baseAmount)*100)),
	}, nil
}

func (p *ClubPlatformFee) CalculateFee(amount int64) int64 {
	return int64(math.Round(float64(p.percent) / 100 * float64(amount)))
}

func (p *ClubPlatformFee) CalculateAmountAfterFee(amount int64) int64 {
	return amount - p.CalculateFee(amount)
}

func (p *ClubPlatformFee) Percent() int64 {
	return p.percent
}

func (p *ClubPlatformFee) ClubId() string {
	return p.clubId
}

func (p *ClubPlatformFee) UpdatePercent(newPercent int64) error {

	if newPercent >= 20 && newPercent <= 30 {
		p.percent = newPercent
		return nil
	}

	return errors.New("invalid percentage set for platform fee")
}

func UnmarshalClubPlatformFeeFromDatabase(clubId string, percent int64) *ClubPlatformFee {
	return &ClubPlatformFee{
		clubId:  clubId,
		percent: percent,
	}
}
