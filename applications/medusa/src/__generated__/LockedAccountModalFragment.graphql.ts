/**
 * @generated SignedSource<<85128d7b5f719496d7dbd1a54959a6cf>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type LockedAccountModalFragment$data = {
  readonly lock: {
    readonly expires: any;
  };
  readonly " $fragmentSpreads": FragmentRefs<"UnlockAccountFormFragment">;
  readonly " $fragmentType": "LockedAccountModalFragment";
};
export type LockedAccountModalFragment = LockedAccountModalFragment$data;
export type LockedAccountModalFragment$key = {
  readonly " $data"?: LockedAccountModalFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"LockedAccountModalFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "LockedAccountModalFragment",
  "selections": [
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "UnlockAccountFormFragment"
    },
    {
      "kind": "RequiredField",
      "field": {
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
      "action": "THROW",
      "path": "lock"
    }
  ],
  "type": "Account",
  "abstractKey": null
};

(node as any).hash = "448cf4a386d927d06a8a2e5665f42090";

export default node;
