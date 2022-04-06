/**
 * @generated SignedSource<<665735b8821d872856108ed3f078bf06>>
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
  readonly club: {
    readonly slug: string;
  };
  readonly " $fragmentSpreads": FragmentRefs<"PostPreviewContentFragment" | "PostCopyLinkButtonFragment" | "PostModerateButtonFragment" | "PostArchiveButtonFragment">;
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
      "name": "PostCopyLinkButtonFragment"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "PostModerateButtonFragment"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "PostArchiveButtonFragment"
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

(node as any).hash = "1cd781a1e073f18a85e56a73aa2dc7c5";

export default node;
