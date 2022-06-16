package service_test

import (
	"github.com/stretchr/testify/mock"
	"overdoll/applications/loader/internal/service"
	"overdoll/libraries/resource/proto"
)

var application *service.ComponentTestApplication

func mockServices(testApplication *service.ComponentTestApplication) {
	application = testApplication

	application.StingCallbackClient.On("UpdateResources", mock.Anything, mock.Anything).Return(&proto.UpdateResourcesResponse{}, nil)
}
