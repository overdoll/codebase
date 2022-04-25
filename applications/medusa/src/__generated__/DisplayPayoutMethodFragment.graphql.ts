/**
 * @generated SignedSource<<5bf38b6e303a3bc063ae107baaf261b9>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type DisplayPayoutMethodFragment$data = {
  readonly payoutMethod: {
    readonly " $fragmentSpreads": FragmentRefs<"PayoutMethodFragment">;
  } | null;
  readonly " $fragmentType": "DisplayPayoutMethodFragment";
};
export type DisplayPayoutMethodFragment = DisplayPayoutMethodFragment$data;
export type DisplayPayoutMethodFragment$key = {
  readonly " $data"?: DisplayPayoutMethodFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"DisplayPayoutMethodFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "DisplayPayoutMethodFragment",
  "selections": [
    {
      "alias": null,
      "args": null,
      "concreteType": null,
      "kind": "LinkedField",
      "name": "payoutMethod",
      "plural": false,
      "selections": [
        {
          "args": null,
          "kind": "FragmentSpread",
          "name": "PayoutMethodFragment"
        }
      ],
      "storageKey": null
    }
  ],
  "type": "Account",
  "abstractKey": null
};

(node as any).hash = "fbf968351e9f9c86f810a050ae44601c";

export default node;
