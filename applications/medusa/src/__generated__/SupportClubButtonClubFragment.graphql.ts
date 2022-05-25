/**
 * @generated SignedSource<<ac02e2ce4040f2b927fc06b9ebfc00ab>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
export type Currency = "AUD" | "CAD" | "EUR" | "GBP" | "JPY" | "USD" | "%future added value";
import { FragmentRefs } from "relay-runtime";
export type SupportClubButtonClubFragment$data = {
  readonly slug: string;
  readonly viewerMember: {
    readonly isSupporter: boolean;
    readonly clubSupporterSubscription: {
      readonly reference?: string;
    } | null;
  } | null;
  readonly canSupport: boolean;
  readonly viewerIsOwner: boolean;
  readonly supporterSubscriptionPrice: {
    readonly localizedPrice: {
      readonly amount: number;
      readonly currency: Currency;
    };
  };
  readonly " $fragmentSpreads": FragmentRefs<"SupportClubTransactionProcessFragment">;
  readonly " $fragmentType": "SupportClubButtonClubFragment";
};
export type SupportClubButtonClubFragment = SupportClubButtonClubFragment$data;
export type SupportClubButtonClubFragment$key = {
  readonly " $data"?: SupportClubButtonClubFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"SupportClubButtonClubFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "SupportClubButtonClubFragment",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "slug",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "concreteType": "ClubMember",
      "kind": "LinkedField",
      "name": "viewerMember",
      "plural": false,
      "selections": [
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "isSupporter",
          "storageKey": null
        },
        {
          "alias": null,
          "args": null,
          "concreteType": null,
          "kind": "LinkedField",
          "name": "clubSupporterSubscription",
          "plural": false,
          "selections": [
            {
              "kind": "InlineFragment",
              "selections": [
                {
                  "alias": null,
                  "args": null,
                  "kind": "ScalarField",
                  "name": "reference",
                  "storageKey": null
                }
              ],
              "type": "IAccountClubSupporterSubscription",
              "abstractKey": "__isIAccountClubSupporterSubscription"
            }
          ],
          "storageKey": null
        }
      ],
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "canSupport",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "viewerIsOwner",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "concreteType": "LocalizedPricingPoint",
      "kind": "LinkedField",
      "name": "supporterSubscriptionPrice",
      "plural": false,
      "selections": [
        {
          "alias": null,
          "args": null,
          "concreteType": "Price",
          "kind": "LinkedField",
          "name": "localizedPrice",
          "plural": false,
          "selections": [
            {
              "alias": null,
              "args": null,
              "kind": "ScalarField",
              "name": "amount",
              "storageKey": null
            },
            {
              "alias": null,
              "args": null,
              "kind": "ScalarField",
              "name": "currency",
              "storageKey": null
            }
          ],
          "storageKey": null
        }
      ],
      "storageKey": null
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "SupportClubTransactionProcessFragment"
    }
  ],
  "type": "Club",
  "abstractKey": null
};

(node as any).hash = "c6e8bc44869ff319c3e449a6c6bd9fa3";

export default node;
