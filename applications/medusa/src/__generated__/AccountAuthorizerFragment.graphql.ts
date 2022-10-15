/**
 * @generated SignedSource<<19c0abd54a75aeee9dfbc2467a1c0fdb>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type AccountAuthorizerFragment$data = {
  readonly deleting: {
    readonly __typename: "AccountDeleting";
  } | null;
  readonly hasClubSupporterSubscription: boolean;
  readonly isArtist: boolean;
  readonly isModerator: boolean;
  readonly isStaff: boolean;
  readonly isWorker: boolean;
  readonly lock: {
    readonly __typename: "AccountLock";
  } | null;
  readonly reference: string;
  readonly username: string;
  readonly " $fragmentType": "AccountAuthorizerFragment";
};
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
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "isWorker",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "hasClubSupporterSubscription",
      "storageKey": null
    }
  ],
  "type": "Account",
  "abstractKey": null
};
})();

(node as any).hash = "5628aa312b3faf8af2f5a097cac23ec9";

export default node;
