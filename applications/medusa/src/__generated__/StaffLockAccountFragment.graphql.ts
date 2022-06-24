/**
 * @generated SignedSource<<cde703f19632ac36e843de337487ebab>>
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

(node as any).hash = "6f4f66219124abf884650a8da09df628";

export default node;
