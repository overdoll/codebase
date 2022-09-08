// Code generated by github.com/99designs/gqlgen, DO NOT EDIT.

package types

import (
	"fmt"
	"io"
	graphql1 "overdoll/libraries/graphql"
	"overdoll/libraries/graphql/relay"
	"strconv"
	"time"
)

type Account struct {
	// Post Audit Logs linked to this account
	//
	// Viewable by either the currently logged-in account or staff+
	PostAuditLogs *PostAuditLogConnection `json:"postAuditLogs"`
	// Moderator settings and status for this account
	//
	// Viewable by the currently authenticated account or staff+
	ModeratorSettings *ModeratorSettings `json:"moderatorSettings"`
	// Posts queue specific to this account (when moderator)
	PostModeratorQueue *PostModeratorConnection `json:"postModeratorQueue"`
	ID                 relay.ID                 `json:"id"`
}

func (Account) IsEntity() {}

// Add moderator to posts queue.
type AddModeratorToPostQueueInput struct {
	// The moderator account to take the action on
	AccountID relay.ID `json:"accountId"`
}

// Remove moderator from posts queue.
type AddModeratorToPostQueuePayload struct {
	// The account that was updated
	Account *Account `json:"account"`
}

// Approve the pending post input
type ApprovePostInput struct {
	// Pending post to take action against
	PostID relay.ID `json:"postId"`
}

// Approve the pending post payload
type ApprovePostPayload struct {
	// The resulting post
	Post *Post `json:"post"`
}

type Club struct {
	// Infraction history for this club
	//
	// Viewable by the currently authenticated account or staff+
	InfractionHistory *ClubInfractionHistoryConnection `json:"infractionHistory"`
	ID                relay.ID                         `json:"id"`
}

func (Club) IsEntity() {}

// Infraction history belonging to a club
type ClubInfractionHistory struct {
	// ID of the infraction history
	ID relay.ID `json:"id"`
	// The club belonging to this history object.
	Club *Club `json:"club"`
	// The account that issued this infraction.
	IssuerAccount *Account `json:"issuerAccount"`
	// The rule cited for this infraction.
	Rule *Rule `json:"rule"`
	// The source for this infraction.
	Source ClubInfractionHistorySource `json:"source"`
	// When this infraction was issued.
	IssuedAt time.Time `json:"issuedAt"`
	// When this infraction expires (no longer considered when issuing future infractions).
	ExpiresAt time.Time `json:"expiresAt"`
}

func (ClubInfractionHistory) IsNode()   {}
func (ClubInfractionHistory) IsEntity() {}

// Connection of the infraction history
type ClubInfractionHistoryConnection struct {
	Edges    []*ClubInfractionHistoryEdge `json:"edges"`
	PageInfo *relay.PageInfo              `json:"pageInfo"`
}

// Edge of the infraction history
type ClubInfractionHistoryEdge struct {
	Node   *ClubInfractionHistory `json:"node"`
	Cursor string                 `json:"cursor"`
}

// Create a new rule input.
type CreateRuleInput struct {
	// The title.
	//
	// Validation: Max 25 characters.
	Title string `json:"title"`
	// The description.
	//
	// Validation: Max 25 characters. Markdown allowed.
	Description string `json:"description"`
	// If breaking this rule would cause an infraction.
	Infraction bool `json:"infraction"`
}

// Updated rule.
type CreateRulePayload struct {
	// The updated rule.
	Rule *Rule `json:"rule"`
}

// Issue a club infraction.
type IssueClubInfractionInput struct {
	// The club to issue the infraction to.
	ClubID relay.ID `json:"clubId"`
	// The rule to cite.
	RuleID relay.ID `json:"ruleId"`
	// Pass a custom end time. If none is passed, will use sliding scale based on previous infractions.
	CustomEndTime *time.Time `json:"customEndTime"`
}

// Issue a new club infraction payload.
type IssueClubInfractionPayload struct {
	// The new club infraction history item.
	ClubInfractionHistory *ClubInfractionHistory `json:"clubInfractionHistory"`
}

// General moderator settings.
type ModeratorSettings struct {
	// If this moderator is in queue.
	IsInModeratorQueue bool `json:"isInModeratorQueue"`
	// The last time this moderator was selected for a post. Null if moderator not in queue
	LastSelected *time.Time `json:"lastSelected"`
}

type Post struct {
	// Audit logs belonging to this pending post
	AuditLogs *PostAuditLogConnection `json:"auditLogs"`
	// If this post was removed or rejected from the moderator queue, you can view the rule that was cited.
	Rule *Rule `json:"rule"`
	// Whether or not the post was reported by the viewer.
	ViewerReport *PostReport `json:"viewerReport"`
	// Reports belonging to a post
	Reports *PostReportConnection `json:"reports"`
	ID      relay.ID              `json:"id"`
}

func (Post) IsEntity() {}

// Post audit log
//
// Audit log is created when a moderator takes an action against a pending post
type PostAuditLog struct {
	// ID of the audit log
	ID relay.ID `json:"id"`
	// The moderator that this log belongs to
	Moderator *Account `json:"moderator"`
	// The status or the action that was taken against the pending post
	Action PostAuditLogAction `json:"action"`
	// If a post was removed or rejected, this is the rule that was cited.
	Rule *Rule `json:"rule"`
	// Additional notes by the moderator
	Notes *string `json:"notes"`
	// The post linked to this audit log
	Post *Post `json:"post"`
}

func (PostAuditLog) IsNode()   {}
func (PostAuditLog) IsEntity() {}

// Connection of the audit log
type PostAuditLogConnection struct {
	Edges    []*PostAuditLogEdge `json:"edges"`
	PageInfo *relay.PageInfo     `json:"pageInfo"`
}

// Edge of the audit log
type PostAuditLogEdge struct {
	Node   *PostAuditLog `json:"node"`
	Cursor string        `json:"cursor"`
}

type PostModerator struct {
	// The ID to identify this post moderator item.
	ID relay.ID `json:"id"`
	// The post linked to this post moderator.
	Post *Post `json:"post"`
	// The moderator..
	Moderator *Account `json:"moderator"`
	// When this post queue item was initially placed in the queue.
	PlacedAt time.Time `json:"placedAt"`
	// When this post queue item will be reassigned.
	ReassignmentAt time.Time `json:"reassignmentAt"`
}

type PostModeratorConnection struct {
	Edges    []*PostModeratorEdge `json:"edges"`
	PageInfo *relay.PageInfo      `json:"pageInfo"`
}

type PostModeratorEdge struct {
	Cursor string         `json:"cursor"`
	Node   *PostModerator `json:"node"`
}

// Post report
type PostReport struct {
	// ID of the report
	ID relay.ID `json:"id"`
	// The account that initiated this report
	Account *Account `json:"account"`
	// The rule that was cited for this report.
	Rule *Rule `json:"rule"`
	// The post linked to this report.
	Post *Post `json:"post"`
}

func (PostReport) IsNode()   {}
func (PostReport) IsEntity() {}

// Connection of the post report
type PostReportConnection struct {
	Edges    []*PostReportEdge `json:"edges"`
	PageInfo *relay.PageInfo   `json:"pageInfo"`
}

// Edge of the post report
type PostReportEdge struct {
	Node   *PostReport `json:"node"`
	Cursor string      `json:"cursor"`
}

// Moderate the pending post input
type RejectPostInput struct {
	// Pending post to take action against
	PostID relay.ID `json:"postId"`
	// Required to enter a rule ID.
	RuleID relay.ID `json:"ruleId"`
	// Any extra notes for the moderator
	Notes *string `json:"notes"`
}

// Reject the pending post payload
type RejectPostPayload struct {
	// The resulting post
	Post *Post `json:"post"`
}

// Remove a club infraction.
type RemoveClubInfractionHistoryInput struct {
	// The history item to remove.
	ClubInfractionHistoryID relay.ID `json:"clubInfractionHistoryId"`
}

// Remove club infraction history.
type RemoveClubInfractionHistoryPayload struct {
	// The removed infraction history UploadId.
	ClubInfractionHistoryID relay.ID `json:"clubInfractionHistoryId"`
}

// Remove moderator from posts queue.
type RemoveModeratorFromPostQueueInput struct {
	// The moderator account to take the action on
	AccountID relay.ID `json:"accountId"`
}

// Remove moderator from posts queue.
type RemoveModeratorFromPostQueuePayload struct {
	// The account that was updated
	Account *Account `json:"account"`
}

// Moderate the pending post input
type RemovePostInput struct {
	// Pending post to take action against
	PostID relay.ID `json:"postId"`
	// Required to enter a rule ID.
	RuleID relay.ID `json:"ruleId"`
	// Any extra notes for the staff member
	Notes *string `json:"notes"`
}

// Remove the pending post payload
type RemovePostPayload struct {
	// The resulting post
	Post *Post `json:"post"`
}

// Report the post input
type ReportPostInput struct {
	// The post to report
	PostID relay.ID `json:"postId"`
	// The rule to report this post for.
	RuleID relay.ID `json:"ruleId"`
}

// Report the post payload
type ReportPostPayload struct {
	// The post report that was generated
	PostReport *PostReport `json:"postReport"`
}

// Rule.
type Rule struct {
	// ID of the rule.
	ID relay.ID `json:"id"`
	// Reference of the rule. Should be used for single lookups.
	Reference string `json:"reference"`
	// The title for this rule.
	//
	// Optionally pass a locale to display it in a specific language. English by default.
	Title string `json:"title"`
	// All translations for this title.
	TitleTranslations []*graphql1.Translation `json:"titleTranslations"`
	// The description for this rule.
	//
	// Optionally pass a locale to display it in a specific language. English by default.
	Description string `json:"description"`
	// All translations for this description.
	DescriptionTranslations []*graphql1.Translation `json:"descriptionTranslations"`
	// If this rule is deprecated.
	Deprecated bool `json:"deprecated"`
	// If breaking this rule would cause an infraction - used for when posts are rejected or removed and this rule is applied.
	Infraction bool `json:"infraction"`
}

func (Rule) IsNode()   {}
func (Rule) IsEntity() {}

// Connection of the rule
type RuleConnection struct {
	Edges    []*RuleEdge     `json:"edges"`
	PageInfo *relay.PageInfo `json:"pageInfo"`
}

// Edge of the rule
type RuleEdge struct {
	Node   *Rule  `json:"node"`
	Cursor string `json:"cursor"`
}

// Update post report reason.
type UpdateRuleDeprecatedInput struct {
	// The rule to update.
	RuleID relay.ID `json:"ruleId"`
	// The deprecated status.
	Deprecated bool `json:"deprecated"`
}

// Updated rule.
type UpdateRuleDeprecatedPayload struct {
	// The updated rule.
	Rule *Rule `json:"rule"`
}

// Update rule.
type UpdateRuleDescriptionInput struct {
	// The rule to update.
	RuleID relay.ID `json:"ruleId"`
	// The description to update.
	//
	// Validation: Max 25 characters. Markdown allowed.
	Description string `json:"description"`
	// The localization for this description.
	Locale string `json:"locale"`
}

// Updated rule.
type UpdateRuleDescriptionPayload struct {
	// The updated rule.
	Rule *Rule `json:"rule"`
}

// Update post report reason.
type UpdateRuleInfractionInput struct {
	// The rule to update.
	RuleID relay.ID `json:"ruleId"`
	// The infraction status.
	Infraction bool `json:"infraction"`
}

// Updated rule.
type UpdateRuleInfractionPayload struct {
	// The updated rule.
	Rule *Rule `json:"rule"`
}

// Update rule.
type UpdateRuleTitleInput struct {
	// The rule to update.
	RuleID relay.ID `json:"ruleId"`
	// The title to update.
	//
	// Validation: Max 25 characters.
	Title string `json:"title"`
	// The localization for this title.
	Locale string `json:"locale"`
}

// Updated rule.
type UpdateRuleTitlePayload struct {
	// The updated rule.
	Rule *Rule `json:"rule"`
}

type ClubInfractionHistorySource string

const (
	ClubInfractionHistorySourceManual                  ClubInfractionHistorySource = "MANUAL"
	ClubInfractionHistorySourcePostModerationRejection ClubInfractionHistorySource = "POST_MODERATION_REJECTION"
	ClubInfractionHistorySourcePostManualRemoval       ClubInfractionHistorySource = "POST_MANUAL_REMOVAL"
)

var AllClubInfractionHistorySource = []ClubInfractionHistorySource{
	ClubInfractionHistorySourceManual,
	ClubInfractionHistorySourcePostModerationRejection,
	ClubInfractionHistorySourcePostManualRemoval,
}

func (e ClubInfractionHistorySource) IsValid() bool {
	switch e {
	case ClubInfractionHistorySourceManual, ClubInfractionHistorySourcePostModerationRejection, ClubInfractionHistorySourcePostManualRemoval:
		return true
	}
	return false
}

func (e ClubInfractionHistorySource) String() string {
	return string(e)
}

func (e *ClubInfractionHistorySource) UnmarshalGQL(v interface{}) error {
	str, ok := v.(string)
	if !ok {
		return fmt.Errorf("enums must be strings")
	}

	*e = ClubInfractionHistorySource(str)
	if !e.IsValid() {
		return fmt.Errorf("%s is not a valid ClubInfractionHistorySource", str)
	}
	return nil
}

func (e ClubInfractionHistorySource) MarshalGQL(w io.Writer) {
	fmt.Fprint(w, strconv.Quote(e.String()))
}

type PostAuditLogAction string

const (
	PostAuditLogActionApproved PostAuditLogAction = "APPROVED"
	PostAuditLogActionDenied   PostAuditLogAction = "DENIED"
	PostAuditLogActionRemoved  PostAuditLogAction = "REMOVED"
)

var AllPostAuditLogAction = []PostAuditLogAction{
	PostAuditLogActionApproved,
	PostAuditLogActionDenied,
	PostAuditLogActionRemoved,
}

func (e PostAuditLogAction) IsValid() bool {
	switch e {
	case PostAuditLogActionApproved, PostAuditLogActionDenied, PostAuditLogActionRemoved:
		return true
	}
	return false
}

func (e PostAuditLogAction) String() string {
	return string(e)
}

func (e *PostAuditLogAction) UnmarshalGQL(v interface{}) error {
	str, ok := v.(string)
	if !ok {
		return fmt.Errorf("enums must be strings")
	}

	*e = PostAuditLogAction(str)
	if !e.IsValid() {
		return fmt.Errorf("%s is not a valid PostAuditLogAction", str)
	}
	return nil
}

func (e PostAuditLogAction) MarshalGQL(w io.Writer) {
	fmt.Fprint(w, strconv.Quote(e.String()))
}
