/**
 * @generated SignedSource<<4d2cdc0dabfc01d59c0b672cd6250e38>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type StaffLockAccountFragment$data = {
  readonly lock: {
    readonly expires: any;
  } | null;
  readonly " $fragmentSpreads": FragmentRefs<"StaffLockAccountFormFragment" | "StaffUnlockAccountFormFragment">;
  readonly " $fragmentType": "StaffLockAccountFragment";
};
export type StaffLockAccountFragment = StaffLockAccountFragment$data;
export type StaffLockAccountFragment$key = {
  readonly " $data"?: StaffLockAccountFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"StaffLockAccountFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "StaffLockAccountFragment",
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
          "name": "expires",
          "storageKey": null
        }
      ],
      "storageKey": null
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "StaffLockAccountFormFragment"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "StaffUnlockAccountFormFragment"
    }
  ],
  "type": "Account",
  "abstractKey": null
};

(node as any).hash = "e7dfd137f4a257ae1755872e693ebb84";

export default node;
