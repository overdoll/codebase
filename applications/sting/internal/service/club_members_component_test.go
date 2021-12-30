package service_test

import (
	"time"
)

type ClubMemberModified struct {
	ID       string
	JoinedAt time.Time
}

type ClubViewerMember struct {
	ID           string
	ViewerMember *ClubMemberModified
}
