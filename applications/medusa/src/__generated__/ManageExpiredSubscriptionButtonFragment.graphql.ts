/**
 * @generated SignedSource<<c38ca5014a7353f54810908b24140236>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ManageExpiredSubscriptionButtonFragment$data = {
  readonly club: {
    readonly slug: string;
  };
  readonly " $fragmentType": "ManageExpiredSubscriptionButtonFragment";
};
export type ManageExpiredSubscriptionButtonFragment = ManageExpiredSubscriptionButtonFragment$data;
export type ManageExpiredSubscriptionButtonFragment$key = {
  readonly " $data"?: ManageExpiredSubscriptionButtonFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"ManageExpiredSubscriptionButtonFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "ManageExpiredSubscriptionButtonFragment",
  "selections": [
    {
      "alias": null,
      "args": null,
      "concreteType": "Club",
      "kind": "LinkedField",
      "name": "club",
      "plural": false,
      "selections": [
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "slug",
          "storageKey": null
        }
      ],
      "storageKey": null
    }
  ],
  "type": "ExpiredAccountClubSupporterSubscription",
  "abstractKey": null
};

(node as any).hash = "2c1e40066fe293af0bc0af5585a74f9d";

export default node;
