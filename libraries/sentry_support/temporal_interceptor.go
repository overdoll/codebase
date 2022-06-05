package sentry_support

import (
	"context"
	"github.com/getsentry/sentry-go"
	"go.temporal.io/sdk/interceptor"
	"go.temporal.io/sdk/workflow"
	"overdoll/libraries/errors"
	"time"
)

func recoverTemporalWithSentry(hub *sentry.Hub, r interface{}) {
	var err error
	errors.RecoverPanic(r, &err)

	hub.Recover(err)
}

type temporalWorkerInterceptor struct {
	interceptor.WorkerInterceptorBase
}

func NewTemporalWorkerInterceptor() interceptor.WorkerInterceptor {
	return &temporalWorkerInterceptor{}
}

func (w *temporalWorkerInterceptor) InterceptActivity(
	ctx context.Context,
	next interceptor.ActivityInboundInterceptor,
) interceptor.ActivityInboundInterceptor {
	i := &activityInboundInterceptor{root: w}
	i.Next = next
	return i
}

func (w *temporalWorkerInterceptor) InterceptWorkflow(
	ctx workflow.Context,
	next interceptor.WorkflowInboundInterceptor,
) interceptor.WorkflowInboundInterceptor {
	i := &workflowInboundInterceptor{root: w}
	i.Next = next
	return i
}

type workflowInboundInterceptor struct {
	interceptor.WorkflowInboundInterceptorBase
	root *temporalWorkerInterceptor
}

func (w *workflowInboundInterceptor) ExecuteWorkflow(ctx workflow.Context, in *interceptor.ExecuteWorkflowInput) (interface{}, error) {

	hub, _ := ctx.Value(sentry.HubContextKey).(*sentry.Hub)

	defer func() {
		if r := recover(); r != nil {
			if hub != nil {
				recoverTemporalWithSentry(hub, r)
				panic(r)
			}
		}
	}()

	result, err := w.Next.ExecuteWorkflow(ctx, in)

	if err != nil && hub != nil {
		hub.CaptureException(err)
	}

	if hub != nil {
		hub.Flush(time.Second / 2)
	}

	return result, err
}

type activityInboundInterceptor struct {
	interceptor.ActivityInboundInterceptorBase
	root *temporalWorkerInterceptor
}

func (a *activityInboundInterceptor) ExecuteActivity(
	ctx context.Context,
	in *interceptor.ExecuteActivityInput,
) (interface{}, error) {

	hub := sentry.GetHubFromContext(ctx)

	defer func() {
		// recover from panic & re-throw panic to be caught by temporal error tracker
		if r := recover(); r != nil {
			if hub != nil {
				recoverTemporalWithSentry(hub, r)
				panic(r)
			}
		}
	}()

	result, err := a.Next.ExecuteActivity(ctx, in)

	if err != nil && hub != nil {
		hub.CaptureException(err)
	}

	if hub != nil {
		hub.Flush(time.Second / 2)
	}

	return result, err
}
