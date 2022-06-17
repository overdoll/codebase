package principal

import (
	"errors"
	sting "overdoll/applications/sting/proto"
)

type ClubExtension struct {
	supportedClubIds  []string
	clubMembershipIds []string
	ownerClubIds      []string
}

func NewClubExtension(proto *sting.GetAccountClubDigestResponse) (*ClubExtension, error) {
	return &ClubExtension{
		supportedClubIds:  proto.SupportedClubIds,
		clubMembershipIds: proto.ClubMembershipIds,
		ownerClubIds:      proto.OwnerClubIds,
	}, nil
}

func (a *ClubExtension) SupportedClubIds() []string {
	return a.supportedClubIds
}

func (a *ClubExtension) ClubMembershipIds() []string {
	return a.clubMembershipIds
}

func (a *ClubExtension) OwnerClubIds() []string {
	return a.ownerClubIds
}

func (p *Principal) ExtendWithClubExtension(extension *ClubExtension) error {
	p.clubExtension = extension
	return nil
}

func (p *Principal) ClubExtension() *ClubExtension {
	return p.clubExtension
}

func (p *Principal) ensureClubExtensionExists() error {

	if p.clubExtension == nil {
		return errors.New("no club extension identified, cannot check permissions")
	}

	return nil
}

func (p *Principal) CheckClubOwner(clubId string) error {

	if err := p.ensureClubExtensionExists(); err != nil {
		return err
	}

	found := false

	for _, club := range p.clubExtension.ownerClubIds {
		if club == clubId {
			found = true
			break
		}
	}

	if !found {
		return ErrNotAuthorized
	}

	return nil
}

func (p *Principal) CheckSupporter(clubId string) error {

	if err := p.ensureClubExtensionExists(); err != nil {
		return err
	}

	found := false

	for _, club := range p.clubExtension.supportedClubIds {
		if club == clubId {
			found = true
			break
		}
	}

	if !found {
		return ErrNotAuthorized
	}

	return nil
}
