/**
 * @generated SignedSource<<dcc10539e44e2e66fcc41e576c01fde1>>
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
  readonly club: {
    readonly slug: string;
  };
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
    },
    {
      "alias": null,
      "args": null,
      "concreteType": "Club",
      "kind": "LinkedField",
      "name": "club",
      "plural": false,
      "selections": [
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "slug",
          "storageKey": null
        }
      ],
      "storageKey": null
    }
  ],
  "type": "Post",
  "abstractKey": null
};

(node as any).hash = "ffdf604b32271bfa6d197e6dbcc186de";

export default node;
