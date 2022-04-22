/**
 * @generated SignedSource<<faa4a755b7188d7e8927847d513beed6>>
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

(node as any).hash = "4d5e588a2b0a4f17f88bc65c1b5e40b0";

export default node;
