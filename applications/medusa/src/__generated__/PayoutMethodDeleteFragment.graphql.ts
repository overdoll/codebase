/**
 * @generated SignedSource<<78dee7dcbc4765d947ad1519ed4a91af>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type PayoutMethodDeleteFragment$data = {
  readonly id?: string;
  readonly " $fragmentSpreads": FragmentRefs<"PayoutMethodFragment">;
  readonly " $fragmentType": "PayoutMethodDeleteFragment";
};
export type PayoutMethodDeleteFragment = PayoutMethodDeleteFragment$data;
export type PayoutMethodDeleteFragment$key = {
  readonly " $data"?: PayoutMethodDeleteFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"PayoutMethodDeleteFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "PayoutMethodDeleteFragment",
  "selections": [
    {
      "kind": "InlineFragment",
      "selections": [
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "id",
          "storageKey": null
        }
      ],
      "type": "AccountPaxumPayoutMethod",
      "abstractKey": null
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "PayoutMethodFragment"
    }
  ],
  "type": "AccountPayoutMethod",
  "abstractKey": "__isAccountPayoutMethod"
};

(node as any).hash = "a258e6f2d0cda402dadb7c2e1451d6a3";

export default node;
