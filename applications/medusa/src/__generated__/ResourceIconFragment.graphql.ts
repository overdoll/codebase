/**
 * @generated SignedSource<<a5ba9600ee1fab6c6a154c00adc9653e>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ResourceIconFragment$data = {
  readonly preview: string;
  readonly " $fragmentSpreads": FragmentRefs<"ResourceIconMediaFragment">;
  readonly " $fragmentType": "ResourceIconFragment";
};
export type ResourceIconFragment$key = {
  readonly " $data"?: ResourceIconFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"ResourceIconFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "ResourceIconFragment",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "preview",
      "storageKey": null
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "ResourceIconMediaFragment"
    }
  ],
  "type": "Resource",
  "abstractKey": null
};

(node as any).hash = "d37dc1b32f025eb3871cebd85fc1537c";

export default node;
