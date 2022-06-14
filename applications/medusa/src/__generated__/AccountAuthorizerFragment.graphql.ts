/**
 * @generated SignedSource<<99b34fb9813e27cbbf41dc8b9400aa3c>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type AccountAuthorizerFragment$data = {
  readonly reference: string;
  readonly username: string;
  readonly lock: {
    readonly __typename: string;
  } | null;
  readonly deleting: {
    readonly __typename: string;
  } | null;
  readonly isModerator: boolean;
  readonly isStaff: boolean;
  readonly isArtist: boolean;
  readonly " $fragmentType": "AccountAuthorizerFragment";
};
export type AccountAuthorizerFragment = AccountAuthorizerFragment$data;
export type AccountAuthorizerFragment$key = {
  readonly " $data"?: AccountAuthorizerFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"AccountAuthorizerFragment">;
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
  "name": "AccountAuthorizerFragment",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "reference",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "username",
      "storageKey": null
    },
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
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "isModerator",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "isStaff",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "isArtist",
      "storageKey": null
    }
  ],
  "type": "Account",
  "abstractKey": null
};
})();

(node as any).hash = "6439c6e84a42b7c5993480319fe23afd";

export default node;
