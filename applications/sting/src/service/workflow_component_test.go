package service_test

import (
	"context"
	"testing"

	"github.com/stretchr/testify/suite"
	"go.temporal.io/sdk/testsuite"
	"overdoll/applications/sting/src/ports/temporal/workflows"
	"overdoll/applications/sting/src/service"
	"overdoll/libraries/config"
)

type WorkflowComponentTestSuite struct {
	suite.Suite
	testsuite.WorkflowTestSuite

	env *testsuite.TestWorkflowEnvironment
}

func (s *WorkflowComponentTestSuite) SetupTest() {
	config.Read("applications/sting/config.toml")

	s.env = s.NewTestWorkflowEnvironment()

	app, _ := service.NewApplication(context.Background())

	s.env.RegisterActivity(&app.Commands.CreatePost)
	s.env.RegisterActivity(&app.Commands.PublishPost)
	s.env.RegisterActivity(&app.Commands.DiscardPost)
	s.env.RegisterActivity(&app.Commands.UndoPost)
	s.env.RegisterActivity(&app.Commands.NewPendingPost)
	s.env.RegisterActivity(&app.Commands.PostCustomResources)
	s.env.RegisterActivity(&app.Commands.ReassignModerator)
}

func (s *WorkflowComponentTestSuite) Test_UndoPost_Success() {
	s.env.ExecuteWorkflow(workflows.UndoPost, "test_id")

	s.True(s.env.IsWorkflowCompleted())
	s.NoError(s.env.GetWorkflowError())
}

func (s *WorkflowComponentTestSuite) AfterTest(suiteName, testName string) {
	s.env.AssertExpectations(s.T())
}

func TestUnitTestSuite(t *testing.T) {
	suite.Run(t, new(WorkflowComponentTestSuite))
}
