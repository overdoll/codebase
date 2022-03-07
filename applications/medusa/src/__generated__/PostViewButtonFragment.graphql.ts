/**
 * @generated SignedSource<<918720a308ea326ac502ae483a6b29e0>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type PostViewButtonFragment$data = {
  readonly reference: string;
  readonly " $fragmentType": "PostViewButtonFragment";
};
export type PostViewButtonFragment = PostViewButtonFragment$data;
export type PostViewButtonFragment$key = {
  readonly " $data"?: PostViewButtonFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"PostViewButtonFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "PostViewButtonFragment",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "reference",
      "storageKey": null
    }
  ],
  "type": "Post",
  "abstractKey": null
};

(node as any).hash = "cbc6c53ce189ee3e56053d50e50ce924";

export default node;
