package sentry_support

import (
	"context"
	"github.com/getsentry/sentry-go"
	"go.temporal.io/sdk/workflow"
)

type (
	// propagator implements the custom context propagator
	temporalSentryPropagator struct{}
)

// NewTemporalContextSentryPropagator returns a context propagator that propagates a set of
// string key-value pairs across a workflow
func NewTemporalContextSentryPropagator() workflow.ContextPropagator {
	return &temporalSentryPropagator{}
}

// Inject injects values from context into headers for propagation
func (s *temporalSentryPropagator) Inject(ctx context.Context, writer workflow.HeaderWriter) error {
	return nil
}

// InjectFromWorkflow injects values from context into headers for propagation
func (s *temporalSentryPropagator) InjectFromWorkflow(ctx workflow.Context, writer workflow.HeaderWriter) error {
	return nil
}

// Extract extracts values from headers and puts them into context
func (s *temporalSentryPropagator) Extract(ctx context.Context, reader workflow.HeaderReader) (context.Context, error) {

	hub := sentry.CurrentHub()

	if hub != nil {
		return sentry.SetHubOnContext(ctx, hub.Clone()), nil
	}

	return ctx, nil
}

// ExtractToWorkflow extracts values from headers and puts them into context
func (s *temporalSentryPropagator) ExtractToWorkflow(ctx workflow.Context, reader workflow.HeaderReader) (workflow.Context, error) {

	hub := sentry.CurrentHub()

	if hub != nil {
		return workflow.WithValue(ctx, sentry.HubContextKey, hub.Clone()), nil
	}

	return ctx, nil
}
