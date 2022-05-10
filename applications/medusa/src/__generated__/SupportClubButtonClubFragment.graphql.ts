/**
 * @generated SignedSource<<02a41787240f41247652a8485d26d6d2>>
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

(node as any).hash = "fdab818e1448c096877a8a48b3435cdf";

export default node;
