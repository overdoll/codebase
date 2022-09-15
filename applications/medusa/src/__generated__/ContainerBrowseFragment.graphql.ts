/**
 * @generated SignedSource<<a2b1d57d024801ea21055f0fcdf5c97d>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ContainerBrowseFragment$data = {
  readonly " $fragmentSpreads": FragmentRefs<"ScrollBrowseFragment">;
  readonly " $fragmentType": "ContainerBrowseFragment";
};
export type ContainerBrowseFragment$key = {
  readonly " $data"?: ContainerBrowseFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"ContainerBrowseFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "ContainerBrowseFragment",
  "selections": [
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "ScrollBrowseFragment"
    }
  ],
  "type": "Query",
  "abstractKey": null
};

(node as any).hash = "b1b3561861f4ddad25994ff6b29556c6";

export default node;
