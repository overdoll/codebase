package sentry_support

import (
	"context"
	"fmt"
	"github.com/getsentry/sentry-go"
	"go.temporal.io/sdk/activity"
	"go.temporal.io/sdk/converter"
	"go.temporal.io/sdk/interceptor"
	"go.temporal.io/sdk/temporal"
	"go.temporal.io/sdk/workflow"
	"overdoll/libraries/errors"
	"strconv"
	"time"
)

func hubFromWorkflowContext(ctx workflow.Context) *sentry.Hub {
	hub, _ := ctx.Value(sentry.HubContextKey).(*sentry.Hub)
	return hub
}

func recoverWithTemporalHub(hub *sentry.Hub) {
	if hub != nil {
		if r := recover(); r != nil {
			// recover from panic & re-throw panic to be caught the temporal SDK go internal panic handler
			var err error
			errors.RecoverPanic(r, &err)

			hub.Recover(err)
			panic(r)
		}
	}

}

func captureTemporalExceptionAndFlush(hub *sentry.Hub, err error) {

	// ignore cancellation error
	if temporal.IsCanceledError(err) {
		return
	}

	if err != nil && hub != nil {
		hub.CaptureException(err)
	}

	if hub != nil {
		hub.Flush(time.Second / 2)
	}
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

	hub := hubFromWorkflowContext(ctx)

	defer recoverWithTemporalHub(hub)

	if hub != nil {
		info := workflow.GetInfo(ctx)

		hub.Scope().SetTag("temporal.execution_context", "workflow")
		hub.Scope().SetTag("temporal.workflow.name", info.WorkflowType.Name)
		hub.Scope().SetTag("temporal.workflow.namespace", info.Namespace)
		hub.Scope().SetTag("temporal.task_queue", info.TaskQueueName)

		attempt := strconv.Itoa(int(info.Attempt))

		sentryContext := map[string]interface{}{
			"Name":    info.WorkflowType.Name,
			"Attempt": attempt,
			"ID":      info.WorkflowExecution.ID,
			"RunID":   info.WorkflowExecution.RunID,
		}

		if info.CronSchedule != "" {
			sentryContext["Cron Schedule"] = info.CronSchedule
		}

		hub.Scope().SetContext("Temporal Workflow", sentryContext)

		hub.Scope().AddBreadcrumb(&sentry.Breadcrumb{
			Category: "workflow.start",
			Type:     "default",
			Message:  fmt.Sprintf("workflow %s started at %s", info.WorkflowType.Name, info.WorkflowStartTime.Format(time.RFC3339)),
			Level:    sentry.LevelInfo,
		}, 20)
	}

	result, err := w.Next.ExecuteWorkflow(ctx, in)

	captureTemporalExceptionAndFlush(hub, err)

	return result, err
}

func (w *workflowInboundInterceptor) HandleSignal(ctx workflow.Context, in *interceptor.HandleSignalInput) error {

	hub := hubFromWorkflowContext(ctx)

	defer recoverWithTemporalHub(hub)

	err := w.Next.HandleSignal(ctx, in)

	captureTemporalExceptionAndFlush(hub, err)

	return err
}

func (w *workflowInboundInterceptor) HandleQuery(ctx workflow.Context, in *interceptor.HandleQueryInput) (interface{}, error) {

	hub := hubFromWorkflowContext(ctx)

	defer recoverWithTemporalHub(hub)

	result, err := w.Next.HandleQuery(ctx, in)

	captureTemporalExceptionAndFlush(hub, err)

	return result, err
}

func (w *workflowInboundInterceptor) Init(outbound interceptor.WorkflowOutboundInterceptor) error {
	i := &workflowOutboundInterceptor{root: w.root}
	i.Next = outbound
	return w.Next.Init(i)
}

type workflowOutboundInterceptor struct {
	interceptor.WorkflowOutboundInterceptorBase
	root *temporalWorkerInterceptor
}

func (w workflowOutboundInterceptor) Go(ctx workflow.Context, name string, f func(ctx workflow.Context)) workflow.Context {

	hub := hubFromWorkflowContext(ctx)

	if hub != nil {
		hub.Scope().AddBreadcrumb(&sentry.Breadcrumb{
			Category: "workflow.goroutine",
			Type:     "default",
			Message:  fmt.Sprintf("started goroutine %s", name),
			Level:    sentry.LevelInfo,
		}, 20)
	}

	return w.Next.Go(ctx, name, f)
}

func (w workflowOutboundInterceptor) ExecuteActivity(ctx workflow.Context, activityType string, args ...interface{}) workflow.Future {

	hub := hubFromWorkflowContext(ctx)

	if hub != nil {
		hub.Scope().AddBreadcrumb(&sentry.Breadcrumb{
			Category: "workflow.execute.activity",
			Type:     "default",
			Message:  fmt.Sprintf("execute activity %s", activityType),
			Level:    sentry.LevelInfo,
		}, 20)
	}

	return w.Next.ExecuteActivity(ctx, activityType, args...)
}

func (w workflowOutboundInterceptor) ExecuteLocalActivity(ctx workflow.Context, activityType string, args ...interface{}) workflow.Future {

	hub := hubFromWorkflowContext(ctx)

	if hub != nil {
		hub.Scope().AddBreadcrumb(&sentry.Breadcrumb{
			Category: "workflow.execute.local_activity",
			Type:     "default",
			Message:  fmt.Sprintf("execute local activity %s", activityType),
			Level:    sentry.LevelInfo,
		}, 20)
	}

	return w.Next.ExecuteLocalActivity(ctx, activityType, args...)
}

func (w workflowOutboundInterceptor) ExecuteChildWorkflow(ctx workflow.Context, childWorkflowType string, args ...interface{}) workflow.ChildWorkflowFuture {

	hub := hubFromWorkflowContext(ctx)

	if hub != nil {
		hub.Scope().AddBreadcrumb(&sentry.Breadcrumb{
			Category: "workflow.execute.child_workflow",
			Type:     "default",
			Message:  fmt.Sprintf("execute child workflow %s", childWorkflowType),
			Level:    sentry.LevelInfo,
		}, 20)
	}

	return w.Next.ExecuteChildWorkflow(ctx, childWorkflowType, args...)
}

func (w workflowOutboundInterceptor) NewTimer(ctx workflow.Context, d time.Duration) workflow.Future {

	hub := hubFromWorkflowContext(ctx)

	if hub != nil {
		hub.Scope().AddBreadcrumb(&sentry.Breadcrumb{
			Category: "workflow.new_timer",
			Type:     "default",
			Message:  fmt.Sprintf("workflow new timer duration %s", d.String()),
			Level:    sentry.LevelInfo,
		}, 20)
	}

	return w.Next.NewTimer(ctx, d)
}

func (w workflowOutboundInterceptor) Sleep(ctx workflow.Context, d time.Duration) error {

	hub := hubFromWorkflowContext(ctx)

	if hub != nil {
		hub.Scope().AddBreadcrumb(&sentry.Breadcrumb{
			Category: "workflow.sleep",
			Type:     "default",
			Message:  fmt.Sprintf("workflow sleep duration %s", d.String()),
			Level:    sentry.LevelInfo,
		}, 20)
	}

	return w.Next.Sleep(ctx, d)
}

func (w workflowOutboundInterceptor) RequestCancelExternalWorkflow(ctx workflow.Context, workflowID, runID string) workflow.Future {

	hub := hubFromWorkflowContext(ctx)

	if hub != nil {
		hub.Scope().AddBreadcrumb(&sentry.Breadcrumb{
			Category: "workflow.cancel_external_workflow",
			Type:     "default",
			Message:  fmt.Sprintf("request cancel external workflow ID %s, run ID %s", workflowID, runID),
			Level:    sentry.LevelInfo,
		}, 20)
	}

	return w.Next.RequestCancelExternalWorkflow(ctx, workflowID, runID)
}

func (w workflowOutboundInterceptor) SignalExternalWorkflow(ctx workflow.Context, workflowID, runID, signalName string, arg interface{}) workflow.Future {

	hub := hubFromWorkflowContext(ctx)

	if hub != nil {
		hub.Scope().AddBreadcrumb(&sentry.Breadcrumb{
			Category: "workflow.signal.external_workflow",
			Type:     "default",
			Message:  fmt.Sprintf("signal external workflow ID %s, run ID %s, signal %s", workflowID, runID, signalName),
			Level:    sentry.LevelInfo,
		}, 20)
	}

	return w.Next.SignalExternalWorkflow(ctx, workflowID, runID, signalName, arg)
}

func (w workflowOutboundInterceptor) SignalChildWorkflow(ctx workflow.Context, workflowID, signalName string, arg interface{}) workflow.Future {

	hub := hubFromWorkflowContext(ctx)

	if hub != nil {
		hub.Scope().AddBreadcrumb(&sentry.Breadcrumb{
			Category: "workflow.signal.child_workflow",
			Type:     "default",
			Message:  fmt.Sprintf("signal child workflow ID %s, signal %s", workflowID, signalName),
			Level:    sentry.LevelInfo,
		}, 20)
	}

	return w.Next.SignalChildWorkflow(ctx, workflowID, signalName, arg)
}

func (w workflowOutboundInterceptor) SideEffect(ctx workflow.Context, f func(ctx workflow.Context) interface{}) converter.EncodedValue {

	hub := hubFromWorkflowContext(ctx)

	if hub != nil {
		hub.Scope().AddBreadcrumb(&sentry.Breadcrumb{
			Category: "workflow.side_effect",
			Type:     "default",
			Message:  fmt.Sprint("executed workflow SideEffect"),
			Level:    sentry.LevelInfo,
		}, 20)
	}

	return w.Next.SideEffect(ctx, f)
}

func (w workflowOutboundInterceptor) NewContinueAsNewError(ctx workflow.Context, wfn interface{}, args ...interface{}) error {

	hub := hubFromWorkflowContext(ctx)

	if hub != nil {
		hub.Scope().AddBreadcrumb(&sentry.Breadcrumb{
			Category: "workflow.continue_as_new",
			Type:     "default",
			Message:  fmt.Sprint("executed workflow ContinueAsNewError"),
			Level:    sentry.LevelInfo,
		}, 20)
	}

	return w.Next.NewContinueAsNewError(ctx, wfn, args...)
}

type activityInboundInterceptor struct {
	interceptor.ActivityInboundInterceptorBase
	root *temporalWorkerInterceptor
}

func (a *activityInboundInterceptor) Init(outbound interceptor.ActivityOutboundInterceptor) error {
	i := &activityOutboundInterceptor{root: a.root}
	i.Next = outbound
	return a.Next.Init(i)
}

func (a *activityInboundInterceptor) ExecuteActivity(
	ctx context.Context,
	in *interceptor.ExecuteActivityInput,
) (interface{}, error) {

	hub := sentry.GetHubFromContext(ctx)

	defer recoverWithTemporalHub(hub)

	if hub != nil {
		info := activity.GetInfo(ctx)
		hub.Scope().SetTag("temporal.execution_context", "activity")

		if info.WorkflowType != nil {
			hub.Scope().SetTag("temporal.workflow.name", info.WorkflowType.Name)
		}

		hub.Scope().SetTag("temporal.activity.name", info.ActivityType.Name)
		hub.Scope().SetTag("temporal.workflow.namespace", info.WorkflowNamespace)
		hub.Scope().SetTag("temporal.task_queue", info.TaskQueue)

		attempt := strconv.Itoa(int(info.Attempt))

		sentryContext := map[string]interface{}{
			"Name":              info.ActivityType.Name,
			"Attempt":           attempt,
			"Workflow ID":       info.WorkflowExecution.ID,
			"Workflow RunID":    info.WorkflowExecution.RunID,
			"ID":                info.ActivityID,
			"Heartbeat Timeout": info.HeartbeatTimeout.String(),
		}

		if info.WorkflowType != nil {
			sentryContext["Workflow Name"] = info.WorkflowType.Name
		}

		hub.Scope().SetContext("Temporal Activity", sentryContext)

		hub.Scope().AddBreadcrumb(&sentry.Breadcrumb{
			Category: "activity.start",
			Type:     "default",
			Message:  fmt.Sprintf("activity %s started at %s", info.ActivityType.Name, info.StartedTime.Format(time.RFC3339)),
			Level:    sentry.LevelInfo,
		}, 20)
	}

	result, err := a.Next.ExecuteActivity(ctx, in)

	captureTemporalExceptionAndFlush(hub, err)

	return result, err
}

type activityOutboundInterceptor struct {
	interceptor.ActivityOutboundInterceptorBase
	root *temporalWorkerInterceptor
}

func (a activityOutboundInterceptor) RecordHeartbeat(ctx context.Context, details ...interface{}) {

	hub := sentry.GetHubFromContext(ctx)

	if hub != nil {
		hub.Scope().AddBreadcrumb(&sentry.Breadcrumb{
			Category: "activity.heartbeat",
			Type:     "default",
			Message:  fmt.Sprintf("heartbeat recorded with details %s", details),
			Level:    sentry.LevelInfo,
		}, 20)
	}
}
