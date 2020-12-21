package resolvers

import (
	//"context"
	//"log"
	evav1 "project01101000/codebase/applications/eva/proto"
	"project01101000/codebase/applications/hades/model"
	//"project01101000/codebase/applications/hades/services"
)

func service2GraphUser(user *evav1.User) *model.User {
	return &model.User{
		ID:       user.Id,
		Username: user.Username,
		Email:    user.Email,
	}
}

func softDeference(field *string) string {
	if field == nil {
		return ""
	}
	return *field
}
