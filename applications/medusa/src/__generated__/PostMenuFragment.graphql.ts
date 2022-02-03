/**
 * @generated SignedSource<<c245a3da4c058bbc6afffb29b0bfe95d>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type PostMenuFragment$data = {
  readonly id: string;
  readonly " $fragmentType": "PostMenuFragment";
};
export type PostMenuFragment = PostMenuFragment$data;
export type PostMenuFragment$key = {
  readonly " $data"?: PostMenuFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"PostMenuFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "PostMenuFragment",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "id",
      "storageKey": null
    }
  ],
  "type": "Post",
  "abstractKey": null
};

(node as any).hash = "f1b7b02b0a6634417d7c929579b2bb8f";

export default node;
