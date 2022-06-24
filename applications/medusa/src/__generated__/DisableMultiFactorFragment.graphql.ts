/**
 * @generated SignedSource<<c3ca81312089e5afcaa4823ca0bab6e1>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type DisableMultiFactorFragment$data = {
  readonly canDisableMultiFactor: boolean;
  readonly " $fragmentType": "DisableMultiFactorFragment";
};
export type DisableMultiFactorFragment$key = {
  readonly " $data"?: DisableMultiFactorFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"DisableMultiFactorFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "DisableMultiFactorFragment",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "canDisableMultiFactor",
      "storageKey": null
    }
  ],
  "type": "Account",
  "abstractKey": null
};

(node as any).hash = "1be25ed3f5abc735c8b6b12b21aa719c";

export default node;
