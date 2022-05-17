package service_test

import (
	"overdoll/applications/carrier/internal/service"
)

var application *service.ComponentTestApplication

func mockServices(testApplication *service.ComponentTestApplication) {
	application = testApplication
}
