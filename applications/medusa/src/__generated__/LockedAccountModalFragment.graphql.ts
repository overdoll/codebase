/**
 * @generated SignedSource<<464ce6ce34441486049cd65b55cb6ec4>>
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
  } | null;
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
    }
  ],
  "type": "Account",
  "abstractKey": null
};

(node as any).hash = "8139d92350ad572a882dd19c7c557183";

export default node;
