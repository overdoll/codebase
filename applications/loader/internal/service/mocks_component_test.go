package service_test

import (
	"github.com/stretchr/testify/mock"
	"overdoll/applications/loader/internal/app/workflows"
	"overdoll/applications/loader/internal/service"
	"overdoll/libraries/resource/proto"
)

var application *service.ComponentTestApplication

func mockServices(testApplication *service.ComponentTestApplication) {
	application = testApplication

	application.StingCallbackClient.On("UpdateResources", mock.Anything, mock.Anything).Return(&proto.UpdateResourcesResponse{}, nil)

	application.TemporalClient.On("RecordActivityHeartbeat", mock.Anything, mock.Anything, mock.Anything).
		Run(
			func(args mock.Arguments) {

			},
		).
		Return(nil)

	application.TemporalClient.On("SignalWorkflow", mock.Anything, mock.Anything, "", workflows.ProcessResourcesProgressAppendSignal, mock.Anything).
		Run(
			func(args mock.Arguments) {

			},
		).
		Return(nil)
}
