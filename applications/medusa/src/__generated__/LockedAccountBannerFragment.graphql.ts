/**
 * @generated SignedSource<<28cd82f5b3f4e2a8f3007a9c49b9287a>>
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
      "args": null,
      "kind": "FragmentSpread",
      "name": "LockedAccountModalFragment"
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
          "name": "__typename",
          "storageKey": null
        }
      ],
      "storageKey": null
    }
  ],
  "type": "Account",
  "abstractKey": null
};

(node as any).hash = "3a9ad104398bc5c29b6282ac5ab5e79e";

export default node;
