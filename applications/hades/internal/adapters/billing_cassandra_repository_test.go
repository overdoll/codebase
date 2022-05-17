package adapters_test

import (
	"context"
	"github.com/stretchr/testify/assert"
	"overdoll/applications/hades/internal/adapters"
	"overdoll/applications/hades/internal/domain/billing"
	"overdoll/libraries/bootstrap"
	"overdoll/libraries/uuid"
	"sync"
	"testing"
	"time"
)

// A parallel execution that will run 20 instances of trying to create multiple subscriptions for the same club. We should expect that
// only 1 subscription is created, and the rest are marked as "duplicate"
func TestBillingRepository_CreateCCBillSubscription_parallel(t *testing.T) {
	t.Parallel()

	workersCount := 20
	workersDone := sync.WaitGroup{}
	workersDone.Add(workersCount)

	repo := newBillingRepository(t)

	// closing startWorkers will unblock all workers at once,
	// thanks to that it will be more likely to have race condition
	startWorkers := make(chan struct{})
	// if a subscription was a duplicate error, number of the worker is sent to this channel
	duplicateSubscriptions := make(chan int, workersCount)

	ctx := context.Background()
	accountId := uuid.New().String()
	clubId := uuid.New().String()

	card := billing.UnmarshalCardFromDatabase("1111", "VISA", "4213", "04/2023")
	contact := billing.UnmarshalContactFromDatabase("", "", "", "")
	address := billing.UnmarshalAddressFromDatabase("", "", "", "", "")

	paymentMethod := billing.UnmarshalPaymentMethodFromDatabase(
		card,
		contact,
		address,
	)

	// we are trying to do race condition, in practice only one worker should be able to finish transaction
	for worker := 0; worker < workersCount; worker++ {
		workerNum := worker

		go func() {
			defer workersDone.Done()
			<-startWorkers

			subscription := billing.UnmarshalCCBillSubscriptionDetailsFromDatabase(
				accountId,
				clubId,
				uuid.New().String(),
				paymentMethod,
				time.Now(),
				0,
				0,
				"USD",
				0,
				0,
				"USD",
				0,
				0,
				"USD",
				uuid.New().String(),
				false,
			)

			var err error

			// keep running this infinite amount of times (LWT not applied)
			for {
				err = repo.CreateCCBillSubscriptionDetailsOperator(ctx, subscription)
				if err == nil || (err != nil && err == billing.ErrAccountClubSupportSubscriptionDuplicate) {
					break
				}
			}

			if err == billing.ErrAccountClubSupportSubscriptionDuplicate {
				// only do this when a duplicate subscription was created
				duplicateSubscriptions <- workerNum
			}
		}()
	}

	close(startWorkers)

	// we are waiting, when all workers did the job
	workersDone.Wait()
	close(duplicateSubscriptions)

	var workersDuplicatedSubscriptions []int

	for workerNum := range duplicateSubscriptions {
		workersDuplicatedSubscriptions = append(workersDuplicatedSubscriptions, workerNum)
	}

	assert.Len(t, workersDuplicatedSubscriptions, 19, "all subscriptions should have been duplicate except one")
}

func newBillingRepository(t *testing.T) adapters.BillingCassandraElasticsearchRepository {
	return adapters.NewBillingCassandraRepository(bootstrap.InitializeDatabaseSession(), bootstrap.InitializeElasticSearchSession())
}
