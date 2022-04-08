/**
 * @generated SignedSource<<462ba87d3a2ec94848fe17ddfc29ae1f>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type PostCopyLinkButtonFragment$data = {
  readonly reference: string;
  readonly club: {
    readonly slug: string;
  };
  readonly " $fragmentType": "PostCopyLinkButtonFragment";
};
export type PostCopyLinkButtonFragment = PostCopyLinkButtonFragment$data;
export type PostCopyLinkButtonFragment$key = {
  readonly " $data"?: PostCopyLinkButtonFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"PostCopyLinkButtonFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "PostCopyLinkButtonFragment",
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

(node as any).hash = "27d7e3ee7beeabc95b4ec66088fd079b";

export default node;
