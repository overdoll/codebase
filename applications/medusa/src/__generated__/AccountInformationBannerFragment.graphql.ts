/**
 * @generated SignedSource<<69be8ee320588b1de13da00331bf9d05>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type AccountInformationBannerFragment$data = {
  readonly deleting: {
    readonly __typename: "AccountDeleting";
  } | null;
  readonly lock: {
    readonly __typename: "AccountLock";
  } | null;
  readonly " $fragmentSpreads": FragmentRefs<"DeletingAccountBannerFragment" | "LockedAccountBannerFragment">;
  readonly " $fragmentType": "AccountInformationBannerFragment";
};
export type AccountInformationBannerFragment$key = {
  readonly " $data"?: AccountInformationBannerFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"AccountInformationBannerFragment">;
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
  "name": "AccountInformationBannerFragment",
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
      "concreteType": "AccountDeleting",
      "kind": "LinkedField",
      "name": "deleting",
      "plural": false,
      "selections": (v0/*: any*/),
      "storageKey": null
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "LockedAccountBannerFragment"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "DeletingAccountBannerFragment"
    }
  ],
  "type": "Account",
  "abstractKey": null
};
})();

(node as any).hash = "5a9491f6dfa0d57185d915f6e08d0c8a";

export default node;
