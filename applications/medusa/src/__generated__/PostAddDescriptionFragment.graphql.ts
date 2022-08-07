/**
 * @generated SignedSource<<8ee2aeb0027cad5fe286d8173eb54ec7>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type PostAddDescriptionFragment$data = {
  readonly description: string;
  readonly " $fragmentSpreads": FragmentRefs<"PostDescriptionModalFragment">;
  readonly " $fragmentType": "PostAddDescriptionFragment";
};
export type PostAddDescriptionFragment$key = {
  readonly " $data"?: PostAddDescriptionFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"PostAddDescriptionFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "PostAddDescriptionFragment",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "description",
      "storageKey": null
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "PostDescriptionModalFragment"
    }
  ],
  "type": "Post",
  "abstractKey": null
};

(node as any).hash = "4977e6e357d66b59085de938f13da148";

export default node;
