/**
 * @generated SignedSource<<9b2cb6fca15b390c33668b532a041488>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type AccountAuthorizerFragment$data = {
  readonly lock: {
    readonly __typename: string;
  } | null;
  readonly isModerator: boolean;
  readonly isStaff: boolean;
  readonly " $fragmentType": "AccountAuthorizerFragment";
};
export type AccountAuthorizerFragment = AccountAuthorizerFragment$data;
export type AccountAuthorizerFragment$key = {
  readonly " $data"?: AccountAuthorizerFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"AccountAuthorizerFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "AccountAuthorizerFragment",
  "selections": [
    {
      "alias": null,
      "args": null,
      "concreteType": "AccountLock",
      "kind": "LinkedField",
      "name": "lock",
      "plural": false,
      "selections": [
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "__typename",
          "storageKey": null
        }
      ],
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
    }
  ],
  "type": "Account",
  "abstractKey": null
};

(node as any).hash = "ca7c8a6fbbaee601868f43208836444a";

export default node;
