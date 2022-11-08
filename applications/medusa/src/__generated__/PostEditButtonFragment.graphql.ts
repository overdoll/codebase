/**
 * @generated SignedSource<<321de6834eb773f3ecf97243c4a44bcb>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type PostEditButtonFragment$data = {
  readonly club: {
    readonly slug: string;
  };
  readonly reference: string;
  readonly " $fragmentType": "PostEditButtonFragment";
};
export type PostEditButtonFragment$key = {
  readonly " $data"?: PostEditButtonFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"PostEditButtonFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "PostEditButtonFragment",
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

(node as any).hash = "d6b9eccf3962cc949df2e0b7125d01b4";

export default node;
