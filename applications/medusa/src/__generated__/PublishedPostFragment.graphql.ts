/**
 * @generated SignedSource<<d26a866a480aa835fae1b3f3400174f4>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type PublishedPostFragment$data = {
  readonly reference: string;
  readonly " $fragmentSpreads": FragmentRefs<"PostPreviewContentFragment" | "PostMenuFragment">;
  readonly " $fragmentType": "PublishedPostFragment";
};
export type PublishedPostFragment = PublishedPostFragment$data;
export type PublishedPostFragment$key = {
  readonly " $data"?: PublishedPostFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"PublishedPostFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "PublishedPostFragment",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "reference",
      "storageKey": null
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "PostPreviewContentFragment"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "PostMenuFragment"
    }
  ],
  "type": "Post",
  "abstractKey": null
};

(node as any).hash = "c9ac83087ea5a6b12e7268be9cc086c2";

export default node;
