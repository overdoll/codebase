package service_test

import (
	"github.com/stretchr/testify/mock"
	"overdoll/applications/loader/internal/service"
)

var application *service.ComponentTestApplication

func mockServices(testApplication *service.ComponentTestApplication) {
	application = testApplication

	application.TemporalClient.On("RecordActivityHeartbeat", mock.Anything, mock.Anything, mock.Anything).
		Run(
			func(args mock.Arguments) {

			},
		).
		Return(nil)
}
