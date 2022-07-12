/**
 * @generated SignedSource<<6c9492c170268a4bc42c1c6fa34c1bab>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type SupportClubModalFragment$data = {
  readonly canSupport: boolean;
  readonly viewerMember: {
    readonly clubSupporterSubscription: {
      readonly reference?: string;
    } | null;
    readonly isSupporter: boolean;
  } | null;
  readonly " $fragmentSpreads": FragmentRefs<"SupportClubPriceButtonFragment" | "SupportClubTransactionProcessFragment">;
  readonly " $fragmentType": "SupportClubModalFragment";
};
export type SupportClubModalFragment$key = {
  readonly " $data"?: SupportClubModalFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"SupportClubModalFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "SupportClubModalFragment",
  "selections": [
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
      "args": null,
      "kind": "FragmentSpread",
      "name": "SupportClubTransactionProcessFragment"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "SupportClubPriceButtonFragment"
    }
  ],
  "type": "Club",
  "abstractKey": null
};

(node as any).hash = "d4bac43dff2d5f85b90610e4bed4c25a";

export default node;
