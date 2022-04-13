package payment

import "errors"

type PlatformFee struct {
	clubId  string
	percent int64
}

func NewPlatformFeeFromAmountAndFinalAmount(clubId string, baseAmount int64, finalAmount int64) (*PlatformFee, error) {
	return &PlatformFee{
		clubId:  clubId,
		percent: baseAmount / finalAmount * 100,
	}, nil
}

func (p *PlatformFee) CalculateFee(amount int64) int64 {
	return p.percent / 100 * amount
}

func (p *PlatformFee) CalculateAmountAfterFee(amount int64) int64 {
	return amount - p.CalculateFee(amount)
}

func (p *PlatformFee) Percent() int64 {
	return p.percent
}

func (p *PlatformFee) ClubId() string {
	return p.clubId
}

func (p *PlatformFee) UpdatePercent(newPercent int64) error {

	if newPercent >= 20 && newPercent <= 30 {
		p.percent = newPercent
		return nil
	}

	return errors.New("invalid percentage set for platform fee")
}
