package adapters

import (
	"context"
	"fmt"
	"github.com/aws/aws-sdk-go/aws"
	"github.com/aws/aws-sdk-go/aws/session"
	"github.com/aws/aws-sdk-go/service/s3"
	"github.com/aws/aws-sdk-go/service/s3/s3manager"
	"github.com/gocql/gocql"
	"github.com/scylladb/gocqlx/v2"
	"github.com/scylladb/gocqlx/v2/table"
	"github.com/spf13/viper"
	"go.temporal.io/sdk/client"
	"os"
	"overdoll/applications/hades/internal/app/workflows"
	"overdoll/applications/hades/internal/domain/billing"
	"overdoll/libraries/principal"
	"time"
)

var receiptFilesTable = table.New(table.Metadata{
	Name: "receipt_files",
	Columns: []string{
		"id",
		"account_transaction_id",
		"account_transaction_event_id",

		"file_path",
		"temporal_workflow_id",
	},
	PartKey: []string{"id"},
	SortKey: []string{},
})

type receiptFiles struct {
	Id string `db:"id"`

	AccountTransactionId      string `db:"account_transaction_id"`
	AccountTransactionEventId string `db:"account_transaction_event_id"`

	FilePath           string `db:"file_path"`
	TemporalWorkflowId string `db:"temporal_workflow_id"`
}

type BillingCassandraS3TemporalFileRepository struct {
	session gocqlx.Session
	aws     *session.Session
	client  client.Client
}

func NewBillingCassandraS3TemporalFileRepository(session gocqlx.Session, aws *session.Session, client client.Client) BillingCassandraS3TemporalFileRepository {
	return BillingCassandraS3TemporalFileRepository{session: session, aws: aws, client: client}
}

func (r BillingCassandraS3TemporalFileRepository) unmarshalClubSupportReceipt(ctx context.Context, receiptFile *receiptFiles) (*billing.ClubSupporterReceipt, error) {

	s3Client := s3.New(r.aws)

	req, _ := s3Client.GetObjectRequest(&s3.GetObjectInput{
		Bucket: aws.String(os.Getenv("FILES_BUCKET")),
		Key:    aws.String(receiptFile.FilePath),
	})

	urlStr, err := req.Presign(15 * time.Minute)

	if err != nil {
		return nil, err
	}

	return billing.UnmarshalClubSupporterReceiptFromDatabase(urlStr), nil
}

func (r BillingCassandraS3TemporalFileRepository) getClubSupportReceipt(ctx context.Context, id string) (*receiptFiles, error) {

	var receiptFile receiptFiles

	if err := receiptFilesTable.
		SelectBuilder().
		Query(r.session).
		WithContext(ctx).
		Consistency(gocql.LocalQuorum).
		BindStruct(&receiptFiles{
			Id: id,
		}).
		GetRelease(&receiptFile); err != nil {

		if err == gocql.ErrNotFound {
			return nil, billing.ErrClubSupporterReceiptNotFound
		}

		return nil, fmt.Errorf("failed to get club supporter receipt from account transaction history: %v", err)
	}

	return &receiptFile, nil
}

func (r BillingCassandraS3TemporalFileRepository) waitForClubSupportReceiptWorkflow(ctx context.Context, id, workflowId string) (*billing.ClubSupporterReceipt, error) {

	// wait for workflow to complete
	if err := r.client.GetWorkflow(ctx, workflowId, "").Get(ctx, nil); err != nil {
		return nil, err
	}

	receiptFile, err := r.getClubSupportReceipt(ctx, id)

	if err != nil {
		return nil, err
	}

	return r.unmarshalClubSupportReceipt(ctx, receiptFile)
}

func (r BillingCassandraS3TemporalFileRepository) updateClubSupporterReceiptWithNewFile(ctx context.Context, id, fileKeyPrefix, fileName string) error {

	receiptFile, err := r.getClubSupportReceipt(ctx, id)

	if err != nil {
		return err
	}

	uploader := s3manager.NewUploader(r.aws)

	fileKey := fileKeyPrefix + fileName

	// open the file
	file, err := os.Open(fileName)

	if err != nil {
		return err
	}

	// upload our new file
	_, err = uploader.Upload(&s3manager.UploadInput{
		Bucket: aws.String(os.Getenv("FILES_BUCKET")),
		Key:    aws.String(fileKey),
		Body:   file,
	})

	if err != nil {
		return err
	}

	// update db
	if err := r.session.
		Query(receiptFilesTable.Update("file_path")).
		WithContext(ctx).
		Consistency(gocql.LocalQuorum).
		BindStruct(&receiptFiles{
			Id:       receiptFile.Id,
			FilePath: fileKey,
		}).
		ExecRelease(); err != nil {
		return fmt.Errorf("failed to update club supporter receipt with new file: %v", err)
	}

	return nil
}

func (r BillingCassandraS3TemporalFileRepository) UpdateClubSupporterPaymentReceiptWithNewFile(ctx context.Context, builder *billing.ClubSupporterPaymentReceiptBuilder) error {
	return r.updateClubSupporterReceiptWithNewFile(ctx, builder.AccountTransaction().Id(), "/club-supporter-receipts/payments/", builder.FileName())
}

func (r BillingCassandraS3TemporalFileRepository) UpdateClubSupporterRefundReceiptWithNewFile(ctx context.Context, builder *billing.ClubSupporterRefundReceiptBuilder) error {
	return r.updateClubSupporterReceiptWithNewFile(ctx, builder.AccountTransaction().Id()+"-"+builder.Event().Id(), "/club-supporter-receipts/refunds/", builder.FileName())
}

func (r BillingCassandraS3TemporalFileRepository) GetOrCreateClubSupporterRefundReceiptFromAccountTransaction(ctx context.Context, requester *principal.Principal, history *billing.AccountTransaction, eventId string) (*billing.ClubSupporterReceipt, error) {

	id := history.Id() + "-" + eventId

	receiptFile, err := r.getClubSupportReceipt(ctx, id)

	if err != nil && err != billing.ErrClubSupporterReceiptNotFound {
		return nil, err
	}

	// receipt file doesn't exist, create it
	if receiptFile == nil {

		if err := billing.CanCreateClubSupporterRefundReceiptFromTransactionHistory(requester, history, eventId); err != nil {
			return nil, err
		}

		workflowId := "ClubSupporterRefundReceipt_" + id

		if err := r.session.
			Query(receiptFilesTable.Insert()).
			Consistency(gocql.LocalQuorum).
			WithContext(ctx).
			BindStruct(&receiptFiles{
				Id:                        id,
				AccountTransactionId:      history.Id(),
				AccountTransactionEventId: eventId,
				TemporalWorkflowId:        workflowId,
			}).
			ExecRelease(); err != nil {
			return nil, fmt.Errorf("failed to insert create club supporter receipt: %v", err)
		}

		options := client.StartWorkflowOptions{
			TaskQueue: viper.GetString("temporal.queue"),
			ID:        workflowId,
		}

		if _, err := r.client.ExecuteWorkflow(ctx, options, workflows.GenerateClubSupporterRefundReceiptFromAccountTransaction,
			workflows.GenerateClubSupporterRefundReceiptFromAccountTransactionInput{
				AccountTransactionId:      history.Id(),
				AccountTransactionEventId: eventId,
			},
		); err != nil {
			return nil, err
		}

		return r.waitForClubSupportReceiptWorkflow(ctx, id, workflowId)
	}

	// no file path, means a workflow was already started, so we wait for result
	if receiptFile.FilePath != "" {
		return r.waitForClubSupportReceiptWorkflow(ctx, id, receiptFile.TemporalWorkflowId)
	}

	return r.unmarshalClubSupportReceipt(ctx, receiptFile)
}

func (r BillingCassandraS3TemporalFileRepository) GetOrCreateClubSupporterPaymentReceiptFromAccountTransaction(ctx context.Context, requester *principal.Principal, history *billing.AccountTransaction) (*billing.ClubSupporterReceipt, error) {
	if err := billing.CanCreateClubSupporterPaymentReceiptFromTransactionHistory(requester, history); err != nil {
		return nil, err
	}

	receiptFile, err := r.getClubSupportReceipt(ctx, history.Id())

	if err != nil && err != billing.ErrClubSupporterReceiptNotFound {
		return nil, err
	}

	// receipt file doesn't exist, create it
	if receiptFile == nil {

		workflowId := "ClubSupporterPaymentReceipt_" + history.Id()

		if err := r.session.
			Query(receiptFilesTable.Insert()).
			WithContext(ctx).
			Consistency(gocql.LocalQuorum).
			BindStruct(&receiptFiles{
				Id:                   history.Id(),
				AccountTransactionId: history.Id(),
				TemporalWorkflowId:   workflowId,
			}).
			ExecRelease(); err != nil {
			return nil, fmt.Errorf("failed to insert create club supporter receipt: %v", err)
		}

		options := client.StartWorkflowOptions{
			TaskQueue: viper.GetString("temporal.queue"),
			ID:        workflowId,
		}

		if _, err := r.client.ExecuteWorkflow(ctx, options, workflows.GenerateClubSupporterPaymentReceiptFromAccountTransaction, workflows.GenerateClubSupporterPaymentReceiptFromAccountTransactionInput{AccountTransactionId: history.Id()}); err != nil {
			return nil, err
		}

		return r.waitForClubSupportReceiptWorkflow(ctx, history.Id(), workflowId)
	}

	// no file path, means a workflow was already started, so we wait for result
	if receiptFile.FilePath != "" {
		return r.waitForClubSupportReceiptWorkflow(ctx, history.Id(), receiptFile.TemporalWorkflowId)
	}

	return r.unmarshalClubSupportReceipt(ctx, receiptFile)
}
