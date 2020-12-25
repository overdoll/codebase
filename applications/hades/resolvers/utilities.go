package resolvers

import (
	//"context"
	//"log"
	evav1 "project01101000/codebase/applications/eva/proto"
	"project01101000/codebase/applications/hades/model"
	//"project01101000/codebase/applications/hades/services"
)

func service2GraphUser(authCookie *evav1.AuthenticationCookie) *model.AuthenticationCookie {
	return &model.AuthenticationCookie{
		Cookie:     authCookie.Cookie,
		Redeemed:   authCookie.Redeemed,
		Expiration: authCookie.Expiration,
		Email:      authCookie.Email,
	}
}

func softDeference(field *string) string {
	if field == nil {
		return ""
	}
	return *field
}
