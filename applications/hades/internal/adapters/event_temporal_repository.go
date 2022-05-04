package adapters

import (
	"context"
	"encoding/json"
	"github.com/spf13/viper"
	"go.temporal.io/sdk/client"
	"overdoll/applications/hades/internal/app/workflows"
	"overdoll/libraries/uuid"
)

type EventTemporalRepository struct {
	client client.Client
}

func NewEventTemporalRepository(client client.Client) EventTemporalRepository {
	return EventTemporalRepository{client: client}
}

func (r EventTemporalRepository) CCBillNewSaleSuccess(ctx context.Context, payload []byte) error {

	options := client.StartWorkflowOptions{
		TaskQueue: viper.GetString("temporal.queue"),
		ID:        "CCBillNewSaleOrUpSaleSuccess_" + uuid.New().String(),
	}

	var ccbillPayload workflows.CCBillNewSaleOrUpsaleSuccessInput

	if err := json.Unmarshal(payload, &ccbillPayload); err != nil {
		return err
	}

	if _, err := r.client.ExecuteWorkflow(ctx, options, workflows.CCBillNewSaleOrUpSaleSuccess, ccbillPayload); err != nil {
		return err
	}

	return nil
}

func (r EventTemporalRepository) CCBillUpSaleSuccess(ctx context.Context, payload []byte) error {

	options := client.StartWorkflowOptions{
		TaskQueue: viper.GetString("temporal.queue"),
		ID:        "CCBillNewSaleOrUpSaleSuccess_" + uuid.New().String(),
	}

	var ccbillPayload workflows.CCBillNewSaleOrUpsaleSuccessInput

	if err := json.Unmarshal(payload, &ccbillPayload); err != nil {
		return err
	}

	if _, err := r.client.ExecuteWorkflow(ctx, options, workflows.CCBillNewSaleOrUpSaleSuccess, ccbillPayload); err != nil {
		return err
	}

	return nil
}

func (r EventTemporalRepository) CCBillRenewalSuccess(ctx context.Context, payload []byte) error {

	options := client.StartWorkflowOptions{
		TaskQueue: viper.GetString("temporal.queue"),
		ID:        "CCBillRenewalSuccess_" + uuid.New().String(),
	}

	var ccbillPayload workflows.CCBillRenewalSuccessInput

	if err := json.Unmarshal(payload, &ccbillPayload); err != nil {
		return err
	}

	if _, err := r.client.ExecuteWorkflow(ctx, options, workflows.CCBillRenewalSuccess, ccbillPayload); err != nil {
		return err
	}

	return nil
}

func (r EventTemporalRepository) CCBillChargeback(ctx context.Context, payload []byte) error {

	options := client.StartWorkflowOptions{
		TaskQueue: viper.GetString("temporal.queue"),
		ID:        "CCBillChargeback_" + uuid.New().String(),
	}

	var ccbillPayload workflows.CCBillChargebackInput

	if err := json.Unmarshal(payload, &ccbillPayload); err != nil {
		return err
	}

	if _, err := r.client.ExecuteWorkflow(ctx, options, workflows.CCBillChargeback, ccbillPayload); err != nil {
		return err
	}

	return nil
}

func (r EventTemporalRepository) CCBillRefund(ctx context.Context, payload []byte) error {

	options := client.StartWorkflowOptions{
		TaskQueue: viper.GetString("temporal.queue"),
		ID:        "CCBillRefund_" + uuid.New().String(),
	}

	var ccbillPayload workflows.CCBillRefundInput

	if err := json.Unmarshal(payload, &ccbillPayload); err != nil {
		return err
	}

	if _, err := r.client.ExecuteWorkflow(ctx, options, workflows.CCBillRefund, ccbillPayload); err != nil {
		return err
	}

	return nil
}

func (r EventTemporalRepository) CCBillVoid(ctx context.Context, payload []byte) error {

	options := client.StartWorkflowOptions{
		TaskQueue: viper.GetString("temporal.queue"),
		ID:        "CCBillVoid_" + uuid.New().String(),
	}

	var ccbillPayload workflows.CCBillVoidInput

	if err := json.Unmarshal(payload, &ccbillPayload); err != nil {
		return err
	}

	if _, err := r.client.ExecuteWorkflow(ctx, options, workflows.CCBillVoid, ccbillPayload); err != nil {
		return err
	}

	return nil
}

func (r EventTemporalRepository) CCBillCancellation(ctx context.Context, payload []byte) error {

	options := client.StartWorkflowOptions{
		TaskQueue: viper.GetString("temporal.queue"),
		ID:        "CCBillCancellation_" + uuid.New().String(),
	}

	var ccbillPayload workflows.CCBillCancellationInput

	if err := json.Unmarshal(payload, &ccbillPayload); err != nil {
		return err
	}

	if _, err := r.client.ExecuteWorkflow(ctx, options, workflows.CCBillCancellation, ccbillPayload); err != nil {
		return err
	}

	return nil
}

func (r EventTemporalRepository) CCBillExpiration(ctx context.Context, payload []byte) error {

	options := client.StartWorkflowOptions{
		TaskQueue: viper.GetString("temporal.queue"),
		ID:        "CCBillExpiration_" + uuid.New().String(),
	}

	var ccbillPayload workflows.CCBillExpirationInput

	if err := json.Unmarshal(payload, &ccbillPayload); err != nil {
		return err
	}

	if _, err := r.client.ExecuteWorkflow(ctx, options, workflows.CCBillExpiration, ccbillPayload); err != nil {
		return err
	}

	return nil
}

func (r EventTemporalRepository) CCBillUserReactivation(ctx context.Context, payload []byte) error {

	options := client.StartWorkflowOptions{
		TaskQueue: viper.GetString("temporal.queue"),
		ID:        "CCBillUserReactivation_" + uuid.New().String(),
	}

	var ccbillPayload workflows.CCBillUserReactivationInput

	if err := json.Unmarshal(payload, &ccbillPayload); err != nil {
		return err
	}

	if _, err := r.client.ExecuteWorkflow(ctx, options, workflows.CCBillUserReactivation, ccbillPayload); err != nil {
		return err
	}

	return nil
}

func (r EventTemporalRepository) CCBillBillingDateChange(ctx context.Context, payload []byte) error {

	options := client.StartWorkflowOptions{
		TaskQueue: viper.GetString("temporal.queue"),
		ID:        "CCBillBillingDateChange_" + uuid.New().String(),
	}

	var ccbillPayload workflows.CCBillBillingDateChangeInput

	if err := json.Unmarshal(payload, &ccbillPayload); err != nil {
		return err
	}

	if _, err := r.client.ExecuteWorkflow(ctx, options, workflows.CCBillBillingDateChange, ccbillPayload); err != nil {
		return err
	}

	return nil
}

func (r EventTemporalRepository) CCBillCustomerDataUpdate(ctx context.Context, payload []byte) error {

	options := client.StartWorkflowOptions{
		TaskQueue: viper.GetString("temporal.queue"),
		ID:        "CCBillCustomerDataUpdate_" + uuid.New().String(),
	}

	var ccbillPayload workflows.CCBillCustomerDataUpdateInput

	if err := json.Unmarshal(payload, &ccbillPayload); err != nil {
		return err
	}

	if _, err := r.client.ExecuteWorkflow(ctx, options, workflows.CCBillCustomerDataUpdate, ccbillPayload); err != nil {
		return err
	}

	return nil
}

func (r EventTemporalRepository) CCBillRenewalFailure(ctx context.Context, payload []byte) error {

	options := client.StartWorkflowOptions{
		TaskQueue: viper.GetString("temporal.queue"),
		ID:        "CCBillRenewalFailure_" + uuid.New().String(),
	}

	var ccbillPayload workflows.CCBillRenewalFailureInput

	if err := json.Unmarshal(payload, &ccbillPayload); err != nil {
		return err
	}

	if _, err := r.client.ExecuteWorkflow(ctx, options, workflows.CCBillRenewalFailure, ccbillPayload); err != nil {
		return err
	}

	return nil
}

func (r EventTemporalRepository) CancelActiveSubscriptionsForClub(ctx context.Context, clubId string) error {

	options := client.StartWorkflowOptions{
		TaskQueue: viper.GetString("temporal.queue"),
		ID:        "CancelActiveSubscriptionsForClub_" + clubId,
	}

	if _, err := r.client.ExecuteWorkflow(ctx, options, workflows.CancelActiveSubscriptionsForClub, workflows.CancelActiveSubscriptionsForClubInput{
		ClubId: clubId,
	}); err != nil {
		return err
	}

	return nil
}
