/**
 * @generated SignedSource<<719a64282926aa93efa2dee67dbe73fc>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type PostIndexerFragment$data = {
  readonly content: ReadonlyArray<{
    readonly isSupporterOnly: boolean;
  }>;
  readonly " $fragmentType": "PostIndexerFragment";
};
export type PostIndexerFragment = PostIndexerFragment$data;
export type PostIndexerFragment$key = {
  readonly " $data"?: PostIndexerFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"PostIndexerFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "PostIndexerFragment",
  "selections": [
    {
      "alias": null,
      "args": null,
      "concreteType": "PostContent",
      "kind": "LinkedField",
      "name": "content",
      "plural": true,
      "selections": [
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "isSupporterOnly",
          "storageKey": null
        }
      ],
      "storageKey": null
    }
  ],
  "type": "Post",
  "abstractKey": null
};

(node as any).hash = "c73520286966af6a8e53b1998c0782d1";

export default node;
