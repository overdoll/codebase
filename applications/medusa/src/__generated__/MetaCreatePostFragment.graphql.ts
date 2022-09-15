/**
 * @generated SignedSource<<76fdacc20e701f1f47a50456fe5c0513>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type MetaCreatePostFragment$data = {
  readonly id: string;
  readonly " $fragmentSpreads": FragmentRefs<"ContainerCreatePostFragment">;
  readonly " $fragmentType": "MetaCreatePostFragment";
};
export type MetaCreatePostFragment$key = {
  readonly " $data"?: MetaCreatePostFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"MetaCreatePostFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "MetaCreatePostFragment",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "id",
      "storageKey": null
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "ContainerCreatePostFragment"
    }
  ],
  "type": "Post",
  "abstractKey": null
};

(node as any).hash = "bb3936cccc6c95b13dc53e55a7d2893e";

export default node;
