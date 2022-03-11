/**
 * @generated SignedSource<<b1fb64ff8a1c9c5e3b77e6628a880aad>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type AccountTransactionHistoryCardFragment$data = {
  readonly __typename: "AccountCancelledTransactionHistory";
  readonly " $fragmentSpreads": FragmentRefs<"AccountCancelledTransactionHistoryCardFragment">;
  readonly " $fragmentType": "AccountTransactionHistoryCardFragment";
} | {
  readonly __typename: "AccountChargebackTransactionHistory";
  readonly " $fragmentSpreads": FragmentRefs<"AccountChargebackTransactionHistoryCardFragment">;
  readonly " $fragmentType": "AccountTransactionHistoryCardFragment";
} | {
  readonly __typename: "AccountExpiredTransactionHistory";
  readonly " $fragmentSpreads": FragmentRefs<"AccountExpiredTransactionHistoryCardFragment">;
  readonly " $fragmentType": "AccountTransactionHistoryCardFragment";
} | {
  readonly __typename: "AccountFailedTransactionHistory";
  readonly " $fragmentSpreads": FragmentRefs<"AccountFailedTransactionHistoryCardFragment">;
  readonly " $fragmentType": "AccountTransactionHistoryCardFragment";
} | {
  readonly __typename: "AccountInvoiceTransactionHistory";
  readonly " $fragmentSpreads": FragmentRefs<"AccountInvoiceTransactionHistoryCardFragment">;
  readonly " $fragmentType": "AccountTransactionHistoryCardFragment";
} | {
  readonly __typename: "AccountNewTransactionHistory";
  readonly " $fragmentSpreads": FragmentRefs<"AccountNewTransactionHistoryCardFragment">;
  readonly " $fragmentType": "AccountTransactionHistoryCardFragment";
} | {
  readonly __typename: "AccountReactivatedTransactionHistory";
  readonly " $fragmentSpreads": FragmentRefs<"AccountReactivatedTransactionHistoryCardFragment">;
  readonly " $fragmentType": "AccountTransactionHistoryCardFragment";
} | {
  readonly __typename: "AccountRefundTransactionHistory";
  readonly " $fragmentSpreads": FragmentRefs<"AccountRefundTransactionHistoryCardFragment">;
  readonly " $fragmentType": "AccountTransactionHistoryCardFragment";
} | {
  readonly __typename: "AccountVoidTransactionHistory";
  readonly " $fragmentSpreads": FragmentRefs<"AccountVoidTransactionHistoryCardFragment">;
  readonly " $fragmentType": "AccountTransactionHistoryCardFragment";
} | {
  // This will never be '%other', but we need some
  // value in case none of the concrete values match.
  readonly __typename: "%other";
  readonly " $fragmentType": "AccountTransactionHistoryCardFragment";
};
export type AccountTransactionHistoryCardFragment = AccountTransactionHistoryCardFragment$data;
export type AccountTransactionHistoryCardFragment$key = {
  readonly " $data"?: AccountTransactionHistoryCardFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"AccountTransactionHistoryCardFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "AccountTransactionHistoryCardFragment",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "__typename",
      "storageKey": null
    },
    {
      "kind": "InlineFragment",
      "selections": [
        {
          "args": null,
          "kind": "FragmentSpread",
          "name": "AccountCancelledTransactionHistoryCardFragment"
        }
      ],
      "type": "AccountCancelledTransactionHistory",
      "abstractKey": null
    },
    {
      "kind": "InlineFragment",
      "selections": [
        {
          "args": null,
          "kind": "FragmentSpread",
          "name": "AccountChargebackTransactionHistoryCardFragment"
        }
      ],
      "type": "AccountChargebackTransactionHistory",
      "abstractKey": null
    },
    {
      "kind": "InlineFragment",
      "selections": [
        {
          "args": null,
          "kind": "FragmentSpread",
          "name": "AccountExpiredTransactionHistoryCardFragment"
        }
      ],
      "type": "AccountExpiredTransactionHistory",
      "abstractKey": null
    },
    {
      "kind": "InlineFragment",
      "selections": [
        {
          "args": null,
          "kind": "FragmentSpread",
          "name": "AccountFailedTransactionHistoryCardFragment"
        }
      ],
      "type": "AccountFailedTransactionHistory",
      "abstractKey": null
    },
    {
      "kind": "InlineFragment",
      "selections": [
        {
          "args": null,
          "kind": "FragmentSpread",
          "name": "AccountInvoiceTransactionHistoryCardFragment"
        }
      ],
      "type": "AccountInvoiceTransactionHistory",
      "abstractKey": null
    },
    {
      "kind": "InlineFragment",
      "selections": [
        {
          "args": null,
          "kind": "FragmentSpread",
          "name": "AccountNewTransactionHistoryCardFragment"
        }
      ],
      "type": "AccountNewTransactionHistory",
      "abstractKey": null
    },
    {
      "kind": "InlineFragment",
      "selections": [
        {
          "args": null,
          "kind": "FragmentSpread",
          "name": "AccountReactivatedTransactionHistoryCardFragment"
        }
      ],
      "type": "AccountReactivatedTransactionHistory",
      "abstractKey": null
    },
    {
      "kind": "InlineFragment",
      "selections": [
        {
          "args": null,
          "kind": "FragmentSpread",
          "name": "AccountRefundTransactionHistoryCardFragment"
        }
      ],
      "type": "AccountRefundTransactionHistory",
      "abstractKey": null
    },
    {
      "kind": "InlineFragment",
      "selections": [
        {
          "args": null,
          "kind": "FragmentSpread",
          "name": "AccountVoidTransactionHistoryCardFragment"
        }
      ],
      "type": "AccountVoidTransactionHistory",
      "abstractKey": null
    }
  ],
  "type": "AccountTransactionHistory",
  "abstractKey": "__isAccountTransactionHistory"
};

(node as any).hash = "3c19ceeb0cb5c539f28ff23b6c90e646";

export default node;
