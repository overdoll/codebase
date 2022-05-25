/**
 * @generated SignedSource<<af6e4a32f62332472a48ab5d7c657b6f>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ClubPayoutMethodAlertFragment$data = {
  readonly owner: {
    readonly lock: {
      readonly __typename: string;
    } | null;
    readonly payoutMethod: {
      readonly __typename: string;
    } | null;
  };
  readonly " $fragmentType": "ClubPayoutMethodAlertFragment";
};
export type ClubPayoutMethodAlertFragment = ClubPayoutMethodAlertFragment$data;
export type ClubPayoutMethodAlertFragment$key = {
  readonly " $data"?: ClubPayoutMethodAlertFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"ClubPayoutMethodAlertFragment">;
};

const node: ReaderFragment = (function(){
var v0 = [
  {
    "alias": null,
    "args": null,
    "kind": "ScalarField",
    "name": "__typename",
    "storageKey": null
  }
];
return {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "ClubPayoutMethodAlertFragment",
  "selections": [
    {
      "alias": null,
      "args": null,
      "concreteType": "Account",
      "kind": "LinkedField",
      "name": "owner",
      "plural": false,
      "selections": [
        {
          "alias": null,
          "args": null,
          "concreteType": "AccountLock",
          "kind": "LinkedField",
          "name": "lock",
          "plural": false,
          "selections": (v0/*: any*/),
          "storageKey": null
        },
        {
          "alias": null,
          "args": null,
          "concreteType": null,
          "kind": "LinkedField",
          "name": "payoutMethod",
          "plural": false,
          "selections": (v0/*: any*/),
          "storageKey": null
        }
      ],
      "storageKey": null
    }
  ],
  "type": "Club",
  "abstractKey": null
};
})();

(node as any).hash = "36a6febc22480e0dcb3aa826f4dcf27e";

export default node;
