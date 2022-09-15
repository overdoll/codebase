/**
 * @generated SignedSource<<259cd124f70f4bf533c77ad39cd4a5a2>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ContainerHomeFragment$data = {
  readonly " $fragmentSpreads": FragmentRefs<"PostsHomeFragment">;
  readonly " $fragmentType": "ContainerHomeFragment";
};
export type ContainerHomeFragment$key = {
  readonly " $data"?: ContainerHomeFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"ContainerHomeFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "ContainerHomeFragment",
  "selections": [
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "PostsHomeFragment"
    }
  ],
  "type": "Query",
  "abstractKey": null
};

(node as any).hash = "b647ddb346f4b68aeb164954e0c9eddd";

export default node;
