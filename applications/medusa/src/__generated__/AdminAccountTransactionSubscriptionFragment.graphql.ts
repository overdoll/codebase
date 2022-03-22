/**
 * @generated SignedSource<<d650b92e623ffb932ecdeb2871b5985a>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type AdminAccountTransactionSubscriptionFragment$data = {
  readonly clubSupporterSubscription: {
    readonly reference?: string;
    readonly " $fragmentSpreads": FragmentRefs<"AdminClubSupporterSubscriptionPreviewFragment">;
  };
  readonly " $fragmentType": "AdminAccountTransactionSubscriptionFragment";
};
export type AdminAccountTransactionSubscriptionFragment = AdminAccountTransactionSubscriptionFragment$data;
export type AdminAccountTransactionSubscriptionFragment$key = {
  readonly " $data"?: AdminAccountTransactionSubscriptionFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"AdminAccountTransactionSubscriptionFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "AdminAccountTransactionSubscriptionFragment",
  "selections": [
    {
      "kind": "RequiredField",
      "field": {
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
          },
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "AdminClubSupporterSubscriptionPreviewFragment"
          }
        ],
        "storageKey": null
      },
      "action": "THROW",
      "path": "clubSupporterSubscription"
    }
  ],
  "type": "AccountTransaction",
  "abstractKey": null
};

(node as any).hash = "c3d470c69fcd188891035e12d08911f2";

export default node;
