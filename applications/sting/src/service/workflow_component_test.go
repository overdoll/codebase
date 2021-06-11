package service_test

import (
	"context"
	"fmt"
	"testing"
	"time"

	"github.com/stretchr/testify/suite"
	"go.temporal.io/sdk/activity"
	"go.temporal.io/sdk/testsuite"
	"overdoll/applications/sting/src/ports/temporal/workflows"
	"overdoll/applications/sting/src/service"
	"overdoll/libraries/config"
	"overdoll/libraries/helpers"
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

	s.env.RegisterActivityWithOptions(app.Commands.CreatePost.Handle, activity.RegisterOptions{Name: helpers.GetStructName(app.Commands.CreatePost)})
	s.env.RegisterActivityWithOptions(app.Commands.PublishPost.Handle, activity.RegisterOptions{Name: helpers.GetStructName(app.Commands.PublishPost)})
	s.env.RegisterActivityWithOptions(app.Commands.DiscardPost.Handle, activity.RegisterOptions{Name: helpers.GetStructName(app.Commands.DiscardPost)})
	s.env.RegisterActivityWithOptions(app.Commands.UndoPost.Handle, activity.RegisterOptions{Name: helpers.GetStructName(app.Commands.UndoPost)})
	s.env.RegisterActivityWithOptions(app.Commands.NewPendingPost.Handle, activity.RegisterOptions{Name: helpers.GetStructName(app.Commands.NewPendingPost)})
	s.env.RegisterActivityWithOptions(app.Commands.PostCustomResources.Handle, activity.RegisterOptions{Name: helpers.GetStructName(app.Commands.PostCustomResources)})
	s.env.RegisterActivityWithOptions(app.Commands.ReassignModerator.Handle, activity.RegisterOptions{Name: helpers.GetStructName(app.Commands.ReassignModerator)})
}

func (s *WorkflowComponentTestSuite) Test_UndoPost_Success() {
	fmt.Println(time.Now().UTC().String())
	s.env.ExecuteWorkflow(workflows.CreatePost, "1pcKiQL7dgUW8CIN7uO1wqFaMql")
	fmt.Println(time.Now().UTC().String())

	s.True(s.env.IsWorkflowCompleted())
	s.NoError(s.env.GetWorkflowError())
}

func (s *WorkflowComponentTestSuite) AfterTest(suiteName, testName string) {
	s.env.AssertExpectations(s.T())
}

func TestUnitTestSuite(t *testing.T) {
	suite.Run(t, new(WorkflowComponentTestSuite))
}
