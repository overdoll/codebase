/**
 * @generated SignedSource<<d7b9347c710067e34fa648f002636903>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type LockedAccountBannerFragment$data = {
  readonly lock: {
    readonly __typename: string;
  } | null;
  readonly " $fragmentSpreads": FragmentRefs<"LockedAccountModalFragment">;
  readonly " $fragmentType": "LockedAccountBannerFragment";
};
export type LockedAccountBannerFragment = LockedAccountBannerFragment$data;
export type LockedAccountBannerFragment$key = {
  readonly " $data"?: LockedAccountBannerFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"LockedAccountBannerFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "LockedAccountBannerFragment",
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
      "args": null,
      "kind": "FragmentSpread",
      "name": "LockedAccountModalFragment"
    }
  ],
  "type": "Account",
  "abstractKey": null
};

(node as any).hash = "8d8c401cccef1b27b2224477f620e7fe";

export default node;
